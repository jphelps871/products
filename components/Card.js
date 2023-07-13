export default function Card({children, hideOnMobile, backgroundColor, roundedOnSmallScreen, roundedBottom}) {
    let hideOnMobileClass = hideOnMobile ? 'sm:block hidden' : ''
    let backgroundColorClass = backgroundColor == 'dark' ? 'bg-slate text-white' : 'bg-white';
    let roundedClass = roundedOnSmallScreen ? 'rounded-lg' : 'sm:rounded-lg'

    if (roundedBottom && !roundedOnSmallScreen) {
        roundedClass = 'rounded-b-lg'
    }

    return (
        <div className={`overflow-hidden p-4 sm:p-6 ${backgroundColorClass} ${hideOnMobileClass} ${roundedClass}`}>
            {children}
        </div>
    )
}