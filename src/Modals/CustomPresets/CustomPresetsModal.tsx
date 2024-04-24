import {SpacedLabeledInput} from "../CustomTimer/SpacedLabeledInput/SpacedLabeledInput";
import {Button, GenericAcceptanceModal} from "koi-pool";
import TimeBar from "../../components/TimeBar/TimeBar";
import {convertFromSecondsToOtherUnits, convertFromUnitOfTimeToSeconds} from "../../Utlis/Converters";
import React, {useState} from "react";
import {round} from "../../Utlis/TimerUtils";
import {useTimerContext} from "../../Context/TimerContext";
import {FloatingLabelInputWithButton} from "../CustomTimer/FloatingLabelInputWithButton/FloatingLabelInputWithButton";

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
  const [customTime, setCustomTime] = useState<number>(25 * 60);
  const [customTimeInterval, setCustomTimeInterval] = useState<number[]>([25 * 60]);
  const [title, setTitle] = useState<string>(`Custom Preset ${Object.keys(presets).length - 2}`);
  const [description, setDescription] = useState<string>("");

  const handleAddTimeIntervalToCurrent = (interval: number) => {
    setCustomTimeInterval((prevState) => [...prevState, interval])
  };

  const handleRemoveTimeInterval = (index: number) => {
    const currentInterval = customTimeInterval;
    currentInterval.splice(index, 1);
    setCustomTimeInterval([...currentInterval])
  };

  const handleAddPreset = () => {
    if (customTimeInterval.length >= 2) {
      intervalPresetsDispatch({
        type: "addPreset", preset: {
          title,
          description,
          timeInterval: customTimeInterval,
        },
      })
      handleClose();
    } else {
      alert('The time sequence is not large enough.')
    }
  };

  const totalTime = round(customTimeInterval.reduce((a, b) => a + b, 0), 2);

  return <GenericAcceptanceModal handleClose={handleClose} isOpen={isOpen} title={"Custom Preset"}
                                 handleSubmit={handleAddPreset}>
    <SpacedLabeledInput label={'Title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
    <SpacedLabeledInput label={'Description'} value={description} onChange={(e) => setDescription(e.target.value)}
                        width={'50%'}/>
    <div>
      <Button onClick={() => handleAddTimeIntervalToCurrent(pomodoro)}>
        Pomodoro
      </Button>
      <Button onClick={() => handleAddTimeIntervalToCurrent(shortBreak)}>
        Short Break
      </Button>
      <Button onClick={() => handleAddTimeIntervalToCurrent(longBreak)}>
        Long Break
      </Button>
      <FloatingLabelInputWithButton onChange={(e) => setCustomTime(Number(e.target.value))} type={'number'}
                                    label={"Custom Time"} width={"128px"}
                                    onClick={() => handleAddTimeIntervalToCurrent(convertFromUnitOfTimeToSeconds(unitOfTime, customTime))}/>

    </div>
    <TimeBar timeInterval={customTimeInterval.map((x) => convertFromSecondsToOtherUnits(unitOfTime, x))}
             intervalIndex={-1}
             handleClick={handleRemoveTimeInterval} showIntervalTime height='1.5em' width={"90%"}/>

    <p>
      Total Time:
      <span>{convertFromSecondsToOtherUnits(unitOfTime, totalTime)} {unitOfTime}s</span>
    </p>

  </GenericAcceptanceModal>
}
export default CustomPresetsModal;