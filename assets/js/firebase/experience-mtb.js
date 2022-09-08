import { collection, doc, getDoc, getDocs, getFirestore, setDoc, query, where } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";
import app from './app.js';

export async function subscribeToExperienceMtb(subscription, ID) {
    const db = getFirestore(app)
    const expereinceMTBCollection = collection(db, 'experience-mtb')
    // const docRef = await addDoc(expereinceMTBCollection, subscription) // ID Aleatório
    const docRef = await setDoc(doc(expereinceMTBCollection, ID), subscription);
    return docRef;
}

export async function getExperienceMtbdocs(uid) {
    const db = getFirestore(app)
    const docRef = doc(db, "experience-mtb", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
export async function getExperienceMtbdocsID() {
    const db = getFirestore(app)
    const expereinceMTBCollection = collection(db, 'experience-mtb')
    // Get a list of cities from your database
    const experienceMtbSnapshot = await getDocs(expereinceMTBCollection);
    const docsID = experienceMtbSnapshot.docs.map(doc => doc.id);
    return docsID;
}
export function getStorageImage() {
    const storage = getStorage(app);
    console.log(storage)
    const storageRef = ref(storage);
    return storage;
}
export async function getCollection(documento) {
    const db = getFirestore(app)
    const expereinceMTBCollection = collection(db, 'experience-mtb')
    const documentoQuery = query(expereinceMTBCollection, where("documento", "==", documento));
    const querySnapshot = await getDocs(documentoQuery);
    const docsData = querySnapshot.docs.map(doc => doc.data());
    // querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     return doc.data();
    // });
    return docsData;
}
