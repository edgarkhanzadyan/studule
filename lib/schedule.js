'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var Component = React.Component;

var style = require('./style');

var Schedule = function (_Component) {
  (0, _inherits3.default)(Schedule, _Component);

  function Schedule() {
    (0, _classCallCheck3.default)(this, Schedule);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Schedule.__proto__ || (0, _getPrototypeOf2.default)(Schedule)).call(this));

    _this.state = {
      week: [{ day: 'Monday', schedule: [] }, { day: 'Tuesday', schedule: [] }, { day: 'Wednesday', schedule: [] }, { day: 'Thursday', schedule: [] }, { day: 'Friday', schedule: [] }, { day: 'Saturday', schedule: [] }, { day: 'Sunday', schedule: [] }],
      bufClass: '',
      bufTime: '',
      bufHomework: '',
      bufDay: ''
    };
    for (var i = 0; i < 7; ++i) {
      for (var j = 0; j < 24; ++j) {
        _this.state.week[i].schedule[j] = {
          event: ''
        };
      }
    }
    _this.onDayChange = _this.onDayChange.bind(_this);
    _this.onTimeChange = _this.onTimeChange.bind(_this);
    _this.onClassChange = _this.onClassChange.bind(_this);
    _this.onHomeworkChange = _this.onHomeworkChange.bind(_this);
    _this.clickHandlerPushEvent = _this.clickHandlerPushEvent.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Schedule, [{
    key: 'componentDidMount',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var request, schedule, all_schedule;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = 'http://localhost:4000/new_schedule';
                _context.next = 3;
                return fetch(request);

              case 3:
                schedule = _context.sent;
                _context.next = 6;
                return schedule.json();

              case 6:
                all_schedule = _context.sent;

                this.setState({ week: all_schedule.payload });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _ref.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'clickHandlerPushEvent',
    value: function clickHandlerPushEvent(e) {
      if ((e.button === 0 || e.key === 'Enter') && this.state.bufClass.trim() !== '' && this.state.bufTime.trim() !== '' && this.state.bufDay.trim() !== '') {
        var dayIndex = 0;
        for (var i = 0; i < 7; ++i) {
          if (this.state.week[i].day === this.state.bufDay) {
            dayIndex = i;
          }
        }
        var request_options = {
          method: 'post',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }),
          body: (0, _stringify2.default)({
            classo: this.state.bufClass,
            time: this.state.bufTime,
            homework: this.state.bufHomework,
            day: dayIndex
          })
        };
        fetch('/new_data', request_options);
        var newArr = this.state.week;
        newArr[dayIndex].schedule[this.state.bufTime].event = this.state.bufClass;
        this.setState({ week: newArr, bufClass: '', bufTime: '', bufHomework: '', bufDay: '' });
      }
    }
  }, {
    key: 'onDayChange',
    value: function onDayChange(e) {
      var day = e.currentTarget.value;
      this.setState({ bufDay: day });
    }
  }, {
    key: 'onClassChange',
    value: function onClassChange(e) {
      var classs = e.currentTarget.value;
      this.setState({ bufClass: classs });
    }
  }, {
    key: 'onTimeChange',
    value: function onTimeChange(e) {
      var time = e.currentTarget.value;
      this.setState({ bufTime: time });
    }
  }, {
    key: 'onHomeworkChange',
    value: function onHomeworkChange(e) {
      var homework = e.currentTarget.value;
      this.setState({ bufHomework: homework });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var renderStyle = {
        flexColumn: {
          display: 'flex',
          flexDirection: 'column'
        },
        flexRow: {
          display: 'flex'
        }
      };
      var makeHours = this.state.week[0].schedule.map(function (hour, i) {
        if (i < 10) {
          return React.createElement(
            'li',
            { key: i, style: style.eventul },
            '0',
            i,
            ':00'
          );
        } else if (i >= 10) {
          return React.createElement(
            'li',
            { key: i, style: style.eventul },
            i,
            ':00'
          );
        }
      });
      var makeDays = this.state.week.map(function (day, idx) {
        var makeEvents = _this2.state.week[idx].schedule.map(function (ev, i) {
          return React.createElement(
            'li',
            { key: i, style: style.eventul },
            ev.event
          );
        });
        return React.createElement(
          'div',
          { style: style.eventBox },
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              { style: style.eventul },
              day.day
            ),
            makeEvents
          )
        );
      });
      return React.createElement(
        'div',
        { style: renderStyle.flexColumn },
        React.createElement(
          'header',
          { style: style.header },
          React.createElement(
            'div',
            { style: style.logo },
            'Studule'
          )
        ),
        React.createElement(
          'div',
          { style: style.scheduleAdd },
          React.createElement(
            'div',
            { style: style.inputs },
            React.createElement('input', { style: style.classInput, placeholder: 'name of the class*', onChange: this.onClassChange, value: this.state.bufClass }),
            React.createElement('input', { style: style.timeInput, placeholder: 'time of that class*', onChange: this.onTimeChange, value: this.state.bufTime }),
            React.createElement('input', { style: style.dayInput, placeholder: 'day of that class*', onChange: this.onDayChange, value: this.state.bufDay }),
            React.createElement('input', { style: style.homeworkInput, placeholder: 'homework for it', onChange: this.onHomeworkChange, value: this.state.bufHomework })
          ),
          React.createElement(
            'button',
            { style: style.buttonDate, onClick: this.clickHandlerPushEvent },
            'put new date!'
          )
        ),
        React.createElement(
          'div',
          { style: style.flexColumn },
          React.createElement(
            'div',
            { style: style.mainSchedule },
            React.createElement(
              'div',
              { style: style.timeSchedule },
              React.createElement(
                'div',
                { style: renderStyle.flexRow },
                React.createElement(
                  'div',
                  { style: style.eventBox },
                  React.createElement(
                    'ul',
                    null,
                    React.createElement(
                      'li',
                      { style: style.eventul },
                      'Time'
                    ),
                    makeHours
                  )
                ),
                makeDays
              )
            ),
            React.createElement('div', { style: style.homeworkTab })
          )
        )
      );
    }
  }]);
  return Schedule;
}(Component);

module.exports = Schedule;
