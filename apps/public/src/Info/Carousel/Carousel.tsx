import React, { ReactNode, useState } from "react";
import { CarouselButton } from "./CarouselButton/CarouselButton";
import './Carousel.css'

type CarouselType<T> = { data: T[], renderChildren: (currentActiveData: T) => ReactNode }

export function Carousel<T>({ data, renderChildren }: CarouselType<T>) {
  const [currentShown, setCurrentShown] = useState<number>(0)

  const handleLeftArrowClick = () => {
    if (currentShown - 1 >= 0) {
      setCurrentShown(currentShown - 1)
    } else {
      setCurrentShown(data.length - 1)
    }
  };

  const handleRightArrowClick = () => {
    if (currentShown + 1 < data.length) {
      setCurrentShown(currentShown + 1)
    } else {
      setCurrentShown(0)
    }
  };

  return <div className="Carousel">
    <CarouselButton onClick={handleLeftArrowClick} />
    <div className="CarouselBody">
      {renderChildren(data[currentShown])}
    </div>
    <CarouselButton isFlipped onClick={handleRightArrowClick} />
  </div>
}