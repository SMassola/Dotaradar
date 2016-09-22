import React from 'react';
import RadarChart from './radarChart';
import MatchActions from '../../actions/match_actions';
import MatchStore from '../../stores/match_store';

class RadarContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {matches: []}
    this._handleMatches = this._handleMatches.bind(this)
  }

  componentDidMount() {
    this.matchListener = MatchStore.addListener(this._handleMatches);

    let data = [[]];
    RadarChart.drawChart('.chart', data)

    if (this.props.userId) {
      MatchActions.fetchMatches(this.props.userId);
    }
  }

  componentWillUnmount() {
    this.matchListener.remove();
  }

  _handleMatches() {
    this.setState({matches: MatchStore.allMatches()})
  }

  render() {
    return (
      <div className="radar-container">
        <div className="chart"></div>
      </div>
    )
  }
}

export default RadarContainer;
