export default function FeedBackButton({bgColor, children, submit}) {
    return (
        <button type={submit ? 'submit' : 'button'} className={`${bgColor} sm:px-5 px-4 py-3 hover:opacity-80 text-white rounded-lg font-bold text-sm sm:text-md`}>
            {children}
        </button>
    )
}