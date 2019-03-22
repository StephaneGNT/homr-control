import React from "react";
import axios from 'axios';

const ApplianceContext = React.createContext()

class ApplianceProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      plugs : [],
      stores : [],
      plugActions: ["TURN ON", "TURN OFF"],
      storeActions: ["GO UP", "GO DOWN"],
    }
    this.getAppliances();
  }
  
  getAppliances = async () => {
    axios.get(`/api/appliance/plugs`).then(res => this.setState({ plugs: res.data }))
    axios.get(`/api/appliance/stores`).then(res => this.setState({ stores: res.data }))
  } 

  render() {
    const { children } = this.props;
    const {plugs, stores, plugActions, storeActions} = this.state;
    return (
      <ApplianceContext.Provider
        value={{
          plugs,
          stores,
          plugActions,
          storeActions
        }}
      >
        {children}
      </ApplianceContext.Provider>
    )
  }
}

export default ApplianceContext

export { ApplianceProvider }