"use strict";

const Heading = ({ date, changeMonth, resetDate }) =>
  /*#__PURE__*/ React.createElement(
    "nav",
    {
      className: "calendar--nav"
    },
    /*#__PURE__*/ React.createElement(
      "a",
      {
        onClick: () => changeMonth(date.month() - 1)
      },
      "\u2039"
    ),
    /*#__PURE__*/ React.createElement(
      "h1",
      {
        onClick: () => resetDate()
      },
      date.format("MMMM"),
      " ",
      /*#__PURE__*/ React.createElement("small", null, date.format("YYYY"))
    ),
    /*#__PURE__*/ React.createElement(
      "a",
      {
        onClick: () => changeMonth(date.month() + 1)
      },
      "\u203A"
    )
  );

const Day = ({ currentDate, date, startDate, endDate, onClick }) => {
  let className = [];

  if (moment().isSame(date, "day")) {
    className.push("active");
  }

  if (date.isSame(startDate, "day")) {
    className.push("start");
  }

  if (date.isBetween(startDate, endDate, "day")) {
    className.push("between");
  }

  if (date.isSame(endDate, "day")) {
    className.push("end");
  }

  if (!date.isSame(currentDate, "month")) {
    className.push("muted");
  }

  return /*#__PURE__*/ React.createElement(
    "span",
    {
      onClick: () => onClick(date),
      currentDate: date,
      className: className.join(" ")
    },
    date.date()
  );
};

const Days = ({ date, startDate, endDate, onClick }) => {
  const thisDate = moment(date);
  const daysInMonth = moment(date).daysInMonth();
  const firstDayDate = moment(date).startOf("month");
  const previousMonth = moment(date).subtract(1, "month");
  const previousMonthDays = previousMonth.daysInMonth();
  const nextsMonth = moment(date).add(1, "month");
  let days = [];
  let labels = [];

  for (let i = 1; i <= 7; i++) {
    labels.push(
      /*#__PURE__*/ React.createElement(
        "span",
        {
          className: "label"
        },
        moment().day(i).format("ddd")
      )
    );
  }

  for (let i = firstDayDate.day(); i > 1; i--) {
    previousMonth.date(previousMonthDays - i + 2);
    days.push(
      /*#__PURE__*/ React.createElement(Day, {
        key: moment(previousMonth).format("DD MM YYYY"),
        onClick: (date) => onClick(date),
        currentDate: date,
        date: moment(previousMonth),
        startDate: startDate,
        endDate: endDate
      })
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    thisDate.date(i);
    days.push(
      /*#__PURE__*/ React.createElement(Day, {
        key: moment(thisDate).format("DD MM YYYY"),
        onClick: (date) => onClick(date),
        currentDate: date,
        date: moment(thisDate),
        startDate: startDate,
        endDate: endDate
      })
    );
  }

  const daysCount = days.length;

  for (let i = 1; i <= 42 - daysCount; i++) {
    nextsMonth.date(i);
    days.push(
      /*#__PURE__*/ React.createElement(Day, {
        key: moment(nextsMonth).format("DD MM YYYY"),
        onClick: (date) => onClick(date),
        currentDate: date,
        date: moment(nextsMonth),
        startDate: startDate,
        endDate: endDate
      })
    );
  }

  return /*#__PURE__*/ React.createElement(
    "nav",
    {
      className: "calendar--days"
    },
    labels.concat(),
    days.concat()
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      startDate: moment().subtract(5, "day"),
      endDate: moment().add(3, "day")
    };
  }

  resetDate() {
    this.setState({
      date: moment()
    });
  }

  changeMonth(month) {
    const { date } = this.state;
    date.month(month);
    this.setState(date);
  }

  changeDate(date) {
    let { startDate, endDate } = this.state;

    if (
      startDate === null ||
      date.isBefore(startDate, "day") ||
      !startDate.isSame(endDate, "day")
    ) {
      startDate = moment(date);
      endDate = moment(date);
    } else if (date.isSame(startDate, "day") && date.isSame(endDate, "day")) {
      startDate = null;
      endDate = null;
    } else if (date.isAfter(startDate, "day")) {
      endDate = moment(date);
    }

    this.setState({
      startDate,
      endDate
    });
  }

  render() {
    const { date, startDate, endDate } = this.state;
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "calendar"
      },
      /*#__PURE__*/ React.createElement(Heading, {
        date: date,
        changeMonth: (month) => this.changeMonth(month),
        resetDate: () => this.resetDate()
      }),
      /*#__PURE__*/ React.createElement(Days, {
        onClick: (date) => this.changeDate(date),
        date: date,
        startDate: startDate,
        endDate: endDate
      })
    );
  }
}

ReactDOM.render(
  /*#__PURE__*/ React.createElement(Calendar, null),
  document.getElementById("calendar")
);
