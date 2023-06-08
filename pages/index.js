import Head from "next/head"
import Card from "@/components/Card"
import Button from "@/components/Button"
import Image from "next/image"
import DropDown from "@/components/Dropdown"
import FeedBackButton from "@/components/FeedBackButton"
import CardFeedback from "@/components/CardFeedback"
import { getLocalData } from '../lib/localdata'

export async function getStaticProps() {
  const feedbackData = await getLocalData()
  return {props: {feedbackData}}
}

export default function Home({ feedbackData }) {
  return (
    <>
      <Head>
        <title>Feedback Board</title>
      </Head>
      <div className="bg-light-cream">
        <main className="max-w-screen-xl mx-auto md:pt-4">
          <div className="gap-6 md:flex sm:mx-3">

            <header className="md:w-1/4">
              
              <div className="sm:mb-4 sm:mt-4 md:mt-0 md:flex flex-col sm:grid sm:grid-cols-3 sm:gap-3">
                <div className="logo-bg sm:rounded-lg overflow-hidden bg-white">
                  <div className="p-4 flex items-center">
                    <div>
                      <h1 className="text-white font-bold text-lg sm:mt-5">Frontend Mentor</h1>
                      <h2 className="text-white text-sm">Feedback Board</h2>
                    </div>
                    <button className="pointer sm:hidden ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    </button>
                  </div>
                </div>

                <Card hideOnMobile={true}>
                  <div className="flex flex-wrap gap-3">
                    <Button value={'All'} active={true}/>
                    <Button value={'UI'} active={false}/>
                    <Button value={'UX'} active={false}/>
                    <Button value={'Enhancement'} active={false}/>
                    <Button value={'Bug'} active={false}/>
                    <Button value={'Features'} active={false}/>
                  </div>
                </Card>

                <Card hideOnMobile={true}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-md text-dark-grey">Roadmap</h3>
                    <a href="/" className="underline text-sm text-dark-blue hover:text-light-blue">View</a>
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
              
            </header>

            <div className="md:w-3/4">
              <Card backgroundColor={'dark'} roundedOnSmallScreen={true}>
                <div className="flex items-center">
                  <Image 
                    src="images/bulb.svg" 
                    width={24}
                    height={24}
                    alt="Bulb"  
                    className="mr-4 hidden sm:block"
                  />
                  <p className="mr-6 font-bold hidden sm:block">6 Suggestions</p>
                  <div>
                    <label className="mr-1 hidden sm:inline-block" htmlFor="cars">Sort by:</label>
                    <DropDown />
                  </div>

                  <div className="ml-auto">
                    <FeedBackButton />
                  </div>
                </div>
              </Card>

              <div className="flex flex-col gap-4 mt-3 mx-2 sm:mx-0">
                {feedbackData.map(data => (
                  <CardFeedback key={data.heading} category={data.category} upvoteNumber={data.numberOfUpvotes} heading={data.heading} body={data.body} commentsNumber={data.numberOfComments} />
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
