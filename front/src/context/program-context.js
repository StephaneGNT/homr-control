import React from "react";
import axios from "axios";

const ProgramContext = React.createContext()

class ProgramProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [
        {
          name: 'All lights off',
          commands: [
            {
              applianceName: 'Lampe 1',
              order: 'TURN OFF',
              startDate: null,
              endDate: null,
              occurence: null,
            },
            {
              applianceName: 'Lampe 2',
              order: 'TURN OFF',
              startDate: null,
              endDate: null,
              occurence: null,
            }
          ]
        }
      ]
    }
    // this.getPrograms();
  }

  getPrograms = () => {
    axios
      .get('/api/program')
      .then(res => this.setState({ programs: res.data }))
  }

  deleteProgram = (program) => {
    const { programs } = this.state;
    axios
      .delete(`/api/program/${program._id}`)
      .then(() => {
        let localPrograms = programs;
        let programToDelete = localPrograms.filter(localProgram => localProgram._id === program._id);
        let indexToDelete = localPrograms.indexOf(programToDelete[0]);
        localPrograms.splice(indexToDelete,1);
        this.setState({ programs: localPrograms })
      })
  }

  modifyProgram = (program) => {
    const { programs } = this.state;
    axios
      .put(`/api/program/${program._id}`)
      .then((res) => {
        let localPrograms = programs;
        let programToUPdate = localPrograms.filter(localProgram => localProgram._id === program._id);
        let indexToUpdate = localPrograms.indexOf(programToUPdate[0]);
        localPrograms.splice(indexToUpdate,1, program);
        this.setState({ programs: localPrograms })
      })
  }

  createProgram = (program) => {
    const { programs } = this.state;
    axios.post('/api/program/', program).then(res => {
      let localPrograms = programs;
      localPrograms.push(res.data);
      this.setState({ programs: localPrograms });
    })
  }

  render() {
    const { children } = this.props;
    const { programs } = this.state;
    return (
      <ProgramContext.Provider
        value={{
          programs,
          deleteProgram:this.deleteProgram,
          modifyProgram:this.modifyProgram,
          createProgram:this.createProgram
        }}
      >
        {children}
      </ProgramContext.Provider>
    )
  }
}

export default ProgramContext

export { ProgramProvider }