import 'flatpickr/dist/themes/airbnb.css'
import Flatpickr from 'react-flatpickr'
import { Component } from 'react'
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    time_24hr:PropTypes.bool,
    weekNumbers:PropTypes.bool,
    enableTime:PropTypes.bool,
    enableSeconds:PropTypes.bool,
    defaultHour:PropTypes.number,
    onChange: PropTypes.func,
    defaultMinute:PropTypes.number
};

const defaultProps = {
    time_24hr:true,
    weekNumbers:false,
    enableTime:true,
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

      this.props.onChange(event, []);
    }
  componentDidMount() {

  }

  render() {
      console.log("props="+this.props)
     return (
        <Flatpickr
            {...this.props}
        />
      )
  }
}

DateTimePick.propTypes = propTypes;
DateTimePick.defaultProps = defaultProps;
