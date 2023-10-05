import {Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import Carousel from './Banner/Carousel';
const useStyles = makeStyles(() =>({
     banner:{
        backgroundImage: "url(./banner.jpg)" ,

     },
     bannerContent:{
        height:400,
        display: "flex",
        flexDirection: "column",
        paddingTop:25,
        justifyContent:"space-around",
     },
     tagline:{
         display: "flex",
         heigth: "40%",
         flexDirection: "column",
         justifyContent: "Center",
         textAlign: "center",
     },
}));
const Banner = () => {
    const classes = useStyles();
  return <div className= {classes.banner}>
    <Container className = {classes.bannerContent}>
                   <div className={classes.tagline}>
                       <Typography
                        variant ="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom:15,
                            color:"gold",
                            fontFamily:"Montserrat",
                        }}
                        >
                            CryptoPulse
                       </Typography>

                       <Typography
                        variant = "subtitle2"
                        style ={{
                            color:"darkgrey",
                            textTransform:"capitalize",
                            fontFamily:"Montserrat",
                        }}
                        >
                        Explore insights about your preferred crypto coins.

                       </Typography>
                   </div>
                 <Carousel/>
    </Container>           
    </div>
  
}

export default Banner
