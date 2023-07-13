export default function RoadmapContainer({children, status, color}) {
    let borderColor = 'grey'
    
    if (color === "orange") {
        borderColor = 'border-orange';
    }
    if (color === "dark-purple") {
        borderColor = 'border-dark-purple';
    }
    if (color === "light-blue") {
        borderColor = 'border-light-blue';
    }

    return (
        <div className={`border-t-4 overflow-hidden rounded bg-white mb-3 ${borderColor}`}>
            <div className="px-6 mt-4">
                <p className="flex items-center">
                    <span className={`mr-2 w-2 h-2 rounded-full bg-${color} inline-block`}></span>
                    {status}
                </p>
            </div>
            {children}
        </div>
    )
}