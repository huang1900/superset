/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  slice: PropTypes.object.isRequired,
  removeSlice: PropTypes.func.isRequired,
  expandedSlices: PropTypes.object,
};

function SliceCell({ expandedSlices, removeSlice, slice }) {
  return (
    <div className="slice-cell" id={`${slice.slice_id}-cell`}>
      <div className="chart-header">
        <div className="row">
          <div className="col-md-12 header">
            <span>{slice.slice_name}</span>
          </div>
          <div className="col-md-12 chart-controls">
            <div className="pull-right">
              <a title="移动" data-toggle="tooltip">
                <i className="fa fa-arrows drag" />
              </a>
              <a className="refresh" title="刷新" data-toggle="tooltip">
                <i className="fa fa-repeat" />
              </a>
              {slice.description &&
                <a title="描述">
                  <i
                    className="fa fa-info-circle slice_info"
                    title={slice.description}
                    data-toggle="tooltip"
                  />
                </a>
              }
              <a
                href={slice.edit_url}
                title="编辑"
                data-toggle="tooltip"
              >
                <i className="fa fa-pencil" />
              </a>
              <a href={slice.slice_url} title="Explore chart" data-toggle="tooltip">
                <i className="fa fa-share" />
              </a>
              <a
                className="remove-chart"
                title="删除"
                data-toggle="tooltip"
              >
                <i
                  className="fa fa-close"
                  onClick={() => { removeSlice(slice.slice_id); }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="slice_description bs-callout bs-callout-default"
        style={
          expandedSlices &&
          expandedSlices[String(slice.slice_id)] ? {} : { display: 'none' }
        }
        dangerouslySetInnerHTML={{ __html: slice.description_markeddown }}
      />
      <div className="row chart-container">
        <input type="hidden" value="false" />
        <div id={'token_' + slice.slice_id} className="token col-md-12">
          <img
            src="/static/assets/images/loading.gif"
            className="loading"
            alt="loading"
          />
          <div
            id={'con_' + slice.slice_id}
            className={`slice_container ${slice.form_data.viz_type}`}
          />
        </div>
      </div>
    </div>
  );
}

SliceCell.propTypes = propTypes;

export default SliceCell;
