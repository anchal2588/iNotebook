import React from "react";
import Notes from "./Notes";

export default function Home(props) {
  return (
    <div className="my-3">
      <Notes alert={props.alert}/>
    </div>
  );
}
