export default function Card({children, tailwindStyles}) {
    return (
        <div className={`overflow-hidden p-4 sm:p-6 ${tailwindStyles}`}>
            {children}
        </div>
    )
}