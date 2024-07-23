import arrow from "./assets/arrow.png";
import React, { ButtonHTMLAttributes } from "react";
import './assets/CarouselButton.css'
type CarouselButtonType = {isFlipped?: boolean} & ButtonHTMLAttributes<HTMLButtonElement>

export function CarouselButton(props: CarouselButtonType) {

  const { className = '', isFlipped = false } = props;

  return <button {...props} className={`CarouselButton ${className} ${isFlipped ? 'flipped' : ''}`} >
    <img src={arrow} alt="<" />
  </button>
}