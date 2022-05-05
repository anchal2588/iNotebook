import React, { useEffect, useState } from 'react'
import NoteContext from "../context/NoteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function About(props) {
  const {alert} = props;
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { getUser, updateUser } = context;
  const [user, setUser] = useState({id: "", name: "", email: "", date:""});

  const fetchData = async ()=> {
    if(localStorage.getItem('token')){
      const userDetails = await getUser();
      let {name, email, date} = userDetails;
      const id = userDetails._id;
      date = date.split("T")[0];
      setUser({id, name, email, date});
    }else{
      navigate("/login");
    }
  }

  useEffect(() => {
    fetchData();
    
  }, []);

  const handleClick = async (e)=>{
      e.preventDefault();
      console.log("user", user)
      const updatedDetails = await updateUser(user.id, user.name);
      let {name, email, date} = updatedDetails.user;
      let id = updatedDetails.user._id;
      date = date.split("T")[0];
      setUser({id, name, email, date});
      alert("User Updated Successfully", "success")
      
  }
  
  const onChange = (e)=>{
    setUser({...user, [e.target.name]: e.target.value})};
  return (
    <div className="mt-3">
        <h2>User Information</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={user.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={user.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Created Date
          </label>
          <input
            type="text"
            className="form-control"
            id="date"
            name="date"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={user.date}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Save
        </button>
      </form>
    </div>
  )
}
