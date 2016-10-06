import React from 'react';
import RadarChart from './radarChart';
import MatchActions from '../../actions/match_actions';
import MatchStore from '../../stores/match_store';

class RadarContainer extends React.Component {

  constructor(props) {
    super(props);
    this.colors = ['yellow', 'red', 'teal', 'lime', 'pink', 'orange', 'purple', 'blue']
    this.state = {matchData: {}, heroPool: [], tab: this.props.tab}
    this._handleMatches = this._handleMatches.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({tab: nextProps.tab}, function() {
      this._handleMatches();
    });
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
    this.setState({matchData: MatchStore.allMatchData()})
    this.state.heroPool = [];

    this._handleColors(Object.keys(this.state.matchData));

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
    let mostPlayed;
    switch (this.state.tab) {
      case "heroes":
        mostPlayed = heroes.slice(0, 3)
        break;
      case "teammate_heroes":
        mostPlayed = heroes.slice(0, 4)
        break;
      case "enemy_heroes":
        mostPlayed = heroes.slice(0, 5)
        break;
    }

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

    switch (this.state.tab) {
      case "heroes":
        //grab the most played heroes for each user.
        Object.keys(matchData).forEach((user) => {
          this.mostplayed(matchData[user]["heroes"]);
        })
        break;
      case "teammate_heroes":
        Object.keys(matchData).forEach((user) => {
          this.mostplayed(matchData[user]["allied"]);
        })
        break;
      case "enemy_heroes":
        Object.keys(matchData).forEach((user) => {
          this.mostplayed(matchData[user]["enemy"]);
        })
        break;
    }

    //sort the heroes in alpha order
    this.state.heroPool.sort(function(obj1, obj2) {
      return(obj1.localeCompare(obj2))
    })

    //create formatted data
    Object.keys(matchData).forEach((user) => {
      let subData = [];
      this.state.heroPool.forEach((hero) => {
        switch (this.state.tab) {
          case "heroes":
            if (matchData[user]["heroes"][hero]) {
              subData.push({axis: hero, value: matchData[user]["heroes"][hero]/100})
            } else {
              subData.push({axis: hero, value: 0})
            }
            break;
          case "teammate_heroes":
            if (matchData[user]["allied"][hero]) {
              subData.push({axis: hero, value: matchData[user]["allied"][hero]/100})
            } else {
              subData.push({axis: hero, value: 0})
            }
            break;
          case "enemy_heroes":
            if (matchData[user]["enemy"][hero]) {
              subData.push({axis: hero, value: matchData[user]["enemy"][hero]/100})
            } else {
              subData.push({axis: hero, value: 0})
            }
            break;
        }
      })
      data.push(subData)
    })
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
