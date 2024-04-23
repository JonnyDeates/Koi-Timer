import { createId } from "@paralleldrive/cuid2"

export type Preset = { title: string, description: string, timeInterval: number[] }

export const DEFAULT_PRESETS: Record<string, Preset> = {
    "theStandard": {
        title: 'The Standard',
        description: 'The standard model of the pomodoro drone.',
        timeInterval: [25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 15 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 15 * 60, 10 * 60],
    },
    "theKoiTimer": {
        title: 'The Koi Timer',
        description: 'My idea of a good work ethic.',
        timeInterval: [25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 20 * 60, 30 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 5 * 60, 25 * 60, 20 * 60, 25 * 60],
    },
    "theRevisedStandard": {
        title: 'The Revised Standard',
        description: 'A revised model of the pomodoro drone, shorter in case to fit some people\'s time constraints.',
        timeInterval: [20 * 60, 5 * 60, 20 * 60, 5 * 60, 20 * 60, 5 * 60, 20 * 60, 15 * 60, 20 * 60, 5 * 60, 20 * 60, 5 * 60, 20 * 60, 5 * 60, 20 * 60, 15 * 60, 20 * 60],
    }
};

export const DEFAULT_PRESET_IDS = Object.keys(DEFAULT_PRESETS);

type Presets = Record<string, Preset>
export type IntervalPresetsReducerState = { presets: Presets, currentPresetId: string, intervalIndex: number }
export type IntervalPresetsReducerAction =
    { type: "addPreset", preset: Preset }
    | { type: "removePreset" | "changePreset", id: string }
    | { type: "incrementIntervalIndex" | 'decrementIntervalIndex' }
    | { type: "setIntervalIndex", index: number }
const intervalPresetsReducer = (state: IntervalPresetsReducerState, action: IntervalPresetsReducerAction): IntervalPresetsReducerState => {
    switch (action.type) {
        case "addPreset": {
            const id = createId();
            return {
                intervalIndex: 0,
                presets: { ...state.presets, [id]: action.preset },
                currentPresetId: id
            };
        }
        case "changePreset":
            return {
                ...state,
                intervalIndex: 0,
                currentPresetId: action.id
            };
        case "removePreset": {
            const tempPresets = state.presets;
            delete tempPresets[action.id];
            return {
                intervalIndex: 0,
                presets: tempPresets,
                currentPresetId: 'theStandard'
            }
        }
        case "incrementIntervalIndex": {
            return {
                ...state,
                intervalIndex: state.intervalIndex + 1 >= state.presets[state.currentPresetId].timeInterval.length ? 0 : state.intervalIndex + 1
            }
        }
        case "decrementIntervalIndex": {
            return {
                ...state,
                intervalIndex: state.intervalIndex - 1 < 0 ? state.presets[state.currentPresetId].timeInterval.length - 1 : state.intervalIndex - 1
            }
        }
        case "setIntervalIndex": {
            return {
                ...state,
                intervalIndex: action.index
            }
        }
    }
};
export default intervalPresetsReducer;