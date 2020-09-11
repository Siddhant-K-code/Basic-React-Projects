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

const TIME = 30; // Initial game duration, in seconds

class Expression extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const node = ReactDOM.findDOMNode(this.ref);

    if (this.props.transitioning) {
      node.classList.add("transitioning");
    } else {
      node.classList.remove("transitioning");
    }
  }

  render() {
    const { from, to } = this.props;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "expression",
        ref: (ref) => (this.ref = ref)
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "from"
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "text"
          },
          from
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "box"
          },
          "?"
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "to"
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "text"
          },
          to
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "box"
          },
          "?"
        )
      )
    );
  }
}

class Timer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.secondsToTimeObject(
      Math.floor((props.endTime - Date.now()) / 1000)
    );
  }

  componentDidMount() {
    this.continouslyUpdateTime();
  }

  componentDidUpdate() {
    this.continouslyUpdateTime();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  continouslyUpdateTime() {
    this.updateTime();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const { m, s } = this.state;

      if (m > 0 || s > 0) {
        this.continouslyUpdateTime();
      } else {
        this.props.onTimerEnd();
      }
    }, 50);
  }

  updateTime() {
    const { endTime } = this.props;
    const { m, s } = this.state;
    const remaining = Math.floor((endTime - Date.now()) / 1000);

    if (remaining !== m * 6 + s) {
      this.setState(this.secondsToTimeObject(remaining));
    }
  }

  secondsToTimeObject(s) {
    return {
      m: Math.floor(s / 60),
      s: s % 60
    };
  }

  render() {
    const { m, s } = this.state;
    const remaining = m * 60 + s;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: `timer ${
          remaining < 5 && remaining > 0 ? "animated bounceIn red" : ""
        }`,
        ref: (ref) => (this.ref = ref)
      },
      m > 9 ? "" : "0",
      m,
      " : ",
      s > 9 ? "" : "0",
      s
    );
  }
}

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      change: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      score: props.status.score,
      change: props.status.score - state.score
    };
  }

  getSnapshotBeforeUpdate() {
    if (this.change) {
      const node = ReactDOM.findDOMNode(this.change);
      node.className = "change animated hidden";
    }
  }

  componentDidUpdate() {
    setTimeout(() => {
      // Timeout is needed for the animation to properly work
      if (this.change) {
        const { change } = this.state;
        const node = ReactDOM.findDOMNode(this.change);
        node.classList.remove("hidden");
        node.className +=
          change > 0 ? " positive fadeOutUp" : " negative fadeOutDown";
      }
    }, 0);
  }

  format(score) {
    return score.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
  }

  render() {
    const {
      onTimerEnd,
      endTime,
      status: { multiplier, max, asked, answered }
    } = this.props;
    const { score, change } = this.state;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "header"
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "container"
        },
        /*#__PURE__*/ React.createElement(Timer, {
          endTime: endTime,
          onTimerEnd: onTimerEnd
        }),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "status"
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "status-item max"
            },
            "up to ",
            max
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "status-item rate"
            },
            answered,
            "/",
            asked
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "status-item score"
            },
            this.format(score),
            multiplier > 1 &&
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "multiplier"
                },
                "x",
                multiplier
              ),
            change !== 0 &&
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  ref: (ref) => (this.change = ref),
                  className: "change animated"
                },
                change > 0 ? "+" : "",
                change
              )
          )
        )
      )
    );
  }
}

class MultipleChoice extends React.PureComponent {
  render() {
    const { values, selected, correct, onClick } = this.props;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "multiple-choice"
      },
      values.map((res) =>
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: `choice animated ${
              selected === res
                ? correct
                  ? "tada positive"
                  : "negative wobble"
                : ""
            }`,
            onClick: () => onClick(res)
          },
          res
        )
      )
    );
  }
}

