import Card from "./Card";
import Button from "./Button";
import { useState } from "react";

export default function Categories({ categories, onClick }) {
  const [activeBtnName, setActiveBtnName] = useState("All");

  // Add 'All' category to categories array
  let updatedCategories = [{ id: 0, name: "All" }, ...categories];

  function handleActiveBtn(e) {
    setActiveBtnName(e.target.innerText);
  }

  return (
    <Card tailwindStyles={"sm:block bg-white rounded-lg"}>
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
