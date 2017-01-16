import React from 'react';
import _ from 'lodash';
import Input from '../Input/Input';
import classNames from 'classnames';
import moment from 'moment';
import styles from './TimeInput.scss';

export default React.createClass({
  displayName: 'TimePicker',

  propTypes: {
    defaultValue: React.PropTypes.object,
    onChange: React.PropTypes.func,
    rtl: React.PropTypes.bool,
    style: React.PropTypes.object,
    disableAmPm: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      defaultValue: moment(),
      onChange: _.noop,
      style: {},
      disableAmPm: false
    };
  },

  getInitialState() {
    const focus = false,
      lastCaretIdx = 0,
      hover = false;

    return {
      focus,
      lastCaretIdx,
      hover,
      ...this.getInitTime(this.props.defaultValue)
    };
  },

  isAmPmMode() {
    return !this.props.disableAmPm && moment('2016-04-03 13:14:00').format('LT').indexOf('PM') !== -1;
  },

  getInitTime(value) {
    let time = value || moment(),
      am = time.hours() < 12;

    const ampmMode = this.isAmPmMode();

    ({time, am} = this.normalizeTime(am, time, ampmMode));
    const text = this.formatTime(time, ampmMode);

    return {time, am, text, ampmMode};
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState(this.getInitTime(nextProps.defaultValue));
    }
  },

  momentizeState(timeSet) {
    let time, am;
    const {ampmMode} = this.state;

    if (timeSet) {
      ({time, am} = timeSet);
    } else {
      ({time, am} = this.state);
    }

    let hours = time.hours();

    if (ampmMode && !am && hours < 12) {
      hours += 12;
    }

    if (ampmMode && am && hours === 12) {
      hours = 0;
    }

    const momentized = moment();
    momentized.hours(hours);
    momentized.minutes(time.minutes());
    momentized.seconds(0);
    return momentized;
  },

  bubbleOnChange(timeSet) {
    const time = this.momentizeState(timeSet);
    this.props.onChange(time);
  },

  timeStep(direction) {
    const time = this.momentizeState();
    const timeUnit = this.state.lastFocusedTimeUnit || 'minutes';
    const amount = timeUnit === 'hours' ? 1 : 20;
    time.add(direction * amount, timeUnit);
    const am = time.hours() < 12;
    this.updateDate({am, time});
  },

  formatTime(time, ampmMode = this.state.ampmMode) {
    return ampmMode ? time.format('hh:mm') : time.format('HH:mm');
  },

  restoreFocus() {
    // function setCursorPosition(el, pos) {
    //   $(el).each(function(index, elem) {
    //     if (elem.setSelectionRange) {
    //       elem.setSelectionRange(pos, pos);
    //     } else if (elem.createTextRange) {
    //       var range = elem.createTextRange();
    //       range.collapse(true);
    //       range.moveEnd('character', pos);
    //       range.moveStart('character', pos);
    //       range.select();
    //     }
    //   });
    // }
    //
    // let {lastCaretIdx} = this.state;
    //
    // if (lastCaretIdx >= 0) {
    //   this.setState({focus: true});
    //   // this.refs.input.setSelectionRange(lastCaretIdx, lastCaretIdx);
    //   // this.refs.input.focus();
    //   // setCursorPosition(this.refs.input.refs.input, lastCaretIdx);
    // }
  },

  handleMinus() {
    this.timeStep(-1);
    this.restoreFocus();
  },

  handlePlus() {
    this.timeStep(1);
    this.restoreFocus();
  },

  getFocusedTimeUnit(caretIdx, currentValue) {
    let colonIdx = currentValue.indexOf(':');
    colonIdx = Math.max(0, colonIdx);
    return caretIdx <= colonIdx ? 'hours' : 'minutes';
  },

  handleInputBlur({target}) {
    const caretIdx = target.selectionEnd || 0;
    let lastFocusedTimeUnit;

    if (caretIdx >= 0) {
      lastFocusedTimeUnit = this.getFocusedTimeUnit(caretIdx, target.value);
    }

    this.setState({lastCaretIdx: caretIdx, lastFocusedTimeUnit});
    this.updateDate({time: target.value});
  },

  normalizeTime(am, time, ampmMode = this.state.ampmMode) {
    const hours = time.hours();

    if (ampmMode) {
      if (hours === 0) {
        return {time: time.clone().hours(12), am: true};
      }

      if (hours > 12) {
        return {time: time.clone().hours(hours - 12), am: false};
      }
    }

    return {time: time.clone().hours(hours), am};
  },

  toggleAmPm() {
    this.updateDate({am: !this.state.am});
  },

  handleFocus(input) {
    this.setState({focus: true, lastFocus: input});
  },

  handleBlur() {
    this.setState({focus: false});
    this.updateDate({time: this.state.text});
  },

  handleInputChange({target}) {
    this.setState({text: target.value});
  },

  handleHover(hover) {
    this.setState({hover});
  },

  updateDate({time, am}) {
    am = _.isUndefined(am) ? this.state.am : am;
    let newTime = moment(time, 'HH:mm');
    newTime = newTime.isValid() ? newTime : this.state.time;
    const normalizedTime = this.normalizeTime(am, newTime);
    ({time, am} = normalizedTime);
    const text = this.formatTime(time);
    this.setState({time, am, text});
    this.bubbleOnChange({time, am});
  },

  renderTimeTextbox() {
    return (
      <div className={styles.input}>
        <Input
          ref={'input'}
          value={this.state.text}
          onFocus={this.handleFocus}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          suffix={
            <Input.Group>
              {this.state.ampmMode && this.renderAmPm()}
              <Input.Ticker onUp={this.handlePlus} onDown={this.handleMinus}/>
            </Input.Group>
          }
          />
      </div>
    );
  },

  renderAmPm() {
    function getAmText() {
      return moment('2016-04-03 10:00').format('a');
    }

    function getPmText() {
      return moment('2016-04-03 14:00').format('a');
    }

    return (
      <span className={styles.ampm} onClick={this.toggleAmPm}>
        {this.state.am ? getAmText() : getPmText()}
      </span>
    );
  },

  renderTime() {
    return (
      <div
        onMouseOver={() => this.handleHover(true)}
        onMouseOut={() => this.handleHover(false)}
        className={classNames(styles.time, {
          focus: this.state.focus,
          hover: this.state.hover && !this.state.focus,
          rtl: this.props.rtl
        })}
        >
        {this.renderTimeTextbox()}
      </div>
    );
  },

  render() {
    return (
      <div className={styles.wrapper} style={this.props.style}>
        {this.renderTime()}
      </div>
    );
  }
});
