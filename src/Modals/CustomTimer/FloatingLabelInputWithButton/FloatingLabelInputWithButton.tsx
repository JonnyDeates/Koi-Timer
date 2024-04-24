import React, {ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, LabelHTMLAttributes} from "react";
import {Input, InputProps} from "../Input/Input";
import './FloatingLabelInputWithButton.css'
import {Button} from "koi-pool";
import {VariantsType} from "koi-pool/dist/types/VariantsType";

type FloatingLabelInputWithButtonProps =
  {
    label: string,
    onClick: ()=> void,
    labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
    divProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    buttonProps?: ButtonProps,
  }
  & InputProps
type ButtonProps = {
  variant?: VariantsType;
  isActive?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export function FloatingLabelInputWithButton({
                                               divProps = {},
                                               onClick,
                                               label,
                                               labelProps,
                                               ...inputProps
                                             }: FloatingLabelInputWithButtonProps) {

  const {className = ''} = divProps;

  return <div className={`FloatingLabelInputWithButton ${className}`} {...divProps}>
    <label {...labelProps}>
      {label}
    </label>
    <Input {...inputProps}/>
    <Button variant={'accept'} onClick={onClick}>+</Button>
  </div>
}