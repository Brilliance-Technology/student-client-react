import React, { useEffect, useState ,useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Table.css";
import Table from "./Table";
import Modals from "./Modals.js";
import "./Modals.css";
import { Row } from "react-bootstrap";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const history = useNavigate();
  const [data, setData] = useState();
  const inputElement = useRef("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [item, setItem] = useState({});

  const createUser = {
    backgroundColor: "none",
    boxShadow: "2px 2px 7px grey",
    border: "none",
    width: "150px",
    color: "darkgreen",
    borderRadius: "20px",
    height: "40px"
  };

  const getSearchTerm = () => {
    searchHandler(inputElement.current.value);
  };
  
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newItemsList = item.filter((items) => {
        // console.log(Object.values(item));
        return Object.values(items)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newItemsList);
    } else {
      setSearchResults(item);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="col-10">
        <a className="navbar-brand font" href="/">
            Student Management System
        </a>
      </div>
      <div className="col-2">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Row>
            
              <button style={createUser}><Link className="nav-link active" aria-current="page" to='/register'>+ Create</Link></button>
           
        </Row>
        </div>
      </nav>

      <div className="table_container">
        
        <h5
        style={{
                textAlign:"center"
                      }}
        >User Information</h5>
        

        <Table
          data={data}
          // show={show}
          // handleClose={handleClose}
          // handleShow={handleShow}
        />
      </div>
    </>
  );
};

export default Dashboard;
