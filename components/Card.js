export default function Card({children}) {
    return (
        <div className="sm:block hidden rounded-md overflow-hidden bg-white mt-4 p-4">
            {children}
        </div>
    )
}