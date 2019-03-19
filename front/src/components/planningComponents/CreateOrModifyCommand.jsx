import React, { useState, useEffect } from 'react';
import DayAndTimeSelection from './DayAndTimeSelection';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


const CreateOrModifyCommand = (props) => {
  const [command, setCommand] = useState(props.command)
  useEffect(() => {
    if(props.action === 'UPDATE') {
      if(props.action.endDate !== '') setCommand({...props.command, startDate: new Date(props.command.startDate)})
      else setCommand({...props.command, startDate: new Date(props.command.startDate), endDate: new Date(props.command.endDate)})
    }
  }, [props.command.applianceName]);
  console.log("command", command)

  const renderActionChoice = () => {
    let values = [];
    let display = [];
    if (props.appliance.type === 'plug') {
      values = ["TURN ON", "TURN OFF"];
      display = ["Allumer", "Éteindre"];
    }
    if (props.appliance.type === 'store') {
      values = ["GO UP", "GO DOWN"];
      display = ["Monter", "Descendre"];
    }
    return(
      <tr>
        <td colSpan="2" className="text-center">
          <FormControl>
            <InputLabel shrink htmlFor="select-label">
              Action
            </InputLabel>
            <Select
              autoWidth={true}
              value={command.order}
              onChange={e => setCommand({...command, applianceName: props.appliance.name, order: e.target.value})}
            >
            <MenuItem />
              <MenuItem value={values[0]}>{display[0]}</MenuItem>
              <MenuItem value={values[1]}>{display[1]}</MenuItem>
            </Select>
          </FormControl>
        </td>
      </tr>
    )
  }

  const renderActionOccurence = () => (
    <tr>
      <td colSpan="2" className="text-center">
        <FormControl>
          <InputLabel shrink htmlFor="select-label">
            Fréquence
          </InputLabel>
          <Select
            autoWidth={true}
            value={command.occurence}
            onChange={e => setCommand({...command, occurence: e.target.value})}
          >
          <MenuItem />
            <MenuItem value="Once">1 seule fois</MenuItem>
            <MenuItem value="Every day">Tous les jours</MenuItem>
            <MenuItem value="Every day but WE">Tous les jours sauf WE</MenuItem>
            <MenuItem value="Every week">1 fois / semaine</MenuItem>
          </Select>
        </FormControl>
      </td>
    </tr>
  )
  
  const renderDayAndTimeSelection = (dateToDefine) => (
    <DayAndTimeSelection
      occurence={command.occurence}
      setCommand={setCommand}
      command={command}
      dateToDefine={dateToDefine}
    />
  )

  const renderButtons = (setModalVisibility, action, createCommand, modifyCommand) => {
    let emptyCommand = {applianceName: '', order: '', startDate: '', endDate: '', occurence: ''};
    return(
      <tr>
        <td>
          <Button
            onClick={() => {action === 'SAVE' ? createCommand(command) : modifyCommand(command); setCommand(emptyCommand); setModalVisibility(false)}}
            disabled={command.startDate === ''}
          >
            {action}
          </Button>
        </td>
        <td>
          <Button
            onClick={e => {setCommand(emptyCommand); setModalVisibility(false)}}
          >
            CANCEL
          </Button>
        </td>
      </tr>
    )
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th colSpan="2" className="text-center">
            {(props.appliance) && <p>{props.appliance.name}</p>}
          </th>
        </tr>
      </thead>
      <tbody>
        {renderActionChoice()}
        {command.order !== '' && renderActionOccurence()}
        {command.occurence !== '' && renderDayAndTimeSelection("startDate")}
        {command.startDate !== '' && renderDayAndTimeSelection("endDate")}
        {renderButtons(props.setModalVisibility, props.action, props.createCommand, props.modifyCommand)}
      </tbody>
    </table>
  )
}

export default CreateOrModifyCommand;