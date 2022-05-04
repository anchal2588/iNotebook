import React from "react";
import NoteContext from "../context/NoteContext";
import { useContext } from "react";


export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote, editNote } = context;
  const { note, updateNote, alert } = props;

  const deleteANote = ()=>{
    deleteNote(note._id);
    alert("Notes Deleted Successfully", "success")
  }
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
        <div className="d-flex align-items-center">
          <h6 className="card-title">{note.title}</h6>
            <i className="fa-regular fa-trash-can mx-3" onClick={deleteANote}></i>
            <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
