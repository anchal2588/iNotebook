import React from 'react'

export default function Alert(props) {
    const capaitalize = (elem)=>{
      elem = 'danger'? "error": elem;
        elem = elem.toLowerCase();
        elem = elem.charAt(0).toUpperCase() + elem.slice(1);
        return elem;
    }
  return (

    <div style={{height: "50px"}}>
    {props.alert&&<div className={`alert alert-${props.alert.alert_type} alert-dismissible fade show`} role="alert">
        <strong>{capaitalize(props.alert.alert_type)}</strong> {props.alert.msg}
    </div>}
    </div>
  )
}
