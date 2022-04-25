import React from "react";

export default function NoteItem(props) {
  const { note } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
        <div class="d-flex align-items-center">
          <h6 className="card-title">{note.title}</h6>
            <i class="fa-regular fa-trash-can mx-3"></i>
            <i class="fa-regular fa-pen-to-square"></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
