import React, {useState} from "react";
import ConfirmationWindow from '../ConfirmationWindow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { goUp, goDown, turnOn, turnOff } from '../../functions/commandFunctions';

const ProgramList = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState();

  const renderProgramList = (props) => {
    let render = [];
    props.programs.map(program => {
      render.push(
        <div className="orderForAppliance">
          <b>{program.name}</b>
          {renderProgram(program)}
          <Fab size="small">
            <i className="material-icons">play_arrow</i>
          </Fab>
          <div className="row" style={{justifyContent: "center", backgroundColor: "lightgrey", margin: "1vh 0 -0.5vh 0", borderRadius: "5px"}}>
            <Fab size="small" onClick={() => {setSelectedProgram(program); setOpen(true)}}>
              <i className="material-icons">delete</i>
            </Fab>
            <Fab size="small" /*onClick={() => { setSelectedAppliance(appliance); setSelectedProgram(program); setActionModifyOrCreate('UPDATE'); setModalVisibility(true); }}*/>
              <i className="material-icons">create</i>
            </Fab>
            <Fab size="small" /*onClick={() => { setSelectedAppliance(appliance); setSelectedProgram(program); setActionModifyOrCreate('UPDATE'); setModalVisibility(true); }}*/>
              <i className="material-icons">access_time</i>
            </Fab>
          </div>
        </div>
      )
    })
    return render;
  }

  const renderProgram = (program) => {
    let render =[];
    program.commands.map(command => {
      render.push(
        <p>{command.applianceName} - {command.order}</p>
      )
    })
    return render;
  }

  return (
    <div>
      <ConfirmationWindow 
        open
        setOpen
        selectedData={selectedProgram}
        delete={props.deleteProgram}
      />
      <div className="text-center">
        {renderProgramList(props)}
        <Fab size="small" color="primary" /*onClick={() => {setModalVisibility(true); setSelectedAppliance(appliance); setActionModifyOrCreate('SAVE')}}*/>
          <AddIcon />
        </Fab>
      </div>
    </div>
  )
}

export default ProgramList;