"use strict";

let _2 = (t) => t,_t,
  _t2,
  _t3,
  _t4,
  _t5,
  _t6,
  _t7,
  _t8,
  _t9,
  _t10,
  _t11,
  _t12,
  _t13,
  _t14,
  _t15,
  _t16,
  _t17,
  _t18,
  _t19,
  _t20,
  _t21,
  _t22;

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

const { render } = ReactDOM;
const { Component, PropTypes } = React;
const { h1, h2, div, input, textarea, a, svg, g, line, text } = styled.default;
const { darken, lighten, transparentize } = polished;
const { grid, template } = GridTemplateParser; // helpers

const clamp = (value, min, max) => Math.min(Math.max(value, min), max); // styles

const colors = {
  primary: "#263238",
  secondary: "#1DE9B6"
};
const StyledApp = div(
  _t ||
    (_t = _2`
  display: grid;
  grid-template-columns: 25rem auto;
  grid-template-rows: auto;
  grid-template-areas: "sidebar main";
  width: 100%;
  height: 100vh;
`)
);
const StyledSidebar = div(
  _t2 ||
    (_t2 = _2`
  display: flex;
  flex-direction: column;
  grid-area: sidebar;
  background: ${0};
  overflow: hidden;
`),
  darken(0.1, colors.primary)
);
const StyledMain = div(
  _t3 ||
    (_t3 = _2`
  display: flex;
  flex-direction: column;
  grid-area: main;
  padding: 2rem;
  background: ${0};
`),
  darken(0.05, colors.primary)
);
const StyledMainInner = div(
  _t4 ||
    (_t4 = _2`
  flex: 1;
  position: relative;
`)
);
const StyledGrid = svg(
  _t5 ||
    (_t5 = _2`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`)
);
const StyledGridText = text(
  _t6 ||
    (_t6 = _2`
  font-family: 'Roboto Mono', monospace;
  font-weight: 500;
  font-size: 1rem;
  text-anchor: middle;
  alignment-baseline: middle;
  fill: ${0};
`),
  transparentize(0.75, colors.secondary)
);
const StyledGridLine = line(
  _t7 ||
    (_t7 = _2`
  stroke: ${0};
  stroke-width: 1px;
`),
  darken(0.01, colors.primary)
);
const StyledPreview = div(
  _t8 ||
    (_t8 = _2`
  z-index: 5;
  position: relative;
  display: grid;
  grid-template-columns: repeat(${0}, 1fr);
  grid-template-rows: repeat(${0}, 1fr);
  grid-template-areas: ${0};
  width: 100%;
  height: 100%;
`),
  (props) => props.width,
  (props) => props.height,
  (props) => props.tpl
);
const StyledTrack = div(
  _t9 ||
    (_t9 = _2`
  position: relative;
  grid-area: ${0};
  cursor: ${0};
  background: ${0};
`),
  (props) => props.area,
  (props) => (props.grabbing ? "grabbing" : "grab"),
  transparentize(0.97, colors.secondary)
);
const StyledHandler = div(
  _t10 ||
    (_t10 = _2`
  position: absolute;
  top: ${0};
  right: ${0};
  bottom: ${0};
  left: ${0};
  width: ${0};
  height: ${0};
  cursor: ${0};
  background: ${0};
`),
  ({ position }) => (position === "bottom" ? "auto" : 0),
  ({ position }) => (position === "left" ? "auto" : 0),
  ({ position }) => (position === "top" ? "auto" : 0),
  ({ position }) => (position === "right" ? "auto" : 0),
  ({ position, size }) =>
    position === "left" || position === "right" ? size : "100%",
  ({ position, size }) =>
    position === "top" || position === "bottom" ? size : "100%",
  ({ position }) =>
    position === "left" || position === "right" ? "col-resize" : "row-resize",
  colors.secondary
);
const StyledHint = div(
  _t11 ||
    (_t11 = _2`
  padding: 2rem;
`)
);
const StyledHintTitle = h1(
  _t12 ||
    (_t12 = _2`
  padding-bottom: 1rem;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${0};
`),
  colors.secondary
);
const StyledHintDescription = div(
  _t13 ||
    (_t13 = _2`
  line-height: 1.6;
  font-size: 1rem;
  color: ${0};
`),
  lighten(0.6, colors.primary)
);
const StyledTemplate = div(
  _t14 ||
    (_t14 = _2`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`)
);
const StyledTemplateTitle = h2(
  _t15 ||
    (_t15 = _2`
  padding-bottom: 1.5rem;
  text-transform: uppercase;
  font-size: .85rem;
  font-weight: 500;
  color: ${0};
  letter-spacing: .1rem;
`),
  colors.secondary
);
const StyledTemplateControl = div(
  _t16 ||
    (_t16 = _2`
  flex: 1;
`)
);
const StyledTemplateInput = textarea(
  _t17 ||
    (_t17 = _2`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background: ${0};
  border-radius: 2px;
  border: none;
  resize: none;
  line-height: 1.5;
  font-family: 'Roboto Mono', monospace;
  font-size: .85rem;
  color: #fff;
  transition: background .2s;

  &:focus {
    outline: 0;
    background: ${0};
  }
`),
  darken(0.125, colors.primary),
  darken(0.15, colors.primary)
);
const StyledSettings = div(
  _t18 ||
    (_t18 = _2`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    display: block;
    height: 1px;
    background: ${0};
  }
`),
  colors.primary
);
const StyledSettingDivider = div(
  _t19 ||
    (_t19 = _2`
  text-align: center;
  font-family: 'Roboto Mono';
  font-weight: 500;
  font-size: 1.05rem;
  color: ${0};
`),
  lighten(0.05, colors.primary)
);
const StyledSettingInput = input(
  _t20 ||
    (_t20 = _2`
  width: 4rem;
  padding: .4rem .6rem;
  margin: 0 .75rem;
  background: ${0};
  border: none;
  border-radius: 2px;
  text-align: center;
  font-family: 'Roboto Mono';
  font-size: .8rem;
  color: #fff;
  transition: background .2s;

  &:focus {
    outline: 0;
    background: ${0};
  }
`),
  darken(0.1, colors.primary),
  darken(0.125, colors.primary)
);
const StyledFoot = div(
  _t21 ||
    (_t21 = _2`
  padding: 0 2rem 2rem;
`)
);
const StyledLink = a(
  _t22 ||
    (_t22 = _2`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 500;
  font-size: .8rem;
  color: ${0};
  transition: color .2s;

  &:hover {
    color: #fff;
  }
  &::before,
  &::after {
    content: '';
    flex: 1;
    display: block;
    height: 1px;
    background: ${0};
  }
  &::before {
    margin-right: .75rem;
  }
  &::after {
    margin-left: .75rem;
  }
`),
  colors.secondary,
  colors.primary
);

