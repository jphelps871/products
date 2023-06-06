import Head from "next/head"

export default function Home() {
  const activeBtnClass = 'text-white bg-dark-blue'

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-light-cream">
        <main className="max-w-screen-xl mx-auto h-screen mt-3">
          <div className="flex gap-6 mx-3">
            <header className="w-1/4">
              <div className="rounded-md overflow-hidden bg-white ">
                <div className="logo-bg p-4">
                  <h1 className="text-white font-bold text-lg mt-5">Frontend Mentor</h1>
                  <h2 className="text-white text-sm">Feedback Board</h2>
                </div>
              </div>

              <div className="rounded-md overflow-hidden bg-white mt-4">
                <div className="p-4 flex flex-wrap gap-3">
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
              </div>
            </header>

            <div className="border border-md border-green-500 w-3/4">
              main content
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
