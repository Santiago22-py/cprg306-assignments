"use client";

import { useState } from 'react';
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