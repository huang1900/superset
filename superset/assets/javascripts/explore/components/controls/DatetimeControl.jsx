import React from 'react';
import { FormControl } from 'react-bootstrap';
import DateTimePick from './DateTimePick';
import ControlHeader from '../ControlHeader';
import PropTypes from 'prop-types';
const propTypes = {
    showHeader: PropTypes.bool,
    label: PropTypes.string,
    description: PropTypes.string,
    time_24hr:PropTypes.bool,
    weekNumbers:PropTypes.bool,
    enableTime:PropTypes.bool,
    enableSeconds:PropTypes.bool,
    defaultHour:PropTypes.number,
    defaultMinute:PropTypes.number

};

const defaultProps = {
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

        return (
            <div>
                {this.props.showHeader &&
                <ControlHeader {...this.props} />
                }
            < DateTimePick className="Select-control"
                               {...this.props} ></DateTimePick>
            </div>
                );

    }

}

DatetimeControl.propTypes = propTypes;
DatetimeControl.defaultProps = defaultProps;
