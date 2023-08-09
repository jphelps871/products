import Head from "next/head"
import Card from "@/components/Card"
import Button from "@/components/Button"
import Image from "next/image"
import DropDown from "@/components/Dropdown"
import FeedBackButton from "@/components/FeedBackButton"
import CardFeedback from "@/components/CardFeedback"
import Link from "next/link"
import Login from "@/components/Login"
import Categories from "@/components/Categories"
import prisma from "./api/prisma/prisma"
import { getLocalData } from '../lib/localData'
import { useState } from "react"

export async function getStaticProps() {
  const feedbackData = await getLocalData()
  const categories = await prisma.category.findMany()
  const feedback = await prisma.feedback.findMany({
    select: {
      id: true,
      upvotes: true,
      title: true,
      detail: true,
      category: {
        select: {
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
        },
      },
    },
  })

  return {props: {
    feedback,
    categories,
  }}
}

/*

  DATA FOR FEEDBACK
  category, upvoteNumber, heading, body, commentsNumber

*/

export default function Home({feedback, categories}) {
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
                  <Categories categories={categories} />

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
                  <Categories categories={categories}/>

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
                    <Login />
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
                {feedback.map(data => (
                  <Link key={data.id} href={`/comments/${data.id}`}>
                    <CardFeedback category={data.category.name} upvoteNumber={data.upvotes} heading={data.title} body={data.detail} commentsNumber={data.comments.length} />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </main>
    </>
  )
}
