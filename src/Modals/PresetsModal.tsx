import React from 'react';
import './Modals.css'
import PresetSection from "./PresetSection/PresetSection";
import { useTimerContext } from 'Context/TimerContext';
import GenericModal, { GenericModalProps } from './GenericModal/GenericModal';


type PresetsModalType = Omit<GenericModalProps, "title" | "children">

const PresetsModal = ({isOpen, handleClose}: PresetsModalType) => {
    const {presets, currentPresetId} = useTimerContext()

    return (
        <GenericModal title='Presets' isOpen={isOpen} handleClose={handleClose}>
            {presets.map((preset, i) => <PresetSection key={i} {...preset} isActive={(currentPresetId === preset.id)} />)}
        </GenericModal>
    );

}


export default PresetsModal;

