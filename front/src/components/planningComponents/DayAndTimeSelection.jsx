import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const DayAndTimeSelection = (props) => {
  const formatDate = (dayNumber, time, props) => {
    let newTime = new Date();
    if (dayNumber) {
      if (dayNumber > newTime.getDay()) newTime.setDate(newTime.getDate()+(dayNumber - newTime.getDay()))
      else newTime.setDate(newTime.getDate()+(7 + (dayNumber - newTime.getDay())))
    }
    if (time) { 
      let timeArray = time.split(":");
      newTime.setHours(timeArray[0]);
      newTime.setMinutes(timeArray[1]);
      newTime.setSeconds(0);
    }
    props.setCommand({...props.command, [props.dateToDefine]: newTime});
  }

  const getHoursAndMinutesFromDate = (date) => {
    let hoursAndMinutes = '';
    if (date !== '' && date !== null) {
      date.getHours() < 10 ? hoursAndMinutes += `0${date.getHours()}:` : hoursAndMinutes += `${date.getHours()}:`;
      date.getMinutes() < 10 ? hoursAndMinutes += `0${date.getMinutes()}` : hoursAndMinutes += `${date.getMinutes()}`;
    }
    return hoursAndMinutes;
  }

  if(props.occurence === "Once") {
    return (
      <tr>
        <td>{props.dateToDefine === "startDate" ? <p>Début</p> : <p>Fin <br/><span style={{fontSize:'0.7em'}}>(optionnelle)</span></p>}</td>
        <td colSpan="2" className="text-center">
          <TextField
            label="Date et heure"
            type="datetime-local"
            value={props.command[props.dateToDefine]}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => {console.log(e.target.value); props.setCommand({...props.command, [props.dateToDefine]: e.target.value})}}
          />
        </td>
      </tr>
    )
  }

  if(props.occurence === 'Every day' || props.occurence === 'Every day but WE') {
    return(
      <tr>
        <td>{props.dateToDefine === "startDate" ? <p>Début</p> : <p>Fin <br/><span style={{fontSize:'0.7em'}}>(optionnelle)</span></p>}</td>
        <td colSpan="2" className="text-center">
          <TextField
            label="Heure"
            type="time"
            value={getHoursAndMinutesFromDate(props.command[props.dateToDefine])}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={e => formatDate(false, e.target.value, props)}
          />
        </td>
      </tr>
    )
  }
  if(props.occurence === 'Every week') {
    return(
      <tr>
        <td>{props.dateToDefine === "startDate" ? <p>Début</p> : <p>Fin <br/><span style={{fontSize:'0.7em'}}>(optionnelle)</span></p>}</td>
        <td>
          <FormControl>
            <InputLabel shrink htmlFor="select-label">
              Jour
            </InputLabel>
            <Select
              // value='LUN'
              onChange={e => formatDate(e.target.value, false, props)}
              input={<Input className="select-label" />}
            >
              <MenuItem />
              <MenuItem value={1}>LUN</MenuItem>
              <MenuItem value={2}>MAR</MenuItem>
              <MenuItem value={3}>MER</MenuItem>
              <MenuItem value={4}>JEU</MenuItem>
              <MenuItem value={5}>VEN</MenuItem>
              <MenuItem value={6}>SAM</MenuItem>
              <MenuItem value={0}>DIM</MenuItem>
            </Select>
          </FormControl>
        </td>
        <td className="text-center">
          <TextField
            label="Heure"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={e => formatDate(false, e.target.value, props)}
          />
        </td>
      </tr>
    )
  }
}

export default DayAndTimeSelection;