import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../Firebase/firebaseConfig";

export const AppContext = createContext();

export const EditorProvider = ({ children }) => {
  const [savedNews, setSavedNews] = useState([]);

  //Funcion para traer datos del firestore, no la use
  const fetchNews = async () => {
    const querySnapshot = await getDocs(collection(db, "ReactNewsHub"));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push(doc.data());
    });
    setSavedNews(documents);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <AppContext.Provider
      value={{
        savedNews,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
