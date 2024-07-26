import React, { useState } from 'react';
import InfoSection from "./InfoSection/InfoSection";
import arrow from './Carousel/CarouselButton/assets/arrow.png'
import TrackVisibility from "../utils/TrackVisibility";
import InfoData, { InfoType } from "./data/InfoData";
import './Info.css'
import { Carousel } from './Carousel/Carousel';

const Info = () => {

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const handleToggleShowInfo = () => {
    setShowInfo(!showInfo)
  };

  const handleSetVisible = () => setIsVisible(true);


  return (
    <>
      {(showInfo) ?
        <TrackVisibility onVisible={handleSetVisible}>
          <Carousel<InfoType> data={InfoData} renderChildren={(info) =>
            <InfoSection {...info} />
          } />
        </TrackVisibility> : <></>}
      <button style={showInfo ? { transform: 'rotate(270deg)' } : { transform: 'rotate(90deg)' }} className='infoButton'
        onClick={handleToggleShowInfo}>
        <img src={arrow} alt={'>'} />
      </button>
    </>
  )
    ;
};


export default Info;
