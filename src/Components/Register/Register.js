import React, { useState } from "react";
import styles from "./Register.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate} from "react-router-dom";
import { Row, Alert } from "react-bootstrap";
import Axios from "axios";
import ImageUploading from 'react-images-uploading';
import Dashboard from '../Dashboard/Dashboard'
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    percentage: "",
  });
  
  const [image, setImages] = useState({
    profile_picture: "",
  });
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const onChange = (e) => {
    setImages({ profile_picture: e.target.files[0] });
  };
   const formData = {
    firstname: user.firstname,
    lastname: user.lastname,
    dob: user.dob,
    percentage: user.percentage,
    profile_picture: image.profile_picture,
  };
  const onSubmit = async (e) => {
      const formData = new FormData();
      formData.append("firstname",user.firstname);
      formData.append("lastname", user.lastname);
      formData.append("dob", user.dob);
      formData.append("percentage", user.percentage);
      formData.append("profile_picture", image.profile_picture);
    e.preventDefault();
    await Axios.post(
      "https://student-management01.herokuapp.com/student/create",
      formData
      
    ).then((res) => {
      if (res) {
        setSuccess(true);
        navigate('/')
        
      } else {
        console.log(res);
        setFail(true);
      }
    });

    
  };
  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className="registrationFormContainer">
        <Alert show={success} variant="success">
          Registerd SuccessFully
        </Alert>
        <Alert show={fail} variant="danger">
          Registeration Failed
        </Alert>
       

        <fieldset className=" p-3">
          <legend className="registrationFormLegend text-center">
            Registration Form
          </legend>
          <form onSubmit={onSubmit} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForName">Student Name</label>
              <span className="mandatory">*</span>
              <input
                name="firstname"
                type="text"
                className="form-control"
                aria-describedby="Enter your name"
                placeholder="Enter your name"
                value={user.firstname}
                onChange={handleChange}                                                                              
              />
              {errors.name && (
                <span className="errorMessage mandatory">
                  {errors.firstname.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForName">Student Lastname</label>
              <span className="mandatory">*</span>
              <input
                name="lastname"
                type="text"
                className="form-control"
                aria-describedby="Enter your Lastname"
                placeholder="Enter your Lastname"
                value={user.lastname}
                onChange={handleChange}
              />
              {errors.lastname && (
                <span className="errorMessage mandatory">
                  {errors.lastname.message}
                </span>
              )}
            </div>
            
            <div className="form-group ">
              <label htmlFor="inputForEmail">Enter Date of Birth</label>
              <span className="mandatory">*</span>
              <input
                id="inputFordob"
                name="dob"
                type="date"
                className="form-control"
                aria-describedby="Enter date of birth"
                placeholder="Enter date of birth"
                value={user.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <span className="errorMessage mandatory">
                  {errors.dob.message}
                </span>
              )}
            </div>

            <div className="form-group ">
              <label htmlFor="inputForEmail">Enter Percentage</label>
              <span className="mandatory">*</span>
              <input
                id="inputForPercentage"
                name="percentage"
                type="text"
                className="form-control"
                aria-describedby="Enter Percentage"
                placeholder="Enter Percentage "
                value={user.percentage}
                onChange={handleChange}
                
              />
              {errors.percentage && (
                <span className="errorMessage mandatory">
                  {errors.email.message}
                </span>
              )}
            </div>
            

            <div className="form-group">
              <label htmlFor="inputForPassword">Uplode Profile Image</label>
              <span className="mandatory">*</span>
              <input
                type="file"
                name="profile_picture"
                className="form-control"
                placeholder="Enter Profile Picture"
                accept="image/*"
                defaultValue={image.profile_picture.name}
                onChange={onChange}

              />
              {errors.profile_picture && (
                <span className="errorMessage mandatory">
                  {errors.profile_picture.message}
                </span>
              )}
            </div>

            <div className="d-flex pt-4 align-items-center justify-content-center">
              <button type="submit" className="register_btn">
                Submit
              </button>
              <button className="login-btn">
                <Link to="/">Back</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};
export default Register;
