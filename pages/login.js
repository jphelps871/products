import FormContainer from "@/components/form/FormContainer"
import randomEmail from "random-email";
import generatePassword from "generate-password";
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { authoriseWithProvider, authoriseWithUserDetails } from "@/services/auth";
import { AvatarGenerator } from 'random-avatar-generator';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from 'react-tooltip'

export default function login() {
  const [helperText, setHelperText] = useState("")
  const supabase = useSupabaseClient();
  const user = useUser()

  console.log(user)

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
    const name = uniqueNamesGenerator({ 
      dictionaries: [adjectives, colors, animals] ,
      length: 2,
      separator: ' ',
      style: 'capital'
    });

    const emailUsername = email.split('@')[0]
    const fullName = name.replace(' ', '')
    const username = `@${fullName}_${emailUsername}`

    const generator = new AvatarGenerator();
    const avatar = generator.generateRandomAvatar();

    reset({
      name,
      email,
      password,
      avatar,
      username
    })

    setHelperText("Remember these details for next time you log in. Click \"Sign Up\" to finish the process.")
  };

  const addUserToDatabase = async (userObj, formData = {}) => {

    /*
      I need to handle how data from the form (avatar, username etc..)
      and simple auth login from google can interact.    
    */ 

    try {

      await fetch("api/user", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify(userObj),
      });

    } catch (error) {

      console.error(error);

    }
  }

  const onProviderAuth = async (provider) => {
    const response = await authoriseWithProvider(provider, supabase)

    if (user) addUserToDatabase(user)
  }

  const onFormSubmit = async (data) => {
    const response = await authoriseWithUserDetails(data, supabase)

    if (user) addUserToDatabase(user, data)
  }

  return (
    <FormContainer iconPath={"/images/login.svg"} IconAlt={"User login icon"}>

      {/* oAuth login */}
      <div className="w-full">
        <button onClick={() => onProviderAuth('google')} className="border-2 border-dark-grey w-full rounded-lg py-3 px-2 flex items-center justify-center hover:border-white hover:bg-dark-grey hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6" viewBox="0 0 326667 333333" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
              <path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4" />
              <path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853" />
              <path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04" />
              <path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z" />
            </svg>
          <p className="ml-2">Sign up with Google</p>
        </button>
      </div>

      {/* Standard login */}
      <form autoComplete="off" className="mt-8" onSubmit={handleSubmit(onFormSubmit)}>
        <p className="text-md mb-3">
          Recommend using <b>automatically fill</b> when filling out the below form. 
          This is a working project, it is not meant for commercial purposes. Therefore, it does not matter
          if email and password are meaningless.
        </p>

        {/* Hidden data */}
        <div className="mb-2">
          <input
            id="username"
            type="hidden"
            className="hidden"
            {...register("username")}
          />
        </div>

        <div className="mb-2">
          <input
            id="avatar"
            type="hidden"
            className="hidden"
            {...register("avatar")}
          />
        </div>

        {/* Visible data */}
        <div className="mb-2">
          <label htmlFor="name" className="text-dark-grey font-bold mt-10">
            Full name
          </label>
          <input
            id="name"
            type="text"
            className={`bg-light-cream mt-3 p-3 w-full rounded-lg ${errors.name && "border-2 border-red-500"}`}
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className="text-red-500 mt-1" role="alert">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="mb-2">
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
        </div>

        <div className="mb-3">
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
        </div>

        <div>
          <button type="submit" className={`bg-dark-purple sm:px-5 px-4 py-3 hover:opacity-80 text-white rounded-lg font-bold text-sm sm:text-md`}>
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