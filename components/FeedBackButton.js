export default function FeedBackButton({bgColor, children}) {
    return (
        <button className={`sm:px-5 px-4 py-3 hover:opacity-80 bg-${bgColor} text-white rounded-lg font-bold text-sm sm:text-md`}>
            {children}
        </button>
    )
}