function Sidebar(props) {
  return /*#__PURE__*/ React.createElement(
    StyledSidebar,
    null,
    /*#__PURE__*/ React.createElement(Hint, null),
    /*#__PURE__*/ React.createElement(Template, props),
    /*#__PURE__*/ React.createElement(Foot, null)
  );
}

function Hint() {
  return /*#__PURE__*/ React.createElement(
    StyledHint,
    null,
    /*#__PURE__*/ React.createElement(
      StyledHintTitle,
      null,
      "CSS Grid Template Builder"
    ),
    /*#__PURE__*/ React.createElement(
      StyledHintDescription,
      null,
      "A simple tool to build complex CSS Grid templates. Edit the template string below or drag the areas in the preview. The changes will reflect in both sides."
    )
  );
}

function Foot() {
  return /*#__PURE__*/ React.createElement(
    StyledFoot,
    null,
    /*#__PURE__*/ React.createElement(
      StyledLink,
      {
        href: "https://twitter.com/Siddhant_K_code",
        target: "_blank"
      },
      "Follow me on Twitter!"
    )
  );
}

function Template({ tpl, setTracks }) {
  return /*#__PURE__*/ React.createElement(
    StyledTemplate,
    null,
    /*#__PURE__*/ React.createElement(
      StyledTemplateTitle,
      null,
      "Template areas"
    ),
    /*#__PURE__*/ React.createElement(
      StyledTemplateControl,
      null,
      /*#__PURE__*/ React.createElement(
        Text,
        {
          value: tpl,
          onBlur: setTracks
        },
        (props) => /*#__PURE__*/ React.createElement(StyledTemplateInput, props)
      )
    )
  );
}

