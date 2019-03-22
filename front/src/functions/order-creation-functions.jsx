import React from 'react';
import DayAndTimeSelection from '../components/day-and-time-selection';
import { Select, InputLabel, MenuItem, FormControl, Button } from '@material-ui/core';

import Appliance from '../models/appliance-model';
import Command from '../models/command-model'

const blankAppliance = new Appliance('', '');
const blankCommand = new Command(blankAppliance, '', '', '');

export const renderAppliancesChoice = (props) => {
  const { selectedCommand, setSelectedCommand, appliances } = props;
  console.log("props in order-creation-function", props)
  console.log("applianceName in order-creation-function", selectedCommand.appliance.name)
  return (
    <div className="row" style={{justifyContent: "space-between"}}>
      <FormControl>
        <InputLabel shrink htmlFor="select-label">
          Appliance
        </InputLabel>
        <Select
          autoWidth={true}
          value={selectedCommand.appliance.name}
          onChange={e => setSelectedCommand({...selectedCommand, appliance: e.target.value})}
        >
          <MenuItem />
          {showAppliances(appliances)}
        </Select>
      </FormControl>
    </div>
  )
}

export const renderActionsChoice = (props) => {
  const { selectedCommand, setSelectedCommand } = props;
  return (
    <div className="row mt-3">
      <FormControl>
        <InputLabel shrink htmlFor="select-label">
          Action
        </InputLabel>
        <Select
          autoWidth={false}
          value={selectedCommand.order}
          onChange={e => setSelectedCommand({...selectedCommand, order: e.target.value})}
        >
          <MenuItem />
          {showActions(selectedCommand.appliance, props)}
        </Select>
      </FormControl>
    </div>
  )
}

const showAppliances = (appliances) => {
  console.log("appliances", appliances)
  let render = [];
  appliances.plugs.map((plug, index) => render.push(
    <MenuItem value={plug} key={index}>{plug.name}</MenuItem>
  ));
  appliances.stores.map((store, index) => render.push(
    <MenuItem value={store} key={index}>{store.name}</MenuItem>
  ));
  return render;
}

const showActions = (appliance, props) => {
  let actionsToDisplay = [];
  let render = [];
  if (appliance.type === "plug") actionsToDisplay = props.appliances.plugActions;
  if (appliance.type === "store") actionsToDisplay = props.appliances.storeActions;
  actionsToDisplay.map(action => render.push(
    <MenuItem value={action}>{action}</MenuItem>
  ))
  return render;
}

export const renderConfirmationButton = (selectedCommand, props) => (
  <Button size="small" disabled={selectedCommand.appliance.name === '' || selectedCommand.order === ''} onClick={() => addCommandToProgram(selectedCommand, props)}>
    <i className="material-icons">done</i>
  </Button>
)

const addCommandToProgram = (selectedCommand, props) => {
  const { setProgram, program, setSelectedCommand } = props;
  let localProgramCommands = program.commands;
  localProgramCommands.push(selectedCommand);
  setProgram({ ...program, commands: localProgramCommands});
  setSelectedCommand(blankCommand);
}

export const renderActionOccurence = (selectedCommand, setSelectedCommand) => (
  <div className="row mt-3">
    <FormControl>
      <InputLabel shrink htmlFor="select-label">
        Fréquence
          </InputLabel>
      <Select
        autoWidth={true}
        value={selectedCommand.occurence}
        onChange={e => setSelectedCommand({ ...selectedCommand, occurence: e.target.value })}
      >
        <MenuItem />
        <MenuItem value="Once">1 seule fois</MenuItem>
        <MenuItem value="Every day">Tous les jours</MenuItem>
        <MenuItem value="Every day but WE">Tous les jours sauf WE</MenuItem>
        <MenuItem value="Every week">1 fois / semaine</MenuItem>
      </Select>
    </FormControl>
  </div>
)

export const renderDayAndTimeSelection = (dateToDefine, selectedCommand, setSelectedCommand) => (
  <DayAndTimeSelection
    occurence={selectedCommand.occurence}
    setCommand={setSelectedCommand}
    command={selectedCommand}
    dateToDefine={dateToDefine}
  />
)

export const renderButtons = (props, selectedCommand, setSelectedCommand) => {
  const { setModalVisibility, action, createCommand, modifyCommand } = props;
  return(
    <div className="row">
      <Button
        onClick={() => {action === 'SAVE' ? createCommand(selectedCommand) : modifyCommand(selectedCommand); setSelectedCommand(blankCommand); setModalVisibility(false)}}
        disabled={selectedCommand.startDate === ''}
      >
        {action}
      </Button>
      <Button
        onClick={e => {setSelectedCommand(blankCommand); setModalVisibility(false)}}
      >
        CANCEL
      </Button>
    </div>
  )
}
