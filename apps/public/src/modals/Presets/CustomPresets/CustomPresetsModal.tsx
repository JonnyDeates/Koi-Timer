import {Button, FloatingLabelInputWithButton, GenericAcceptanceModal, SpacedLabel, SpacedLabelInput} from "koi-pool";
import TimeBar from "../../../components/TimeBar/TimeBar";
import {convertFromSecondsToOtherUnits, convertFromUnitOfTimeToSeconds} from "../../../utils/Converters";
import React, {ChangeEvent, useEffect, useState} from "react";
import {round} from "../../../utils/TimerUtils";
import {useTimerContext} from "../../../contexts/TimerContext";
import './CustomPresetsModal.css'
import {SelectUnitOfTime} from "../../components/SelectUnitOfTime/SelectUnitOfTime";
type CustomPresetsModalProps = {
  handleClose: () => void,
  isOpen: boolean,
}

const CustomPresetsModal = ({handleClose, isOpen}: CustomPresetsModalProps) => {
  const {
    instanceTimer: {pomodoro, longBreak, shortBreak},
    intervalPresetsDispatch,
    intervalPresets: {presets},
    unitOfTime,
  } = useTimerContext();

  const DEFAULT_TIME = convertFromSecondsToOtherUnits(unitOfTime, 25* 60);
  const DEFAULT_TIME_INTERVAL = [25*60];
  const DEFAULT_PRESET_NAME = `Custom Preset ${Object.keys(presets).length - 2}`

  const [customTime, setCustomTime] = useState<number>(DEFAULT_TIME);
  const [customTimeInterval, setCustomTimeInterval] = useState<number[]>(DEFAULT_TIME_INTERVAL);
  const [title, setTitle] = useState<string>(DEFAULT_PRESET_NAME);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setCustomTime(DEFAULT_TIME);
    setCustomTimeInterval(DEFAULT_TIME_INTERVAL);
    setTitle(DEFAULT_PRESET_NAME);
    setDescription('')
  }, [isOpen]);

  const handleAddTimeIntervalToCurrent = (interval: number) => {
    setCustomTimeInterval((prevState) => [...prevState, interval])
  };

  const handleRemoveTimeInterval = (index: number) => {
    const currentInterval = customTimeInterval;
    currentInterval.splice(index, 1);
    setCustomTimeInterval([...currentInterval])
  };

  const handleAddPreset = () => {
    if (customTimeInterval.length >= 1) {
      intervalPresetsDispatch({
        type: "addPreset", preset: {
          title,
          description,
          timeInterval: customTimeInterval,
        },
      });
      handleClose();
    } else {
      alert('The time sequence is not large enough.')
    }
  };

  const handleSetCustomTime = (event: ChangeEvent<HTMLInputElement>) =>{
    const number = Number(event.target.value);
      setCustomTime(number ?? "")
  }
  const totalTime = round(customTimeInterval.reduce((a, b) => a + b, 0), 2);

  return <GenericAcceptanceModal handleClose={handleClose} isOpen={isOpen} title={"Custom Preset"} actionGroupAttributes={{className: "CustomPresetsModalActionGroup"}}
                                 handleSubmit={handleAddPreset} bodyAttributes={{className: "CustomPresetsModal"}}>
    <div style={{width: '100%'}}>
    <SpacedLabelInput label={'Title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
    <SpacedLabelInput label={'Description'} value={description} onChange={(e) => setDescription(e.target.value)}
                        width={'50%'}/>
    </div>
    <SelectUnitOfTime size={'small'}/>
    <div className={"CustomPresetsModalButtons"}>
      <Button onClick={() => handleAddTimeIntervalToCurrent(pomodoro)}>
        Pomodoro
      </Button>
      <Button onClick={() => handleAddTimeIntervalToCurrent(shortBreak)}>
        Short Break
      </Button>
      <Button onClick={() => handleAddTimeIntervalToCurrent(longBreak)}>
        Long Break
      </Button>
      <FloatingLabelInputWithButton onChange={handleSetCustomTime} divProps={{className: 'CustomPresetsModalButtonWrapper'}}
                                    label={"Custom Time"} width={"128px"} value={customTime}
                                    onClick={() => handleAddTimeIntervalToCurrent(convertFromUnitOfTimeToSeconds(unitOfTime, customTime))}/>

    </div>
    <TimeBar timeInterval={customTimeInterval.map((x) => convertFromSecondsToOtherUnits(unitOfTime, x))}
             intervalIndex={-1}
             handleClick={handleRemoveTimeInterval} showIntervalTime height='1.5em' width={"90%"}/>
    <SpacedLabel label={"Total Time"}>
      <p>
        {convertFromSecondsToOtherUnits(unitOfTime, totalTime)} {unitOfTime}s
      </p>
    </SpacedLabel>
  </GenericAcceptanceModal>
}
export default CustomPresetsModal;