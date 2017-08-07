import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TableLoader from './TableLoader';

const propTypes = {
  user: PropTypes.object.isRequired,
};

class CreatedContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dashboardsLoading: true,
      slicesLoading: true,
      dashboards: [],
      slices: [],
    };
  }
  renderSliceTable() {
    const mutator = data => data.map(slice => ({
        '历史查询': <a href={slice.url}>{slice.title}</a>,
        '创建时间': moment.utc(slice.dttm).fromNow(),
      _favorited: slice.dttm,
    }));
    return (
      <TableLoader
        dataEndpoint={`/superset/created_slices/${this.props.user.userId}/`}
        className="table table-condensed"
        columns={['历史查询', '创建时间']}
        mutator={mutator}
        noDataText="没有历史查询"
        sortable
      />
    );
  }
  renderDashboardTable() {
    const mutator = data => data.map(dash => ({
        '看板': <a href={dash.url}>{dash.title}</a>,
        '创建时间': moment.utc(dash.dttm).fromNow(),
      _favorited: dash.dttm,
    }));
    return (
      <TableLoader
        className="table table-condensed"
        mutator={mutator}
        dataEndpoint={`/superset/created_dashboards/${this.props.user.userId}/`}
        noDataText="没有看板"
        columns={['看板', '创建时间']}
        sortable
      />
    );
  }
  render() {
    return (
      <div>
        <h3>看板</h3>
        {this.renderDashboardTable()}
        <hr />
        <h3>历史查询</h3>
        {this.renderSliceTable()}
      </div>
    );
  }
}
CreatedContent.propTypes = propTypes;

export default CreatedContent;
