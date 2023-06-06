import Head from "next/head"
import Card from "@/components/Card"

export default function Home() {
  const activeBtnClass = 'text-white bg-dark-blue'

  return (
    <>
      <Head>
        <title>Feedback Board</title>
      </Head>

      <div className="bg-light-cream">
        <main className="max-w-screen-xl mx-auto h-screen sm:pt-3">
          <div className="gap-6 md:flex sm:mx-3">

            <header className="md:w-1/4">
              
              <div className="mb-4 sm:grid sm:grid-cols-3 sm:gap-3 md:block">
                <div className="logo-bg sm:rounded-md overflow-hidden bg-white sm:mt-4 md:mt-0">
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

                <Card>
                  <div className="flex flex-wrap gap-3">
                    <button className={`px-3 py-1 bg-cream rounded-md text-dark-blue hover:bg-hover ${activeBtnClass}`}>
                      <p className="text-sm font-bold">All</p>
                    </button>
                    <button className="px-3 py-1 bg-cream rounded-md text-dark-blue hover:bg-hover">
                      <p className="text-sm font-bold">UI</p>
                    </button>
                    <button className="px-3 py-1 bg-cream rounded-md text-dark-blue hover:bg-hover">
                      <p className="text-sm font-bold">UX</p>
                    </button>
                    <button className="px-3 py-1 bg-cream rounded-md text-dark-blue hover:bg-hover">
                      <p className="text-sm font-bold">Enhancement</p>
                    </button>
                    <button className="px-3 py-1 bg-cream rounded-md text-dark-blue hover:bg-hover">
                      <p className="text-sm font-bold">Bug</p>
                    </button>
                    <button className="px-3 py-1 bg-cream rounded-md text-dark-blue hover:bg-hover">
                      <p className="text-sm font-bold">Features</p>
                    </button>
                  </div>
                </Card>

                <Card>
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

            <div className="border border-md border-green-500 md:w-3/4">
              main content
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
