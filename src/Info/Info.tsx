import React, {useState} from 'react';
import InfoSection from "./InfoSection/InfoSection";
import arrow from './Carousel/CarouselButton/assets/arrow.png'
import TrackVisibility from "../Utlis/TrackVisibility";
import InfoData from "./data/InfoData";
import './Info.css'

const Info = () => {
  const [currentShown, setCurrentShown] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const handleToggleShowInfo = () => {
    setShowInfo(!showInfo)
  };

  const handleSetVisible = () => setIsVisible(true);
  const handleLeftArrowClick = () => {
    if (currentShown - 1 >= 0) {
      setCurrentShown(currentShown - 1)
    } else {
      setCurrentShown(InfoData.length - 1)
    }
  };

  const handleRightArrowClick = () => {
    if (currentShown + 1 < InfoData.length) {
      setCurrentShown(currentShown + 1)
    } else {
      setCurrentShown(0)
    }
  };

  const currentInfoItem = InfoData[currentShown];
  return (
    <>
      {(showInfo) ?
        <TrackVisibility onVisible={handleSetVisible}>
          <div className="info">
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
        </TrackVisibility> : <></>}
      <button style={showInfo ? {transform: 'rotate(270deg)'} : {transform: 'rotate(90deg)'}} className='infoButton'
              onClick={handleToggleShowInfo}>
        <img src={arrow} alt={'>'}/>
      </button>
    </>
  )
    ;
};


export default Info;