class Badge extends React.PureComponent {
  render() {
    const { score } = this.props;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "badge"
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "score"
        },
        score
      ),
      /*#__PURE__*/ React.createElement(
        "svg",
        {
          viewBox: "0 0 31.531 31.531"
        },
        /*#__PURE__*/ React.createElement(
          "g",
          null,
          /*#__PURE__*/ React.createElement(
            "g",
            null,
            /*#__PURE__*/ React.createElement("path", {
              fill: "#f5c30e",
              d:
                "M11.872,24.961l-2.539,0.412c-0.711,0.114-1.4-0.058-1.961-0.468c-0.558-0.401-0.94-1.031-1.043-1.72l-0.223-1.482 L1.699,26.11c-0.219,0.219-0.299,0.542-0.207,0.838c0.092,0.296,0.34,0.519,0.645,0.575l2.801,0.523l0.523,2.801 c0.057,0.305,0.278,0.554,0.574,0.646c0.296,0.093,0.62,0.013,0.839-0.208l5.755-5.755l-0.422-0.427 C12.118,25.012,11.996,24.961,11.872,24.961z"
            }),
            /*#__PURE__*/ React.createElement("path", {
              fill: "#34495e",
              d:
                "M19.91,23.932l2.458,0.404c0.411,0.068,0.833-0.031,1.17-0.277c0.336-0.243,0.562-0.614,0.624-1.026l0.37-2.458 c0.075-0.492,0.383-0.917,0.829-1.141l2.224-1.111c0.372-0.188,0.656-0.516,0.784-0.912c0.13-0.396,0.093-0.828-0.098-1.199 L27.129,14c-0.229-0.438-0.229-0.964,0-1.403l1.144-2.211c0.19-0.37,0.227-0.802,0.098-1.199 c-0.129-0.394-0.412-0.723-0.785-0.911l-2.223-1.112c-0.447-0.224-0.754-0.648-0.829-1.14l-0.37-2.458 c-0.062-0.412-0.288-0.782-0.624-1.026c-0.337-0.247-0.759-0.346-1.17-0.279l-2.457,0.405c-0.489,0.082-0.987-0.08-1.335-0.434 l-1.75-1.773C16.544,0.175,16.164,0.012,15.766,0c-0.398,0.013-0.779,0.175-1.061,0.459l-1.75,1.773 c-0.348,0.354-0.846,0.516-1.335,0.434L9.163,2.261C8.751,2.194,8.33,2.293,7.993,2.54C7.657,2.784,7.431,3.154,7.369,3.566 l-0.37,2.458C6.923,6.516,6.617,6.94,6.169,7.164L3.947,8.276C3.574,8.464,3.291,8.793,3.162,9.188 c-0.129,0.396-0.093,0.829,0.097,1.199l1.144,2.211c0.229,0.439,0.229,0.964,0,1.403L3.26,16.211 c-0.19,0.371-0.227,0.803-0.097,1.199c0.128,0.396,0.412,0.725,0.784,0.912l2.224,1.111C6.617,19.657,6.924,20.082,7,20.574 l0.37,2.458c0.062,0.412,0.288,0.783,0.624,1.026c0.337,0.246,0.759,0.346,1.17,0.277l2.458-0.404 c0.489-0.082,0.987,0.08,1.335,0.436l1.75,1.771c0.281,0.285,0.661,0.447,1.059,0.459c0.398-0.012,0.778-0.174,1.059-0.459 l1.75-1.771C18.923,24.012,19.421,23.85,19.91,23.932z M15.766,22.542c-5.205-0.026-9.431-4.266-9.431-9.477 c0-5.21,4.226-9.451,9.431-9.478c5.205,0.026,9.432,4.268,9.432,9.478C25.197,18.276,20.971,22.516,15.766,22.542z"
            }),
            /*#__PURE__*/ React.createElement("path", {
              fill: "#34495e",
              d:
                "M15.766,4.955c-4.444,0.028-8.05,3.648-8.05,8.097c0,4.447,3.606,8.068,8.05,8.096c4.444-0.027,8.05-3.648,8.05-8.096 C23.815,8.604,20.21,4.983,15.766,4.955z"
            }),
            /*#__PURE__*/ React.createElement("path", {
              fill: "#f5c30e",
              d:
                "M29.833,26.11l-4.407-4.407l-0.223,1.482c-0.104,0.688-0.485,1.318-1.043,1.72c-0.562,0.41-1.25,0.582-1.961,0.468 l-2.539-0.412c-0.124,0-0.246,0.051-0.335,0.143l-0.422,0.427l5.755,5.755c0.219,0.221,0.543,0.301,0.839,0.208 c0.296-0.092,0.517-0.341,0.574-0.646l0.522-2.801l2.801-0.523c0.306-0.057,0.554-0.279,0.646-0.575S30.052,26.329,29.833,26.11z"
            })
          )
        )
      )
    );
  }
}

