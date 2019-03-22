import React, {useState} from "react";
import ConfirmationWindow from './confirmation-window';
import CreateOrModifyProgram from "./create-or-modify-program";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// import { goUp, goDown, turnOn, turnOff } from '../../functions/commandFunctions';

const ProgramList = (props) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState({applianceName: '', order:''});

  const renderProgramList = (props) => {
    let render = [];
    props.programs.map((program, index) => {
      render.push(
        <div className="orderForAppliance" key={index}>
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
    program.commands.map((command, index) => {
      render.push(
        <p key={index}>{command.applianceName} - {command.order}</p>
      )
    })
    return render;
  }

  const createOrModifyStyle = {
    display: visible ? 'block' : 'none'
  }

  const programListStyle = {
    display: !visible ? 'block' : 'none'
  }

  return (
    <div>
      <ConfirmationWindow
        open={open}
        setOpen={setOpen}
        selectedData={selectedProgram}
        delete={props.deleteProgram}
        type="ce programme"
      />
      <div style={createOrModifyStyle}>
        <CreateOrModifyProgram
          appliances={props.appliances}
          program={selectedProgram}
          setVisible={setVisible}
          save={props.saveProgram}
        />
      </div>
      <div className="text-center" style={programListStyle}>
        {renderProgramList(props)}
        <Fab size="small" color="primary" onClick={() => setVisible(true)}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  )
}

export default ProgramList;
