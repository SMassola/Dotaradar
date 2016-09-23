import React from 'react';
import RadarChart from './radarChart';
import MatchActions from '../../actions/match_actions';
import MatchStore from '../../stores/match_store';

class RadarContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {matches: [], heroes: [], data: {}}
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
    this.setState({heroes: MatchStore.allHeroes()})
    this.setState({data: MatchStore.allData()})
    let subData = []
    Object.keys(this.state.data).forEach((key) => {
      subData.push({axis: key, value: this.state.data[key]/100})
    })
    subData.sort(function(obj1, obj2) {
      return (obj2.value - obj1.value)
    });
    let mostPlayed = subData.slice(0, 9).sort(function(obj1, obj2) {
      return (obj1.axis.localeCompare(obj2.axis))
    });
    let data = []
    data.push(mostPlayed)
    RadarChart.drawChart('.chart', data)
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
