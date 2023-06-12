export default function FeedBackButton({bgColor, textContent}) {
    const firstWord = textContent.split(" ")[0].toUpperCase()

    return (
        <button className={`sm:px-5 px-3 py-2 hover:opacity-80 bg-${bgColor} text-white rounded-lg font-bold text-sm sm:text-md`}>
            {firstWord == "ADD" && (
                <span className="inline-block text-xl mr-1">+</span> 
            )}
            {textContent}
        </button>
    )
}