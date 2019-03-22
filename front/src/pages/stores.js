import React from "react";
import {Redirect} from '@reach/router';

import Layout from "../components/layout"
import SEO from "../components/seo"
import AppliancesList from "../components/appliances-list";

import ApplianceContext from "../context/appliance-context";
import LoginContext from "../context/login-context";

const StoresPage = () => {
  return(
    <LoginContext.Consumer>
      {
        value => value.isLogged ?
        <Layout >
          <SEO title="Lights" />
          <ApplianceContext.Consumer>
            {value => <AppliancesList appliances={value.stores} />}
          </ApplianceContext.Consumer>
        </Layout>
        :
        <Redirect to="/" />
      }
    </LoginContext.Consumer>
  )
}

export default StoresPage;
