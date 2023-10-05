import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import {createContext} from 'react';
import axios from 'axios';
import { CoinList } from './config/api';
import { onAuthStateChanged } from 'firebase/auth';
import {auth,db} from "./firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const Crypto = createContext();
const CryptoContex = ({children}) => {
const[currency,setCurrency] = useState("INR")
const[symbol,setsymbol] = useState("₹")
 const[coins,setCoins] = useState();
 const[loading,setLoading] = useState(false);  
 const[user,setUser] = useState(null);
 const[watchlist,setWatchlist] = useState([]);

 const[alert,setAlert] = useState({
  open: false,
  message : "",
  type : "success",
 });

useEffect(() =>{
 if(user){
   const coinRef = doc(db,"watchlist",user.uid);

  var unsubscribe = onSnapshot(coinRef,coin =>{
    if(coin.exists()){
      setWatchlist(coin.data().coins);
    }
    else{
      console.log("No Items in WatchList")
    }
   });

   return () => {
    unsubscribe();
   }

 }
},[user])

 useEffect(() =>{
   onAuthStateChanged(auth,user=>{
    if(user) setUser(user);
    else setUser(null);


    console.log(user);
   });
 },[])
 const fetchCoins = async() =>{
  setLoading(true);
  const{data} = await axios.get(CoinList(currency));

  setCoins(data);
  setLoading(false);
 };
 

 
  useEffect(() => {
    if(currency === "INR") setsymbol("₹");
    else if(currency === "USD") setsymbol("$");
  },[currency]);
  return (
    <Crypto.Provider value ={{currency,symbol,setCurrency,coins,loading,fetchCoins,alert,setAlert,user,watchlist}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContex;

export const CryptoState =() =>{
    return useContext(Crypto);
};

