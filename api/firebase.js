import {
  EmailAuthProvider,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getAllEntriesOfUser = async (uid) => {
  if (uid) {
    const userEntriesRef = collection(db, uid);
    const q = query(userEntriesRef);
    try {
      const querySnapshot = await getDocs(q);
      const entries = [];

      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() });
      });

      return entries;
    } catch (error) {
      console.error("Error getting documents: ", error);
      return [];
    }
  }
};

export const saveDailyEntry = async (userId, results, structuredResults) => {
  const today = new Date().toISOString().split("T")[0];
  const entry = {
    timestamp: new Date(),
    results: results,
    structuredResults: structuredResults,
  };

  const docRef = doc(db, userId, today);

  try {
    await setDoc(docRef, entry);
    console.log("Entry saved successfully");
  } catch (error) {
    console.error("Failed to save entry in DB:", error);
    throw error;
  }
};

/**
 * Deletes a daily entry for a given user based on the entry's date (document ID).
 *
 * @param {string} userId - The user's ID.
 * @param {string} entryDate - The date of the entry to delete, formatted as YYYY-MM-DD.
 */

export const deleteUserEntryByDate = async (userId, entryDate) => {
  const docRef = doc(db, userId, entryDate);

  try {
    await deleteDoc(docRef);
    console.log("Entry deleted successfully");
  } catch (error) {
    console.error("Failed to delete entry:", error);
    throw error;
  }
};

/**
 * Deletes all documents within a given user's collection.
 *
 * @param {string} userId The ID of the user whose collection should be deleted.
 */

export const deleteAllUserEntries = async (userId) => {
  const userCollectionRef = collection(db, userId);
  const q = query(userCollectionRef);

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    console.log("All entries deleted successfully");
  } catch (error) {
    console.error("Error deleting user entries:", error);
    throw error;
  }
};

/**
 * Deletes the currently signed-in user from Firebase Authentication.
 *
 *  @param {string} userId The ID of the user whose account should be deleted.
 */

export const deleteAccount = async (email, password) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is currently signed in.");
    return;
  }

  // Re-authenticate the user
  const credential = EmailAuthProvider.credential(email, password);
  try {
    await reauthenticateWithCredential(user, credential);
    await deleteAllUserEntries(user.uid);
    await deleteUser(user);
    console.log("User account deleted successfully.");
  } catch (error) {
    console.error("Error during re-authentication or account deletion:", error);
  }
};

export const updateUserSettings = async (userId, language) => {
  const settings = {
    language: language,
    subscription: "free",
  };

  const userDocRef = doc(db, "Users", userId);

  try {
    await setDoc(userDocRef, settings, { merge: true });
  } catch (error) {
    console.error("Failed to update user settings in DB:", error);
    throw error;
  }
};

export const fetchUserSettings = async (userId) => {
  const userSettingsRef = doc(db, "Users", userId);

  try {
    const docSnap = await getDoc(userSettingsRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch user settings from DB:", error);
    throw error;
  }
};
