import React from 'react';
import RadarChart from './radarChart';
import MatchActions from '../../actions/match_actions';
import MatchStore from '../../stores/match_store';

class RadarContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {matches: [], heroes: [], data: {}, matchData: {}, heroPool: []}
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
    this.setState({matchData: MatchStore.allMatchData()})

    let data = this.createDataSet();
    let matchData = this.createMatchDataSet();
    RadarChart.drawChart('.chart', matchData)
  }

  mostplayed(userHeroes) {
    let heroes = Object.keys(userHeroes).sort(function(obj1, obj2) {
      return userHeroes[obj2] - userHeroes[obj1]
    })

    let mostPlayed = heroes.slice(0, 10)
    mostPlayed.forEach((hero) => {
      if (this.state.heroPool.indexOf(hero) === -1) {
        this.state.heroPool.push(hero)
      }
    });
  }

  createMatchDataSet() {
    this.setState({heroPool: []})
    let matchData = this.state.matchData
    let data = []
    Object.keys(matchData).forEach((user) => {

      this.mostplayed(matchData[user]);
    })
    this.state.heroPool.sort(function(obj1, obj2) {
      return(obj1.localeCompare(obj2))
    })
    Object.keys(matchData).forEach((user) => {
      let subData = [];
      this.state.heroPool.forEach((hero) => {
        if (matchData[user][hero]) {
          subData.push({axis: hero, value: matchData[user][hero]/100})
        } else {
          subData.push({axis: hero, value: 0})
        }
      })
      data.push(subData)
    })
    return data
  }

  createDataSet() {
    let subData = [];
    Object.keys(this.state.data).forEach((key) => {
      subData.push({axis: key, value: this.state.data[key]/100})
    });
    subData.sort(function(obj1, obj2) {
      return (obj2.value - obj1.value)
    });
    let mostPlayed = subData.slice(0, 10).sort(function(obj1, obj2) {
      return (obj1.axis.localeCompare(obj2.axis))
    });
    let data = []
    data.push(mostPlayed)
    return data
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
