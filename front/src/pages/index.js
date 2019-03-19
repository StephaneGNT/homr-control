import React from "react"
// import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from "../components/layout"
import SEO from "../components/seo"

import Login from "../components/Login";

const LoginPage = () => (
    <Layout>
      <SEO title="Login" keywords={[`gatsby`, `application`, `react`]} />
      <Login />
    </Layout>
)

export default LoginPage
