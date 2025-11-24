import { db } from "../../utils/firebase";
import { collection, query, addDoc, getDocs } from "firebase/firestore";

//Function that retrieves all itmes for a specific user from Firestore
export async function getItems(userId) {
  const items = []; //Array to hold the retrieved items

  //Tries to retrieve items from Firestore
  try {
    //Reference to the items subcollection for the specific user
    const itemsRef = collection(db, "users", userId, "items");

    //Query to get all documents in the items subcollection
    const itemsSnap = await getDocs(itemsRef);

    //For each document, add an object with id and data to the items array
    itemsSnap.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items; //Return the array of items
  } catch (error) {
    //In case of error, log it and return empty array
    console.error("Error getting items: ", error);
    return items; //Return empty array on error
  }
}

//Function to add a new item to a specific user's shopping list in Firestore
export async function addItem(userId, item) {
  //Tries to add the item to Firestore
  try {
    //Reference to the items subcollection for the specific user
    const itemsRef = collection(db, "users", userId, "items");

    //Add the new item document to the items subcollection
    const docRef = await addDoc(itemsRef, item);
    //Return the ID of the newly added document
    return docRef.id;
  } catch (error) {
    //In case of error, log it
    console.error("Error adding item: ", error);
    return null; // Return null or handle the error as needed
  }
}
