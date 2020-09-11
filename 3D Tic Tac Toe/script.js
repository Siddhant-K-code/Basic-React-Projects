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

const X = "X";
const O = "O"; // The following array holds all the possible
// winning combinations for the game. Using
// bitwise arithmatic, each cell is represented
// by 2 to the power of the cell's number
// (2^0,2^1,2^2, ... , 2^8). The winning
// combination is the sum of all the numbers
// in the corresponding cells (can also be
// achieved by OR-ing two numbers). For example,
// the winning combination for the first row is
// 1+2+4 = 7. These patterns are compared with
// each player's pattern by using bitwise AND.
// if the result of the AND operation is equal
// to the winning pattern, that player is the winner.

const WINNING_PATTERNS = [
  7,
  56,
  448, // Horizontal
  73,
  146,
  292, // Vertical
  273,
  84 // Cross
];

const Circle = () =>
  /*#__PURE__*/ React.createElement(
    "svg",
    {
      className: "pawn circle",
      viewBox: "0 0 128 128"
    },
    /*#__PURE__*/ React.createElement("path", {
      d: "M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"
    })
  );

const Times = () =>
  /*#__PURE__*/ React.createElement(
    "svg",
    {
      className: "pawn times",
      viewBox: "0 0 128 128"
    },
    /*#__PURE__*/ React.createElement("path", {
      d: "M16,16L112,112"
    }),
    /*#__PURE__*/ React.createElement("path", {
      d: "M112,16L16,112"
    })
  );

class Line extends React.PureComponent {
  d() {
    const { pattern } = this.props;
    return {
      7: `M 0,5 H 100`,
      56: `M 0,50 H 100`,
      448: `M 0,95 H 100`,
      73: `M 5,0 V 100`,
      146: `M 50,0 V 100`,
      292: `M 95,0 V 100`,
      273: `M 0,0 L 100,100`,
      84: `M 100,0 L 0,100`
    }[pattern];
  }

  render() {
    const { show } = this.props;
    return /*#__PURE__*/ React.createElement(
      "svg",
      {
        className: `line ${show ? "visible" : ""}`,
        viewBox: "0 0 100 100"
      },
      /*#__PURE__*/ React.createElement(
        "g",
        null,
        /*#__PURE__*/ React.createElement("path", {
          d: this.d()
        })
      )
    );
  }
}

class Cube extends React.PureComponent {
  componentDidMount() {
    // For some reason, setting preserve-3d in CSS causes
    // visual discrepancies that are only solved by applying
    // them after the first render.
    setTimeout(() => {
      this.ref.style.transformStyle = "preserve-3d";
    }, 500);
  }

  render() {
    const { value, onClick } = this.props;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: `cube ${value ? "rotated" : ""}`,
        onClick: onClick,
        ref: (ref) => (this.ref = ref)
      },
      ["top", "bottom", "left", "right", "front", "back"].map((face) =>
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: face
          },
          face === "back" &&
            value === O &&
            /*#__PURE__*/ React.createElement(Circle, null),
          face === "back" &&
            value === X &&
            /*#__PURE__*/ React.createElement(Times, null)
        )
      )
    );
  }
}

const Row = ({ children }) =>
  /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "row"
    },
    children
  );

class Results extends React.PureComponent {
  render() {
    const { winner, draw, onPlayAgain } = this.props;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "results"
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "message"
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "symbol"
          },
          winner === X && /*#__PURE__*/ React.createElement(Times, null),
          winner === O && /*#__PURE__*/ React.createElement(Circle, null),
          draw &&
            /*#__PURE__*/ React.createElement(
              React.Fragment,
              null,
              /*#__PURE__*/ React.createElement(Times, null),
              /*#__PURE__*/ React.createElement(Circle, null)
            )
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "text"
          },
          winner ? "Wins!" : "Draw!"
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "replay",
          onClick: onPlayAgain
        },
        "Play Again"
      )
    );
  }
}

class Board extends React.PureComponent {
  render() {
    const { board, onClick } = this.props;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "board"
      },
      board.map((row, i) =>
        /*#__PURE__*/ React.createElement(
          Row,
          null,
          row.map((col, j) =>
            /*#__PURE__*/ React.createElement(Cube, {
              value: col,
              onClick: () => onClick(i, j)
            })
          )
        )
      )
    );
  }
}

class Game extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleOnClick", (i, j) => {
      if (null === this.state.board[i][j]) {
        const { player, board, patterns } = this.state;
        const state = {
          board: [...board],
          player: player === X ? O : X,
          patterns: _objectSpread({}, patterns)
        }; // Set the value in the board

        state.board[i][j] = player; // Add the value to the player pattern using bitwise OR

        state.patterns[player] = state.patterns[player] |= Math.pow(
          2,
          i * 3 + j
        );
        state.winner = this.checkForWin(state.patterns);
        this.setState(state);

        if (state.winner || this.isBoardFull(board)) {
          setTimeout(() => {
            this.setState({
              rotated: true
            });
          }, 1500);
        }
      }
    });

    _defineProperty(this, "handleOnPlayAgain", () => {
      this.setState({
        rotated: false
      });
      setTimeout(() => {
        this.setState(this.getInitialState());
      }, 1000);
    });

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      player: X,
      patterns: {
        [X]: 0,
        [O]: 0
      },
      winner: null,
      rotated: false,
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
    };
  }

  checkForWin(patterns) {
    // Loop through all possible winning sets
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      // Use bitwise AND to determind if the player's score
      // Holds a winning combination
      if ((WINNING_PATTERNS[i] & patterns[X]) === WINNING_PATTERNS[i]) return X;
      if ((WINNING_PATTERNS[i] & patterns[O]) === WINNING_PATTERNS[i]) return O;
    } // No winner

    return false;
  }

  isBoardFull(board) {
    return !this.state.board.some((row, i) => {
      return row.some((col, j) => null === col);
    });
  }

  getWinningPattern() {
    const { winner, patterns } = this.state;
    return WINNING_PATTERNS.find(
      (pattern) => (pattern & patterns[winner]) === pattern
    );
  }

  render() {
    const { board, winner, rotated } = this.state;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: `game ${rotated ? "rotated" : ""}`
      },
      /*#__PURE__*/ React.createElement(Results, {
        winner: winner,
        draw: !winner && this.isBoardFull(board),
        onPlayAgain: this.handleOnPlayAgain
      }),
      /*#__PURE__*/ React.createElement(Line, {
        show: winner,
        pattern: this.getWinningPattern()
      }),
      /*#__PURE__*/ React.createElement(Board, {
        board: board,
        onClick: this.handleOnClick
      })
    );
  }
}

ReactDOM.render(/*#__PURE__*/ React.createElement(Game, null), document.body);
