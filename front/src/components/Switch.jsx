import React from 'react';
import {turnOn, turnOff, goUp, goDown} from '../functions/commandFunctions';

const Switch = (props) => {
  const renderButtons = (appliance) => {
    let render = [];
    if (appliance.type === 'plug') {
      render.push(
        <div>
          <button style={{ margin: '1vw' }} onClick={() => turnOn(appliance)}>ON</button>
          <button style={{ margin: '1vw' }} onClick={() => turnOff(appliance)}>OFF</button>
        </div>
      )
    }
    if (appliance.type === 'store') {
      render.push(
        <div>
          <button style={{ margin: '1vw' }} onClick={() => goUp(appliance)}>▲</button>
          <button style={{ margin: '1vw' }} onClick={() => goDown(appliance)}>▼</button>
        </div>
      )
    }
    return render;
  }

  return(
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <span style={{ margin: '2vw 4vw 0 0' }}>{props.appliance.name}</span>
      {renderButtons(props.appliance)}
    </div>
  )
}

export default Switch;
