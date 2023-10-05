import { BrowserRouter,Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';
import { makeStyles } from '@material-ui/core';
import Alert from './components/Alert';
function App() {

  const useStyles = makeStyles(() => ({
  App: {
             background: "#14161a",
             color:"white",
             minHeight: "100vh",

  },
  }));
      const classes = useStyles()

  return (
   <BrowserRouter>
    <div className ={classes.App}>
      <Header/> 
      {/* exact keyword is used so that it goes exactly to that psth */}
      <Route path ='/' component={Homepage} exact/>
      <Route path ='/coins/:id' component={Coinpage}/>
    </div>
    <Alert/>
   </BrowserRouter>
  );
      
}

export default App;
