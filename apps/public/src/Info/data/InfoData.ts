export type InfoType = { title: string, body: string, className: string, list?: string[] }

const InfoData: InfoType[] = [{
  title: 'The Pomodoro Technique',
  body: 'The Pomodoro Technique is a time management method that can be used for any task. Most people have\n' +
    'the problem of staying focused. People often get distracted after a few minutes of working on a\n' +
    'given task, and this loss of focus can prologue the work being done, to then further the goal,\n' +
    'making it seem farther and farther out of reach.\n' +
    'The loss of time brings anxiety, especially when it involves a deadline, leads into procrastination.\n' +
    'The aim of the Pomodoro Technique is to use time as a valuable ally and to mitigate when you can be\n' +
    'distracted.\n' +
    'Following this leads to accomplishing what we want to do in the way we want to do it, and to enable\n' +
    'us to improve continually the way we work or study.',
  className: 'explanation'
},
  {
    title: 'The Pomodoro Technique will provide a simple tool/process for improving productivity (your own and that of\n' +
      '            your team members) which can do the following:',
    body: 'ul',
    list: ['Alleviate anxiety linked to beginning', 'Enhance focus and concentration by cutting down on interruptions',
      'Increase awareness of your decisions', 'Boost motivation and keep it constant', 'Bolster the determination to achieve your goals',
      'Refine the estimation process, both in qualitative and quantitative terms', 'Improve your work or study process',
      'Strengthen your resolve to keep on applying yourself in the face of complex situations'
    ],
    className: 'goals'
  },
  {
    title: 'At the beginning of each day select the tasks you need to complete and put them on the TODO list above.',
    body: 'ol',
    list: ['Start the Pomodoro Timer', 'Work until the Pomodoro rings',
      'Take a short break (3-5 minutes)', 'Keep on working, Pomodoro after Pomodoro, until the task at hand is finished. Every 4 Pomodoros take a longer break, (15–30 minutes).',
      'Repeat'
    ],
    className: 'instructions'
  },
  {
    title: 'Tips',
    body: 'ul',
    list: ['If a task takes more than 5 – 7 Pomodoros, break it down',
      'If it takes less than one Pomodoro, add it up, and combine it with another task',
      'The next Pomodoro will go better',
      'Login to the service and track your progress'
    ],
    className: 'instructions'
  },
];
export default InfoData;