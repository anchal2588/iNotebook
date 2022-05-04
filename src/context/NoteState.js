import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notes = [];

  const [note, setNote] = useState(notes);

  //get all notes
  const getNote = async ()=>{
    const response = await fetch(`${host}/api/notes/getNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      referrerPolicy: 'no-referrer',
     });
      const allNotes =  await response.json();
      setNote(allNotes);

  }

  //add note
  const addNote = async (title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({title, description, tag}) });
      getNote();
      
  }
  //edit note
  const editNote = async (id, title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({title, description, tag}) // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
     });
      getNote();
  }

  //delete note
  const deleteNote = async (id)=>{
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
     });
     getNote();
  }
  return (
    <>
    <NoteContext.Provider value={{ note, addNote, deleteNote, getNote, editNote}}>
      {props.children}
    </NoteContext.Provider>
    </>
  );
};
export default NoteState;
