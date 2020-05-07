import React, { Component } from "react";
import Cardlist from "../component/CardList";
// import { robots } from "./robots";
import SearchBox from "../component/SearchBox";
import "./App.css";
import Scroll from "../component/Scroll";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const { robots, searchField } = this.state;
    const filterRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (!robots.length) {
      //robots.length === 0
      return <h1 className="tc">Loading, Please Wait</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <Cardlist robots={filterRobots} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
