import React from 'react';

class MainUser extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    let user = this.props.user;
    let userId = this.props.userId;

    return (
      <div className="main-user">
        <div className="main-user-title">You</div>
        {user ?
          <div className="main-user-info">
            <input type="checkbox" onChange={this._toggle}></input>
            <img src={user["image"]} className="index-item-avatar"></img>
            <div className="index-item-username">{user["nickname"]}</div>
          </div> : <div className="main-user-info"></div>}
      </div>
    )
  }
}

export default MainUser;
