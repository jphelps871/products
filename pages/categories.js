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
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  // Update category name based on selected category
  const watchingCategories = watch("category");
  const selectedCategory = categories[watchingCategories - 2];

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
    const method = event.target.name;

    // Call handleSubmit here to trigger the form submission
    handleSubmit(async (data) => {
      // const response = await sendFeedback(method, data, feedbackId);
      toast.success(response.message);

      // This needs to re-fetch data, not only return to home
      router.push(path);
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

              <select className="mt-3 cursor-pointer rounded-lg p-4 text-md bg-light-cream w-full text-dark-grey" name="category" id="category" {...register("category", { required: true })}>
                <option key={-1} value={-1}>
                  Select a category to edit or delete
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
              <button onClick={(e) => handleClickSubmit(e)} name={operation === "update" ? "update" : "post"} className="bg-dark-purple sm:px-5 px-4 py-3 hover:opacity-80 text-white rounded-lg font-bold text-sm sm:text-md">
                {operation === "update" ? "Update" : "Add"}
              </button>
            </div>

            {operation === "update" && (
              <div className="ml-2">
                <button onClick={(e) => handleClickSubmit(e)} name="delete" className="bg-red-700 sm:px-5 px-4 py-3 hover:opacity-80 text-white rounded-lg font-bold text-sm sm:text-md">
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
