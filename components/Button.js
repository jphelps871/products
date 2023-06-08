import Image from "next/image"

export default function Button({value, active, upvote}) {
    let activeBtnClass = active ? 'text-white bg-dark-blue' : ''
    let upvoteClasses = upvote ? 'px-2 py-1 dark-grey' : 'px-4 py-2 text-dark-blue'


    return (
        <button className={`bg-cream rounded-lg hover:bg-hover ${activeBtnClass} ${upvoteClasses}`}>
            {upvote && (
                <div className="text-center">
                    <Image 
                        src={'/images/upvote-icon.svg'}
                        width={12}
                        height={12}
                        alt="Up icon"
                        className="inline-block"
                    />
                </div>
            )}
            <p className="text-sm font-bold">{value}</p>
        </button>
    )
}