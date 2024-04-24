import React, {InputHTMLAttributes} from "react";

import './Input.css'

export type InputProps = InputHTMLAttributes<HTMLInputElement>


export function Input(props: InputProps) {
 const {className = '', width = "90px", height= "fit-content"} = props;

  return <input style={{...props.style, width, height}}  {...props} className={`Input ${className}`} />
}