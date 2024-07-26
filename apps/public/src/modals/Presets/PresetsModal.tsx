import React, { useState } from 'react';
import PresetSection from "./PresetSection/PresetSection";
import {useTimerContext} from '../../contexts/TimerContext';



const PresetsModal = () => {
    const {intervalPresets: {presets}} = useTimerContext();


    const presetsKeys = Object.keys(presets);

    return (
        <>
            {presetsKeys.map((presetId, i) => <PresetSection key={i} {...presets[presetId]} id={presetId}/>)}
        </>
    );
};


export default PresetsModal;

