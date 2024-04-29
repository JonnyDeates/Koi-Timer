import {SoundEffect} from "../model/SoundEffect";
import alarm5 from "../assets/198841__bone666138__alarm_clock.wav";
import alarm4 from "../assets/219244__zyrytsounds__alarm_clock.wav";
import bell from "../assets/460262__ddmyzik__bell.wav";
import alarm1 from "../assets/381382__coltonmanz__alarm_buzz.wav";
import alarm2 from "../assets/250629__kwahmah_02__alarm_beep.wav";
import fireAlarm from "../assets/369848__splicesound__smoke_detector.wav";
import alarm3 from "../assets/248211__jomellejager__alarm_scifi.wav";
import alarm6 from "../assets/84423__g_lowing__alarm_clock.wav";


export const DEFAULT_SOUND_LIST: SoundEffect[] = [{
  title: 'Analog Alarm Clock',
  author: 'bone666138',
  sound: alarm5,
  link: 'https://freesound.org/people/bone666138/sounds/198841/'
}, {
  title: 'Alarm Clock',
  author: 'ZyryTSounds',
  sound: alarm4,
  link: 'https://freesound.org/people/ZyryTSounds/sounds/219244/'
}, {
  title: 'Bell',
  author: 'DDmyzik',
  sound: bell,
  link: 'https://freesound.org/people/DDmyzik/sounds/460262/'
}, {
  title: 'Alarm Buzz',
  author: 'coltonmanz',
  sound: alarm1,
  link: 'https://freesound.org/people/coltonmanz/sounds/381382/'
}, {
  title: 'Alarm Beep',
  author: 'kwahmah_02',
  sound: alarm2,
  link: 'https://freesound.org/people/kwahmah_02/sounds/250629/'
}, {
  title: 'Smoke Detector',
  author: 'SpliceSound',
  sound: fireAlarm,
  link: 'https://freesound.org/people/SpliceSound/sounds/369848/'
}, {
  title: 'Alarm Scifi',
  author: 'JomelleJager',
  sound: alarm3,
  link: 'https://freesound.org/people/JomelleJager/sounds/248211/'
},
  {
    title: "Alarm Ring",
    author: 'g_lowing',
    sound: alarm6,
    link: 'https://freesound.org/s/84423/'
  }
];

export const DEFAULT_SOUND = DEFAULT_SOUND_LIST[0];