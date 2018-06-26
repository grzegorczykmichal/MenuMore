import React from "react";
import ReactDOM from "react-dom";
import { Trigger } from "./trigger";
import { Menu } from "./menu";

import "./styles.css";

class App extends React.Component {
  state = {
    menu: null
  };

  handleTriggerClick = ({ target }) => {
    this.setState(({ menu }) => {
      return {
        menu: {
          trigger: target,
          items: [
            "Twin Peaks",
            "Rick and Morty",
            "Mr. Robot",
            "Halt and Catch Fire",
            "The Americans",
            "That '70s Show"
          ]
        }
      };
    });
  };

  render() {
    const { menu } = this.state;

    return (
      <div className="App">
        <div className="Triggers">
          <Trigger onClick={this.handleTriggerClick} />
          <Trigger onClick={this.handleTriggerClick} />
          <Trigger onClick={this.handleTriggerClick} />
          <Trigger onClick={this.handleTriggerClick} />
          <Trigger onClick={this.handleTriggerClick} />
          <Trigger onClick={this.handleTriggerClick} />
          <Trigger onClick={this.handleTriggerClick} />
          <Trigger onClick={this.handleTriggerClick} />
          <Trigger onClick={this.handleTriggerClick} />
        </div>
        {!!menu && (
          <Menu
            {...menu}
            visibleItem={3}
            onHide={() => {
              this.setState({ menu: null });
            }}
          />
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
