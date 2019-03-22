import React, { useState } from 'react';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
import { Button, TextField, Select, InputLabel,MenuItem, FormControl } from '@material-ui/core';

const CreateOrModifyProgram = (props) => {
	const [program, setProgram]=useState({name: '', commands:[]});
	const [selectedAppliance, setSelectedAppliance] = useState({name: '', type: ''});
	const [command, setCommand] = useState({applianceName: '', order: '', startDate: '', endDate: '', occurence: ''})

	const renderApplianceAndActionsChoice = (props) => {
    return(
			<div className="row" style={{justifyContent: "space-between"}}>
				<FormControl>
					<InputLabel shrink htmlFor="select-label">
						Appliance
					</InputLabel>
					<Select
						autoWidth={true}
						value={command.applianceName}
						onChange={e => {setCommand({...command, applianceName: e.target.value.name}); setSelectedAppliance(e.target.value);}}
					>
						<MenuItem />
						{showAppliances(props.appliances)}
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel shrink htmlFor="select-label">
						Action
					</InputLabel>
					<Select
						autoWidth={true}
						value={command.order}
						onChange={e => setCommand({...command, order: e.target.value})}
					>
						<MenuItem />
						{showActions(props)}
					</Select>
				</FormControl>
				<Button size="small" disabled={command.applianceName === '' || command.order === ''} onClick={() => addCommandToProgram(command)}>
					<i className="material-icons">done</i>
				</Button>
			</div>
    )
	}

	const showAppliances = (appliances) => {
		let render = [];
		appliances.plugs.map((plug, index) => render.push(
			<MenuItem value={plug} key={index}>{plug.name}</MenuItem>
		));
		appliances.stores.map((store, index) => render.push(
			<MenuItem value={store} key={index}>{store.name}</MenuItem>
		));
		return render;
	}

	const showActions = (props) => {
		let actionsToDisplay = [];
		let render = [];
		if (selectedAppliance.type === "plug") actionsToDisplay = props.appliances.plugActions;
		if (selectedAppliance.type === "store") actionsToDisplay = props.appliances.storeActions;
		actionsToDisplay.map(action => render.push(
			<MenuItem value={action}>{action}</MenuItem>
		))
		return render;
	}

	const addCommandToProgram = (command) => {
		let localProgramCommands = program.commands;
		localProgramCommands.push(command);
		setProgram({ ...program, commands: localProgramCommands});
		setCommand({applianceName: '', order: '', startDate: '', endDate: '', occurence: ''});
		setSelectedAppliance({name: '', type: ''});
	}

	const renderProgramInConstruction = () => {
		const render = [];
		program.commands.map(command => {
			render.push(
				<div className="row">
					<div className="col-9"><span>{command.applianceName} - {command.order}</span></div>
					<div className="col-2"><Button size="small" onClick={()=>{deleteCommandFromProgram(command)}}><i className="material-icons">cancel</i></Button></div>
				</div>
			)
		})
		return render;
	}

	const deleteCommandFromProgram = (command) => {
		let localProgramCommands = program.commands;
		let commandToRemove = localProgramCommands.filter(localCommand => localCommand.applianceName === command.applianceName && localCommand.order === command.order);
		let indexOfCommandToRemove = localProgramCommands.indexOf(commandToRemove[0]);
		localProgramCommands.splice(indexOfCommandToRemove, 1);
		setProgram({ ...program, commands: localProgramCommands});
	}

	const renderButtons = (props) => {
		return(
			<div className="row">
				<Button
					onClick={()=> {
						props.setVisible(false);
						setProgram({name: '', commands:[]});
						setSelectedAppliance({name: '', type: ''});
						setCommand({applianceName: '', order: '', startDate: '', endDate: '', occurence: ''})
					}}
				>
					CANCEL
				</Button>
				<Button
					disabled={program.commands.length === 0 || program.name === ''}
					onClick={()=>{
						props.save(program);
						props.setVisible(false);
						setProgram({name: '', commands:[]});
						setSelectedAppliance({name: '', type: ''});
						setCommand({applianceName: '', order: '', startDate: '', endDate: '', occurence: ''})
					}}
				>
					SAVE
				</Button>
			</div>
		)
	}

	return(
		<div>
			<TextField
				label="Nom du programme"
				value={program.name}
				onChange={e => setProgram({...program, name: e.target.value})}
				margin="normal"
			/>
			{renderApplianceAndActionsChoice(props)}
			{renderProgramInConstruction()}
			{renderButtons(props)}
		</div>
	)
}

export default CreateOrModifyProgram;
