"use client";

import { useEffect, useState } from "react";

//function to fetch meal ideas based on the given ingredient
async function fetchMealIdeas(ingredient) 
{
    // Return early if ingredient is empty
    if (!ingredient || ingredient.trim() === "") {
        return [];
    }
    
    //Smugly copied from the demo site on github
    try
    {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        if (!response.ok)
        {
            throw new Error(`HTTP Error! status ${response.status}\n ${response.message}`);
        }
        const data = await response.json();
        return data.meals ?? []; //Return the meals array or an empty array if no meals found
    }
    catch (error)
    {
        console.error("Error fetching meal ideas:", error);
        return []; //Return an empty array in case of error
    }
}

export default function MealIdeas({ingredient}) 
{
    const [meals, setMeals] = useState([]); //State to hold meal ideas, initialized to an empty array

    //Use useEffect to fetch meal ideas when the component mounts or when the ingredient changes
    useEffect(() => 
    {
        async function loadMealIdeas()
        {   
            const data = await fetchMealIdeas(ingredient); // Wait for the data
            setMeals(data); // Then update the state
        }

        loadMealIdeas();
    }, [ingredient]); // ingredient is the only dependency needed


    // Return placeholder message if ingredient is empty
    if (!ingredient || ingredient.trim() === "") {
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">Meal ideas (select an item)</h2>
                <p>Choose an item to see ideas.</p>
            </div>
        );
    }
    // Otherwise, display the meal ideas (if any)
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Meal Ideas for &quot;{ingredient}&quot;</h2>
            {meals.length === 0 ?  
            (
                <p>No meals found.</p>
            ) : 
            (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {meals.map((meal) => (
                        <li className="border p-2 rounded" key={meal.idMeal}>{meal.strMeal}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}