import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Menu extends React.Component {
  componentDidMount() {
    document.addEventListener("mousedown", ({ target }) => {
      if (this.wrapper && !this.wrapper.contains(target)) {
        this.props.trigger === target || this.props.onHide();
      }
    });
  }

  render() {
    const { items } = this.props;

    console.log(this.target.getBou)

    return (
      <div
        className="Menu"
        ref={node => {
          this.wrapper = node;
        }}
      >
        {!!items.length && <ul>{items.map(item => <li>{item}</li>)}</ul>}
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    menus: []
  };

  render() {
    const { menus } = this.state;

    return (
      <div className="App">
        <button
          ref={node => (this.trigger = node)}
          onClick={({ target }) => {
            this.setState(({ menus }) => {
              return {
                menus: [
                  {
                    trigger: target,
                    items: [
                      "Twin Peaks",
                      "Rick and Morty",
                      "Mr. Robot",
                      "halt and Catch Fire"
                    ]
                  }
                ]
              };
            });
          }}
        >
          Toggle
        </button>
        {!!menus.length &&
          // <div className="">
          menus.filter(({ trigger }) => trigger !== null).map(menu => (
            <Menu
              {...menu}
              onHide={() => {
                this.setState({ menus: [] });
              }}
            />
          ))}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
