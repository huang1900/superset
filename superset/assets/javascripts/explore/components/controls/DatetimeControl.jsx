import React from 'react';
import { FormControl } from 'react-bootstrap';
import { render } from 'react-dom';
import Flatpickr from 'react-flatpickr'
import ControlHeader from '../ControlHeader';
import PropTypes from 'prop-types';
import 'flatpickr/dist/themes/airbnb.css'
const zh = require("flatpickr/dist/l10n/zh.js").zh;
const propTypes = {
    showHeader: PropTypes.bool,
    label: PropTypes.string,
    description: PropTypes.string,
    time_24hr:PropTypes.bool,
    weekNumbers:PropTypes.bool,
    enableTime:PropTypes.bool,
    enableSeconds:PropTypes.bool,
    defaultHour:PropTypes.number,
    onChange: PropTypes.func,
    defaultMinute:PropTypes.number,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object,
        PropTypes.number
    ]),
};

const defaultProps = {
    onChange: () => {},
    showHeader: true,
    time_24hr:true,
    weekNumbers:false,
    enableTime:false,
    enableSeconds:false,
    defaultHour:12,
    defaultMinute:0
};

export default class DatetimeControl extends React.Component {



    render() {
     const options={
         time_24hr:this.props.time_24hr,
         weekNumbers:this.props.weekNumbers,
         enableTime:this.props.enableTime,
         enableSeconds:this.props.enableSeconds,
         defaultHour:this.props.defaultHour,
         defaultMinute:this.props.defaultMinute,
         locale: zh,
         wrap: true,
     }
        return (
            <div>
                {this.props.showHeader &&
                <ControlHeader {...this.props} />
                }
                <Flatpickr  options={options}
                            value={this.props.value}>
                    <input type='text' data-input />
                    <button type='button' data-toggle>Toggle</button>
                    <button type='button' data-clear>Clear</button>
                </Flatpickr>
            </div>
                );

    }

}

DatetimeControl.propTypes = propTypes;
DatetimeControl.defaultProps = defaultProps;
