import React from 'react';
import PropTypes from 'prop-types';
import TooltipWrapper from './TooltipWrapper';

const propTypes = {
  title: PropTypes.string,
  canEdit: PropTypes.bool,
  onSaveTitle: PropTypes.func.isRequired,
};
const defaultProps = {
  title: 'Title',
  canEdit: false,
};

class EditableTitle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      title: this.props.title,
      lastTitle: this.props.title,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick() {
    if (!this.props.canEdit) {
      return;
    }

    this.setState({
      isEditing: true,
    });
  }
  handleBlur() {
    if (!this.props.canEdit) {
      return;
    }

    this.setState({
      isEditing: false,
    });

    if (this.state.lastTitle !== this.state.title) {
      this.setState({
        lastTitle: this.state.title,
      });
      this.props.onSaveTitle(this.state.title);
    }
  }
  handleChange(ev) {
    if (!this.props.canEdit) {
      return;
    }

    this.setState({
      title: ev.target.value,
    });
  }
  render() {
    return (
      <span className="editable-title">
        <TooltipWrapper
          label="title"
          tooltip={this.props.canEdit ? '点击编辑' : '没有权限修改'}
        >
          <input
            required
            type={this.state.isEditing ? 'text' : 'button'}
            value={this.state.title}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
          />
        </TooltipWrapper>
      </span>
    );
  }
}
EditableTitle.propTypes = propTypes;
EditableTitle.defaultProps = defaultProps;

export default EditableTitle;
