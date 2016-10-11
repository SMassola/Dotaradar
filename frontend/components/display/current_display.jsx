import React from 'react';

class CurrentDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {display: this.props.tab}
    this._handleDescription = this._handleDescription.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({display: nextProps.tab});
  }

  _handleDescription() {
    switch (this.state.display) {
      case "heroes":
        return (
          <div className="display-description">
            Displaying hero pick rates from each player's last 100 matches.
            The hero pool displayed is derived from each player's 3 most frequently
            picked heroes from those matches.
          </div>
        )
        break;
      case "teammate_heroes":
        return (
          <div className="display-description">
            Displaying allied hero pick rates from each player's last 100 matches.
            The hero pool displayed is derived from each player's 4 most frequent
            allied heroes from those matches.
          </div>
        )
        break;
      case "enemy_heroes":
        return (
          <div className="display-description">
            Displaying enemy hero pick rates from each player's last 100 matches.
            The hero pool displayed is derived from each player's 5 most frequent
            enemy heroes from those matches.
          </div>
        )
        break;
      default:
        return (
          <div className="display-description">
            DotaRadar is a data visualization tool used to compare hero frequencies
            between you and your friends. Find out your common enemies and allies.
            Sign in with your steam account to get started.
          </div>
        )
    }
  }

  render() {
    let userId = this.props.userId
    return (
      <div className="display-container">
        <div className="display-title-decoration">
          <span className="display-title">Currently Displayed</span>
        </div>
        {this._handleDescription()}
      </div>
    )
  }
}

export default CurrentDisplay;
