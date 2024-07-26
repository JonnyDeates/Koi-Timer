import React, {useState} from 'react';
import SoundsModal from "../modals/Sounds/SoundsModal";
import logo from './assets/yinyangyexin.png'
import PresetsModal from '../modals/Presets/PresetsModal';
import './Header.css'
import settings from './assets/settings-icon.png'
import {Button, GenericModalWithTabs, IconButton} from 'koi-pool';
import CustomPresetsModal from "../modals/Presets/CustomPresets/CustomPresetsModal";

const Header = () => {
    const [isRotating, setIsRotating] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<'settings' | 'custom-preset' | null>(null);

    const handleCloseModal = () => setIsModalOpen(null);
    const handleOpenSettingsModal = () => setIsModalOpen('settings');
    const handleOpenCustomPresetModal = () => setIsModalOpen('custom-preset');

    return (
        <>
            <div className="Header">
                <h1>
                    K
                    <img src={logo} alt={'o'} onAnimationEnd={() => setIsRotating(true)}
                         style={{animation: (isRotating) ? '2s linear logo-spin infinite' : '2s slide-in-down forwards'}}/>
                    {('i Timer'.split('').map((letter, i) =>
                        <span key={i} style={{animation: '1s ' + (0.25 + (i / 8)) + "s slide-in-down forwards"}}>
                            {letter}
                        </span>))}
                </h1>
                <IconButton src={settings} variant='accept' onClick={handleOpenSettingsModal}/>
            </div>
            <GenericModalWithTabs actionGroupAttributes={{className: "ModalActionGroup"}} tabs={[
                {
                    title: "Presets",
                    body: <PresetsModal/>,
                    actionButtons: [
                        <div/>,
                        <Button onClick={handleOpenCustomPresetModal} variant='accept'>
                            Create Preset
                        </Button>,
                    ]
                },
                {title: "Sounds", body: <SoundsModal/>}
            ]} handleClose={handleCloseModal} isOpen={isModalOpen === 'settings'}/>
            <CustomPresetsModal handleClose={handleOpenSettingsModal} isOpen={isModalOpen === 'custom-preset'}/>
        </>
    );
};


export default Header;
