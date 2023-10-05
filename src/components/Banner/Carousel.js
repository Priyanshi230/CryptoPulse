import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react'
import {useState} from 'react';
import axios from 'axios';
import {CryptoState} from "../../CryptoContex";
import { TrendingCoins } from '../../config/api';
import AliceCarousel from 'react-alice-carousel';
import {Link} from "react-router-dom";
//import {numberWithCommas} from "../CoinsTable";

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems:"center",
    }, 
}));

// regex string to bring comma between number
export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g , " ");
}
const Carousel = () => {
    const[trending,setTrending] = useState([]);
    
    
    
   

    const{currency,symbol} = CryptoState();
       // fetch the data of trending coins
    const fetchTrendingCoins =async () =>{
      const{data} = await axios.get(TrendingCoins(currency));
      setTrending(data);

      
    };

    console.log(trending);
    // call the fetchTrendingCoins function when our component is rendered first time
    useEffect(() =>{
        fetchTrendingCoins();
    },[currency]);
    
    const useStyles = makeStyles((theme) => ({
        carousel: {
          height: "50%",
          display: "flex",
          alignItems: "center",
        },
        carouselItem: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        },
      }));


       
      const classes = useStyles();
    const items =trending.map((coin) =>{
    // price_change_percentage_24h is taken from the api data that is coming
      let profit = coin.price_change_percentage_24h >= 0;
        return(
            <Link
            className={classes.carouselItem} to={`/coins/${coin.id}`}>
          <img
           src ={coin?.image}
           alt={coin.name}
           height="80"
           style={{marginBottom: 10}}
          />
              {/* span tag will contain the symbol of the coin */}
          <span>{coin?.symbol}
              &nbsp;
              <span
               style={{
                //if profit display green color else dispaly red color
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
              >
                {/* to sow change in % */}
          {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(3)}
              </span>
            </span>
         

         {/* span for displaying the pricee */}

        <span style={{fontSize:22,fontWeight:500}}>
            {symbol}{numberWithCommas(coin?.current_price.toFixed(3))}



        </span>

            </Link>
        )
    })

    const responsive ={
        0:{
            items:2,
        },
        512:{
            items:4,
        },
    };
  return <div className={classes.carousel}>
  <AliceCarousel
    mouseTracking
    infinite
    autoPlayInterval={1000}
    animationDuration={1500}
    disableDotsControls
    disableButtonsControls
    responsive={responsive}
    autoPlay
    items={items}
  />
</div>
}; 


export default Carousel;
