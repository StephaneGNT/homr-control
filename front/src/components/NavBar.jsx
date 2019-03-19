import React, { Component } from 'react';
import {Link} from 'gatsby';

class NavBar extends Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Link to='/lights' style={{ color: 'black' }}><span role="img" aria-label="light bulb icon">💡</span></Link>
        <Link to='/stores' style={{ color: 'black' }}><span role="img" aria-label="bed icon">🛏</span>️</Link>
        <Link to='/planning' style={{ color: 'black' }}><span role="img" aria-label="calendar icon">📅</span></Link>
        <Link to='/program' style={{ color: 'black' }}><span role="img" aria-label="calendar-icon">📅</span></Link>
      </div>
    )
  }
}

export default NavBar;