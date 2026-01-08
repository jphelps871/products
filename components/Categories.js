import Card from "./Card";
import Button from "./Button";
import { useState } from "react";
import Link from "next/link";

export default function Categories({ categories, onClick }) {
  const [activeBtnName, setActiveBtnName] = useState("All");

  // Add 'All' category to categories array
  let updatedCategories = [{ id: 0, name: "All" }, ...categories];

  function handleActiveBtn(e) {
    setActiveBtnName(e.target.innerText);
  }

  return (
    <Card tailwindStyles={"sm:block bg-white rounded-lg"}>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold text-md text-dark-grey">Categories</h3>
        <div>
          <Link href="/categories?operation=update" className="underline text-sm text-dark-blue hover:text-light-blue">
            Edit
          </Link>
          <span className="mx-1 inline-block">|</span>
          <Link href="/categories?operation=create" className="underline text-sm text-dark-blue hover:text-light-blue">
            Add
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {updatedCategories.map((category) => (
          <div key={category.id} onClick={onClick}>
            <Button value={category.name} active={category.name == activeBtnName} handleActiveBtn={handleActiveBtn} />
          </div>
        ))}
      </div>
    </Card>
  );
}
