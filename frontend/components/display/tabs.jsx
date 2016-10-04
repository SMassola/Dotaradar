import React from 'react';

class Tabs extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({display: nextProps});
  }

  render() {
    let userId = this.props.userId
    return (
      <div className="tabs-container">

      </div>
    )
  }
}

export default Tabs;
