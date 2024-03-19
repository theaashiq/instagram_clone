import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "./firebase";

export const useFetchCollection = (fbcollection) => {
    
    const [userDocuments, setUserDocuments] = useState(null)

    useEffect(() => {
        let collectionRef = collection(db, 'userDetails')
        const unsub = onSnapshot(collectionRef, (snapshot) => {
            let result = []

            snapshot.docs.forEach((doc) => {
                result.push({...doc.data(),id:doc.id})
            })
            setUserDocuments(result)
        })

        return () => unsub()
    },[])

    return {userDocuments}

}