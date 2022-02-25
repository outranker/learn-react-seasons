import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      errMessage: null,
    };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (pos) => this.setState({ lat: pos.coords.latitude }),

      (err) =>
        this.setState({
          errMessage: err.message,
        })
    );
  }

  renderContent() {
    if (this.state.errMessage && !this.state.lat) {
      return <div>Error: {this.state.errMessage}</div>;
    }
    if (!this.state.errMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message={"Please, accept location request"} />;
  }
  render() {
    return this.renderContent();
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
