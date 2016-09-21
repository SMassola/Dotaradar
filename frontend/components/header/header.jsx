import React from 'react';
import { hashHistory } from 'react-router';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentUser: user};
  }

  render() {
    return (
      <div>
        {this.state.currentUser ? <div>{this.state.currentUser}</div> : ""}
        <a href='/auth/steam'>steam</a>
      </div>
    )
  }
}

export default Header;
