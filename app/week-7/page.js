"use client";

import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";

//Load the data from the JSON file
import itemsData from "./item.json";

export default function Page() {
  // Initialize state with the imported JSON data
  const [items, setItems] = useState(itemsData);

  //Event handler for adding an item
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]); //Passes the old items and adds the new item to the list
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}
