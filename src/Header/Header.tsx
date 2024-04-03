import React, {useState} from 'react';
import CustomTimerModal from "../Modals/CustomTimer/CustomTimerModal";
import SoundsModal from "../Modals/Sounds/SoundsModal";
import logo from '../Assets/logos/yinyangyexin.png'
import PresetsModal from '../Modals/Presets/PresetsModal';
import './Header.css'

const Header = () => {
    const [isRotating, setIsRotating] = useState<boolean>(false);
    const [currentActiveModal, setCurrentActiveModal] = useState<undefined | "sounds" | "presets" | "customTimer">();

    const handleCloseModal = () => setCurrentActiveModal(undefined);

    return (
        <div className="header">
            <h1>
                K
                <img src={logo} alt={'o'} onAnimationEnd={() => setIsRotating(true)}
                      style={{animation: (isRotating) ? '2s linear logo-spin infinite' : '2s slide-in-down forwards'}}/>
                {('i Timer'.split('').map((letter, i) =>
                    <span key={i} style={{animation: '1s ' + (0.25 + (i / 8)) + "s slide-in-down forwards"}}>
                        {letter}
                    </span>))}
            </h1>
            <div className="nav">
                <button onClick={() => setCurrentActiveModal("customTimer")}>Custom Timer</button>
                <button onClick={() => setCurrentActiveModal("presets")}>Presets</button>
                <button onClick={() => setCurrentActiveModal("sounds")}>Alarm</button>
            </div>
            <PresetsModal handleClose={handleCloseModal} isOpen={"presets" === currentActiveModal}/>
            <CustomTimerModal handleClose={handleCloseModal} isOpen={"customTimer" === currentActiveModal}/>
            <SoundsModal handleClose={handleCloseModal} isOpen={"sounds" === currentActiveModal}/>
        </div>
    );
};


export default Header;
