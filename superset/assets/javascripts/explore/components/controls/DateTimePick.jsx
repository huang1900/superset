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
    defaultMinute:PropTypes.number
};

const defaultProps = {
    time_24hr:true,
    weekNumbers:false,
    enableTime:false,
    enableSeconds:false,
    defaultHour:12,
    defaultMinute:0
};

export default class DateTimePick extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
     return (
        <Flatpickr
            {...this.props}
        />
      )
  }
}

DateTimePick.propTypes = propTypes;
DateTimePick.defaultProps = defaultProps;
