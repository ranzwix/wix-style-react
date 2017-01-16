import React, {Component} from 'react';
import ReactDatepicker from 'react-datepicker';
import DatePickerInput from './DatePickerInput';
import moment from 'moment';
import css from './DatePicker.scss';

export default class DatePicker extends Component {
  static propTypes = {
    style: React.PropTypes.object,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    filterDate: React.PropTypes.func,
    excludePastDates: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    showYearDropdown: React.PropTypes.bool,
    rtl: React.PropTypes.bool
  };

  static defaultProps = {
    style: {
      width: 150
    },

    filterDate: () => true
  };

  constructor(props) {
    super(props);
    this.filterDate = this.filterDate.bind(this);
  }

  filterDate(date) {
    if (this.props.excludePastDates) {
      if (date < moment().startOf('d')) {
        return false;
      }
    }

    return this.props.filterDate(date);
  }

  renderInput() {
    return (
      <DatePickerInput rtl={this.props.rtl} style={this.props.style}/>
    );
  }

  render() {
    return (
      <div className={css.wrapper}>
        <ReactDatepicker
          {...this.props}
          selected={this.props.value}
          onChange={val => {
            if (this.filterDate(val)) {
              this.props.onChange(val);
            }
          }}
          customInput={this.renderInput()}
          filterDate={this.filterDate}
          readOnly={this.props.readOnly}
          showYearDropdown={this.props.showYearDropdown}
          scrollableYearDropdown
          />
      </div>
    );
  }
}
