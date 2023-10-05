import { AppBar, MenuItem, Select, Toolbar, Typography, makeStyles , Container} from '@material-ui/core'
import {ThemeProvider } from '@material-ui/core/styles'
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import {createTheme} from  '@material-ui/core';
import { CryptoState } from '../CryptoContex';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';
const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },
}));

const Header = () => {
    const classes = useStyles();

    const history = useHistory();
    const {currency,setCurrency,user} = CryptoState();
    
    const darkTheme = createTheme({
        palette:{
            primary:{
                main: "#fff",
            },
            type: "dark",
        },
    });
  return (
    <ThemeProvider theme ={darkTheme}>
    <AppBar color ="transparent" position ="static">
           <Container>
             <Toolbar>
                {/* onclick used to redirect to home page  */}
                <Typography onClick={()=> history.push("/")} className= {classes.title}
                varient='h6'
                >CryptoPulse</Typography>
                <Select variant="outlined"
                 style={{
                  
                    width: 100,
                    height:40,
                    marginRight:15,
                    
                }}
                    value ={currency}
                    onChange={(e) =>setCurrency(e.target.value)}
                    >
                    <MenuItem value ={"USD"}>USD</MenuItem>
                    <MenuItem value ={"INR"}>INR</MenuItem>
                </Select>
               {user ? <UserSidebar/> : <AuthModal/>}
              </Toolbar>
           </Container>
        </AppBar>
    </ThemeProvider>
  );
};

export default Header;
