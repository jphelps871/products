export default function FeedBackButton({bgColor}) {
    return (
        <button className={`sm:px-5 px-3 py-2 hover:opacity-80 bg-${bgColor} text-white rounded-lg font-bold text-sm sm:text-md`}>
            <span className="inline-block text-xl">+</span> Add Feedback
        </button>
    )
}