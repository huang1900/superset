import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Button, Row, Col } from 'react-bootstrap';
import SelectControl from './SelectControl';

const $ = window.$ = require('jquery');

const operatorsArr = [
  { val: 'in', type: 'array', useSelect: true, multi: true, label: '包括' },
  { val: 'not in', type: 'array', useSelect: true, multi: true ,label: '排除'},
  { val: '==', type: 'string', useSelect: true, multi: false, havingOnly: true, label:'等于' },
  { val: '!=', type: 'string', useSelect: true, multi: false, havingOnly: true, label:'不等于'},
  { val: '>=', type: 'string', havingOnly: true,label:'大于等于' },
  { val: '<=', type: 'string', havingOnly: true,label:'小于等于' },
  { val: '>', type: 'string', havingOnly: true,label:'大于'},
  { val: '<', type: 'string', havingOnly: true ,label:'小于'},
  { val: 'regex', type: 'string', datasourceTypes: ['druid'] ,label:'包括'},
  { val: 'LIKE', type: 'string', datasourceTypes: ['table'] ,label:'包含'},
  { val: 'start_with', type: 'string', datasourceTypes: ['table'] ,label:'以此开始'},
  { val: 'end_with', type: 'string', datasourceTypes: ['table'] ,label:'以此结束'},
];
const operators = {};
operatorsArr.forEach((op) => {
  operators[op.val] = op;
});

const propTypes = {
  changeFilter: PropTypes.func,
  removeFilter: PropTypes.func,
  filter: PropTypes.object.isRequired,
  datasource: PropTypes.object,
  having: PropTypes.bool,
};

const defaultProps = {
  changeFilter: () => {},
  removeFilter: () => {},
  datasource: null,
  having: false,
};

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valuesLoading: false,
    };
  }
  componentDidMount() {
    this.fetchFilterValues(this.props.filter.col);
  }
  fetchFilterValues(col) {
    const datasource = this.props.datasource;
    if (col && this.props.datasource && this.props.datasource.filter_select && !this.props.having) {
      this.setState({ valuesLoading: true });
      $.ajax({
        type: 'GET',
        url: `/superset/filter/${datasource.type}/${datasource.id}/${col}/`,
        success: (data) => {
          this.setState({ valuesLoading: false, valueChoices: data });
        },
      });
    }

  }
  switchFilterValue(prevOp, nextOp) {
    if (operators[prevOp].type !== operators[nextOp].type) {
      const val = this.props.filter.val;
      let newVal;
      // switch from array to string
      if (operators[nextOp].type === 'string' && val && val.length > 0) {
        newVal = val[0];
      } else if (operators[nextOp].type === 'array' && val) {
        newVal = [val];
      }
      this.props.changeFilter(['val','op'], [newVal,nextOp]);
    }else{
      this.props.changeFilter('op', nextOp);
    }

  }
  changeText(event) {
    this.props.changeFilter('val', event.target.value);
  }
  changeSelect(value) {
    this.props.changeFilter('val', value);
  }
  changeColumn(event) {
    this.props.changeFilter('col', event.value);
    this.fetchFilterValues(event.value);
  }
  changeOp(event) {
    this.switchFilterValue(this.props.filter.op, event.value);

  }
  removeFilter(filter) {
    this.props.removeFilter(filter);
  }
  renderFilterFormControl(filter) {
    const operator = operators[filter.op];
    if (operator.useSelect && !this.props.having) {
      // TODO should use a simple Select, not a control here...
      return (
        <SelectControl
          multi={operator.multi}
          freeForm
          name="filter-value"
          value={filter.val}
          isLoading={this.state.valuesLoading}
          choices={this.state.valueChoices}
          onChange={this.changeSelect.bind(this)}
          showHeader={false}
        />
      );
    }
    return (
      <input
        type="text"
        onChange={this.changeText.bind(this)}
        value={filter.val}
        className="form-control input-sm"
        placeholder="过滤"
      />
    );
  }
  render() {
    const datasource = this.props.datasource;
    const filter = this.props.filter;
    const opsChoices = operatorsArr
    .filter((o) => {
      if (this.props.having) {
        return !!o.havingOnly;
      }
      return (!o.datasourceTypes || o.datasourceTypes.indexOf(datasource.type) >= 0);
    })
    .map(o => ({ value: o.val, label: o.label }));
    let colChoices;
    if (datasource) {
      if (this.props.having) {
        colChoices = datasource.metrics_combo.map(c => ({ value: c[0], label: c[1] }));
      } else {
        colChoices = datasource.filterable_cols.map(c => ({ value: c[0], label: c[1] }));
      }
    }
    return (
      <div>
        <Row className="space-1">
          <Col md={12}>
            <Select
              id="select-col"
              placeholder={this.props.having ? '选择计算指标' : '选择列'}
              clearable={false}
              options={colChoices}
              value={filter.col}
              onChange={this.changeColumn.bind(this)}
            />
          </Col>
        </Row>
        <Row className="space-1">
          <Col md={3}>
            <Select
              id="select-op"
              placeholder="选择操作"
              options={opsChoices}
              clearable={false}
              value={filter.op}
              onChange={this.changeOp.bind(this)}
            />
          </Col>
          <Col md={7}>
            {this.renderFilterFormControl(filter)}
          </Col>
          <Col md={2}>
            <Button
              id="remove-button"
              bsSize="small"
              onClick={this.removeFilter.bind(this)}
            >
              <i className="fa fa-minus" />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;
