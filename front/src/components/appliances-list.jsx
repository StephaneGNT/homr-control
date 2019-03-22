import React, {useState} from 'react';
import NewAppliance from './create-new-appliance';
import ApplianceAndSwitch from './appliance-and-switch';

// import Fab from '@material-ui/core/Fab';

const AppliancesList = (props) => {
  const [visible, setVisible] = useState(false);
  return(
    <div>
      <NewAppliance
        open={visible}
        setVisible={setVisible}
        appliances={props.appliances}
      />
      <div style={{display: visible ? 'none' : 'block'}}>
        <p style={{ margin: '2vh 0', textAlign: 'center', fontWeight: 'bold' }}>LUMIÈRES</p>
        {props.appliances.map((appliance, index) => <ApplianceAndSwitch appliance={appliance} key={index} />)}
      </div>
    </div>
  )
}

export default AppliancesList;
