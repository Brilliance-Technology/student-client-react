import React, { useState, useEffect } from "react";
import styles from "../Register/Register.css";
import { useForm } from "react-hook-form";
import { Link, useParams,useNavigate } from "react-router-dom";
import { Row , Alert} from "react-bootstrap";
import axios from "axios";

const Edit = () => {
  const { id } = useParams([]);
  const [user, setUsers] = useState("");
  const [newuser, setNewUser] = useState("");
  const [status, setStatus] = useState(false);
  
  const navigate = useNavigate();
  
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setNewUser({ [e.target.name]: e.target.value });
  };
  const newData = {
    firstname:newuser.firstname,
    lastname:newuser.lastname,
    dob: newuser.dob,
    percentage: newuser.percentage,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState();
  const onSubmit = async(data, e) => {

    console.log(newData);
     await axios.put(`https://student-management01.herokuapp.com/student/edit/${id}`, newData
    ).then((response) => {
      if (response) {
        setSuccess(true);
        navigate('/')
      }
      else{
        setFail(true);
      }
     
     
    });
  };

  useEffect(async () => {
    await axios.get(`https://student-management01.herokuapp.com/student/get/${id}`)
      .then((res) => {
        const response = res.data.res;
        console.log(response);
        setUsers(response);
      })

  }, [user]);
  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
    <Alert show={success} variant="success">
          Registerd SuccessFully
        </Alert>
        <Alert show={fail} variant="danger">
          Registeration Failed
        </Alert>
       
      <div className="registrationFormContainer">
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}
            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className=" p-3">
          <legend className="registrationFormLegend text-center">
            Edit User Details
          </legend>
          {/* {user.map((val, index) => ( */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" >
          
            <div className="form-group">
              <label htmlFor="inputForName">Student Name</label>
              <span className="mandatory">*</span>
              <input
                name="firstname"
                type="text"
                className="form-control"
                aria-describedby="Enter your name"
                placeholder="Enter your name"
                defaultValue={user.firstname}
                onChange={handleChange}                                                                              
              />
              
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
                defaultValue={user.lastname}
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
                defaultValue={user.dob}
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
                defaultValue={user.percentage}
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
              <img
                      src={"http://" + user.profile_picture}
                      alt="profilePic"
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                        border: "6px solid lightgrey",
                        boxShadow: "0px 2px 6px grey",
                      }}
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
          {/* ))} */}
        </fieldset>
      </div>
    </div>
  );
};

export default Edit;
