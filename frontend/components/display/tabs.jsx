import React from 'react';

class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(tab, e) {
    let tabs = document.getElementsByClassName("tab");

    [].forEach.call(tabs, function(el) {el.className = "tab";});

    e.target.className += " selected-tab"
    switch(tab) {
      case "hero":
        this.props.handleTab("hero");
        break;
      case "item":
        this.props.handleTab("item");
        break;
    }
  }

  render() {
    let userId = this.props.userId
    return (
      <div className="tabs-container">
        <div className="tab" onClick={this._handleClick.bind(null, "hero")}>
          Heroes
        </div>
        <div className="tab" onClick={this._handleClick.bind(null, "item")}>
          Items
        </div>
      </div>
    )
  }
}

export default Tabs;
