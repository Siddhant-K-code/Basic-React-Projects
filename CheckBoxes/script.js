"use strict";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

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

const { Transition } = ReactTransitionGroup;

class Checkbox extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      checked: this.props.checked
    });

    _defineProperty(this, "toggleCheck", (e) => {
      const current = this.state.checked;
      this.setState({
        checked: !current
      });

      if (this.props.onChange) {
        this.props.onChange(!current, e);
      }
    });
  }

  getCheckElement() {
    switch (this.props.type) {
      case "check":
        return /*#__PURE__*/ React.createElement(Check, {
          fill: this.props.color
        });

      case "filled":
        return /*#__PURE__*/ React.createElement(Filled, {
          fill: this.props.color,
          circle: this.props.circle
        });

      default:
        return /*#__PURE__*/ React.createElement(Cross, {
          fill: this.props.color
        });
    }
  }

  getLabels() {
    const { label, labelPosition } = this.props;
    var leftLabel =
      labelPosition == "left"
        ? /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "label label-left"
            },
            label
          )
        : null;
    var rightLabel =
      labelPosition == "right"
        ? /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "label label-right"
            },
            label
          )
        : null;
    return {
      left: leftLabel,
      right: rightLabel
    };
  }

  render() {
    const checkElement = this.getCheckElement();
    const { label, labelPosition } = this.props;
    const labels = this.getLabels();
    const checkboxStyle = this.props.circle
      ? "checkbox checkbox-circle"
      : "checkbox";
    const backgroundColorStyle = {
      backgroundColor: this.props.background
    };
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "checkbox-root"
      },
      labels.left,
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: checkboxStyle,
          style: backgroundColorStyle,
          onClick: this.toggleCheck
        },
        /*#__PURE__*/ React.createElement(Fade, {
          inCondition: this.state.checked,
          timeout: 0,
          duration: 200,
          children: checkElement
        })
      ),
      labels.right
    );
  }
}

Checkbox.defaultProps = {
  checked: false,
  type: "cross",
  circle: false,
  color: "#444444",
  background: "white",
  label: "Label prop missing",
  labelPosition: "right",
  onChange: null
};

class Fade extends React.Component {
  render() {
    const { children, inCondition, timeout, duration } = this.props;
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0
    };
    const transitionStyles = {
      entering: {
        opacity: 0
      },
      entered: {
        opacity: 1
      }
    };
    return /*#__PURE__*/ React.createElement(
      Transition,
      {
        in: inCondition,
        timeout: timeout
      },
      (state) =>
        /*#__PURE__*/ React.createElement(
          "div",
          {
            style: _objectSpread(
              _objectSpread({}, defaultStyle),
              transitionStyles[state]
            )
          },
          children
        )
    );
  }
}

class Check extends React.Component {
  render() {
    return /*#__PURE__*/ React.createElement(
      "svg",
      {
        className: "check",
        width: "18",
        height: "18",
        viewBox: "0 0 24 24"
      },
      /*#__PURE__*/ React.createElement("path", {
        fill: this.props.fill,
        d:
          "M19.78,2.2L24,6.42L8.44,22L0,13.55L4.22,9.33L8.44,13.55L19.78,2.2M19.78,5L8.44,16.36L4.22,12.19L2.81,13.55L8.44,19.17L21.19,6.42L19.78,5Z"
      })
    );
  }
}

class Cross extends React.Component {
  render() {
    return /*#__PURE__*/ React.createElement(
      "svg",
      {
        className: "cross",
        width: "18",
        height: "18",
        viewBox: "0 0 24 24"
      },
      /*#__PURE__*/ React.createElement("path", {
        fill: this.props.fill,
        d:
          "M3,16.74L7.76,12L3,7.26L7.26,3L12,7.76L16.74,3L21,7.26L16.24,12L21,16.74L16.74,21L12,16.24L7.26,21L3,16.74M12,13.41L16.74,18.16L18.16,16.74L13.41,12L18.16,7.26L16.74,5.84L12,10.59L7.26,5.84L5.84,7.26L10.59,12L5.84,16.74L7.26,18.16L12,13.41Z"
      })
    );
  }
}

class Filled extends React.Component {
  render() {
    const filledStyle = this.props.circle ? "filled filled-circle" : "filled";
    const colorStyle = {
      backgroundColor: this.props.fill
    };
    return /*#__PURE__*/ React.createElement("div", {
      className: filledStyle,
      style: colorStyle
    });
  }
}

class Demo extends React.Component {
  render() {
    return /*#__PURE__*/ React.createElement(
      "div",
      null,
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "panel panel-1"
        },
        /*#__PURE__*/ React.createElement("h1", null, "Cross"),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "group"
          },
          /*#__PURE__*/ React.createElement(Checkbox, {
            checked: true,
            label: "Fantasy"
          }),
          /*#__PURE__*/ React.createElement(Checkbox, {
            label: "Drama"
          }),
          /*#__PURE__*/ React.createElement(Checkbox, {
            label: "Horror"
          })
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "panel panel-2"
        },
        /*#__PURE__*/ React.createElement("h1", null, "Check"),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "group"
          },
          /*#__PURE__*/ React.createElement(Checkbox, {
            type: "check",
            label: "iOS"
          }),
          /*#__PURE__*/ React.createElement(Checkbox, {
            type: "check",
            checked: true,
            label: "Android"
          }),
          /*#__PURE__*/ React.createElement(Checkbox, {
            type: "check",
            label: "Windows"
          })
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "panel panel-3"
        },
        /*#__PURE__*/ React.createElement("h1", null, "Filled"),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "group"
          },
          /*#__PURE__*/ React.createElement(Checkbox, {
            type: "filled",
            label: "Spanish"
          }),
          /*#__PURE__*/ React.createElement(Checkbox, {
            type: "filled",
            label: "German"
          }),
          /*#__PURE__*/ React.createElement(Checkbox, {
            type: "filled",
            checked: true,
            label: "French"
          })
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "panel panel-4"
        },
        /*#__PURE__*/ React.createElement("h1", null, "Customized"),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "group"
          },
          /*#__PURE__*/ React.createElement(Checkbox, {
            circle: true,
            color: "#F38181",
            checked: true,
            label: "Pizza"
          }),
          /*#__PURE__*/ React.createElement(Checkbox, {
            type: "check",
            background: "#B9E1DC",
            checked: true,
            label: "Burger",
            labelPosition: "left"
          }),
          /*#__PURE__*/ React.createElement(Checkbox, {
            type: "filled",
            color: "#F38181",
            checked: true,
            label: "Tacos"
          })
        )
      )
    );
  }
}

ReactDOM.render(
  /*#__PURE__*/ React.createElement(Demo, null),
  document.getElementById("root")
);
