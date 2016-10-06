import React from 'react';
import RadarChart from './radarChart';
import MatchActions from '../../actions/match_actions';
import MatchStore from '../../stores/match_store';

class RadarContainer extends React.Component {

  constructor(props) {
    super(props);
    this.colors = ['yellow', 'red', 'teal', 'lime', 'pink', 'orange', 'purple', 'blue']
    this.state = {data: {}, matchData: {}, heroPool: []}
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
    this.setState({data: MatchStore.allData()})
    this.setState({matchData: MatchStore.allMatchData()})
    this.state.heroPool = [];

    this._handleColors(Object.keys(this.state.matchData));

    let data = this.createDataSet();
    let matchData = this.createMatchDataSet();

    if (matchData.length === 0) {
      RadarChart.drawChart('.chart', [[]]);
    } else {
      RadarChart.drawChart('.chart', matchData);
    }
  }

  mostplayed(userHeroes) {
    let heroes = Object.keys(userHeroes).sort(function(obj1, obj2) {
      return userHeroes[obj2] - userHeroes[obj1]
    })

    let mostPlayed = heroes.slice(0, 3)
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

    //grab the top 10 most played heroes for each user.
    Object.keys(matchData).forEach((user) => {
      this.mostplayed(matchData[user]);
    })

    //sort the heroes in alpha order
    this.state.heroPool.sort(function(obj1, obj2) {
      return(obj1.localeCompare(obj2))
    })

    //create formatted data
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

  _handleColors(playerIds) {
    let friendItems = document.getElementsByClassName("friend-index-item");

    [].forEach.call(friendItems, function(el) {el.className = "friend-index-item"});

    document.getElementsByClassName("main-user-info")[0].className = "main-user-info";

    playerIds.forEach((playerId, i) => {
      document.getElementById(playerId).className += ` ${this.colors[i]}`
    })
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
