import React from 'react';
import { renderAppliancesChoice, renderActionsChoice, renderActionOccurence, renderDayAndTimeSelection, renderButtons } from '../functions/order-creation-functions';


const CreateOrModifyCommand = (props) => {
  const { selectedCommand, setSelectedCommand } = props;
  return (
    <div>
      {renderAppliancesChoice(props)}
      {renderActionsChoice(props)}
      {(selectedCommand.order && selectedCommand.order !== '') && renderActionOccurence(selectedCommand, setSelectedCommand)}
      {selectedCommand.occurence && selectedCommand.occurence !== '' && renderDayAndTimeSelection("startDate", selectedCommand, setSelectedCommand)}
      {selectedCommand.startDate && selectedCommand.startDate !== '' && renderDayAndTimeSelection("endDate", selectedCommand, setSelectedCommand)}
      {renderButtons(props, selectedCommand, setSelectedCommand)}
    </div>
  )
}

export default CreateOrModifyCommand;
