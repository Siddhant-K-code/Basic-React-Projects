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

let COLORS = ["#2ecc71", "#3498db", "#e67e22", "#e67e22", "#e74c3c"];
let TOP_OFFSET = window.innerHeight;
let LEFT_OFFSET = 250;

const generateWholeNumber = (min, max) =>
  min + Math.floor(Math.random() * (max - min));

const generateRandomColor = () => COLORS[generateWholeNumber(0, COLORS.length)];

class CircularParticle extends React.PureComponent {
  constructor(props) {
    super(props);
    const { SIZE_RANGE, ROTATION_RANGE } = CircularParticle;
    const size = generateWholeNumber(...SIZE_RANGE);
    this.style = {
      backgroundColor: generateRandomColor(),
      width: size,
      height: size,
      borderRadius: size,
      transform: `rotateZ(${generateWholeNumber(...ROTATION_RANGE)}deg)`,
      left: generateWholeNumber(0, window.innerWidth),
      top: generateWholeNumber(-TOP_OFFSET, 0)
    };
  }

  componentDidMount() {
    const { left } = this.style;
    const { ROTATION_RANGE } = CircularParticle;
    setTimeout(() => {
      const node = ReactDOM.findDOMNode(this.ref);
      node.style.top =
        window.innerHeight + generateWholeNumber(0, TOP_OFFSET) + "px";
      node.style.left =
        left + generateWholeNumber(-LEFT_OFFSET, LEFT_OFFSET) + "px";
    }, 0);
  }

  render() {
    return /*#__PURE__*/ React.createElement("div", {
      ref: (ref) => (this.ref = ref),
      className: "particle",
      style: this.style
    });
  }
}

_defineProperty(CircularParticle, "SIZE_RANGE", [5, 10]);

_defineProperty(CircularParticle, "ROTATION_RANGE", [0, 45]);

class SquiggleParticle extends React.PureComponent {
  constructor(props) {
    super(props);
    const size = generateWholeNumber(...SquiggleParticle.SIZE_RANGE);
    this.style = {
      fill: generateRandomColor(),
      width: size,
      height: size,
      transform: `rotateZ(${generateWholeNumber(
        ...SquiggleParticle.ROTATION_RANGE
      )}deg)`,
      left: generateWholeNumber(0, window.innerWidth),
      top: generateWholeNumber(-TOP_OFFSET, 0)
    };
  }

  componentDidMount() {
    const { left } = this.style;
    const { ROTATION_RANGE } = SquiggleParticle;
    setTimeout(() => {
      const node = ReactDOM.findDOMNode(this.ref);
      node.style.top =
        window.innerHeight + generateWholeNumber(0, TOP_OFFSET) + "px";
      node.style.left =
        left + generateWholeNumber(-LEFT_OFFSET, LEFT_OFFSET) + "px";
      node.style.transform = `rotateZ(${generateWholeNumber(
        ...ROTATION_RANGE
      )}deg)`;
    }, 0);
  }

  render() {
    return /*#__PURE__*/ React.createElement(
      "svg",
      {
        ref: (ref) => (this.ref = ref),
        className: "particle",
        style: this.style,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      },
      /*#__PURE__*/ React.createElement("path", {
        fill: this.style.fill,
        d:
          "M428.127,0l-12.716,10.062l12.718-10.06c8.785,11.101,19.716,24.917,19.716,51.051 s-10.932,39.951-19.716,51.053c-7.382,9.331-12.716,16.072-12.716,30.927c0,14.854,5.334,21.594,12.716,30.925   c8.784,11.101,19.716,24.917,19.716,51.05c0,26.135-10.931,39.949-19.715,51.051c-7.383,9.331-12.717,16.072-12.717,30.927   c0,14.855,5.332,21.593,12.711,30.919l-25.435,20.124c-8.781-11.097-19.708-24.909-19.708-51.042 c0-26.135,10.931-39.949,19.715-51.051c7.383-9.331,12.717-16.072,12.717-30.927c0-14.855-5.335-21.595-12.717-30.926 c-8.784-11.101-19.715-24.916-19.715-51.049s10.931-39.95,19.715-51.051c7.383-9.331,12.717-16.072,12.717-30.928 c0-14.855-5.335-21.596-12.718-30.927L428.127,0z"
      })
    );
  }
}

_defineProperty(SquiggleParticle, "SIZE_RANGE", [15, 45]);

_defineProperty(SquiggleParticle, "ROTATION_RANGE", [-15, 15]);

class Particles extends React.PureComponent {
  render() {
    let { count: n } = this.props;
    const particles = [];
    const types = [SquiggleParticle, CircularParticle, CircularParticle];

    while (n--) {
      const Particle = types[generateWholeNumber(0, 3)];
      particles.push(
        /*#__PURE__*/ React.createElement(Particle, {
          key: n
        })
      );
    }

    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "particles"
      },
      particles
    );
  }
}

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleOnClick", () => {
      const id = App.id;
      App.id++;
      this.setState({
        particles: [...this.state.particles, id]
      });
      setTimeout(() => {
        this.clean(id);
      }, 5000);
    });

    this.state = {
      particles: []
    };
  }

  clean(id) {
    this.setState({
      particles: this.state.particles.filter((_id) => _id !== id)
    });
  }

  render() {
    const { particles } = this.state;
    const { innerWidth } = window;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "app"
      },
      particles.map((id) =>
        /*#__PURE__*/ React.createElement(Particles, {
          key: id,
          count: Math.floor(innerWidth / 20)
        })
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "button",
          onClick: this.handleOnClick
        },
        /*#__PURE__*/ React.createElement("div", {
          className: "popper"
        }),
        "CLICK ME!"
      )
    );
  }
}

_defineProperty(App, "id", 1);

ReactDOM.render(/*#__PURE__*/ React.createElement(App, null), document.body);
