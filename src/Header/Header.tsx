import React, {useState} from 'react';
import CustomTimerModal from "../Modals/CustomTimer/CustomTimerModal";
import SoundsModal from "../Modals/Sounds/SoundsModal";
import logo from '../Assets/logos/yinyangyexin.png'
import PresetsModal from '../Modals/Presets/PresetsModal';
import './Header.css'
import settings from './settings-icon.png'
import {Button, GenericModalWithTabs, IconButton} from 'koi-pool';
import CustomPresetsModal from "../Modals/CustomPresets/CustomPresetsModal";

const Header = () => {
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<'settings' | 'custom-preset' | null>(null);

  const handleCloseModal = () => setIsModalOpen(null);
  const handleOpenSettingsModal = () => setIsModalOpen('settings');
  const handleOpenCustomPresetModal = () => setIsModalOpen('custom-preset');

  return (
    <div className="header">
      <nav>
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
      </nav>
      <GenericModalWithTabs tabs={[
        {title: "Custom Timer", body: <CustomTimerModal/>},
        {
          title: "Presets",
          body: <PresetsModal/>,
          actionButtons: [<div/>, <Button onClick={handleOpenCustomPresetModal}>Create Preset</Button>]
        },
        {title: "Sounds", body: <SoundsModal/>}
      ]} handleClose={handleCloseModal} isOpen={isModalOpen === 'settings'}/>
      <CustomPresetsModal handleClose={handleOpenSettingsModal} isOpen={isModalOpen === 'custom-preset'}/>
    </div>
  );
};


export default Header;
