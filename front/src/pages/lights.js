import React from "react";
// import { Link } from "gatsby"
import {Redirect} from '@reach/router';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Switch from '../components/Switch';

import ApplianceContext from "../context/applianceContext";
import LoginContext from "../context/loginContext";

const LightsPage = () => {
  return(
    <LoginContext.Consumer>
      {
        value => value.isLogged ?
        <Layout>
          <SEO title="Lights" />
          <p style={{ margin: '2vh 0', textAlign: 'center', fontWeight: 'bold' }}>LUMIÈRES</p>
          <ApplianceContext.Consumer>
            {value => value.plugs.map((plug, index) => <Switch appliance={plug} index={index} />)}
            {/* {value => console.log("value", value)} */}
          </ApplianceContext.Consumer>
        </Layout>
        :
        <Redirect to="/" />
      }
    </LoginContext.Consumer>
  )
}

export default LightsPage;
