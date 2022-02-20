import {useFormik} from "formik";
import {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";

const formValidationSchema = yup.object({
  password: yup
    .string()
    .required("Enter a valid password")
    .min(5, "Password too short"),
  username: yup.string().email("Invalid email").required("Enter your email-id"),
});

export function Signup() {
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: formValidationSchema,
    onSubmit: () => {
      console.log(values);
    },
  });
  const [status,setStatus]=useState(0);  
  return (
    <div className="outerLogin">
      <div className="Login">
        <form onSubmit={handleSubmit} className="Loginbox">
          <TextField
            variant="outlined"
            label="Email"
            style={{ margin: 10, marginTop: 20 }}
            type="username"
            id="username"
            name="username"
            placeholder="Enter your email "
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username ? <div>{errors.username}</div> : null}
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter the password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password ? (
          <div>{errors.password}</div>
        ) : null}
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
             
              fetch("https://url-shortener-s.herokuapp.com/signup", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "APPLICATION/JSON" },
              })
                .then((response) => {
                  if (response.status === 405) setStatus(405);
                  else if(response.status === 205) setStatus(205);
                  return response.json();
                })

            }}
          >
            Signup
          </Button>
          
          {(status === 405)?(
            <div>
              <p style={{ textAlign: "center" }}>
                You already exist with us.Try logging in
              </p>
              
            </div>
           ) :(status===205)?(
            <p style={{ textAlign: "center" }}>
              Kindly check your email to activate your account
              </p>
           ):("")}
          
        </form>
      </div>
    </div>
  );
}
