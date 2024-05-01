import arrow from "./assets/arrow.png";
import React, {ButtonHTMLAttributes} from "react";

type CarouselButtonType = {} & ButtonHTMLAttributes<HTMLButtonElement>

const CarouselButton = (props: CarouselButtonType) => {

  return <button style={{animation: isVisible ? '1s 1s slide-in-right forwards' : ''}}
                 onClick={handleLeftArrowClick}>
    <img src={arrow} alt="<"/>
  </button>
}