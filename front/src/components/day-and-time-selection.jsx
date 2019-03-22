import React from 'react';
import { TextField, Select, MenuItem, InputLabel, Input, FormControl } from '@material-ui/core';

const DayAndTimeSelection = (props) => {
  console.log("props in DayAndTimeSelection", props)
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

  const getHoursAndMinutesFromDate = (dateInStringFormat) => {
    // console.log("date", date)
    // console.log("date format", typeof(date))
    let hoursAndMinutes = '';
    if (dateInStringFormat !== '') {
      let date = new Date(dateInStringFormat);
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
            onChange={e => {console.log("command", props.command); console.log("e.target.value", e.target.value); console.log("props.dateToDefine", props.dateToDefine); props.setCommand({...props.command, [props.dateToDefine]: e.target.value})}}
          />
        </td>
      </tr>
    )
  }

  if(props.occurence === 'Every day' || props.occurence === 'Every day but WE') {
    return(
      <div className="row  mt-3">
        <div className="col-6">
          {props.dateToDefine === "startDate" ? <p>Début</p> : <p>Fin <br/><span style={{fontSize:'0.7em'}}>(optionnelle)</span></p>}
        </div>
        <div className="col-6 text-center">
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
        </div>
      </div>
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
              value={props.command.startDate}
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
