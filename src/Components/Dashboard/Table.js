import React, { useState, useEffect ,useRef } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Table = (props) => {
  const [user, setUsers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const inputElement = useRef("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [item, setItem] = useState({});
  const onDelete = async (id) => {
    console.log(id);
    const toLogout = window.confirm("Are you sure to delete ?");
    if(toLogout){
      await axios.delete(`https://student-management01.herokuapp.com/student/delete/${id}`).then((res) => {
        if (res) {
          console.log(res);
          setSuccess(true);
        } else {
          setFail(true);
        }
      })
    }
    else{
      setFail(true);
    }

  };



  useEffect(async () => {
    await axios.get(`https://student-management01.herokuapp.com/student/getAll`)
      .then((res) => {
        const response = res.data.res;
        setUsers(response);
      })

  }, [user]);


 const getSearchTerm = () => {
    searchHandler(inputElement.current.value);
  };
  
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newItemsList = user.filter((items) => {
        // console.log(Object.values(item));
        return Object.values(items)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newItemsList);
    } else {
      setSearchResults(user);
    }
  };

  let editButton;

  return (
    <>
      <input
            style={{
                        height: "50px",
                        width: "400px",
                        borderRadius: "0%,30%,0%,30%",
                        border: "6px solid lightgrey",
                        boxShadow: "0px 2px 6px grey",
                        marginLeft:"130px",
                      }}
          
            ref={inputElement}
            type="text"
            placeholder="Search by Name,Percentage"
            value={searchTerm}
            onChange={getSearchTerm}
          />
          
      <div>
        <Alert show={success} dismissable variant="success">
          Deleted SuccessFully
        </Alert>
        <Alert show={fail} dismissable variant="danger">
          somethiing went wrong
        </Alert>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Date Of Birth</th>
            <th scope="col">Percentage</th>
            <th scope="col">Profile Picture</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.length > 1 || user.length > 1
                ? (searchTerm.length < 1 ? user : searchResults)?.map((val, index) => (
            <tr key={index}>
              <th className="snumber" scope="row">
                {val.id}
              </th>
              <td scope="col">{val.firstname}</td>
              <td scope="col">{val.lastname}</td>
              <td scope="col">{val.dob}</td>
              <td scope="col">{val.percentage}</td>
              <td scope="col">
              <img
                      src={"http://" + val.profile_picture}
                      alt="profilePic"
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                        border: "6px solid lightgrey",
                        boxShadow: "0px 2px 6px grey",
                      }}
                    />
              </td>
              <td>
                <Link to={`/edit/${val._id}`}>
                  <button
                    className="edit_button"
                    // onClick={props.handleShow}
                    id={val.id}
                  >
                    <i class="far fa-edit"></i>
                  </button>
                </Link>
                <button
                  className="delete_button"
                  onClick={() => onDelete(val._id)}
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
                 )) : "No orders Found"}
        </tbody>
      </table>
    </>
  );
};

export default Table;