function Main({ tpl, width, height, areas, setArea, setWidth, setHeight }) {
  return /*#__PURE__*/ React.createElement(
    StyledMain,
    null,
    /*#__PURE__*/ React.createElement(Settings, {
      width: width,
      height: height,
      setWidth: setWidth,
      setHeight: setHeight
    }),
    /*#__PURE__*/ React.createElement(
      StyledMainInner,
      null,
      /*#__PURE__*/ React.createElement(Grid, {
        width: width,
        height: height,
        areas: areas
      }),
      /*#__PURE__*/ React.createElement(Preview, {
        tpl: tpl,
        width: width,
        height: height,
        areas: areas,
        setArea: setArea
      })
    )
  );
}

function Settings({ width, height, setWidth, setHeight }) {
  return /*#__PURE__*/ React.createElement(
    StyledSettings,
    null,
    /*#__PURE__*/ React.createElement(
      Text,
      {
        value: width,
        onBlur: setWidth
      },
      (props) => /*#__PURE__*/ React.createElement(StyledSettingInput, props)
    ),
    /*#__PURE__*/ React.createElement(StyledSettingDivider, null, "x"),
    /*#__PURE__*/ React.createElement(
      Text,
      {
        value: height,
        onBlur: setHeight
      },
      (props) => /*#__PURE__*/ React.createElement(StyledSettingInput, props)
    )
  );
}

function Track({
  area,
  column,
  row,
  grabbing,
  onMouseDown,
  onHandlerMouseDown
}) {
  return /*#__PURE__*/ React.createElement(
    StyledTrack,
    {
      area: area,
      grabbing: grabbing,
      onMouseDown: onMouseDown
    },
    /*#__PURE__*/ React.createElement(Handler, {
      position: "top",
      onMouseDown: onHandlerMouseDown("top")
    }),
    /*#__PURE__*/ React.createElement(Handler, {
      position: "right",
      onMouseDown: onHandlerMouseDown("right")
    }),
    /*#__PURE__*/ React.createElement(Handler, {
      position: "bottom",
      onMouseDown: onHandlerMouseDown("bottom")
    }),
    /*#__PURE__*/ React.createElement(Handler, {
      position: "left",
      onMouseDown: onHandlerMouseDown("left")
    })
  );
}

function Handler({ position, onMouseDown }) {
  return /*#__PURE__*/ React.createElement(StyledHandler, {
    size: "6px",
    position: position,
    onMouseDown: onMouseDown
  });
}

