import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useState,useEffect } from 'react';
import {CryptoState} from "../CryptoContex";
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { LinearProgress, Typography, makeStyles ,Button} from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import {numberWithCommas} from "../components/CoinsTable";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";


const Coinpage = () => {
 const{id} = useParams();
 const[coin,setCoin] = useState();
 const{currency,symbol,user,watchlist,setAlert} = CryptoState();

 const fetchCoin = async() =>{
  const{data} = await axios.get(SingleCoin(id));

  setCoin(data);
 };
//console.log(coin);

  useEffect(() => {
  fetchCoin(); 
 },[]);


 const useStyles = makeStyles((theme) => ({
  container:{
    display: "flex",
    [theme.breakpoints.down("md")]:{
      flexDirection:"column",
      alignItems: "center",
    },

  },

  sidebar:{
    width:"30%",
    [theme.breakpoints.down("md")]:{
      width: "100%",
    },
    display:"flex",
    flexDirection:"column",
    alignItems :"center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },

  heading:{
      fontWeight :"bold",
      marginBottom: 20,
      fontFamily: "Montserrat",   
  },


  description:{
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },

  marketData:{
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    // To make it responsive we use breakpoints.down
    // if screem is less than the medium screen display = flex and same with specified property
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    // if screen will be less than smaler screen than flexdireciton will be col
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },

    // if screen will be less than much smaller it will align to the left
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },


 }));

 const inWatchlist = watchlist.includes(coin?.id);
const addToWatchlist =async () =>{
  const coinRef = doc(db,"watchlist",user.uid);

  try{
      await setDoc(coinRef,
        {coins:watchlist?[...watchlist,coin.id]:[coin?.id],
        });

        setAlert({
          open: true,
          message: `${coin.name} Added to the Watchlist !`,
          type: "success",
        });
  
        
        
  }catch(error){
    setAlert({
      open: true,
      message: error.message,
      type: "error",
    });
  }
  
};

const removeFromWatchlist =  async () =>{
  const coinRef = doc(db,"watchlist",user.uid);

  try{
      await setDoc(coinRef,{
        coins:watchlist.filter((watch) => watch !== coin?.id),
       },
         {merge : "true"}
        );

        setAlert({
          open: true,
          message: `${coin.name} Removed from the Watchlist !`,
          type: "success",
        });
  
        
        
  }catch(error){
    setAlert({
      open: true,
      message: error.message,
      type: "error",
    });
  }
}

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
       {user &&(
          <Button
          variant="outlined"
          style={{
            width: "100%",
            height: 40,
            backgroundColor: inWatchlist ? "#ff0000" :"#EEBC1D",
          }}

          onClick={inWatchlist ? removeFromWatchlist:addToWatchlist}
          >
            {inWatchlist? "Remove from Watchlist":"Add to Watchlist"}
        </Button>
       )}

        </div>
      </div>
      {/* chart info */}
      <CoinInfo coin={coin} />
    </div>
  );
};


 export default Coinpage;













