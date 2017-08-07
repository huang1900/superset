import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TableLoader from './TableLoader';

const propTypes = {
  user: PropTypes.object.isRequired,
};

export default class Favorites extends React.PureComponent {
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
        '创建者': <a href={slice.creator_url}>{slice.creator}</a>,
        '关注时间': moment.utc(slice.dttm).fromNow(),
      _favorited: slice.dttm,
    }));
    return (
      <TableLoader
        dataEndpoint={`/superset/fave_slices/${this.props.user.userId}/`}
        className="table table-condensed"
        columns={['历史查询', '创建者', '关注时间']}
        mutator={mutator}
        noDataText="没有关注的查询，不如现在去关注一下"
        sortable
      />
    );
  }
  renderDashboardTable() {
    const mutator = data => data.map(dash => ({
      dashboard: <a href={dash.url}>{dash.title}</a>,
      creator: <a href={dash.creator_url}>{dash.creator}</a>,
      favorited: moment.utc(dash.dttm).fromNow(),
    }));
    return (
      <TableLoader
        className="table table-condensed"
        mutator={mutator}
        dataEndpoint={`/superset/fave_dashboards/${this.props.user.userId}/`}
        noDataText="没有关注的看版，不如现在去关注一下"
        columns={['看板', '创建者', '关注时间']}
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
Favorites.propTypes = propTypes;
