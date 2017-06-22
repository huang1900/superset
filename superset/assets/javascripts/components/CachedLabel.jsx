import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import moment from 'moment';
import TooltipWrapper from './TooltipWrapper';

const propTypes = {
  onClick: PropTypes.func,
  cachedTimestamp: PropTypes.string,
  className: PropTypes.string,
};

class CacheLabel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tooltipContent: '',
      hovered: false,
    };
  }

  updateTooltipContent() {
    moment.locale('zh-cn');
    const cachedText = this.props.cachedTimestamp ? (
      <span>
        缓存于 <b>{moment.utc(this.props.cachedTimestamp).fromNow()}</b>
      </span>) :'的缓存数据';


    const tooltipContent = (
      <span>
        {cachedText}.
        点击强制刷新
      </span>
    );
    this.setState({ tooltipContent });
  }

  mouseOver() {
    this.updateTooltipContent();
    this.setState({ hovered: true });
  }

  mouseOut() {
    this.setState({ hovered: false });
  }

  render() {
    const labelStyle = this.state.hovered ? 'primary' : 'default';
    return (
      <TooltipWrapper
        tooltip={this.state.tooltipContent}
        label="cache-desc"
      >
        <Label
          className={this.props.className}
          bsStyle={labelStyle}
          style={{ fontSize: '10px', marginRight: '5px', cursor: 'pointer' }}
          onClick={this.props.onClick}
          onMouseOver={this.mouseOver.bind(this)}
          onMouseOut={this.mouseOut.bind(this)}
        >
          来自缓存 <i className="fa fa-refresh" />
        </Label>
      </TooltipWrapper>);
  }
}
CacheLabel.propTypes = propTypes;

export default CacheLabel;
