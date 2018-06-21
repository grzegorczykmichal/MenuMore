import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Menu extends React.Component {
  state = {
    offsetY: 0,
    offsetX: 0
  };

  componentDidMount() {
    document.addEventListener("mousedown", ({ target }) => {
      if (this.wrapper && !this.wrapper.contains(target)) {
        this.props.trigger === target || this.props.onHide();
      }
    });

    const listBCR = this.list.getBoundingClientRect();
    const triggerBCR = this.props.trigger.getBoundingClientRect();

    const offsetY =
      window.innerHeight - (listBCR.y + listBCR.height) < 0
        ? -listBCR.height + triggerBCR.height
        : 0;
    const offsetX =
      window.innerWidth - (listBCR.x + listBCR.width) < 0
        ? window.innerWidth - (listBCR.x + listBCR.width)
        : 0;
    this.setState({
      offsetY,
      offsetX
    });
  }

  componentDidUpdate() {}

  render() {
    const { items, trigger } = this.props;

    const triggerBCR = trigger.getBoundingClientRect();

    const dynamicStyles = {
      top: `${triggerBCR.y + window.scrollY + this.state.offsetY}px`,
      left: `${triggerBCR.x + window.scrollX + +this.state.offsetX}px`
    };

    return (
      <div
        style={dynamicStyles}
        className="Menu"
        ref={node => {
          this.wrapper = node;
        }}
      >
        {!!items.length && (
          <ul ref={node => (this.list = node)}>
            {items.map(item => (
              <li
                onClick={() => {
                  this.props.onHide();
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
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
          className="Button"
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
