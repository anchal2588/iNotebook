import React, { useState } from "react";
import NoteContext from "../context/NoteContext";
import { useContext } from "react";

export default function AddNotes(props) {
  const {alert} = props
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title: "", description: "", tag:""});

  const onClick = (e)=>{
      e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag:""})
    alert("Notes Added Successfully", "success")
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
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
            Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
            Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={onClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