class App extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      tracks: {
        width: 4,
        height: 6,
        areas: {
          head: {
            column: {
              start: 1,
              end: 5,
              span: 4
            },
            row: {
              start: 1,
              end: 2,
              span: 1
            }
          },
          aside: {
            column: {
              start: 1,
              end: 2,
              span: 1
            },
            row: {
              start: 2,
              end: 4,
              span: 2
            }
          },
          main: {
            column: {
              start: 2,
              end: 5,
              span: 3
            },
            row: {
              start: 2,
              end: 6,
              span: 4
            }
          },
          foot: {
            column: {
              start: 1,
              end: 5,
              span: 4
            },
            row: {
              start: 6,
              end: 7,
              span: 1
            }
          }
        }
      }
    });

    _defineProperty(this, "setTracks", (evt) => {
      this.setState(() => ({
        tracks: grid(evt.target.value)
      }));
    });

    _defineProperty(this, "integer", (value, previous, min, max) => {
      const int = parseInt(value);
      const safe = isNaN(int) ? previous : clamp(int, min, max);
      return safe;
    });

    _defineProperty(this, "setWidth", (evt) => {
      this.setState(({ tracks }) => ({
        tracks: _objectSpread(
          _objectSpread({}, tracks),
          {},
          {
            width: this.integer(evt.target.value, tracks.width, 1, 100)
          }
        )
      }));
    });

    _defineProperty(this, "setHeight", (evt) => {
      this.setState(({ tracks }) => ({
        tracks: _objectSpread(
          _objectSpread({}, tracks),
          {},
          {
            height: this.integer(evt.target.value, tracks.height, 1, 100)
          }
        )
      }));
    });

    _defineProperty(this, "setArea", (key, value) => {
      this.setState(({ tracks }) => ({
        tracks: _objectSpread(
          _objectSpread({}, tracks),
          {},
          {
            areas: _objectSpread(
              _objectSpread({}, tracks.areas),
              {},
              {
                [key]: value
              }
            )
          }
        )
      }));
    });
  }

  render() {
    const { tracks } = this.state;
    const { width, height, areas } = tracks;
    const tpl = template(tracks);
    return /*#__PURE__*/ React.createElement(
      StyledApp,
      null,
      /*#__PURE__*/ React.createElement(Sidebar, {
        tpl: tpl,
        setTracks: this.setTracks
      }),
      /*#__PURE__*/ React.createElement(Main, {
        tpl: tpl,
        width: width,
        height: height,
        areas: areas,
        setArea: this.setArea,
        setWidth: this.setWidth,
        setHeight: this.setHeight
      })
    );
  }
}

class Text extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isFocused: false,
      value: this.props.value
    });

    _defineProperty(this, "handleFocus", (evt) => {
      evt.persist();
      this.props.onFocus(evt);
      this.setState(() => ({
        isFocused: true
      }));
    });

    _defineProperty(this, "handleBlur", (evt) => {
      evt.persist();
      this.props.onBlur(evt);
      this.setState(() => ({
        isFocused: false
      }));
    });

    _defineProperty(this, "handleChange", (evt) => {
      evt.persist();
      const { value } = evt.target;
      this.props.onChange(evt);
      this.setState(() => ({
        value
      }));
    });
  }

  componentWillReceiveProps({ value }) {
    this.setState(() => ({
      value
    }));
  }

  render() {
    const { isFocused } = this.state;
    const value = isFocused ? this.state.value : this.props.value;
    return this.props.children({
      value,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onChange: this.handleChange
    });
  }
}

_defineProperty(Text, "defaultProps", {
  value: "",
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {}
});

