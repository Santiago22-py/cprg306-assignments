"use client"

import ShoppingListItem from "./item";
import {useState} from "react";

export default function ShoppingList({items, onItemSelect})
{   
   
    const [sortBy, setSortBy] = useState("name"); //State for sorting, initialized to "name"  

    //Functions to handle sorting
    const handleSortByName = () => setSortBy("name");
    const handleSortByCategory = () => setSortBy("category");

    //Sort items based on name
    const myCompare = (a, b) => 
    {
        if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -1;
        if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return 1;

        //Force sorting by name, if the primary sort is the same
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;

        return 0;
    };

    const sortedItems = [...items].sort(myCompare);

    //Function to get the button class based on the current sorting state (Avoid the spaghetti code I had at first)
    const getButtonClass = (buttonType) =>
    {
        const activeClass = "px-3 py-1 rounded border text-sm transition-colors bg-blue-600 text-white border-blue-600";
        const inactiveClass = "px-3 py-1 rounded border text-sm transition-colors bg-white text-gray-800 border-gray-300 hover:bg-gray-300";
        return sortBy === buttonType ? activeClass : inactiveClass;
    }
    

    return (
        <div>
            {/* Sorting buttons */}
            <div className="flex items-center gap-2 mb-4 py-4">
                <p>Sort by:</p>
                <button className={getButtonClass("name")} onClick={handleSortByName}>Name</button>
                <button className={getButtonClass("category")} onClick={handleSortByCategory}>Category</button>
            </div>

            {/* Shopping list */}
            <ul>
                {sortedItems.map((item) => 
                (
                    <ShoppingListItem 
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                        onSelect={() => onItemSelect(item)}
                    />
                ))}
            </ul>
        </div>
  );
}