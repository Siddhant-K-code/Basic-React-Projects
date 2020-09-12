"use strict";

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
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

const PointTarget = ReactPoint.PointTarget;

class AutoScalingText extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      scale: 1
    });
  }

  componentDidUpdate() {
    const { scale } = this.state;
    const node = this.node;
    const parentNode = node.parentNode;
    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;
    if (scale === actualScale) return;

    if (actualScale < 1) {
      this.setState({
        scale: actualScale
      });
    } else if (scale < 1) {
      this.setState({
        scale: 1
      });
    }
  }

  render() {
    const { scale } = this.state;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "auto-scaling-text",
        style: {
          transform: `scale(${scale},${scale})`
        },
        ref: (node) => (this.node = node)
      },
      this.props.children
    );
  }
}

class CalculatorDisplay extends React.Component {
  render() {
    const _this$props = this.props,
      { value } = _this$props,
      props = _objectWithoutProperties(_this$props, ["value"]);

    const language = navigator.language || "en-US";
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    }); // Add back missing .0 in e.g. 12.0

    const match = value.match(/\.\d*?(0*)$/);
    if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];
    return /*#__PURE__*/ React.createElement(
      "div",
      _extends({}, props, {
        className: "calculator-display"
      }),
      /*#__PURE__*/ React.createElement(AutoScalingText, null, formattedValue)
    );
  }
}

class CalculatorKey extends React.Component {
  render() {
    const _this$props2 = this.props,
      { onPress, className } = _this$props2,
      props = _objectWithoutProperties(_this$props2, ["onPress", "className"]);

    return /*#__PURE__*/ React.createElement(
      PointTarget,
      {
        onPoint: onPress
      },
      /*#__PURE__*/ React.createElement(
        "button",
        _extends(
          {
            className: `calculator-key ${className}`
          },
          props
        )
      )
    );
  }
}

const CalculatorOperations = {
  "/": (prevValue, nextValue) => prevValue / nextValue,
  "*": (prevValue, nextValue) => prevValue * nextValue,
  "+": (prevValue, nextValue) => prevValue + nextValue,
  "-": (prevValue, nextValue) => prevValue - nextValue,
  "=": (prevValue, nextValue) => nextValue
};

class Calculator extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false
    });

    _defineProperty(this, "handleKeyDown", (event) => {
      let { key } = event;
      if (key === "Enter") key = "=";

      if (/\d/.test(key)) {
        event.preventDefault();
        this.inputDigit(parseInt(key, 10));
      } else if (key in CalculatorOperations) {
        event.preventDefault();
        this.performOperation(key);
      } else if (key === ".") {
        event.preventDefault();
        this.inputDot();
      } else if (key === "%") {
        event.preventDefault();
        this.inputPercent();
      } else if (key === "Backspace") {
        event.preventDefault();
        this.clearLastChar();
      } else if (key === "Clear") {
        event.preventDefault();

        if (this.state.displayValue !== "0") {
          this.clearDisplay();
        } else {
          this.clearAll();
        }
      }
    });
  }

  clearAll() {
    this.setState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false
    });
  }

  clearDisplay() {
    this.setState({
      displayValue: "0"
    });
  }

  clearLastChar() {
    const { displayValue } = this.state;
    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || "0"
    });
  }

  toggleSign() {
    const { displayValue } = this.state;
    const newValue = parseFloat(displayValue) * -1;
    this.setState({
      displayValue: String(newValue)
    });
  }

  inputPercent() {
    const { displayValue } = this.state;
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    const newValue = parseFloat(displayValue) / 100;
    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2))
    });
  }

  inputDot() {
    const { displayValue } = this.state;

    if (!/\./.test(displayValue)) {
      this.setState({
        displayValue: displayValue + ".",
        waitingForOperand: false
      });
    }
  }

  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      });
    } else {
      this.setState({
        displayValue:
          displayValue === "0" ? String(digit) : displayValue + digit
      });
    }
  }

  performOperation(nextOperator) {
    const { value, displayValue, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      this.setState({
        value: inputValue
      });
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);
      this.setState({
        value: newValue,
        displayValue: String(newValue)
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { displayValue } = this.state;
    const clearDisplay = displayValue !== "0";
    const clearText = clearDisplay ? "C" : "AC";
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "calculator"
      },
      /*#__PURE__*/ React.createElement(CalculatorDisplay, {
        value: displayValue
      }),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "calculator-keypad"
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "input-keys"
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "function-keys"
            },
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-clear",
                onPress: () =>
                  clearDisplay ? this.clearDisplay() : this.clearAll()
              },
              clearText
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-sign",
                onPress: () => this.toggleSign()
              },
              "\xB1"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-percent",
                onPress: () => this.inputPercent()
              },
              "%"
            )
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "digit-keys"
            },
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-0",
                onPress: () => this.inputDigit(0)
              },
              "0"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-dot",
                onPress: () => this.inputDot()
              },
              "\u25CF"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-1",
                onPress: () => this.inputDigit(1)
              },
              "1"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-2",
                onPress: () => this.inputDigit(2)
              },
              "2"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-3",
                onPress: () => this.inputDigit(3)
              },
              "3"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-4",
                onPress: () => this.inputDigit(4)
              },
              "4"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-5",
                onPress: () => this.inputDigit(5)
              },
              "5"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-6",
                onPress: () => this.inputDigit(6)
              },
              "6"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-7",
                onPress: () => this.inputDigit(7)
              },
              "7"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-8",
                onPress: () => this.inputDigit(8)
              },
              "8"
            ),
            /*#__PURE__*/ React.createElement(
              CalculatorKey,
              {
                className: "key-9",
                onPress: () => this.inputDigit(9)
              },
              "9"
            )
          )
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "operator-keys"
          },
          /*#__PURE__*/ React.createElement(
            CalculatorKey,
            {
              className: "key-divide",
              onPress: () => this.performOperation("/")
            },
            "\xF7"
          ),
          /*#__PURE__*/ React.createElement(
            CalculatorKey,
            {
              className: "key-multiply",
              onPress: () => this.performOperation("*")
            },
            "\xD7"
          ),
          /*#__PURE__*/ React.createElement(
            CalculatorKey,
            {
              className: "key-subtract",
              onPress: () => this.performOperation("-")
            },
            "\u2212"
          ),
          /*#__PURE__*/ React.createElement(
            CalculatorKey,
            {
              className: "key-add",
              onPress: () => this.performOperation("+")
            },
            "+"
          ),
          /*#__PURE__*/ React.createElement(
            CalculatorKey,
            {
              className: "key-equals",
              onPress: () => this.performOperation("=")
            },
            "="
          )
        )
      )
    );
  }
}

ReactDOM.render(
  /*#__PURE__*/ React.createElement(Calculator, null),
  document.getElementById("app")
);
