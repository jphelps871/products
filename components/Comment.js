import Avatar from '@/components/Avatar'

export default function Comment({comment}) {
    return (
        <div className='flex gap-3 mt-5 mb-8'>
            <div>
                <Avatar/>
            </div>
            <div className='grow mb-4'>
                <div className='flex justify-between'>
                    <div className='mb-5'>
                        <p className='font-bold text-dark-grey text-md'>
                            {comment.user}
                        </p>
                        <p className='text-light-slate text-sm'>
                            @{comment.username}
                        </p>
                    </div>
                    <a className='text-sm font-bold text-dark-blue hover:underline cursor-pointer'>
                        Reply
                    </a>
                </div>
                <p className='text-light-slate'>
                    {comment.comment}
                </p>
            </div>
        </div>
    )
}