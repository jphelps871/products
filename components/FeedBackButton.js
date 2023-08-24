export default function FeedBackButton({bgColor, children, handleClick, name, submit}) {
    return (
        <button onClick={handleClick} type={submit ? 'button' : 'submit'} name={name} className={`${bgColor} sm:px-5 px-4 py-3 hover:opacity-80 text-white rounded-lg font-bold text-sm sm:text-md`}>
            {children}
        </button>
    )
}