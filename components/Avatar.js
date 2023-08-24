export default function Avatar({imgUrl}) {
    return (
        <div className='rounded-full w-12 h-12  sm:w-14 sm:h-14 overflow-hidden'>
            <img referrerPolicy="no-referrer" src={`${imgUrl ? imgUrl : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80'}`} alt="avatar img" />
        </div>
    )
}