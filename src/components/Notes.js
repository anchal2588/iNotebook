import NoteContext from "../context/NoteContext";
import { useContext } from "react";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";

export default function Notes() {
  const context = useContext(NoteContext);
  const { note } = context;
  return (
    <>
      <AddNotes />
      <div className="container">
        <div className="row">
          <h2>Your Note</h2>
          {note.map((notes) => {
            return <NoteItem note={notes} />;
          })}
        </div>
      </div>
    </>
  );
}
