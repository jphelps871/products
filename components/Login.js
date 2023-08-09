import supabase from "@/utils/supabase";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Login() {
    const supabase = useSupabaseClient()
    const user = useUser()

    const handleLogin = async () => {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          }, 
        });

        if (error) {
          console.error("Authentication error:", error);
          return;
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    return (
      <>
        <p className="font-bold text-lg text-dark-grey mb-3">
            {!user ? 'Login' : `Hi, ${user.user_metadata.name}`}
        </p>
        <div className="w-full">
            <button onClick={() => !user ? handleLogin() : supabase.auth.signOut()} className='border-2 border-dark-grey w-full rounded-lg py-3 px-2 flex items-center justify-center hover:border-white hover:bg-dark-grey hover:text-white'>
                {!user ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6" viewBox="0 0 326667 333333" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
                        <path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4"/><path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853"/><path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04"/><path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                )}
                <p className="ml-2">
                    {!user ? 'Sign up with Google' : 'Logout'}
                </p>
            </button>
        </div>
      </>
    ) 
}
