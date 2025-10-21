//The ShoppingList componant accepts "name", "quantity" and "category" as props and displays them in a list element.
export default function ShoppingListItem({ name, quantity, category }) 
{
    return (
    <li id = "Shopping list">
        <div>
            <ul className="border p-2 rounded mb-2">
                <li>{name}</li>
                <li>Quantity: {quantity}</li>
                <li>Category: {category}</li>
            </ul>
        </div>
    </li>
    );
}