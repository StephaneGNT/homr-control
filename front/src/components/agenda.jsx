import React, {useState} from 'react';
import CreateOrModifyCommand from './create-or-modify-command';
import ConfirmationWindow from './confirmation-window';
import { getDayDetails } from '../functions/date-functions';

import Fab from '@material-ui/core/Fab';

import Appliance from '../models/appliance-model';
import Command from '../models/command-model';

const Agenda = (props) => {
  const blankAppliance = new Appliance('', '');
  const blankCommand = new Command(blankAppliance, '', '', '');

  const [modalVisibility, setModalVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(blankCommand);
  const [actionModifyOrCreate, setActionModifyOrCreate] = useState('');

  const modalStyle = {
    display: modalVisibility ? 'block' : 'none',
    zIndex: 2,
    position: 'absolute',
    top: '10vh',
  }
  const notModalStyle = {
    opacity: modalVisibility ? 0.1 : 1,
    zIndex: 1,
  }

  const renderTableBody=(appliances, commands)=>{
    const render = [];
    appliances.map((appliance, index) => render.push(
      <tr key={index}>
        <td>{appliance.name}</td>
        <td style={{textAlign: 'center'}}>{showApplianceCommands(appliance, commands)}</td>
      </tr>
    ))
    return render;
  }

  const showApplianceCommands = (appliance, commands) => {
    console.log("commands in showAppliance", commands)
    console.log("appliance in showAppliance", appliance)
    let render = [];
    commands.map((command, index) => {
      if(command.appliance.name === appliance.name) render.push(
        <div key={index} className="orderForAppliance">
          {renderEachCommand(command, index)}
          <Fab size="small" onClick={() => {setSelectedCommand(command); setOpen(true)}}>
          <i className="material-icons">delete</i>
          </Fab>
          <Fab size="small" onClick={() => {setSelectedCommand(command); setActionModifyOrCreate('UPDATE'); setModalVisibility(true);}}>
          <i className="material-icons">create</i>
          </Fab>
        </div>
      )
    })
    return render;
  }

  const renderEachCommand = (command, index) => {
    let render = [];
    let dayNameWanted = true;
    if (command.occurence === 'Every day' || command.occurence === 'Every day but WE') dayNameWanted = command.occurence;
    render.push(
      <div key={index}>
        <p>{command.order}</p>
        <p>
          <span>{getDayDetails(command.startDate, dayNameWanted, true)}</span>
          <span>{command.endDate && `${getDayDetails(command.endDate, '', true)}`}</span>
        </p>
        <p>{command.occurence}</p>
      </div>
    )
    return render;
  }


  const { appliances, commands, createCommand, modifyCommand, deleteCommand } = props;
  return (
    <div>
      <div style={notModalStyle}>
        <table>
          <tbody>
            {renderTableBody(appliances.plugs, commands)}
            {renderTableBody(appliances.stores, commands)}
            {/* {renderTableBody(props.programs, props)} */}
          </tbody>
        </table>
        <Fab size="small" color="primary" onClick={() => {setModalVisibility(true); setActionModifyOrCreate('SAVE')}}>
        <i className="material-icons">add</i>
        </Fab>
      </div>
      <div style={modalStyle}>
        <CreateOrModifyCommand
          selectedCommand={selectedCommand}
          setSelectedCommand={setSelectedCommand}
          action={actionModifyOrCreate}
          // appliance={selectedAppliance}
          appliances={appliances}
          setModalVisibility={setModalVisibility}
          // applianceActions={selectedAppliance.type === 'plug' ? props.appliances.plugActions : props.appliances.storeActions}
          createCommand={createCommand}
          modifyCommand={modifyCommand}
          // show="all"
        />
      </div>
      <ConfirmationWindow
        open={open}
        setOpen={setOpen}
        selectedData={selectedCommand}
        delete={deleteCommand}
        type="cette commande"
      />
    </div>
  )
}

export default Agenda;
