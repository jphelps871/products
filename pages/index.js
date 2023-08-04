import Head from "next/head"
import Card from "@/components/Card"
import Button from "@/components/Button"
import Image from "next/image"
import DropDown from "@/components/Dropdown"
import FeedBackButton from "@/components/FeedBackButton"
import CardFeedback from "@/components/CardFeedback"
import Link from "next/link"
import { getLocalData } from '../lib/localData'
import { useState } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import supabase from "@/utils/supabase"

export async function getStaticProps() {
  const feedbackData = await getLocalData()
  return {props: {feedbackData}}
}

// const checkUserLoggedIn = () => {
//   console.log(useUser())
  
//   if (useUser()) {
//     return true
//   } else {
//     return false
//   }
// };

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (data) {
    const { access_token } = data;
    await supabase.auth.api.setSession(access_token);
    console.log(data)
  } else if (error) {
    console.error('Authentication error:', error);
  }
};

export default function Home({ feedbackData }) {
  const [displayMenu, setDisplayMenu] = useState(false)

  return (
    <>
      <Head>
        <title>Feedback Board</title>
      </Head>

        <main className="max-w-screen-xl w-full sm:w-11/12 mx-auto md:pt-6 sm:pt-6">
          <div className="gap-6 md:flex">

            <header className="md:w-1/4 z-50">
              
              <div className="sm:mb-4 md:flex flex-col sm:grid sm:grid-cols-3 sm:gap-3">
                <div className="logo-bg sm:rounded-lg overflow-hidden bg-white">
                  <div className="p-4 flex items-center">
                    <div>
                      <h1 className="text-white font-bold text-lg sm:mt-5">Frontend Mentor</h1>
                      <h2 className="text-white text-sm">Feedback Board</h2>
                    </div>
                    <button onClick={() => setDisplayMenu(!displayMenu)} className="pointer sm:hidden ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                        {displayMenu? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Mobile */}
                <div className={`w-4/5 h-full bg-light-cream p-4 absolute top-px80 right-0 z-50 ${displayMenu ? 'sm:hidden block' : 'hidden'}`}>
                  <Card tailwindStyles={'sm:block bg-white rounded-lg'}>
                    <div className="flex flex-wrap gap-3">
                      <Button value={'All'} active={true}/>
                      <Button value={'UI'} active={false}/>
                      <Button value={'UX'} active={false}/>
                      <Button value={'Enhancement'} active={false}/>
                      <Button value={'Bug'} active={false}/>
                      <Button value={'Features'} active={false}/>
                    </div>
                  </Card>

                  <Card tailwindStyles={'sm:block mt-4 bg-white rounded-lg'}>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-md text-dark-grey">Roadmap</h3>
                      <a href="/roadmap" className="underline text-sm text-dark-blue hover:text-light-blue">View</a>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-light-slate">
                        <p className="flex items-center">
                          <span className="mr-2 w-2 h-2 rounded-full bg-orange inline-block"></span>
                          Planned
                        </p>
                        <p className="font-bold">2</p>
                      </div>
                      <div className="flex justify-between mb-1 text-light-slate">
                        <p className="flex items-center">
                          <span className="mr-2 w-2 h-2 rounded-full bg-dark-purple inline-block"></span>
                          In-Progress
                        </p>
                        <p className="font-bold">3</p>
                      </div>
                      <div className="flex justify-between mb-1 text-light-slate">
                        <p className="flex items-center">
                          <span className="mr-2 w-2 h-2 rounded-full bg-light-blue inline-block"></span>
                          Live
                        </p>
                        <p className="font-bold">1</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Desktop */}
                <div className={`col-span-2 grid-cols-2 md:grid-cols-1 sm:gap-3 hidden sm:grid`}>
                  <Card tailwindStyles={'sm:block bg-white rounded-lg'}>
                    <div className="flex flex-wrap gap-3">
                      <Button value={'All'} active={true}/>
                      <Button value={'UI'} active={false}/>
                      <Button value={'UX'} active={false}/>
                      <Button value={'Enhancement'} active={false}/>
                      <Button value={'Bug'} active={false}/>
                      <Button value={'Features'} active={false}/>
                    </div>
                  </Card>

                  <Card tailwindStyles={'sm:block bg-white rounded-lg'}>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-md text-dark-grey">Roadmap</h3>
                      <a href="/roadmap" className="underline text-sm text-dark-blue hover:text-light-blue">View</a>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-light-slate">
                        <p className="flex items-center">
                          <span className="mr-2 w-2 h-2 rounded-full bg-orange inline-block"></span>
                          Planned
                        </p>
                        <p className="font-bold">2</p>
                      </div>
                      <div className="flex justify-between mb-1 text-light-slate">
                        <p className="flex items-center">
                          <span className="mr-2 w-2 h-2 rounded-full bg-dark-purple inline-block"></span>
                          In-Progress
                        </p>
                        <p className="font-bold">3</p>
                      </div>
                      <div className="flex justify-between mb-1 text-light-slate">
                        <p className="flex items-center">
                          <span className="mr-2 w-2 h-2 rounded-full bg-light-blue inline-block"></span>
                          Live
                        </p>
                        <p className="font-bold">1</p>
                      </div>
                    </div>
                  </Card>

                  <Card tailwindStyles={'sm:block bg-white rounded-lg'}>
                    <p className="font-bold text-lg text-dark-grey mb-3">Login</p>
                    <div className="w-full">
                      <button className='border border-dark-grey w-full rounded-lg py-3 px-2 flex items-center justify-center hover:border-white hover:bg-dark-grey hover:text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6" viewBox="0 0 326667 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4"/><path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853"/><path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04"/><path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"/></svg>
                        <p className="ml-2">
                          Sign up with Google
                        </p>
                      </button>
                    </div>
                  </Card>
                </div>

              </div>
              
            </header>

            {/* Background for mobile */}
            <div onClick={() => setDisplayMenu(false)} className={`w-full h-full bg-gray-800 opacity-40 ${displayMenu ? 'absolute sm:hidden' : 'hidden'}`}></div>

            <div className="md:w-3/4">
              <Card tailwindStyles={'sm:rounded-lg bg-slate text-white'}>
                <div className="flex items-center">
                  <Image 
                    src="images/bulb.svg" 
                    width={24}
                    height={24}
                    alt="Bulb"  
                    className="mr-4 hidden lg:block"
                  />
                  <p className="mr-6 font-bold hidden sm:block">6 Suggestions</p>
                  <div className="flex items-center">
                    <label className="hidden sm:inline-block">Sort by:</label>
                    <DropDown 
                      items={["Most Upvotes", "Least Upvotes", "Most Comments", "Least Comments"]} 
                      buttonStyles={"inline-flex w-full justify-center gap-x-1.5 rounded-lg px-3 py-2 text-md text-white font-semibold"}
                      dropdownPositionStyles={"-left-14 z-10 mt-2"}
                    />
                  </div>

                  <div className="ml-auto">
                    <Link href="/feedback/create">
                      <FeedBackButton bgColor={'bg-dark-purple'}>+ Add Feedback</FeedBackButton>
                    </Link>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col gap-4 mt-3 mx-2 sm:mx-0">
                {feedbackData.map(data => (
                  <Link key={data.id} href={`/comments/${data.id}`}>
                    <CardFeedback category={data.category} upvoteNumber={data.numberOfUpvotes} heading={data.heading} body={data.body} commentsNumber={data.numberOfComments} />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </main>
    </>
  )
}
