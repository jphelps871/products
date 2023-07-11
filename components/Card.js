export default function Card({children, hideOnMobile, backgroundColor, roundedOnSmallScreen}) {
    let hideOnMobileClass = hideOnMobile ? 'sm:block hidden' : ''
    let backgroundColorClass = backgroundColor == 'dark' ? 'bg-slate text-white' : 'bg-white';
    let roundedClass = roundedOnSmallScreen ? 'sm:rounded-lg' : 'rounded-lg'

    return (
        <div className={`overflow-hidden p-4 ${backgroundColorClass} ${hideOnMobileClass} ${roundedClass}`}>
            {children}
        </div>
    )
}