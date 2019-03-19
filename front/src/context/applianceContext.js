import React from "react";
import axios from 'axios';

const ApplianceContext = React.createContext()

class ApplianceProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      plugs : [],
      stores : [],
    }
    this.getAppliances();
  }
  
  getAppliances = async () => {
    axios.get(`/api/appliance/plugs`).then(res => this.setState({ plugs: res.data }))
    axios.get(`/api/appliance/stores`).then(res => this.setState({ stores: res.data }))
  } 

  render() {
    const { children } = this.props;
    const {plugs, stores} = this.state;
    console.log("plugs", plugs)
    return (
      <ApplianceContext.Provider
        value={{
          plugs,
          stores,
        }}
      >
        {children}
      </ApplianceContext.Provider>
    )
  }
}

export default ApplianceContext

export { ApplianceProvider }