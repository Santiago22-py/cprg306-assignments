//The ShoppingList componant accepts "name", "quantity" and "category" and "onSelect" as props and displays them in a list element.
export default function Item({
  name,
  quantity,
  category,
  onSelect,
}) {
  return (
    <li id="Shopping list">
      <div>
        <ul
          className="border p-2 rounded mb-2 hover:bg-gray-700 duration-2000 hover:rotate-360"
          onClick={onSelect}>
          <li>{name}</li>
          <li>Quantity: {quantity}</li>
          <li>Category: {category}</li>
        </ul>
      </div>
    </li>
  );
}
