import { fStorage } from "./index.js";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

export const getMaxId = async () => {
  const itemsRef = collection(fStorage, "beers");
  const fetchedItems = await getDocs(itemsRef);
  let maxId = 0;

  fetchedItems.forEach((doc) => {
    const id = parseInt(doc.id);
    if (!isNaN(id) && id > maxId) {
      maxId = id;
    }
  });

  return maxId;
};

export const loadUserById = async ({ userID }) => {
  const userRef = query(
    collection(fStorage, "users"),
    where("id", "==", userID || auth.currentUser.uid),
  );
  const fetchedUser = await getDocs(userRef);
  return (
    fetchedUser.docs.map((el) => {
      return { ...el.data() };
    })[0] || null
  );
};
export const setBeer = async ({ id, beer }) => {
  await setDoc(doc(fStorage, "beers", id), beer);
};

export const updateRating = async ({
  rating = 5,
  userId = "2",
  id = "1",
  prevRating = {},
  prevTotalRating = 0,
}) => {
  const numberOfRaters = Object.keys(prevRating).length;
  const newRatingItem = { [userId]: +rating };
  await updateDoc(doc(fStorage, "beers", id), {
    raters: { ...prevRating, ...newRatingItem },
    rating: (prevTotalRating * numberOfRaters + rating) / (numberOfRaters + 1),
  });
};

export const loadItems = async () => {
  const itemsRef = collection(fStorage, "beers");
  const fetchedItems = await getDocs(itemsRef);
  return fetchedItems.docs.map((el) => {
    return { ...el.data() };
  });
};
