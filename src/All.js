
import {useState,useEffect} from "react";
export function All() {
    const [url_data,setdata]=useState([]);
    const [status,setStatus]=useState(0);
   const geturl=()=>{ fetch("https://url-shortener-s.herokuapp.com/all", {
        method: "GET"
      })
        .then((response) => {
          if (response.status === 401) setStatus(401);
          else return response.json();
        })
        .then((data) => {
            console.log("hello");
            console.log(data)
            setdata(data);
            console.log(url_data)
          });
   }
   useEffect(geturl,[]);
  return (
    <div className="tabledisplay">
       Shortened URL LIST
       <table >
          <tr >
              <th>
                  Original URL
              </th>
              <th>
                  Shortened URL
              </th>
          </tr>
          {url_data && url_data.map((ele)=>{
              return(
              <tr>
              <td style={{borderRight:"10px"}}>
                  {ele.url}
              </td>
              <td>
                  {ele.short}
              </td>
              </tr>
          )})
          
}
       </table>
    </div>
  );
}
