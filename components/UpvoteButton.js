import Image from "next/image"

export default function UpvoteButton({value, roadmap}) {
    const responsiveClasses = roadmap ? false : true

    return (
        <button className={`bg-cream rounded-lg px-3 py-2 dark-grey flex ${responsiveClasses && 'sm:block sm:px-2 sm:py-1'} hover:bg-hover`}>
            <Image 
                src={'/images/upvote-icon.svg'}
                width="12"
                height="12"
                alt="Up icon"
                className={`inline-block mr-1 ${responsiveClasses && 'sm:mr-0'}`}
            />
            <p className="text-sm font-bold">{value}</p>
        </button>
    )
}