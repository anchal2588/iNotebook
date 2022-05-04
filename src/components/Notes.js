import NoteContext from "../context/NoteContext";
import { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(NoteContext);
  const { note, getNote, editNote } = context;
  const {alert} = props
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem('token')? getNote() : navigate("/login");
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [notes, setNote] = useState({etitle: "", edescription: "", etag:"default"});

  const onClick = (e)=>{
      e.preventDefault();
      refClose.current.click();
      editNote(notes.id, notes.etitle, notes.edescription, notes.etag);
      alert("Notes Updated Successfully", "success")
      
  }
  
  const onChange = (e)=>{
    setNote({...notes, [e.target.name]: e.target.value});
}
const updateNote = (currentNote) => {
  setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  ref.current.click();
};

  return (
    <>
      <AddNotes alert={alert}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={notes.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={notes.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={notes.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary d-none"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={notes.etitle.length<3 || notes.edescription.length<5}type="button" className="btn btn-primary" onClick={onClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h2>Your Note</h2>
          <div className="container">
            {note.length === 0 && "No notes Available"}
          </div>
          {note.map((notes) => {
            return (
              <NoteItem updateNote={updateNote} note={notes} key={notes._id} alert={alert} />
            );
          })}
        </div>
      </div>
    </>
  );
}
