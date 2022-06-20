import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import swal from "sweetalert";
import validator from 'validator'


const ProfilePage = () => {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [ErrorPasswordStrong, setErrorPasswordStrong] =useState("")
  const [ErrorStrong, setErrorStrong] =useState("")
  const [errorInvalidEmail, setErrorInvalidEmail] = useState("");

  const userLogin = () => {
    console.log("Login.....");
    var email = document.getElementById("form2Example1").value;
    var password = document.getElementById("form2Example2").value;
    if (email === undefined || email === "") {
      setErrorEmail("Please Enter Email");
    } else {
      setErrorEmail("");
      setErrorInvalidEmail("");
    }
    if (password === undefined || password === "") {
      setErrorPassword("Please Enter Password");

    } else {
      setErrorPassword("");
      setErrorStrong("")
      const userData = {
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:4000/api/v1/user/login", userData)

        .then((response) => {
          console.log("Response...", response);

          if (response.status === 200) {
            swal({
              title: "Login Successful",
              icon: "success",
            });
          } else {
            swal({
              title: "Login failure",
              icon: "error",
              buttons: {
                confirm: true,
              },
            });
          }
        })
        .catch((e) => {
          swal({
            title: "Login failure",
            icon: "error",
            buttons: {
              confirm: true,
            },
          });
        });
    }
  };
  const validateEmail = () => {
    var email = document.getElementById("form2Example1").value;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
      setErrorInvalidEmail("Invalid Email");
      setErrorEmail("");

      return false;
    }
    setErrorInvalidEmail("");

    return true;
  };

  const validate = (value) => {
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorStrong('Strong Password')
      setErrorPasswordStrong("");
      return false;
    } else {
     
      setErrorPasswordStrong('Not Strong Password')
      setErrorPassword("");
    }
  }

  return (
    <div class="card mb-5">
      <h1>Login</h1>
      <div class="alignform col-sm-4">
        <label class="form-label" for="form2Example1">
          Email address<span>*</span>
        </label>
        <input
          type="email" placeholder="Enter Email"
          onBlur={validateEmail}
          id="form2Example1"
          class="form-control"
        />
        <p className="error">{errorEmail}</p>
        <p className="error">{errorInvalidEmail}</p>
      </div>

      <div class="alignform col-sm-4">
        <label class="form-label" for="form2Example2">
          Password<span>*</span>
        </label>
        <input type="password" id="form2Example2" placeholder="Enter Password" class="form-control"  title="Password must be 8 characters including 1 uppercase letter, 1 lowercase letter ,  1 numeric character and 1 special character"  onChange={(e) => validate(e.target.value)}  />
        <p className="error">{errorPassword}</p>
         <p className="errorstrong">{ErrorStrong}</p>
         <p className="error">{ErrorPasswordStrong}</p>

         
      </div>

      <div class=" alignform row col-sm-4">
        <div class="col d-flex justify-content-center">
          <div class=" form-check">
            {/* <label class="form-check-label" for="form2Example31"> Remember me </label>
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        */}
          </div>
        </div>

        <div class="col">
          {/* <!-- Simple link --> */}
          {/* <a href="#!">Forgot password?</a> */}
        </div>
      </div>

      {/* <!-- Submit button --> */}
      <button
        type="button"
        id="signin"
        onClick={userLogin}
        class=" btn btn-primary btn-block col-sm-4"
      >
        Login
      </button>

      {/* Register buttons  */}
    </div>
  );
};

export default ProfilePage;
