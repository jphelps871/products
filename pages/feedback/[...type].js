import { useRouter } from "next/router";
import FormContainer from "@/components/form/FormContainer";
import FeedBackButton from "@/components/FeedBackButton";
import FormCharactersContainer from "@/components/form/FormCharactersContainer";
import Link from "next/link";
import { toast } from "react-toastify";
import { getFeedback, feedback as sendFeedback } from "@/services/feedback";
import { getCategory } from "@/services/category";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function feedback() {
  const [feedbackCharacters, setFeedbackCharacters] = useState(0);
  const [detailCharacters, setDetailCharacters] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [type, feedbackId] = router?.query?.type || ["", ""];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Add information to the form
  useEffect(() => {
    getCategory()
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));

    if (type === "edit") {
      getFeedback(feedbackId)
        .then((data) => {
          const feedbackForForm = data.feedback;
          feedbackForForm.category = feedbackForForm.category.id;
          feedbackForForm.status = feedbackForForm.status.id;
          reset(feedbackForForm);

          // Set characters length for text fields
          setDetailCharacters(feedbackForForm.detail.length);
          setFeedbackCharacters(feedbackForForm.title.length);
        })

        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [feedbackId]);

  function handleClickSubmit(event) {
    event.preventDefault();
    const method = event.target.name;
  
    // Call handleSubmit here to trigger the form submission
    handleSubmit(async (data) => {
      const response = await sendFeedback(method, data, feedbackId)
      toast.success(response.message);
      router.push("/");
    })();
  }

  return (
    <FormContainer heading={`${type === "create" ? "Create New Feedback" : "Edit Feedback"}`} iconPath={"/images/plus-icon.svg"} IconAlt={"Plus icon"}>
      {loading || categories.length == 0 ? (
        <div className="flex justify-center">
          <ClipLoader aria-label="Loading Spinner" data-testid="loader" />
        </div>
      ) : (
        <form autoComplete="off">
          {/* Title */}
          <div className="mb-5">
            <label htmlFor="title" className="text-dark-grey font-bold">
              Feedback Title
              <span className="text-dark-grey font-normal block text-sm">Add a short, descriptive headline</span>
            </label>

            <input
              onKeyUp={(e) => setFeedbackCharacters(e.target.value.length)}
              id="title"
              type="text"
              maxLength="60"
              className={`bg-light-cream mt-3 p-3 w-full rounded-lg ${errors.title && "border-2 border-red-500"}`}
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 60,
                  message: "Must be less than 60 characters",
                },
              })}
            />
            <FormCharactersContainer count={feedbackCharacters} limit={60} />
            {errors.title && (
              <p className="text-red-500 mt-1" role="alert">
                {errors.title?.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mb-5">
            <label htmlFor="category" className="text-dark-grey font-bold">
              Category
              <span className="text-dark-grey font-normal block text-sm">Choose a category for your feedback</span>
            </label>

            <select className="mt-3 cursor-pointer rounded-lg p-4 text-md bg-light-cream w-full text-dark-grey" name="category" id="category" {...register("category", { required: true })}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          {type === "edit" && (
            <div className="mb-5">
              <label htmlFor="status" className="text-dark-grey font-bold">
                Update Status
                <span className="text-dark-grey font-normal block text-sm">Choose feature state</span>
              </label>

              <select className="mt-3 cursor-pointer rounded-lg p-4 text-md bg-light-cream w-full text-dark-grey" name="status" id="status" {...register("status", { required: true })}>
                <option value="1">Planned</option>
                <option value="2">In-Progress</option>
                <option value="3">Live</option>
              </select>
            </div>
          )}

          {/* Details */}
          <div className="mb-5">
            <label htmlFor="title" className="text-dark-grey font-bold">
              Feedback Detail
              <span className="text-dark-grey font-normal block text-sm">Include any specific comments on what should be improved, added, etc.</span>
            </label>

            <textarea
              onKeyUp={(e) => setDetailCharacters(e.target.value.length)}
              id="detail"
              type="text"
              rows="4"
              maxLength="100"
              className={`bg-light-cream mt-3 p-3 w-full rounded-lg ${errors.detail && "border-2 border-red-500"}`}
              {...register("detail", {
                required: "Detail on feedback is required",
                maxLength: {
                  value: 100,
                  message: "Must be less than 100 characters",
                },
              })}
            />
            <FormCharactersContainer count={detailCharacters} limit={100} />
            {errors.detail && (
              <p className="text-red-500 mt-1" role="alert">
                {errors.detail?.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            {type === "edit" && (
              <div className="mr-auto">
                <FeedBackButton submit handleClick={(e) => handleClickSubmit(e)} name={"delete"} bgColor={"bg-danger-red"}>
                  Delete
                </FeedBackButton>
              </div>
            )}

            <div className="mr-2">
              <Link href={"/"}>
                <FeedBackButton bgColor={"bg-dark-grey"}>Cancel</FeedBackButton>
              </Link>
            </div>
            <div>
              <button onClick={(e) => handleClickSubmit(e)} name={type === "create" ? "post" : "update"} className={`bg-dark-purple sm:px-5 px-4 py-3 hover:opacity-80 text-white rounded-lg font-bold text-sm sm:text-md`}>
                {type === "create" ? "Add Feedback" : "Edit Feedback"}
              </button>
            </div>

          </div>
        </form>
      )}
    </FormContainer>
  );
}
