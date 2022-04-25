import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notes = [
    {
      _id: "62563c7f914c7fa50c57dd96",
      user: "62557e604d548b656934e7ad",
      title: "My title",
      description: "My description.",
      tag: "peronal title",
      date: "2022-04-13T02:59:11.233Z",
      __v: 0,
    },
    {
      _id: "62563c8c914c7fa50c57dd98",
      user: "62557e604d548b656934e7ad",
      title: "My title2",
      description: "My description addition .",
      tag: "general",
      date: "2022-04-13T02:59:24.932Z",
      __v: 0,
    },
    {
        _id: "62563c7f914c7fa50c57dd96",
        user: "62557e604d548b656934e7ad",
        title: "My title",
        description: "My description.",
        tag: "peronal title",
        date: "2022-04-13T02:59:11.233Z",
        __v: 0,
      },
      {
        _id: "62563c8c914c7fa50c57dd98",
        user: "62557e604d548b656934e7ad",
        title: "My title2",
        description: "My description addition .",
        tag: "general",
        date: "2022-04-13T02:59:24.932Z",
        __v: 0,
      },
      {
        _id: "62563c7f914c7fa50c57dd96",
        user: "62557e604d548b656934e7ad",
        title: "My title",
        description: "My description.",
        tag: "peronal title",
        date: "2022-04-13T02:59:11.233Z",
        __v: 0,
      },
      {
        _id: "62563c8c914c7fa50c57dd98",
        user: "62557e604d548b656934e7ad",
        title: "My title2",
        description: "My description addition .",
        tag: "general",
        date: "2022-04-13T02:59:24.932Z",
        __v: 0,
      },
      {
        _id: "62563c7f914c7fa50c57dd96",
        user: "62557e604d548b656934e7ad",
        title: "My title",
        description: "My description.",
        tag: "peronal title",
        date: "2022-04-13T02:59:11.233Z",
        __v: 0,
      },
      {
        _id: "62563c8c914c7fa50c57dd98",
        user: "62557e604d548b656934e7ad",
        title: "My title2",
        description: "My description addition .",
        tag: "general",
        date: "2022-04-13T02:59:24.932Z",
        __v: 0,
      },
      {
        _id: "62563c7f914c7fa50c57dd96",
        user: "62557e604d548b656934e7ad",
        title: "My title",
        description: "My description.",
        tag: "peronal title",
        date: "2022-04-13T02:59:11.233Z",
        __v: 0,
      },
      {
        _id: "62563c8c914c7fa50c57dd98",
        user: "62557e604d548b656934e7ad",
        title: "My title2",
        description: "My description addition .",
        tag: "general",
        date: "2022-04-13T02:59:24.932Z",
        __v: 0,
      },
  ];

  const [note, setNote] = useState(notes);
  //add note
  const addNote = (title, discription, tag)=>{
    const newNote = {
        _id: "62563c8c914c7fa50c57dd98",
        user: "62557e604d548b656934e7ad",
        title: title,
        description: discription,
        tag: tag,
        date: "2022-04-13T02:59:24.932Z",
        __v: 0,
      }
    setNote(note.concat(newNote));
  }
  //edit note

  //delete note
  return (
    <NoteContext.Provider value={{ note, addNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
