import FormContainer from "@/components/form/FormContainer"
import Login from "@/components/Login"
import randomEmail from "random-email";
import generatePassword from "generate-password";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from 'react-tooltip'

export default function login() {
  const [helperText, setHelperText] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRandomLoginCredentials = async () => {
    const email = randomEmail({ domain: "feedbackapp.com" });
    const password = generatePassword.generate({
      length: 10,
      numbers: true,
    });

    reset({
      email,
      password
    })

    setHelperText("Remember these details for next time you log in. Click \"Sign Up\" to finish the process")
  };

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <FormContainer iconPath={"/images/login.svg"} IconAlt={"User login icon"}>
      <Login />

      <form autoComplete="off" className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-md mb-3">
          {helperText}
        </p>

        <label htmlFor="email" className="text-dark-grey font-bold mt-10">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`bg-light-cream mt-3 p-3 w-full rounded-lg ${errors.email && "border-2 border-red-500"}`}
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <p className="text-red-500 mt-1" role="alert">
            {errors.email?.message}
          </p>
        )}

        <label htmlFor="password" className="text-dark-grey font-bold">
          Password
        </label>
        <input
          id="password"
          type="text"
          className={`bg-light-cream mt-3 p-3 w-full rounded-lg ${errors.password && "border-2 border-red-500"}`}
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="text-red-500 mt-1" role="alert">
            {errors.password?.message}
          </p>
        )}

        <div className="mt-3">
          <button onClick={handleSubmit(onSubmit)} type="submit" className={`bg-dark-purple sm:px-5 px-4 py-3 hover:opacity-80 text-white rounded-lg font-bold text-sm sm:text-md`}>
            Sign Up
          </button>

          <button onClick={handleRandomLoginCredentials}  data-tooltip-id="my-tooltip" type="button" data-tooltip-content="Creates a random email and password" className="bg-orange sm:px-5 px-4 py-3 hover:opacity-80 text-white rounded-lg font-bold text-sm sm:text-md ml-3 relative">
            Automatically fill
          </button>
          <Tooltip id="my-tooltip" />
        </div>


      </form>
    </FormContainer>
  )
}