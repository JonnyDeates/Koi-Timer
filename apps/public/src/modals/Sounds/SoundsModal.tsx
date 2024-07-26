import React, {ChangeEvent} from 'react';
import SoundSection from "./SoundSection/SoundSection";
import {useSoundEffectContext} from "../../contexts/SoundEffectContext";
import {DEFAULT_SOUND_LIST} from "./factory/SoundsFactory";
import "./assets/SoundsModal.css"
import {SpacedLabelInput} from "koi-pool";


const SoundsModal = () => {
  const {handleVolume, volume} = useSoundEffectContext();

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newVolume = parseFloat(e.target.value);
    handleVolume(newVolume);
  };

  return (<>
      <SpacedLabelInput label={"Volume"} type='range' onChange={handleVolumeChange} min={0} max={1} value={volume}
                        step='0.01'/>
      <div className={'SoundList'}>
        {DEFAULT_SOUND_LIST.map((soundEffect, i) =>
          <SoundSection key={i} {...soundEffect}/>
        )}
      </div>

    </>
  );
};


export default SoundsModal;

