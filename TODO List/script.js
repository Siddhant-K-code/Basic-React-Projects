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

const generateRandomId = () => Math.random().toString(36).substring(7);

const Checkmark = ({ onClick }) =>
  /*#__PURE__*/ React.createElement(
    "svg",
    {
      onClick: onClick,
      className: "checkmark",
      viewBox: "0 0 100 100"
    },
    /*#__PURE__*/ React.createElement("polyline", {
      fill: "none",
      "stroke-miterlimit": "20",
      points: "15,60 40,80 85,20"
    })
  );

const Times = ({ onClick }) =>
  /*#__PURE__*/ React.createElement(
    "svg",
    {
      onClick: onClick,
      className: "times",
      viewBox: "0 0 100 100"
    },
    /*#__PURE__*/ React.createElement("polyline", {
      fill: "none",
      "stroke-miterlimit": "20",
      points: "10,10 90,90"
    }),
    /*#__PURE__*/ React.createElement("polyline", {
      fill: "none",
      "stroke-miterlimit": "20",
      points: "90,10 10,90"
    })
  );

class Item extends React.PureComponent {
  render() {
    const {
      text,
      done,
      id,
      top,
      onMarkDone,
      onMarkUndone,
      onChange
    } = this.props;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: classNames("todo-item", {
          done
        }),
        style: {
          top
        }
      },
      /*#__PURE__*/ React.createElement(Checkmark, {
        onClick: () => onMarkDone(0, id)
      }),
      /*#__PURE__*/ React.createElement(Times, {
        onClick: () => onMarkUndone(0, id)
      }),
      !done &&
        /*#__PURE__*/ React.createElement(
          "textarea",
          {
            onChange: (e) => onChange(0, id, e.target.value),
            style: {
              height: 20
            }
          },
          text
        ),
      done &&
        /*#__PURE__*/ React.createElement(
          "strike",
          {
            onClick: () => onMarkUndone(0, id)
          },
          text
        )
    );
  }
}

class List extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      showCompleted: true
    });

    _defineProperty(this, "handleOnToggleCompleted", () => {
      this.setState({
        showCompleted: !this.state.showCompleted
      });
    });
  }

  getItems() {
    const { showCompleted } = this.state;
    const { items } = this.props;
    return items.filter((item) => (!showCompleted ? !item.done : true));
  }

  render() {
    const { showCompleted } = this.state;
    const {
      items,
      title,
      onAdd,
      onChange,
      onMarkDone,
      onMarkUndone
    } = this.props;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "todo-list"
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "title"
        },
        title
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "count"
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "remaining"
          },
          /*#__PURE__*/ React.createElement(
            "strong",
            null,
            items.filter((item) => !item.done).length
          ),
          " Remaining"
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "out-of"
          },
          "Out of ",
          /*#__PURE__*/ React.createElement("strong", null, items.length)
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "add",
          onClick: () => onAdd(0)
        },
        "+"
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "items"
        },
        this.getItems().map((item, i) =>
          /*#__PURE__*/ React.createElement(
            Item,
            _extends({}, item, {
              top: i * 40,
              onMarkDone: onMarkDone,
              onMarkUndone: onMarkUndone,
              onChange: onChange,
              key: item.id
            })
          )
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "footer"
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "button",
            onClick: this.handleOnToggleCompleted
          },
          showCompleted ? "Hide" : "Show",
          " Completed"
        )
      )
    );
  }
}

class Lists extends React.PureComponent {}

class App extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      data: [
        {
          title: "My List",
          items: [
            {
              id: generateRandomId(),
              text: "TODO Item One"
            },
            {
              id: generateRandomId(),
              text: "TODO Item Two"
            },
            {
              id: generateRandomId(),
              text: "TODO Item Three"
            },
            {
              id: generateRandomId(),
              text: "TODO Item Four",
              done: true
            },
            {
              id: generateRandomId(),
              text: "TODO Item Five",
              done: true
            }
          ]
        }
      ]
    });

    _defineProperty(this, "handleOnAdd", (list) => {
      const newData = [...this.state.data];
      newData[list].items = [...newData[list].items];
      newData[list].items.push({
        id: generateRandomId(),
        text: "TODO Item"
      });
      this.setState({
        data: newData
      });
    });

    _defineProperty(this, "handleOnMarkDone", (list, item) => {
      const { data } = this.state;
      this.setState({
        data: this.updateItem(data, list, item, (item) =>
          _objectSpread(
            _objectSpread({}, item),
            {},
            {
              done: true
            }
          )
        )
      });
    });

    _defineProperty(this, "handleOnMarkUndone", (list, item) => {
      const { data } = this.state;
      this.setState({
        data: this.updateItem(data, list, item, (item) =>
          _objectSpread(
            _objectSpread({}, item),
            {},
            {
              done: false
            }
          )
        )
      });
    });

    _defineProperty(this, "handleOnChange", (list, item, text) => {
      const { data } = this.state;
      this.setState({
        data: this.updateItem(data, list, item, (item) =>
          _objectSpread(
            _objectSpread({}, item),
            {},
            {
              text
            }
          )
        )
      });
    });
  }

  updateItem(data, list, item, callback) {
    const newData = [...data];
    const index = data[list].items.findIndex(({ id }) => id === item);
    newData[list].items = [...data[list].items];
    newData[list].items[index] = callback(data[list].items[index]);
    return newData;
  }

  render() {
    const { data } = this.state;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        id: "app"
      },
      /*#__PURE__*/ React.createElement(List, {
        items: data[0].items,
        title: data[0].title,
        onAdd: this.handleOnAdd,
        onChange: this.handleOnChange,
        onMarkDone: this.handleOnMarkDone,
        onMarkUndone: this.handleOnMarkUndone
      })
    );
  }
}

ReactDOM.render(/*#__PURE__*/ React.createElement(App, null), document.body);
