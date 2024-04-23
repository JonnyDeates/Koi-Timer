import React, { useState } from 'react';
import CustomTimerModal from "../Modals/CustomTimer/CustomTimerModal";
import SoundsModal from "../Modals/Sounds/SoundsModal";
import logo from '../Assets/logos/yinyangyexin.png'
import PresetsModal from '../Modals/Presets/PresetsModal';
import './Header.css'
import settings from './settings-icon.png'
import { Button, IconButton, GenericModalWithTabs } from 'koi-pool';
const Header = () => {
    const [isRotating, setIsRotating] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);

    return (
        <div className="header">
            <nav>
                <h1>
                    K
                    <img src={logo} alt={'o'} onAnimationEnd={() => setIsRotating(true)}
                        style={{ animation: (isRotating) ? '2s linear logo-spin infinite' : '2s slide-in-down forwards' }} />
                    {('i Timer'.split('').map((letter, i) =>
                        <span key={i} style={{ animation: '1s ' + (0.25 + (i / 8)) + "s slide-in-down forwards" }}>
                            {letter}
                        </span>))}
                </h1>
                <IconButton src={settings} variants='standard' onClick={handleOpenModal}/>
            </nav>
            <GenericModalWithTabs tabs={[
                { title: "Custom Timer", body: <CustomTimerModal /> },
                { title: "Presets", body: <PresetsModal /> },
                { title: "Sounds", body: <SoundsModal /> }
            ]} handleClose={handleCloseModal} isOpen={isModalOpen} />

        </div>
    );
};


export default Header;
