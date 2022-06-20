import { useState } from "react";
import { Link } from "react-router-dom";
import Form from '../../utilities/Forms';
import axios from "axios";
import swal from "sweetalert";
import './style.css';

// import logo from 'D:/React/Register-Login-Forgot/src/R001.png'; 

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword,setConfirmPassword]=useState('');
    const [MobileNumber,setMobileNumber]=useState('');
    const [Address,setAddress]=useState('');
    const [State,setState]=useState('');
    const [City,setCity]=useState('');
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    //This is the setshow hide
    // const [showMobileNo, setShowMobileNo] = useState(false);

    const validateRegister = () => {
        
        let isValid = true;
        
        let validator = Form.validator({
            name: {
                value: name,
                isRequired: true,
            },
            email: {
                value: email,
                isRequired: true,
                isEmail: true
            },
            password: {
                value: password,
                isRequired: true,
                minLength: 6
            },
            ConfirmPassword:{
                value: ConfirmPassword,
                isRequired: true,
                minLength: 6
            },
            MobileNumber:{
                value: MobileNumber,
                isRequired: true,
                minLength: 10
            },
            Address:{
                value: Address,
                isRequired: true,
            },
            State:{
                value: State,
                isRequired: true,
            },
            City:{
                value:City,
                isRequired:true,
            }

        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const register = (e) => {
        
        e.preventDefault();
        
        const validate = validateRegister();
        
        if (validate) {
            setValidate({});
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setMobileNumber('');
            setAddress('');
            setState('');
            setCity('');
             
            insertData();

        }
    }

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
    }
    
   


const insertData=()=> {
    alert("Data insert Process");
    const addData= { 
        'username': name,
        'email': email,
        'password':password,
        'confirmPassword':ConfirmPassword,
        'mobilenumber':MobileNumber,
        'address':Address,
        'city':City,
        'state':State
    };
    axios.post('http://localhost:4000/api/v1/user/signUp', addData)
    .then((response) => {
        console.log("Response...", response);

        if (response.status === 200) {
          swal({
            title: "SignUp Successful",
            icon: "success",
          });
        } else {
          swal({
            title: "SignUp failure",
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

    return (
        <div class="card mb-5">

        <div className="row g-0 auth-wrapper">
            <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                {/* <div className="Register"></div> */}
                {/* <img className="imag_css" src={logo} alt="Logo" />; */}

            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="col-12 col-md-4 col-lg-8 auth-main-col text-center" id='aligncenter'>
                        <p>Create your Account</p>
                        <div className="auth-form-container text-start">
                            <form className="auth-form" method="POST" onSubmit={register} autoComplete={'off'}>

                                <div className="name mb-3">
                                    <input type="text"
                                        className={`form-control ${validate.validate && validate.validate.name ? 'is-invalid ' : ''}`}
                                        id="name"
                                        name="name"
                                        value={name}
                                        placeholder="Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.name) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.name) ? validate.validate.name[0] : ''}
                                    </div>
                                </div>

                                <div className="email mb-3">
                                    <input type="email"
                                        className={`form-control ${validate.validate && validate.validate.email ? 'is-invalid ' : ''}`}
                                        id="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                                    </div>
                                </div>

                                <div className="password mb-3">
                                    <div className="input-group">
                                        <input type={showPassword ? 'text' : 'password'}
                                            className={`form-control ${validate.validate && validate.validate.password ? 'is-invalid ' : ''}`}
                                            name="password"
                                            id="password"
                                            value={password}
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}  
                                        />
                                        <button type="button" id='btnchange' className="btn btn-outline-primary btn-sm" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>

                                        <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.password) ? 'd-block' : 'd-none'}`} >
                                            {(validate.validate && validate.validate.password) ? validate.validate.password[0] : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="password mb-3">
                                    <div className="input-group">
                                        <input type={showPassword ? 'text' : 'ConfirmPassword'}
                                            className={`form-control ${validate.validate && validate.validate.ConfirmPassword ? 'is-invalid ' : ''}`}
                                            name="ConfirmPassword"
                                            id="ConfirmPassword"
                                            value={ConfirmPassword}
                                            placeholder="ConfirmPassword"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button type="button" id='btnchange' className="btn btn-outline-primary btn-sm" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>

                                        <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.ConfirmPassword) ? 'd-block' : 'd-none'}`} >
                                            {(validate.validate && validate.validate.ConfirmPassword) ? validate.validate.ConfirmPassword[0] : ''}
                                        </div>
                                    </div>

                                </div>
                                <div className="password mb-3">
                                    <div className="input-group">
                                        <input type ='text'
                                            className={`form-control ${validate.validate && validate.validate.MobileNumber ? 'is-invalid ' : ''}`}
                                            name="MobileNumber"
                                            id="MobileNumber"
                                            value={MobileNumber}
                                            placeholder="MobileNumber"
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                        {/* This is the Commetn hide and show */}
                                        {/* <button type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => toggleMobileNo(e)} > </button> */}

                                        <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.MobileNumber) ? 'd-block' : 'd-none'}`} >
                                            {(validate.validate && validate.validate.MobileNumber) ? validate.validate.MobileNumber[0] : ''}
                                        </div>
                                    </div>

                                    </div>

                                       {/* ADDRESS */}
<div>
                                       <div className="password mb-3">
                                    <div className="input-group">
                                        <input type ='text'
                                            className={`form-control ${validate.validate && validate.validate.Address ? 'is-invalid ' : ''}`}
                                            name="Address"
                                            id="Address"
                                            value={Address}
                                            placeholder="Address"
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        {/* This is the Commetn hide and show */}
                                        {/* <button type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => toggleMobileNo(e)} > </button> */}

                                        <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.Address) ? 'd-block' : 'd-none'}`} >
                                            {(validate.validate && validate.validate.Address) ? validate.validate.Address[0] : ''}
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    <div className="password mb-3">
                                    <div className="name mb-3">
                                    <input type="text"
                                        className={`form-control ${validate.validate && validate.validate.City ? 'is-invalid ' : ''}`}
                                        id="city"
                                        name="city"
                                        value={City}
                                        placeholder="City"
                                        onChange={(e) => setCity(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.name) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.name) ? validate.validate.name[0] : ''}
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div className="name mb-3">
                                    <input type="text"
                                        className={`form-control ${validate.validate && validate.validate.State ? 'is-invalid ' : ''}`}
                                        id="state"
                                        name="state"
                                        value={State}
                                        placeholder="State"
                                        onChange={(e) => setState(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.name) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.name) ? validate.validate.name[0] : ''}
                                    </div>
                                </div>



                                    </div>


                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Sign Up</button>
                                </div>
                            </form>

                            <hr />
                            <div className="auth-option text-center pt-2">Have an account? <Link className="text-link" to="/login" >Sign in</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Register;
