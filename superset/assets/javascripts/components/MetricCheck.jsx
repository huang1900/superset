import React from 'react';
import PropTypes from 'prop-types';
import InfoTooltipWithTrigger from './InfoTooltipWithTrigger';
import { Checkbox } from 'react-bootstrap';
const propTypes = {
  metric: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  value_name:PropTypes.string,
  isck:PropTypes.bool,
};

export default class MetricCheck extends React.PureComponent{
    render() {
        return (
            <div>
                <Checkbox
                    checked={this.props.isck}
                    onChange={this.props.onChange.bind(this)}
                />
                <span className="m-r-5 option-label">
        {this.props.metric.verbose_name || this.props.metric[this.props.value_name]}
      </span>
                {this.props.metric.description &&
                <InfoTooltipWithTrigger
                    className="m-r-5 text-muted"
                    icon="question-circle-o"
                    tooltip={this.props.metric.description}
                    label={`descr-${this.props.metric[this.props.value_name]}`}
                />
                }
            </div>);
    }
}

MetricCheck.propTypes = propTypes;
