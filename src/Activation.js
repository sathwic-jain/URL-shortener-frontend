import {useParams} from "react-router-dom";
import {useState} from "react";

export function Activation() {
    const {token,username}=useParams();
    const [status,setStatus]=useState(0);
    console.log(token,",",username);
 
    fetch("https://url-shortener-s.herokuapp.com/activate", {
        method: "POST",
        body: JSON.stringify({token,username}),
        headers: { "Content-Type": "APPLICATION/JSON" },
      })
        .then((response) => {
          if (response.status === 401) setStatus(401);

          return response.json();
        })
    
        
        return (
          
          (status===200)?
            (<div>   
        ACTIVATED</div>):(status===401)?(<div>Unable to activate</div>):("")
        
              
  );
}
