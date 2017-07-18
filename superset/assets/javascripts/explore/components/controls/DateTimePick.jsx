import 'flatpickr/dist/themes/airbnb.css'
import Flatpickr from 'react-flatpickr'
import { Component } from 'react'
import React from 'react';
import PropTypes from 'prop-types';
import 'flatpickr/dist/l10n/zh.js'
const propTypes = {
    time_24hr:PropTypes.bool,
    weekNumbers:PropTypes.bool,
    enableTime:PropTypes.bool,
    enableSeconds:PropTypes.bool,
    defaultHour:PropTypes.number,
    onChange: PropTypes.func,
    defaultMinute:PropTypes.number,
};

const defaultProps = {
    time_24hr:true,
    weekNumbers:false,
    enableTime:false,
    onChange: () => {},
    enableSeconds:false,
    defaultHour:12,
    defaultMinute:0
};
export default class DateTimePick extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
      console.log(event)
      this.props.onChange(event, []);
    }
  componentDidMount() {

  }


  render() {
      const option={
          time_24hr:this.props.time_24hr,
          enableTime:this.props.enableTime,
          enableSeconds:this.props.enableSeconds,
          defaultHour:this.props.defaultHour,
          defaultMinute:this.props.defaultMinute,
          locale:"zh",
      }
     return (
        <Flatpickr
            onChange={this.onChange}
            className="Select-control"
            options={option}
        />
      )
  }
}

DateTimePick.propTypes = propTypes;
DateTimePick.defaultProps = defaultProps;
