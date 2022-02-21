import { useState } from "react";

export function Forgot() {
const [email,setemail]=useState("")  
const [status,setStatus]=useState(0);   
  return (
    <div className="Login">
      <form >
        <input
          type="username"
          id="username"
          placeholder="Enter your email-id"
          onChange={(event)=>setemail(event.target.value)} />
       
      </form>
      <button onClick={()=>{
           fetch("https://password-reset-flow-s.herokuapp.com/forgot", {
            method: "POST",
            body: JSON.stringify({username:email}),
            headers: { "Content-Type": "APPLICATION/JSON" },
          })
            .then((response) => {
              console.log(response.status);
              setStatus(response.status);
              return response.json(); 
            }).then((data)=>{console.log(data)
          console.log("hello")});
      }}>Submit</button>
      
      {(status===200)?(<p>Kindly check your email</p>):((status===401)?(<p>User not found</p>):(<p></p>))}
    </div>
  );
}
