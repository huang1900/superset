import React from 'react';
import { FormControl } from 'react-bootstrap';
import DateTimePick from './DateTimePick';
const propTypes = {


};

const defaultProps = {
};

export default class DatetimeControl extends React.Component {

    render() {
        return (
            <div>
            <i className="fa fa-plus" /> &nbsp; 开始
            < DateTimePick  ></DateTimePick>
            <i className="fa fa-plus" /> &nbsp; 结束
            < DateTimePick  ></DateTimePick>
            </div>
                );

    }

}

DatetimeControl.propTypes = propTypes;
DatetimeControl.defaultProps = defaultProps;
