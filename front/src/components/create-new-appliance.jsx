import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem } from '@material-ui/core';

import Appliance from '../models/appliance-model';

const NewAppliance = (props) => {
  const blankAppliance = new Appliance();
  const [newAppliance, setNewAppliance] = useState(blankAppliance);
  const applianceTypes = ["plug", "store"];

  return(
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Ajouter un nouvel interrupteur ?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            label="Nom du nouvel interrupteur"
            onChange={e => setNewAppliance({...newAppliance, name: e.target.value})}
            margin="normal"
          />
          <Select
						autoWidth={true}
						onChange={e => setNewAppliance({...newAppliance, type: e.target.value})}
					>
						<MenuItem />
						{applianceTypes.map((applianceType, index) => (<MenuItem value={applianceType} key={index}>{applianceType}</MenuItem>))}
					</Select>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.setVisible(false)}>
          Annuler
        </Button>
        <Button color="primary" onClick={() => {props.setVisible(false); newAppliance.save()}}  autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewAppliance;
