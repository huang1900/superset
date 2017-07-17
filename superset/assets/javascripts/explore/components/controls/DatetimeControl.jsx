import React from 'react';
import { FormControl } from 'react-bootstrap';
import DateTimePick from './DateTimePick';
import ControlHeader from '../ControlHeader';
const propTypes = {


};

const defaultProps = {
};

export default class DatetimeControl extends React.Component {



    render() {
        const start_props={
            label: "开始时间",};
        const end_props={
            label: "结束时间",};
        return (
            <div>
                <ControlHeader {...start_props} />
            < DateTimePick  ></DateTimePick>
                <ControlHeader {...end_props} />
            < DateTimePick  ></DateTimePick>
            </div>
                );

    }

}

DatetimeControl.propTypes = propTypes;
DatetimeControl.defaultProps = defaultProps;
