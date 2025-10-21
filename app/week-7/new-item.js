"use client"; //Allows the use of client-side features such as useState

import { useState } from "react"; //Import useState hook from React

export default function NewItem()
{
    const [quantity, setQuantity] = useState(1);         //State for quantity, initialized to 1
    const [name, setName] = useState("");                //State for name, initialized to an empty string
    const [category, setCategory] = useState("produce"); //State for category, initialized to "produce"

    //Category options for the dropdown
    const categories = [
        { value: "Produce", label: "Produce" },
        { value: "Dairy", label: "Dairy" },
        { value: "Bakery", label: "Bakery" },
        { value: "Meat", label: "Meat" },
        { value: "Frozen Foods", label: "Frozen Foods" },
        { value: "Canned Goods", label: "Canned Goods" },
        { value: "Dry Goods", label: "Dry Goods" },
        { value: "Beverages", label: "Beverages" },
        { value: "Snacks", label: "Snacks" },
        { value: "Housegold", label: "Household" },
        { value: "other", label: "Other" }
    ];

    //Function to increment quantity
    const increment = () => 
    {   
        if (quantity === 20) return; //Prevents quantity from exceeding 20
        setQuantity(quantity + 1);
    }; 

    //Function to decrement quantity
    const decrement = () => 
    {   
        if (quantity === 1) return; //Prevents quantity from going below 1
        setQuantity(quantity - 1);
    };

    //Function to handle form submission
    const handleSubmit = (event) =>
    {
        event.preventDefault(); //Prevents default form submission behavior
        //creates an item object with the current state values
        const item = 
        {
            name: name,
            quantity: quantity,
            category: category
        };
        console.log(item); //Logs the item object to the console
        alert(`Item added: ${item.name} \nQuantity: ${item.quantity} \nCategory: ${item.category}`); //displays an alert with the item details
        //Resets the form fields to their initial states
        setName("");
        setQuantity(1);
    setCategory("produce");
    }


    return (
        <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="mb-2 block font-semibold text-gray-700" htmlFor="name">Item Name:</label>
                    <input
                        type="text"
                        required
                        placeholder = "e.g., milk, 4 L 🥛"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} //Arrow function to update name state on input change
                        className="mb-3 block w-full rounded-md border-2 border-black p-2 placeholder-gray-300 text-black mb-8"
                    />
                    <p className="mb-3 text-xl font-semibold text-gray-800">
                        Quantity: <span className="text-green-600">{quantity}</span>
                    </p>
                    <div className="flex items-center gap-3">
                        <button type="button" className="rounded-md px-4 py-2 font-bold text-black bg-gray-300 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400" disabled={quantity === 1} onClick={decrement}>-</button>
                        <button type="button"className="rounded-md px-4 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300" disabled={quantity === 20} onClick={increment}>+</button>
                    </div>
                    <p className="mt-2 text-xs text-gray-600">Allowed range 1-20</p>
                    <label className="mb-2 mt-4 block font-semibold text-gray-700" htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} //Arrow function to update category state on selection change
                        className="mb-3 block w-full rounded-md border-2 border-black p-2 text-black mb-2"
                    >
                        {categories.map((category) => ( //Neat trick using map to create the options dynamically instead of hardcoding them
                            <option key={category.value} value={category.value}>{category.label}</option>
                        ))}
                    </select>
                    <button type="submit" className="mt-4 w-full rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700">Add Item</button>
                </form>
            </div>
        );
}
