import React, {useState} from 'react';
import CreateOrModifyCommand from './CreateOrModifyCommand';
import { getDayDetails } from '../../functions/dateFunctions';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const Agenda = (props) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState({name: '', type: ''});
  const [selectedCommand, setSelectedCommand] = useState({applianceName: '', order: '', startDate: '', endDate: '', occurence: ''})
  const [actionModifyOrCreate, setActionModifyOrCreate] = useState('')

  const renderTableBody=(appliances, props)=>{
    const render = [];
    appliances.map((appliance, index) => render.push(
      <tr key={index}>
        <td>{appliance.name}</td>
        <td style={{textAlign: 'center'}}>{showApplianceProgram(appliance, props)}</td>
      </tr>
    ))
    return render;
  }

  const showApplianceProgram = (appliance, props) => {
    let render = [];
    props.commands.map((command, index) => {
      if(command.applianceName === appliance.name) render.push(
        <div key={index} className="orderForAppliance">
          {renderEachProgram(command)}
          <Fab size="small" onClick={() => props.deleteCommand(command)}>
            <DeleteIcon fontSize="small" />
          </Fab>
          <Fab size="small" onClick={() => {setSelectedAppliance(appliance); setSelectedCommand(command); setActionModifyOrCreate('UPDATE'); setModalVisibility(true);}}>
            <EditIcon />
          </Fab>
        </div>
      )
    })
    render.push(
      <Fab size="small" color="primary" onClick={() => {setModalVisibility(true); setSelectedAppliance(appliance); setActionModifyOrCreate('SAVE')}}>
        <AddIcon />
      </Fab>
    );
    return render;
  }

  const renderEachProgram = (command) => {
    let render = [];
    let dayNameWanted = true;
    if (command.occurence === 'Every day' || command.occurence === 'Every day but WE') dayNameWanted = command.occurence;
    render.push(
      <div>
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

  return (
    <div>
      <div style={modalStyle}>
        <CreateOrModifyCommand
          setModalVisibility={setModalVisibility}
          appliance={selectedAppliance}
          command={selectedCommand}
          action={actionModifyOrCreate}
          createCommand={props.createCommand}
          modifyCommand={props.modifyCommand}
        />
      </div>
      <table style={notModalStyle}>
        <tbody>
          {renderTableBody(props.appliances.plugs, props)}
          {renderTableBody(props.appliances.stores, props)}
          {/* {renderTableBody(props.programs, props)} */}
        </tbody>
      </table>
    </div>
  )
}

export default Agenda;