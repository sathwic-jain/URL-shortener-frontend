import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export function Url() {
  const [status, setStatus] = useState(0);
  const [surl, setsurl] = useState("");
  const token=localStorage.getItem("token");
  const { handleChange, handleBlur, handleSubmit, values } = useFormik({
    initialValues: { url: surl },
    onSubmit: () => {
      console.log(values);
    },
  });
if(!token){
  return(
    <div>
      Login to use Url shortener.(Refresh the page)
    </div>
  )
}else{
  return (
    <div className="url-shortener">
      <form onSubmit={handleSubmit}>
        <TextField fullWidth 
          variant="outlined"
          label="URL"
          style={{ margin: 10, marginTop: 20 }}
          type="url"
          id="url"
          name="url"
          placeholder="Enter the url "
          value={values.url}
          onChange={handleChange}
          onBlur={handleBlur}
        />
  <div className="button">
        <Button 
          variant="contained"
          type="submit"
          onClick={() => {
            fetch("https://url-shortener-s.herokuapp.com/get-url", {
              method: "POST",
              body: JSON.stringify(values),
              headers: { "Content-Type": "APPLICATION/JSON" },
            })
              .then((response) => {
               
                return response.json();
              })
              .then((data) => {
                console.log(data.short, "got this here");

                setsurl(data.short);
                setStatus(200);
               
                return data.short;
              });
          }}
        >
          Shorten
        </Button>
        </div>
        
        {status === 200 ? (
          <Call short={surl} />
        ) : (
          <div>
            <p style={{ textAlign: "center" }}>Shortened url appears here</p></div>
        )}
      </form>
    </div>
  );
        }
}

function Call({ short }) {
 
  return <div ><p style={{ textAlign: "center" }}>{short}</p></div>;
}
