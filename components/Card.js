export default function Card({children, tailwindStyles, onMouseEnterCard, onMouseLeaveCard}) {
    return (
        <div onMouseEnter={onMouseEnterCard} onMouseLeave={onMouseLeaveCard} className={`p-4 sm:p-6 ${tailwindStyles}`}>
            {children}
        </div>
    )
}