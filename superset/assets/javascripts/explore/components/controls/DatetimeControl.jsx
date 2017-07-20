import React from 'react';
import { FormControl } from 'react-bootstrap';
import { render } from 'react-dom';
import Flatpickr from 'react-flatpickr'
import ControlHeader from '../ControlHeader';
import PropTypes from 'prop-types';
import 'flatpickr/dist/themes/airbnb.css'
const zh = require("flatpickr/dist/l10n/zh.js").zh;
require("../../exploreUtils.js")
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
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if(event[0] && event[0] instanceof Date ){
            this.props.onChange(event[0].Format("yyyy-MM-dd"), []);
        }else{
            this.props.onChange(event, []);
        }

    }

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
     var val=null
     if(this.props.value){
         if(this.props.value instanceof Date){
             val=this.props.value
         }else if(isNaN(this.props.value)){
             val=new Date(this.props.value)
         }

     }
        return (
            <div>
                {this.props.showHeader &&
                <ControlHeader {...this.props} />
                }
                <Flatpickr className="Select-control"
                           placeholder="选择时间"
                           options={options}
                           onChange={this.onChange}
                           value={val}>
                    <input type='text' data-input />
                    <span className="Select-clear-zone" title="清除" aria-label="Clear value" data-clear>
                        <span className="Select-clear">×</span>
                    </span>
                    <span className="Select-arrow-zone">
                        <span className="fa fa-calendar cursor-hand"></span>
                    </span>
                </Flatpickr>
            </div>
                );

    }

}

DatetimeControl.propTypes = propTypes;
DatetimeControl.defaultProps = defaultProps;
