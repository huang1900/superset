import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classnames from 'classnames';

import Button from '../../components/Button';

const propTypes = {
  canAdd: PropTypes.string.isRequired,
  onQuery: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onStop: PropTypes.func,
  loading: PropTypes.bool,
  errorMessage: PropTypes.node,
};

const defaultProps = {
  onStop: () => {},
  onSave: () => {},
  disabled: false,
};

export default function QueryAndSaveBtns(
  { canAdd, onQuery, onSave, onStop, loading, errorMessage }) {
  const saveClasses = classnames({
    'disabled disabledButton': canAdd !== 'True',
  });
  const qryButtonStyle = errorMessage ? 'danger' : 'primary';
  const saveButtonDisabled = errorMessage ? true : loading;
  const qryOrStopButton = loading ? (
    <Button
      onClick={onStop}
      bsStyle="warning"

    >
      <i className="fa fa-stop-circle-o" /> 停止查询
    </Button>
  ) : (
    <Button
      className="query"
      onClick={onQuery}
      bsStyle={qryButtonStyle}
      disabled={!!errorMessage}
    >
      <i className="fa fa fa-toggle-right" /> 开始提数
    </Button>
  );

  return (
      <div style={{margin:'0px,0px,-15px,0px'}}>
      <ButtonGroup className="query-and-save">
        {qryOrStopButton}
        <Button
          className={saveClasses}
          data-target="#save_modal"
          data-toggle="modal"
          disabled={saveButtonDisabled}
          onClick={onSave}
        >
          <i className="fa fa-plus-circle" /> 保存
        </Button>
      </ButtonGroup>
          保存提数后，提数条件将存储在您的历史提数模中
      {errorMessage &&
        <span>
          {' '}
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={'query-error-tooltip'}>
                {errorMessage}
              </Tooltip>}
          >
            <i className="fa fa-exclamation-circle text-danger fa-lg" />
          </OverlayTrigger>
        </span>
      }
    </div>
  );
}

QueryAndSaveBtns.propTypes = propTypes;
QueryAndSaveBtns.defaultProps = defaultProps;
