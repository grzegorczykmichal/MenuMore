import React from "react";

export class Menu extends React.Component {
  state = {
    dynamicStyles: {},
    focused: null
  };

  componentDidMount() {
    document.addEventListener("mousedown", ({ target }) => {
      if (this.wrapper && !this.wrapper.contains(target)) {
        this.props.trigger === target || this.props.onHide();
      }
    });

    document.addEventListener("keyup", ({ keyCode, ...e }) => {
      if (keyCode === 27) {
        this.props.onHide();
      }
      console.log(keyCode, e.charCode);
    });

    const listBCR = this.list.getBoundingClientRect();
    const triggerBCR = this.props.trigger.getBoundingClientRect();

    const a = +(
      window.innerWidth - (window.scrollX + triggerBCR.x + listBCR.width) <
      0
    );
    const b = +(
      window.innerHeight - (window.scrollY + triggerBCR.y + listBCR.height) <
      0
    );

    let offsetX = (listBCR.width - triggerBCR.width) * a;
    let offsetY = (listBCR.height - triggerBCR.height) * b;

    this.setState({
      dynamicStyles: {
        transform: `translate(${-offsetX}px, ${-offsetY}px)`,
        top: triggerBCR.y,
        left: triggerBCR.x
      }
    });
  }

  render() {
    const { items } = this.props;
    const { dynamicStyles } = this.state;

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
              <li onClick={() => this.props.onHide()}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
