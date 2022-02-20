import { Switch, Route, Link } from "react-router-dom";
import {useState,useEffect} from "react";
import {Login} from "./Login.js"
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import './App.css';
import { Url } from "./Url";
import { Signup } from "./Signup";
import { Activation } from "./Activation";
import { useParams} from "react-router";

function App() {
  const display = localStorage.getItem("token");
  
 
  return (
   
    <div >
       <AppBar position="static"> 
      <ul className="appbar">
        <li>
          <Link to="/"><Button variant="text" style={{color:"white"}}>Home</Button></Link>
        </li>
        {display ? (
          <div className="appbar">
            <li>
              <Link to="/url"><Button variant="text" style={{color:"white"}}>URL SHORTENER</Button></Link>
            </li>
            <li>
              <Link to="/logout"><Button variant="text" style={{color:"white"}}>Logout</Button></Link>
            </li>
          </div>
        ) : (
          <div className="appbar">
          <li>
            <Link to="/Login"><Button variant="text" style={{color:"white"}}>Login</Button></Link>
          </li>
           <li>
           <Link to="/Signup"><Button variant="text" style={{color:"white"}}>Signup</Button></Link>
         </li>
         </div>
        )}
      </ul>
      </AppBar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route exact path="/Signup">
          <Signup />
        </Route>
        <Route exact path="/activate/:token/:username">
          <Activation />
        </Route>
        <Route exact path="/s/:short">
          <Short />
        </Route>
        <Route exact path="/url">
          <Url />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>  
      </Switch>
    </div>
    
  );
}

export default App;

function Home(){
  return(
    <div style={{textAlign:"center"}}>Welcome to URL shortnener app</div>
  );
}

function Logout() {
  localStorage.removeItem("token");
  
  return (
    <div style={{textAlign:"center"}}>
      <h1>Login to continue.</h1>
      <p>If you dont see the Login option try refreshing the page</p>
    </div>
  );
}

function Short(){
  const {short}=useParams();
  console.log(short);
  const [ourl,setourl]=useState("");
  const getleads=()=>{fetch("https://url-shortener-s.herokuapp.com/s", {
    method: "POST",
    body: JSON.stringify({short}),
    headers: { "Content-Type": "APPLICATION/JSON" },
  })
 .then((response) => {return response.json()})
    .then((mvs) => {console.log(mvs.url,"hi")
      window.location.replace(`${mvs.url}`) 
    })};
    useEffect(getleads,[]);
  
  return (
    <div className="Redirecting">
      <h>Redirecting</h>
    </div>
  )
}
