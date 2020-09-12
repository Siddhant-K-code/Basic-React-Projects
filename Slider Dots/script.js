"use strict";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class Slider extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      position: this.props.position
    });

    _defineProperty(this, "updatePosition", (position) => {
      if (this.props.clickable) {
        this.setState({
          position: position
        });

        if (this.props.positionChangeListener) {
          this.props.positionChangeListener(position);
        }
      }
    });
  }

  generateDotHolders() {
    let dotHolders = [];

    for (var i = 0; i < this.props.length; i++) {
      dotHolders.push(
        /*#__PURE__*/ React.createElement(DotHolder, {
          key: i,
          position: i,
          clickable: this.props.clickable,
          size: this.props.size,
          updatePosition: this.updatePosition
        })
      );
    }

    return dotHolders;
  }

  render() {
    const dotHolders = this.generateDotHolders();
    const sliderStyle = "slider slider-" + this.props.size;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: sliderStyle
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "dot-holders"
        },
        dotHolders
      ),
      /*#__PURE__*/ React.createElement(Dot, {
        position: this.state.position
      })
    );
  }
}

class DotHolder extends React.Component {
  render() {
    const dotHolderStyle = this.props.clickable
      ? "dot-holder dot-holder-clickable"
      : "dot-holder";
    return /*#__PURE__*/ React.createElement("div", {
      className: dotHolderStyle,
      onClick: (e) => this.props.updatePosition(this.props.position, e)
    });
  }
}

class Dot extends React.Component {
  render() {
    const positionClass = "dot dot-position-" + this.props.position;
    return /*#__PURE__*/ React.createElement("div", {
      className: positionClass
    });
  }
}

Slider.defaultProps = {
  position: 0,
  length: 3,
  size: "normal",
  clickable: true,
  positionChangeListener: null
};

class Demo extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      position1: 0
    });

    _defineProperty(this, "updatedPosition1", (position) => {
      this.setState({
        position1: position
      });
    });
  }

  render() {
    return /*#__PURE__*/ React.createElement(
      "div",
      null,
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "panel panel-1"
        },
        /*#__PURE__*/ React.createElement("h1", null, "Huge"),
        /*#__PURE__*/ React.createElement(Slider, {
          length: 3,
          size: "huge",
          position: 0,
          clickable: true,
          positionChangeListener: this.updatedPosition1
        }),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "config"
          },
          /*#__PURE__*/ React.createElement(
            "p",
            null,
            "position: ",
            /*#__PURE__*/ React.createElement(
              "strong",
              null,
              this.state.position1
            )
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            null,
            "length: ",
            /*#__PURE__*/ React.createElement("strong", null, "3")
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            null,
            "size: ",
            /*#__PURE__*/ React.createElement("strong", null, "'huge'")
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            null,
            "clickable: ",
            /*#__PURE__*/ React.createElement("strong", null, "true")
          )
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "panel panel-2"
        },
        /*#__PURE__*/ React.createElement("h1", null, "Big"),
        /*#__PURE__*/ React.createElement(Slider, {
          length: 6,
          size: "big",
          position: 3,
          clickable: true
        })
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "panel panel-3"
        },
        /*#__PURE__*/ React.createElement("h1", null, "Normal"),
        /*#__PURE__*/ React.createElement(Slider, {
          length: 9,
          size: "normal",
          position: 4,
          clickable: true
        })
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "panel panel-4"
        },
        /*#__PURE__*/ React.createElement("h1", null, "Small"),
        /*#__PURE__*/ React.createElement(Slider, {
          length: 6,
          size: "small",
          position: 0,
          clickable: true
        })
      )
    );
  }
}

ReactDOM.render(
  /*#__PURE__*/ React.createElement(Demo, null),
  document.getElementById("root")
);