class Preview extends Component {
  constructor() {
    super();

    _defineProperty(this, "state", {
      isDragging: false,
      draggedArea: null,
      draggedPosition: null
    });

    _defineProperty(this, "handleMouseUp", (evt) => {
      if (this.state.isDragging) {
        this.setState(() => ({
          isDragging: false,
          draggedArea: null,
          draggedPosition: null
        }));
      }
    });

    _defineProperty(this, "handleMouseMove", (evt) => {
      const { width, height } = this.props;
      const { isDragging, draggedArea, draggedPosition } = this.state;

      if (isDragging) {
        const rect = this.node.getBoundingClientRect();
        const x = Math.round(((evt.clientX - rect.left) / rect.width) * width);
        const y = Math.round(((evt.clientY - rect.top) / rect.height) * height);

        switch (true) {
          case typeof draggedPosition === "string":
            return this.moveHandler(x, y);

          case typeof draggedArea === "string":
            return this.moveTrack(x, y);
        }
      }
    });

    _defineProperty(this, "makeTrackMouseDown", (draggedArea) => (evt) => {
      evt.preventDefault();
      const { width, height, areas } = this.props;
      const area = areas[draggedArea];
      const rect = this.node.getBoundingClientRect();
      const x = Math.round(((evt.clientX - rect.left) / rect.width) * width);
      const y = Math.round(((evt.clientY - rect.top) / rect.height) * height);
      this.dx = x - area.column.start + 1;
      this.dy = y - area.row.start + 1;
      this.setState(() => ({
        isDragging: true,
        draggedArea
      }));
    });

    _defineProperty(
      this,
      "makeHandlerMouseDown",
      (draggedArea) => (draggedPosition) => (evt) => {
        evt.preventDefault();
        this.setState(() => ({
          isDragging: true,
          draggedArea,
          draggedPosition
        }));
      }
    );

    _defineProperty(this, "moveTrack", (x, y) => {
      const { width, height, areas, setArea } = this.props;
      const { draggedArea } = this.state;
      const area = areas[draggedArea];
      const top = this.findAdjacentArea("top", draggedArea);
      const right = this.findAdjacentArea("right", draggedArea);
      const bottom = this.findAdjacentArea("bottom", draggedArea);
      const left = this.findAdjacentArea("left", draggedArea);
      const columnStart = clamp(
        x - this.dx + 1,
        typeof left === "string" ? areas[left].column.end : 1,
        (typeof right === "string" ? areas[right].column.start : width + 1) -
          area.column.span
      );
      const rowStart = clamp(
        y - this.dy + 1,
        typeof top === "string" ? areas[top].row.end : 1,
        (typeof bottom === "string" ? areas[bottom].row.start : height + 1) -
          area.row.span
      );

      if (columnStart !== area.column.start || rowStart !== area.row.start) {
        const columnEnd = columnStart + area.column.span;
        const rowEnd = rowStart + area.row.span;
        return setArea(draggedArea, {
          column: _objectSpread(
            _objectSpread({}, area.column),
            {},
            {
              start: columnStart,
              end: columnEnd
            }
          ),
          row: _objectSpread(
            _objectSpread({}, area.row),
            {},
            {
              start: rowStart,
              end: rowEnd
            }
          )
        });
      }
    });

    _defineProperty(this, "moveHandler", (x, y) => {
      const { width, height, areas, setArea } = this.props;
      const { draggedPosition, draggedArea } = this.state;
      const area = areas[draggedArea];
      const adj = this.findAdjacentArea(draggedPosition, draggedArea);

      if (draggedPosition === "top") {
        const start = clamp(
          y + 1,
          typeof adj === "string" ? areas[adj].row.end : 1,
          area.row.end - 1
        );
        return setArea(
          draggedArea,
          _objectSpread(
            _objectSpread({}, area),
            {},
            {
              row: _objectSpread(
                _objectSpread({}, area.row),
                {},
                {
                  span: area.row.end - start,
                  start
                }
              )
            }
          )
        );
      }

      if (draggedPosition === "right") {
        const end = clamp(
          x + 1,
          area.column.start + 1,
          typeof adj === "string" ? areas[adj].column.start : width + 1
        );
        return setArea(
          draggedArea,
          _objectSpread(
            _objectSpread({}, area),
            {},
            {
              column: _objectSpread(
                _objectSpread({}, area.column),
                {},
                {
                  span: end - area.column.start,
                  end
                }
              )
            }
          )
        );
      }

      if (draggedPosition === "bottom") {
        const end = clamp(
          y + 1,
          area.row.start + 1,
          typeof adj === "string" ? areas[adj].row.start : height + 1
        );
        return setArea(
          draggedArea,
          _objectSpread(
            _objectSpread({}, area),
            {},
            {
              row: _objectSpread(
                _objectSpread({}, area.row),
                {},
                {
                  span: end - area.row.start,
                  end
                }
              )
            }
          )
        );
      }

      if (draggedPosition === "left") {
        const start = clamp(
          x + 1,
          typeof adj === "string" ? areas[adj].column.end : 1,
          area.column.end - 1
        );
        return setArea(
          draggedArea,
          _objectSpread(
            _objectSpread({}, area),
            {},
            {
              column: _objectSpread(
                _objectSpread({}, area.column),
                {},
                {
                  span: area.column.end - start,
                  start
                }
              )
            }
          )
        );
      }
    });

    _defineProperty(this, "findAdjacentArea", (direction, area) => {
      const { areas } = this.props;
      const { column, row } = areas[area];
      const keys = Object.keys(areas);

      if (direction === "top") {
        return keys.find(
          (key) =>
            areas[key].row.end === row.start &&
            areas[key].column.start < column.end &&
            areas[key].column.end > column.start
        );
      }

      if (direction === "right") {
        return keys.find(
          (key) =>
            areas[key].column.start === column.end &&
            areas[key].row.start < row.end &&
            areas[key].row.end > row.start
        );
      }

      if (direction === "bottom") {
        return keys.find(
          (key) =>
            areas[key].row.start === row.end &&
            areas[key].column.start < column.end &&
            areas[key].column.end > column.start
        );
      }

      if (direction === "left") {
        return keys.find(
          (key) =>
            areas[key].column.end === column.start &&
            areas[key].row.start < row.end &&
            areas[key].row.end > row.start
        );
      }
    });

    this.dx = 0;
    this.dy = 0;
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousemove", this.handleMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
  }

