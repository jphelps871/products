import Image from "next/image"

export default function Button({value, active, upvote, noHover}) {
    let activeBtnClass = active ? 'text-white bg-dark-blue' : ''
    let upvoteClasses = upvote ? 'px-3 py-2 sm:px-2 sm:py-1 dark-grey flex sm:block' : 'px-4 py-2 text-dark-blue'
    let hoverClass = noHover ? 'cursor-default' : 'hover:bg-hover'

    return (
        <button className={`bg-cream rounded-lg ${hoverClass} ${activeBtnClass} ${upvoteClasses}`}>
            {upvote && (
                <Image 
                    src={'/images/upvote-icon.svg'}
                    width="12"
                    height="12"
                    alt="Up icon"
                    className="inline-block mr-1 sm:mr-0"
                />
            )}
            <p className="text-sm font-bold">{value}</p>
        </button>
    )
}