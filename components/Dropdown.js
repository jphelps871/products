export default function DropDown() {
    return (
        <select className="bg-transparent font-bold cursor-pointer" name="cars" id="cars">
            <option value="volvo">Most Upvotes</option>
            <option value="saab">Least Upvotes</option>
            <option value="mercedes">Most Comments</option>
            <option value="audi">Least Comments</option>
        </select> 
    )
}