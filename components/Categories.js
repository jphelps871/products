import Card from "./Card"
import Button from "./Button"

export default function Categories({categories}) {
    return (
        <Card tailwindStyles={'sm:block bg-white rounded-lg'}>
            <div className="flex flex-wrap gap-3">
                <Button value={'All'} active={true}/>
                {categories.map(category => (
                    <Button key={category.id} value={category.name} active={false}/>
                ))}
            </div>
        </Card>
    )
}