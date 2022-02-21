import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export function Login() {
  const [status, setStatus] = useState(200);
  const history = useHistory();
  const { handleChange, handleBlur, handleSubmit, values } = useFormik({
    initialValues: { username: "", password: "" },

    onSubmit: () => {
      console.log(values);
    },
  });

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

          <Button
            variant="contained"
            type="submit"
            onClick={() => {
             
              fetch("https://url-shortener-s.herokuapp.com/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "APPLICATION/JSON" },
              })
                .then((response) => {
                  if (response.status === 401) setStatus(401);

                  return response.json();
                })

                .then((data) => {
                  if (data.token) {
                    localStorage.setItem("token", data.token);
                    history.push("/");
                    window.location.reload();
                  }
                });
            }}
          >
            Login
          </Button>
          <Button variant="contained" onClick={()=>history.push("/forgot")} style={{margin:15,marginBottom:20}}>Forgot password</Button>
          {status === 401 ? (
            <div>
              <p style={{ textAlign: "center" }}>
                Invalid credentials,Try again.
              </p>
              If you forgot your password,reset it through "Forgot password"
              button
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}
