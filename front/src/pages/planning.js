import React from "react";
// import { Link } from "gatsby"
import {Redirect} from '@reach/router';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Agenda from '../components/planningComponents/Agenda';

import CommandContext from "../context/commandContext";
import LoginContext from "../context/loginContext";
import ApplianceContext from "../context/applianceContext";

const PlanningPage = () => {
  return(
    <LoginContext.Consumer>
      {
        value => value.isLogged ?
        <Layout>
          <SEO title="Lights" />
          <p style={{ margin: '2vh 0', textAlign: 'center', fontWeight: 'bold' }}>PLANNING</p>
          <ApplianceContext.Consumer>
            {appliances =>
              <CommandContext.Consumer>
                {
                  value => 
                  <Agenda
                    appliances={appliances}
                    commands={value.commands}
                    deleteCommand={value.deleteCommand}
                    modifyCommand={value.modifyCommand}
                    createCommand={value.createCommand}
                  />
                }
              </CommandContext.Consumer>
            }
          </ApplianceContext.Consumer>
        </Layout>
        :
        <Redirect to="/" />
      }
    </LoginContext.Consumer>
  )
}

export default PlanningPage;