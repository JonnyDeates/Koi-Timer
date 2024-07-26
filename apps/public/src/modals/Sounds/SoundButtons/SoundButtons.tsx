import {Button, IconButton} from "koi-pool";
import React from "react";
import pauseIcon from "../assets/icons/211871_pause_icon.svg";
import playIcon from "../assets/icons/211876_play_icon.svg";

type SoundButtonsType = {isActive:boolean, handleStopSoundEffect: ()=> void, handlePlaySoundEffect: ()=> void}

const SoundButtons = ({isActive, handlePlaySoundEffect, handleStopSoundEffect}: SoundButtonsType)=>{
return isActive
  ? <IconButton onClick={handleStopSoundEffect} src={pauseIcon} alt={`Pause`} variant={'cancel'}  className={"SoundButton"}/>
  : <IconButton onClick={handlePlaySoundEffect} src={playIcon} alt={`Play`} variant={'accept'} className={"SoundButton"}/>
};
export default SoundButtons;