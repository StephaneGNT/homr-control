import React from 'react';
import {turnOn, turnOff, goUp, goDown} from '../functions/appliances-functions';
import { Button } from '@material-ui/core';

const ApplianceAndSwitch = (props) => {
  const renderButtons = (appliance) => {
    let actions = [];
    let switchIndicators = []
    if (appliance.type === 'plug') { actions = [turnOn, turnOff]; switchIndicators = ['ON', 'OFF']}
    if (appliance.type === 'store') { actions = [goUp, goDown]; switchIndicators = ['▲', '▼']}
    return(
      <div>
        <Button style={{ margin: '1vw', backgroundColor: '#00F49A' }} onClick={() => actions[0](appliance)}>{switchIndicators[0]}</Button>
        <Button style={{ margin: '1vw', backgroundColor: 'rgba(241, 0, 41, 0.7' }} onClick={() => actions[1](appliance)}>{switchIndicators[1]}</Button>
      </div>
    )
  }

  return(
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <span style={{ margin: '2vw 4vw 0 0' }}>{props.appliance.name}</span>
      {renderButtons(props.appliance)}
    </div>
  )
}

export default ApplianceAndSwitch;
