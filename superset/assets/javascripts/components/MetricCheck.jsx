import React from 'react';
import PropTypes from 'prop-types';
import InfoTooltipWithTrigger from './InfoTooltipWithTrigger';
import CheckBox from 'react-native-check-box'
const propTypes = {
  metric: PropTypes.object.isRequired,
};

export default function MetricCheck({ metric }) {
  return (
    <div>
        <CheckBox
            checked={metric.isck}
            onChange={metric.onChange}
            rightText={metric.name}
        />
      <span className="m-r-5 option-label">
        {metric.verbose_name || metric.name}
      </span>
      {metric.description &&
        <InfoTooltipWithTrigger
          className="m-r-5 text-muted"
          icon="question-circle-o"
          tooltip={metric.description}
          label={`descr-${metric.name}`}
        />
      }
      {/*<InfoTooltipWithTrigger*/}
        {/*className="m-r-5 text-muted"*/}
        {/*icon="question-circle-o"*/}
        {/*tooltip={metric.expression}*/}
        {/*label={`expr-${metric.metric_name}`}*/}
      {/*/>*/}
    </div>);
}
MetricCheck.jsx.propTypes = propTypes;
