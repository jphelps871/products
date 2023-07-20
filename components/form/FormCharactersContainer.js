export default function FormCharactersContainer({limit, count}) {
    return (
        <p className='text-form-text text-sm'>{limit - count} Characters left</p>
    )
}