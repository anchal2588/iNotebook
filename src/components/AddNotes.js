import React, { useState } from "react";
import NoteContext from "../context/NoteContext";
import { useContext } from "react";

export default function AddNotes() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title: "", discription: "", tag:"default"});

  const onClick = (e)=>{
      e.preventDefault();
    addNote(note.title, note.discription, note.tag);
  }
  
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value});
}
  return (
    <div>
      <div className="container">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="discription" className="form-label">
            Discription
            </label>
            <input
              type="text"
              className="form-control"
              id="discription"
              name="discription"
              onChange={onChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={onClick}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
