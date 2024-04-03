import React from 'react';
import '../Modals.css'
import PresetSection from "./PresetSection/PresetSection";
import {useTimerContext} from '../../Context/TimerContext';
import GenericModal, {LimitedModalProps} from '../GenericModal/GenericModal';


const PresetsModal = ({isOpen, handleClose}: LimitedModalProps) => {
    const {intervalPresets: {presets}} = useTimerContext();

    const presetsKeys = Object.keys(presets);

    return (
        <GenericModal title='Presets' isOpen={isOpen} handleClose={handleClose}>
            {presetsKeys.map((presetId, i) => <PresetSection key={i} {...presets[presetId]} id={presetId}/>)}
        </GenericModal>
    );
};


export default PresetsModal;

