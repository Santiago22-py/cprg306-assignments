"use client";

import { useState } from 'react';
import { useUserAuth } from '../../contexts/AuthContext'; //New import for authentication
import ShoppingListItem from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas.js';

//Load the data from the JSON file
import itemsData from "./item.json";

//Function to clean the item name for use as an ingredient
function cleanItemName(itemName) {
  // Remove emojis and other non-ASCII characters
  let cleaned = itemName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
  
  // Remove content after comma (size/weight information)
  cleaned = cleaned.split(',')[0];
  
  // Remove content after space followed by numbers (e.g., "1 kg", "2 lb")
  //cleaned = cleaned.replace(/\s*\d+\s*(kg|g|lb|oz|pieces?).*$/i, '');
  
  // Trim any extra whitespace
  return cleaned.trim();
}


export default function Page() {

  // Initialize state with the imported JSON data
  const [items, setItems] = useState(itemsData);
  // State for the selected item name
  const [selectedItemName, setSelectedItemName] = useState('');

  const { user } = useUserAuth(); 

  //Event handler for adding an item
  const handleAddItem = (newItem) => 
    {
    setItems((prevItems) => [...prevItems, newItem]); //Passes the old items and adds the new item to the list
    }
  //Event handler for selecting an item
  const handleItemSelect = (item) => 
    {
    const cleanedName = cleanItemName(item.name);
    setSelectedItemName(cleanedName);
    }

//If not authenticated, prompt to log in
if (!user)
{
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-red-400 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-widest uppercase">
          You are not authorized to view this list.
        </h1>
        <p className="mb-8 text-lg">
          These are not the groceries you’re looking for. 
        </p>
        <p className="mb-8 text-lg">
          Only a sith deals in absolutes. Please login to access your shopping list.
        </p>
        <a
          href="/week-9"
          className="mt-10 rounded-md bg-green-400 px-6 py-3 font-bold text-black hover:bg-green-300 transition"
        >
          Click here to return to the light side.
        </a>
        <a
          href="https://www.youtube.com/watch?v=rEq1Z0bjdwc"
          className="mt-10 rounded-md bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-300 transition"
        >
          Click here.
        </a>
        <p>If you do not fear the dark side as I do</p>
      </div>
  );
}

return (
    <main className="p-4 max-w-6xl mx-auto"> {/* Increased max-width to accommodate two columns */}
      <h1 className="text-2xl font-bold mb-6">Shopping List</h1>
      
      {/* Flex container for two-column layout */}
      <div className="flex gap-8">
        {/* Left column - Shopping List */}
        <div className="flex-1">
          <NewItem onAddItem={handleAddItem} />
          <ShoppingListItem 
            items={items} 
            onItemSelect={handleItemSelect} // Pass the handler to ItemList
          />
        </div>
        
        {/* Right column - Meal Ideas */}
        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}