import React from 'react';

class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(tab, e) {
    let tabs = document.getElementsByClassName("tab");

    [].forEach.call(tabs, function(el) {el.className = "tab";});

    e.target.className = "tab selected-tab"
    switch(tab) {
      case "heroes":
        this.props.handleTab("heroes");
        break;
      case "teammate_heroes":
        this.props.handleTab("teammate_heroes");
        break;
      case "enemy_heroes":
        this.props.handleTab("enemy_heroes");
        break;
    }
  }

  render() {
    let userId = this.props.userId
    return (
      <div className="tabs-container">
        <div id="default-tab" className="tab" onClick={this._handleClick.bind(null, "heroes")}>
          Heroes
        </div>
        <div className="tab" onClick={this._handleClick.bind(null, "teammate_heroes")}>
          Allied Heroes
        </div>
        <div className="tab" onClick={this._handleClick.bind(null, "enemy_heroes")}>
          Enemy Heroes
        </div>
      </div>
    )
  }
}

export default Tabs;