  render() {
    const { tpl, width, height, areas } = this.props;
    const { isDragging, draggedArea, draggedPosition } = this.state;
    return /*#__PURE__*/ React.createElement(
      StyledPreview,
      {
        innerRef: (node) => (this.node = node),
        tpl: tpl,
        width: width,
        height: height
      },
      Object.keys(areas).map((area) =>
        /*#__PURE__*/ React.createElement(Track, {
          key: area,
          area: area,
          column: areas[area].column,
          row: areas[area].row,
          grabbing:
            isDragging &&
            draggedArea === area &&
            typeof draggedPosition !== "string",
          onMouseDown: this.makeTrackMouseDown(area),
          onHandlerMouseDown: this.makeHandlerMouseDown(area)
        })
      )
    );
  }
}

class Grid extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderArea", (area) => {
      const { width, height, areas } = this.props;
      const { row, column } = areas[area];
      return Array.from(
        {
          length: row.span
        },
        (_, r) =>
          Array.from(
            {
              length: column.span
            },
            (_, c) =>
              /*#__PURE__*/ React.createElement(
                StyledGridText,
                {
                  key: `area${r}${c}`,
                  x: `${((column.start + c - 0.5) / width) * 100}%`,
                  y: `${((row.start + r - 0.5) / height) * 100}%`
                },
                area
              )
          )
      );
    });

    _defineProperty(this, "renderCols", (_, index) => {
      const { width } = this.props;
      return /*#__PURE__*/ React.createElement(StyledGridLine, {
        key: index,
        x1: `${((index + 1) / width) * 100}%`,
        y1: "0%",
        x2: `${((index + 1) / width) * 100}%`,
        y2: "100%"
      });
    });

    _defineProperty(this, "renderRows", (_, index) => {
      const { height } = this.props;
      return /*#__PURE__*/ React.createElement(StyledGridLine, {
        key: index,
        x1: "0%",
        y1: `${((index + 1) / height) * 100}%`,
        x2: "100%",
        y2: `${((index + 1) / height) * 100}%`
      });
    });
  }

  render() {
    const { width, height, areas } = this.props;
    return /*#__PURE__*/ React.createElement(
      StyledGrid,
      null,
      /*#__PURE__*/ React.createElement(
        "g",
        null,
        Object.keys(areas).map(this.renderArea)
      ),
      /*#__PURE__*/ React.createElement(
        "g",
        null,
        Array.from(
          {
            length: width - 1
          },
          this.renderCols
        )
      ),
      /*#__PURE__*/ React.createElement(
        "g",
        null,
        Array.from(
          {
            length: height - 1
          },
          this.renderRows
        )
      )
    );
  }
}

render(
  /*#__PURE__*/ React.createElement(App, null),
  document.querySelector("#root")
);
