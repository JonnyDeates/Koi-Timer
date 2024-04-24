import React, {DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes} from "react";
import {Input} from "../Input/Input";
import './SpacedLabeledInput.css'
type SpacedLabeledInputProps = {
  label: string,
  labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
  divProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
} & InputHTMLAttributes<HTMLInputElement>

export function SpacedLabeledInput({label, labelProps = {}, divProps = {}, ...inputProps}: SpacedLabeledInputProps) {

  const {className = ''} = divProps;

  return <div {...divProps} className={`SpacedLabeledInput ${className}`}>
    <label {...labelProps}>{label}</label>
    <Input width={"150px"}  {...inputProps}/>
  </div>
}