import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Switch from '../components/Switch';

import ApplianceContext from "../context/applianceContext";
import LoginContext from "../context/loginContext";
import { Redirect } from "@reach/router";
// import LoginContext from "../context/loginContext";

const StoresPage = () => (
  <LoginContext.Consumer>
    {
      value => value.isLogged
      ?
        <Layout>
          <SEO title="Stores" />
          <p style={{ margin: '2vh 0', textAlign: 'center', fontWeight: 'bold' }}>VOLETS</p>
          <ApplianceContext.Consumer>
            {value => value.stores.map((store, index) => <Switch appliance={store} index={index} />)}
          </ApplianceContext.Consumer>
        </Layout>
      :
        <Redirect to="/" />
    }
  </LoginContext.Consumer>
)

export default StoresPage
