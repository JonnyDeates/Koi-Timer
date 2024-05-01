import arrow from "./CarouselButton/assets/arrow.png";
import InfoSection from "../InfoSection/InfoSection";
import React from "react";


const Carousel = () => {



  return <div className="info">
    <button style={{animation: isVisible ? '1s 1s slide-in-right forwards' : ''}}
            onClick={handleLeftArrowClick}>
      <img src={arrow} alt="<"/>
    </button>
    <InfoSection {...currentInfoItem}/>
    <button style={{animation: isVisible ? '1s 1s slide-in-left forwards' : ''}}
            onClick={handleRightArrowClick}>
      <img src={arrow} alt=">"/>
    </button>
  </div>
}