class Summary extends React.PureComponent {
  componentDidMount() {
    // Hide the summary initially until it's rendered once to skip the initial bounce up animation
    this.mounted = true;
  }

  render() {
    const { show, score, onPlayAgain } = this.props;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        class: `summary ${!this.mounted ? "hidden" : ""} animated ${
          show ? "bounceInDown" : "bounceOutUp"
        }`
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "title"
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "big"
          },
          "GOOD JOB!"
        ),
        "Your Score is:"
      ),
      /*#__PURE__*/ React.createElement(Badge, {
        score: score
      }),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "button",
          onClick: onPlayAgain
        },
        "PLAY AGAIN"
      )
    );
  }
}

class Game extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleOnClick", (value) => {
      const {
        prev: { a, b },
        selected
      } = this.state;
      if (selected !== -1) return;

      if (value === a + b) {
        this.increaseScore();
      } else {
        this.decreaseScore();
      }

      this.setState({
        selected: value
      });
      setTimeout(() => {
        this.setState({
          prev: this.state.next,
          next: this.generateProblem(this.state.status.max),
          selected: -1
        });
      }, 1500);
    });

    _defineProperty(this, "handleOnTimerEnd", () => {
      this.setState({
        showSummary: true
      });
    });

    _defineProperty(this, "handleOnPlayAgain", () => {
      const status = this.getInitialStatus();
      this.setState({
        status,
        showSummary: false,
        endTime: Date.now() + TIME * 1000,
        prev: this.generateProblem(status.max),
        next: this.generateProblem(status.max)
      });
    });

    const _status = this.getInitialStatus();

    this.state = {
      status: _status,
      selected: -1,
      showSummary: false,
      endTime: Date.now() + TIME * 1000,
      prev: this.generateProblem(_status.max),
      next: this.generateProblem(_status.max)
    };
  }

  getInitialStatus() {
    return {
      score: 0,
      max: 10,
      asked: 0,
      answered: 0,
      multiplier: 1
    };
  }

  randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  generateProblem(max) {
    const a = this.randomNumber(max);
    const b = this.randomNumber(max - a);
    return {
      a,
      b,
      choices: this.getChoices(a, b, max)
    };
  }

  increaseScore() {
    const { status } = this.state;
    let endTime = this.state.endTime;
    let max = status.max; // Add time and increase max every 5 correct answers

    if (status.answered % 5 === 4) {
      endTime += 15000;
      max *= 2;
    }

    this.setState({
      endTime,
      status: _objectSpread(
        _objectSpread({}, status),
        {},
        {
          multiplier: Math.min(status.multiplier + 1, 5),
          score: status.score + max * status.multiplier,
          asked: status.asked + 1,
          answered: status.answered + 1,
          max
        }
      )
    });
  }

  decreaseScore() {
    const { status } = this.state;
    this.setState({
      status: _objectSpread(
        _objectSpread({}, status),
        {},
        {
          multiplier: 1,
          score: Math.max(0, status.score - Math.floor(status.max * 0.25)),
          // Decrease by MAX * <Correct Answer Probability>
          asked: status.asked + 1
        }
      )
    });
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
  }

  getChoices(a, b, max) {
    const result = a + b;
    const choices = [result];

    while (choices.length < 4) {
      const choice = this.randomNumber(max);

      if (!choices.includes(choice)) {
        choices.push(choice);
      }
    }

    return this.shuffle(choices);
  }

  render() {
    const { prev, next, status, selected, showSummary, endTime } = this.state;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "game-container"
      },
      /*#__PURE__*/ React.createElement(Header, {
        status: status,
        endTime: endTime,
        onTimerEnd: this.handleOnTimerEnd
      }),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "body"
        },
        /*#__PURE__*/ React.createElement(Expression, {
          from: `${prev.a} + ${prev.b} = `,
          to: `${next.a} + ${next.b} = `,
          transitioning: selected !== -1
        })
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "footer"
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "container"
          },
          /*#__PURE__*/ React.createElement(MultipleChoice, {
            values: prev.choices,
            selected: selected,
            onClick: this.handleOnClick,
            correct: selected === prev.a + prev.b
          })
        )
      ),
      /*#__PURE__*/ React.createElement(Summary, {
        show: showSummary,
        score: status.score,
        onPlayAgain: this.handleOnPlayAgain
      })
    );
  }
}

ReactDOM.render(/*#__PURE__*/ React.createElement(Game, null), document.body);
