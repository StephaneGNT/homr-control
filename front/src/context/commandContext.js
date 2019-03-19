import React from "react";
import axios from "axios";

const CommandContext = React.createContext()

class CommandProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: []
    }
    this.getCommands();
  }

  getCommands = () => {
    axios
      .get('/api/command')
      .then(res => this.setState({ commands: res.data }))
  }

  deleteCommand = (command) => {
    const { commands } = this.state;
    axios
      .delete(`/api/command/${command._id}`)
      .then(() => {
        let localCommands = commands;
        let commandToDelete = localCommands.filter(localCommand => localCommand._id === command._id);
        let indexToDelete = localCommands.indexOf(commandToDelete[0]);
        localCommands.splice(indexToDelete,1);
        this.setState({ commands: localCommands })
      })
  }

  modifyCommand = (command) => {
    const { commands } = this.state;
    axios
      .put(`/api/command/${command._id}`)
      .then((res) => {
        let localCommands = commands;
        let commandToUPdate = localCommands.filter(localCommand => localCommand._id === command._id);
        let indexToUpdate = localCommands.indexOf(commandToUPdate[0]);
        localCommands.splice(indexToUpdate,1, command);
        this.setState({ commands: localCommands })
      })
  }

  createCommand = (command) => {
    const { commands } = this.state;
    axios.post('/api/command/', command).then(res => {
      let localCommands = commands;
      localCommands.push(res.data);
      this.setState({ commands: localCommands });
    })
  }

  render() {
    const { children } = this.props;
    const { commands } = this.state;
    console.log("commands", commands)
    return (
      <CommandContext.Provider
        value={{
          commands,
          deleteCommand:this.deleteCommand,
          modifyCommand:this.modifyCommand,
          createCommand:this.createCommand
        }}
      >
        {children}
      </CommandContext.Provider>
    )
  }
}

export default CommandContext

export { CommandProvider }