import { useRouter } from "next/router";
import { usePreviousUrlLocation } from "@/hooks/usePreviousLocation";
import FormContainer from "@/components/form/FormContainer";
import FeedBackButton from "@/components/FeedBackButton";
import Link from "next/link";
import { toast } from "react-toastify";
import { getCategory } from "@/services/category";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FormCharactersContainer from "@/components/form/FormCharactersContainer";

export default function Feedback() {
  const [categories, setCategories] = useState([]);
  const [feedbackCharacters, setFeedbackCharacters] = useState(0);
  const path = usePreviousUrlLocation();

  const router = useRouter();
  const operation = router.query?.operation;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  // Update category name based on selected category
  const categoryId = watch("category");
  const selectedCategory = categories.find((item) => item.id === parseInt(categoryId));

  useEffect(() => {
    if (!selectedCategory) return;

    setValue("category", selectedCategory.id);
    setValue("name", selectedCategory.name);

    setFeedbackCharacters(selectedCategory.name.length); // for 'Characters left' in form
  }, [selectedCategory]);

  // Display categories only when editing
  useEffect(() => {
    if (operation === "create") return;

    getCategory()
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, [operation]);

  // Create or edit information
  function handleClickSubmit(event) {
    event.preventDefault();
    const method = event.target.name; // based on button name (e.g. name="DELETE")

    // Automatically call handleSubmit here to trigger the form submission
    handleSubmit(async (data) => {
      const useBody = method === "POST" || method === "PUT";

      let url = "/api/category";
      if (method === "DELETE" || method === "PUT") {
        url = `/api/category?id=${data.category}`;
      }

      const options = {
        method: method,
        ...(useBody && {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
      };

      const response = await fetch(url, options);
      const { errors, message } = await response.json();

      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0],
          });
        });
        return;
      }

      toast.success(message);
      router.push(path); // re-fetch data and redirect
    })();
  }

  // Set the heading based on whether the operation is update or create
  const heading = operation === "update" ? "Update or Delete a Category" : "Create Category";

  return (
    <FormContainer heading={heading} iconPath={"/images/plus-icon.svg"} IconAlt={"Plus icon"}>
      {categories.length === 0 && operation === "update" ? (
        <div className="flex justify-center">
          <ClipLoader aria-label="Loading Spinner" data-testid="loader" />
        </div>
      ) : (
        <form autoComplete="off">
          {/* Category */}
          {operation === "update" && (
            <div className="mb-5">
              <label htmlFor="category" className="text-dark-grey font-bold">
                Category
                <span className="text-dark-grey font-normal block text-sm">Choose a category for your feedback</span>
              </label>

              <select className={`mt-3 cursor-pointer rounded-lg p-4 ${errors.category && "border-2 border-red-500"} text-md bg-light-cream w-full text-dark-grey`} name="category" id="category" {...register("category", { required: true })}>
                <option key={-1} value={-1}>
                  Select a category to edit or delete
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 mt-1" role="alert">
                  {errors.category?.message}
                </p>
              )}
            </div>
          )}

          {/* Name */}
          {(selectedCategory || operation === "create") && (
            <div className="mb-5">
              <label htmlFor="title" className="text-dark-grey font-bold">
                Category name
                <span className="text-dark-grey font-normal block text-sm">Add a short, descriptive category</span>
              </label>

              <input
                onKeyUp={(e) => setFeedbackCharacters(e.target.value.length)}
                id="name"
                type="text"
                maxLength="150"
                className={`bg-light-cream mt-3 p-3 w-full rounded-lg ${errors.name && "border-2 border-red-500"}`}
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Must be less than 20 characters",
                  },
                })}
              />
              <FormCharactersContainer count={feedbackCharacters} limit={20} />
              {errors.name && (
                <p className="text-red-500 mt-1" role="alert">
                  {errors.name?.message}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <div className="mr-2">
              <Link href={"/"}>
                <FeedBackButton bgColor={"bg-dark-grey"}>Cancel</FeedBackButton>
              </Link>
            </div>

            <div>
              <button onClick={(e) => handleClickSubmit(e)} name={operation === "update" ? "PUT" : "POST"} className="bg-dark-purple sm:px-5 px-4 py-3 hover:opacity-80 text-white rounded-lg font-bold text-sm sm:text-md">
                {operation === "update" ? "Update" : "Add"}
              </button>
            </div>

            {operation === "update" && (
              <div className="ml-2">
                <button onClick={(e) => handleClickSubmit(e)} name="DELETE" className="bg-red-700 sm:px-5 px-4 py-3 hover:opacity-80 text-white rounded-lg font-bold text-sm sm:text-md">
                  Delete
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </FormContainer>
  );
}
