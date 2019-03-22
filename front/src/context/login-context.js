import React from "react";
// import axios from 'axios';

const LoginContext = React.createContext()

class LoginProvider extends React.Component {
  state = {
    isLogged: true
  }

  checkCredentials = (id, password) => {
    // axios
    //   .post('/api/user', { id, password })
    //   .then(res => res.status === 200 && this.setState({ isLogged: true }))
    this.setState({ isLogged: true });
  }

  render() {
    const { children } = this.props;
    const { isLogged } = this.state;
    return (
      <LoginContext.Provider
        value={{
          isLogged,
          checkCredentials: this.checkCredentials,
        }}
      >
        {children}
      </LoginContext.Provider>
    )
  }
}

export default LoginContext

export { LoginProvider }