"use client"; //Allows the use of client-side features such as useState

import { useState } from "react"; //Import useState hook from React

export default function NewItem()
{
    const [quantity, setQuantity] = useState(1); //State for quantity, initialized to 1

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

    return (
        <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xl font-semibold text-gray-800">
            Quantity: <span className="text-green-600">{quantity}</span>
        </p>
        <div className="flex items-center gap-3">
            <button className="rounded-md px-4 py-2 font-bold text-black bg-gray-300 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400" disabled={quantity === 1} onClick={decrement}>-</button>
            <button className="rounded-md px-4 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300" disabled={quantity === 20} onClick={increment}>+</button>
        </div>
        <p className="mt-2 text-xs text-gray-600">Allowed range 1-20</p>
        </div>
    );

}
