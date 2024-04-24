import React, {DetailedHTMLProps, HTMLAttributes, LabelHTMLAttributes} from "react";
import {Input, InputProps} from "../Input/Input";
import './FloatingLabelInput.css'

type FloatingLabelInputProps =
  {
    label?: string,
    labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
    divProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  }
  & InputProps

export function FloatingLabelInput({divProps = {}, label, labelProps, ...inputProps}: FloatingLabelInputProps) {

  const {className = ''} = divProps;

  return <div className={`FloatingLabelInput ${className}`} {...divProps}>
    <label {...labelProps}>
      {label}
    </label>
    <Input {...inputProps}/>
  </div>
}