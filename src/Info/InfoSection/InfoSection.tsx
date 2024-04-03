import React from 'react';
import {InfoType} from "../data/InfoData";

const InfoSection = ({body, list, style, title}: InfoType) => {

  const BodyOfInfoSection = () => {
    if (!list) {
      return <p>{body}</p>
    } else if (body === 'ol') {
      return <ol>{list.map((obj, i) => <li key={i}>{obj}</li>)}</ol>
    } else {
      return <ul>{list.map((obj, i) => <li key={i}>{obj}</li>)}</ul>
    }
  };

  return (
    <div className={style}>
      <h3>{title}</h3>
      {<BodyOfInfoSection/>}
    </div>
  );
};


export default InfoSection;
