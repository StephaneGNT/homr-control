import React from "react";
import { Redirect } from '@reach/router';

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProgramContext from "../context/program-context";
import LoginContext from "../context/login-context";
import ApplianceContext from "../context/appliance-context";
import ProgramList from "../components/programs-list";

const ProgramPage = () => {
  return (
    <LoginContext.Consumer>
      {
        value => value.isLogged ?
          <Layout>
            <SEO title="Lights" />
            <p style={{ margin: '2vh 0', textAlign: 'center', fontWeight: 'bold' }}>PROGRAMMES</p>
            <ProgramContext.Consumer>
              {value =>
                <ApplianceContext.Consumer>
                  {
                    appliances =>
                      <ProgramList
                        appliances={appliances}
                        programs={value.programs}
                        deleteProgram={value.deleteProgram}
                        modifyProgram={value.modifyProgram}
                        createProgram={value.createProgram}
                      />
                  }
                </ApplianceContext.Consumer>
              }
            </ProgramContext.Consumer>
          </Layout>
          :
          <Redirect to="/" />
      }
    </LoginContext.Consumer>
  )
}

export default ProgramPage;
