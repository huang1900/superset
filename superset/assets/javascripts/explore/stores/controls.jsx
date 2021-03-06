import React from 'react';
import { formatSelectOptionsForRange, formatSelectOptions } from '../../modules/utils';
import * as v from '../validators';
import MetricOption from '../../components/MetricOption';
import ColumnOption from '../../components/ColumnOption';

const D3_FORMAT_DOCS = 'D3 format syntax: https://github.com/d3/d3-format';

// input choices & options
const D3_FORMAT_OPTIONS = [
  [',', '千位分隔'],
  ['.2%', '百分比（保留2位）'],
];

const ROW_LIMIT_OPTIONS = [10, 50, 100, 250, 500, 1000, 5000, 10000, 50000];

const SERIES_LIMITS = [0, 5, 10, 25, 50, 100, 500];

export const D3_TIME_FORMAT_OPTIONS = [
    ['smart_date', '自动匹配'],
    ['%m/%d/%Y', '%m/%d/%Y | 01/14/2019'],
    ['%Y-%m-%d', '%Y-%m-%d | 2019-01-14'],
    ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M:%S | 2019-01-14 01:32:10'],
    ['%H:%M:%S', '%H:%M:%S | 01:32:10'],
];

const timeColumnOption = {
  verbose_name: 'Time',
  column_name: '__timestamp',
  description: (
    'A reference to the [Time] configuration, taking granularity into ' +
    'account'),
};

const groupByControl = {
  type: 'SelectControl',
  multi: true,
  label: 'Group by',
  default: [],
  includeTime: false,
  description: 'One or many controls to group by',
  optionRenderer: c => <ColumnOption column={c} />,
  valueRenderer: c => <ColumnOption column={c} />,
  valueKey: 'column_name',
  mapStateToProps: (state, control) => {
    const newState = {};
    if (state.datasource) {
      newState.options = state.datasource.columns.filter(c => c.groupby);
      if (control && control.includeTime) {
        newState.options.push(timeColumnOption);
      }
    }
    return newState;
  },
};

export const controls = {
  datasource: {
    type: 'DatasourceControl',
    label: '数据指标分类',
    default: null,
    description: null,
    mapStateToProps: state => ({
      datasource: state.datasource,
    }),
  },

  viz_type: {
    type: 'VizTypeControl',
    label: '报表类型',
    default: 'table',
    description: '选择一种分析模式',
  },

  // metrics: {
  //   type: 'SelectControl',
  //   multi: true,
  //   label: '计算指标',
  //   validators: [v.nonEmpty],
  //   valueKey: 'metric_name',
  //   optionRenderer: m => <MetricOption metric={m} />,
  //   valueRenderer: m => <MetricOption metric={m} />,
  //   default: c => c.options && c.options.length > 0 ? [c.options[0].metric_name] : null,
  //   mapStateToProps: state => ({
  //     options: (state.datasource) ? state.datasource.metrics : [],
  //   }),
  //   description: '选择一个或多个计算指标',
  // },
  metrics: {
       type: 'MetricControl',
        multi: true,
        label: '计算指标',
        validators: [v.nonEmpty],
        valueKey: 'metric_name',
        default:[],
        mapStateToProps: state => ({
            metrics: (state.datasource) ? state.datasource.metrics : [],
        }),
        description: '选择一个或多个计算指标',
    },
  y_axis_bounds: {
    type: 'BoundsControl',
    label: 'Y Axis Bounds',
    default: [null, null],
    description: (
      'Bounds for the Y axis. When left empty, the bounds are ' +
      'dynamically defined based on the min/max of the data. Note that ' +
      "this feature will only expand the axis range. It won't " +
      "narrow the data's extent."
    ),
  },
  order_by_cols: {
    type: 'SelectControl',
    multi: true,
    label: '排序',
    default: [],
    description: '选择指标排序',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.order_by_choices : [],
    }),
  },

  // metric: {
  //   type: 'SelectControl',
  //   label: '字段',
  //   clearable: false,
  //   validators: [v.nonEmpty],
  //   optionRenderer: m => <MetricOption metric={m} />,
  //   valueRenderer: m => <MetricOption metric={m} />,
  //   default: c => c.options && c.options.length > 0 ? c.options[0].metric_name : null,
  //   valueKey: 'metric_name',
  //   description: '选择字段',
  //   mapStateToProps: state => ({
  //     options: (state.datasource) ? state.datasource.metrics : [],
  //   }),
  // },

    metric: {
        type: 'MetricControl',
        label: '字段',
        clearable: false,
        validators: [v.nonEmpty],
        valueKey: 'metric_name',
        description: '选择字段',
        mapStateToProps: state => ({
            metrics: (state.datasource) ? state.datasource.metrics : [],
        }),
    },
  // metric_check: {
  //       type: 'MetricControl',
  //       label: '字段',
  //       clearable: false,
  //       validators: [v.nonEmpty],
  //       valueKey: 'metric_name',
  //       description: '选择字段',
  //       mapStateToProps: state => ({
  //           metrics: (state.datasource) ? state.datasource.metrics : [],
  //       }),
  //   },
  metric_2: {
    type: 'SelectControl',
    label: 'Right Axis Metric',
    default: null,
    validators: [v.nonEmpty],
    clearable: true,
    description: 'Choose a metric for right axis',
    valueKey: 'metric_name',
    optionRenderer: m => <MetricOption metric={m} />,
    valueRenderer: m => <MetricOption metric={m} />,
    mapStateToProps: state => ({
      options: (state.datasource) ? state.datasource.metrics : [],
    }),
  },

  stacked_style: {
    type: 'SelectControl',
    label: 'Stacked Style',
    choices: [
      ['stack', 'stack'],
      ['stream', 'stream'],
      ['expand', 'expand'],
    ],
    default: 'stack',
    description: '',
  },

  linear_color_scheme: {
    type: 'SelectControl',
    label: 'Linear Color Scheme',
    choices: [
      ['fire', 'fire'],
      ['blue_white_yellow', 'blue/white/yellow'],
      ['white_black', 'white/black'],
      ['black_white', 'black/white'],
    ],
    default: 'blue_white_yellow',
    description: '',
  },

  normalize_across: {
    type: 'SelectControl',
    label: 'Normalize Across',
    choices: [
      ['heatmap', 'heatmap'],
      ['x', 'x'],
      ['y', 'y'],
    ],
    default: 'heatmap',
    description: 'Color will be rendered based on a ratio ' +
    'of the cell against the sum of across this ' +
    'criteria',
  },

  horizon_color_scale: {
    type: 'SelectControl',
    label: 'Horizon Color Scale',
    choices: [
      ['series', 'series'],
      ['overall', 'overall'],
      ['change', 'change'],
    ],
    default: 'series',
    description: 'Defines how the color are attributed.',
  },

  canvas_image_rendering: {
    type: 'SelectControl',
    label: 'Rendering',
    choices: [
      ['pixelated', 'pixelated (Sharp)'],
      ['auto', 'auto (Smooth)'],
    ],
    default: 'pixelated',
    description: 'image-rendering CSS attribute of the canvas object that ' +
    'defines how the browser scales up the image',
  },

  xscale_interval: {
    type: 'SelectControl',
    label: 'XScale Interval',
    choices: formatSelectOptionsForRange(1, 50),
    default: '1',
    description: 'Number of steps to take between ticks when ' +
    'displaying the X scale',
  },

  yscale_interval: {
    type: 'SelectControl',
    label: 'YScale Interval',
    choices: formatSelectOptionsForRange(1, 50),
    default: null,
    description: 'Number of steps to take between ticks when ' +
    'displaying the Y scale',
  },

  include_time: {
    type: 'CheckboxControl',
    label: '包含时间',
    description: '是否显示时间字段',
    default: false,
  },

  bar_stacked: {
    type: 'CheckboxControl',
    label: 'Stacked Bars',
    renderTrigger: true,
    default: false,
    description: null,
  },

  pivot_margins: {
    type: 'CheckboxControl',
    label: '总计',
    renderTrigger: false,
    default: true,
    description: '是否显示总计',
  },

  show_markers: {
    type: 'CheckboxControl',
    label: 'Show Markers',
    renderTrigger: true,
    default: false,
    description: 'Show data points as circle markers on the lines',
  },

  show_bar_value: {
    type: 'CheckboxControl',
    label: 'Bar Values',
    default: false,
    renderTrigger: true,
    description: 'Show the value on top of the bar',
  },

  order_bars: {
    type: 'CheckboxControl',
    label: 'Sort Bars',
    default: false,
    description: 'Sort bars by x labels.',
  },

  combine_metric: {
    type: 'CheckboxControl',
    label: '合并指标',
    default: false,
    description: '是否在同一个个单元格内显示指标.',
  },

  show_controls: {
    type: 'CheckboxControl',
    label: 'Extra Controls',
    renderTrigger: true,
    default: false,
    description: 'Whether to show extra controls or not. Extra controls ' +
    'include things like making mulitBar charts stacked ' +
    'or side by side.',
  },

  reduce_x_ticks: {
    type: 'CheckboxControl',
    label: 'Reduce X ticks',
    renderTrigger: true,
    default: false,
    description: 'Reduces the number of X axis ticks to be rendered. ' +
    'If true, the x axis wont overflow and labels may be ' +
    'missing. If false, a minimum width will be applied ' +
    'to columns and the width may overflow into an ' +
    'horizontal scroll.',
  },

  include_series: {
    type: 'CheckboxControl',
    label: 'Include Series',
    renderTrigger: true,
    default: false,
    description: 'Include series name as an axis',
  },

  secondary_metric: {
    type: 'SelectControl',
    label: 'Color Metric',
    default: null,
    description: 'A metric to use for color',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.metrics_combo : [],
    }),
  },
  select_country: {
    type: 'SelectControl',
    label: 'Country Name',
    default: 'France',
    choices: [
      'Belgium',
      'Brazil',
      'China',
      'Egypt',
      'France',
      'Germany',
      'Italy',
      'Morocco',
      'Netherlands',
      'Russia',
      'Singapore',
      'Spain',
      'Uk',
      'Ukraine',
      'Usa',
    ].map(s => [s, s]),
    description: 'The name of country that Superset should display',
  },
  country_fieldtype: {
    type: 'SelectControl',
    label: 'Country Field Type',
    default: 'cca2',
    choices: [
      ['name', 'Full name'],
      ['cioc', 'code International Olympic Committee (cioc)'],
      ['cca2', 'code ISO 3166-1 alpha-2 (cca2)'],
      ['cca3', 'code ISO 3166-1 alpha-3 (cca3)'],
    ],
    description: 'The country code standard that Superset should expect ' +
    'to find in the [country] column',
  },
    groupby: {
        multi: true,
        label: '分组',
        default: [],
        description: '选择指标分组',
        valueKey: 'column_name',
        type: 'MetricControl',
        mapStateToProps: state => ({
            metrics: (state.datasource) ?
                state.datasource.gb_cols.map((x)=> {
                return {column_name:x[0],verbose_name:x[0]}
                })
                : [],
        }),
    },

    columns: {
        multi: true,
        label: '分组列',
        valueKey: 'column_name',
        type: 'MetricControl',
        default: [],
        valueKey: 'column_name',
        mapStateToProps: state => ({
            metrics: (state.datasource) ? state.datasource.columns : [],
        }),
        description: '选择分组列',
    },
  all_columns: {
    multi: true,
    label: '列',
    default: [],
    description: '显示列',
    valueKey: 'column_name',
    type: 'MetricControl',
    clearable: false,
    mapStateToProps: state => ({
        metrics: (state.datasource) ? state.datasource.columns : [],
    }),
  },
  all_columns_x: {
    type: 'SelectControl',
    label: 'X',
    default: null,
    description: 'Columns to display',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.all_cols : [],
    }),
  },

  all_columns_y: {
    type: 'SelectControl',
    label: 'Y',
    default: null,
    description: 'Columns to display',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.all_cols : [],
    }),
  },

  druid_time_origin: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Origin',
    choices: [
      ['', 'default'],
      ['now', 'now'],
    ],
    default: null,
    description: 'Defines the origin where time buckets start, ' +
    'accepts natural dates as in `now`, `sunday` or `1970-01-01`',
  },

  bottom_margin: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Bottom Margin',
    choices: formatSelectOptions(['auto', 50, 75, 100, 125, 150, 200]),
    default: 'auto',
    description: 'Bottom marging, in pixels, allowing for more room for axis labels',
  },

  granularity: {
    type: 'SelectControl',
    freeForm: true,
    label: '时间粒度',
    default: '1 天',
    choices: formatSelectOptions([
      '全部',
      '天',
      '周',
      '月',
    ]),
    description: '',
  },

  domain_granularity: {
    type: 'SelectControl',
    label: '时间粒度',
    default: 'month',
    choices: formatSelectOptions(['小时', '日', '周', '月', '年']),
    description: '时间字段统计粒度',
  },

  subdomain_granularity: {
    type: 'SelectControl',
    label: 'Subdomain',
    default: 'day',
    choices: formatSelectOptions(['min', 'hour', 'day', 'week', 'month']),
    description: 'The time unit for each block. Should be a smaller unit than ' +
    'domain_granularity. Should be larger or equal to Time Grain',
  },

  link_length: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Link Length',
    default: '200',
    choices: formatSelectOptions(['10', '25', '50', '75', '100', '150', '200', '250']),
    description: 'Link length in the force layout',
  },

  charge: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Charge',
    default: '-500',
    choices: formatSelectOptions([
      '-50',
      '-75',
      '-100',
      '-150',
      '-200',
      '-250',
      '-500',
      '-1000',
      '-2500',
      '-5000',
    ]),
    description: 'Charge in the force layout',
  },

  granularity_sqla: {
    type: 'SelectControl',
    label: '时间字段',
    default: control =>
      control.choices && control.choices.length > 0 ? control.choices[0][0] : null,
    description: '选择一个时间字段过滤，指定时间请手工输入如2007-02-13',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.granularity_sqla : [],
    }),
  },

  time_grain_sqla: {
    type: 'SelectControl',
    label: '时间粒度',
    default: control => control.choices && control.choices.length ? control.choices[0][0] : null,
    description: '选择分析需要的时间粒度',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.time_grain_sqla : null,
    }),
  },

  resample_rule: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Resample Rule',
    default: null,
    choices: formatSelectOptions(['', '1T', '1H', '1D', '7D', '1M', '1AS']),
    description: 'Pandas resample rule',
  },

  resample_how: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Resample How',
    default: null,
    choices: formatSelectOptions(['', 'mean', 'sum', 'median']),
    description: 'Pandas resample how',
  },

  resample_fillmethod: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Resample Fill Method',
    default: null,
    choices: formatSelectOptions(['', 'ffill', 'bfill']),
    description: 'Pandas resample fill method',
  },

  since: {
    type: 'SelectControl',
    freeForm: true,
    label: '开始时间',
    default: '1 day ago',
    choices: formatSelectOptions([
      '1 day ago',
      '7 days ago'
    ]),
    description: '输入时间描述或者直接输入时间字符串如：20170302',
  },

  until: {
    type: 'SelectControl',
    freeForm: true,
    label: '结束时间',
    default: 'now',
    description: '输入时间描述或者直接输入时间字符串如：20170302',
    choices: formatSelectOptions([
      'now',
      '1 day ago',
    ]),
  },
    date_timepick_st: {
        type: 'DatetimeControl',
        label: '开始时间.',
        description: '选择开始时间',
    },
    date_timepick_end: {
        type: 'DatetimeControl',
        label: '结束时间.',
        description: '选择结束时间',
    },

  max_bubble_size: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Max Bubble Size',
    default: '25',
    choices: formatSelectOptions(['5', '10', '15', '25', '50', '75', '100']),
  },

  whisker_options: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Whisker/outlier options',
    default: 'Tukey',
    description: 'Determines how whiskers and outliers are calculated.',
    choices: formatSelectOptions([
      'Tukey',
      'Min/max (no outliers)',
      '2/98 percentiles',
      '9/91 percentiles',
    ]),
  },

  treemap_ratio: {
    type: 'TextControl',
    label: 'Ratio',
    isFloat: true,
    default: 0.5 * (1 + Math.sqrt(5)),  // d3 default, golden ratio
    description: 'Target aspect ratio for treemap tiles.',
  },

  number_format: {
    type: 'SelectControl',
    freeForm: true,
    label: '数字格式化模式（d3）',
    default: control =>
          control.choices && control.choices.length > 0 ? control.choices[0][0] : null,
    choices: D3_TIME_FORMAT_OPTIONS,
    description: '输入d3格式化字符串，详见https://github.com/d3/d3-format',
  },

  row_limit: {
    type: 'SelectControl',
    freeForm: true,
    label: '数据条数上限',
    default:500 ,
    choices: [["0","不设限制（慎重)"],[10,10], [50,50], [100,100], [250,250], [500,500], [1000,1000], [5000,5000], [10000,10000], [50000,50000]],
  },

  limit: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Series limit',
    choices: formatSelectOptions(SERIES_LIMITS),
    default: 50,
    description: 'Limits the number of time series that get displayed',
  },

  timeseries_limit_metric: {
    type: 'SelectControl',
    label: 'Sort By',
    default: null,
    description: 'Metric used to define the top series',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.metrics_combo : [],
    }),
  },

  rolling_type: {
    type: 'SelectControl',
    label: 'Rolling',
    default: 'None',
    choices: formatSelectOptions(['None', 'mean', 'sum', 'std', 'cumsum']),
    description: 'Defines a rolling window function to apply, works along ' +
    'with the [Periods] text box',
  },

  rolling_periods: {
    type: 'TextControl',
    label: 'Periods',
    isInt: true,
    description: 'Defines the size of the rolling window function, ' +
    'relative to the time granularity selected',
  },

  series: {
    type: 'SelectControl',
    label: 'Series',
    default: null,
    description: 'Defines the grouping of entities. ' +
    'Each series is shown as a specific color on the chart and ' +
    'has a legend toggle',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.gb_cols : [],
    }),
  },

  entity: {
    type: 'SelectControl',
    label: 'Entity',
    default: null,
    validators: [v.nonEmpty],
    description: 'This defines the element to be plotted on the chart',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.gb_cols : [],
    }),
  },

  x: {
    type: 'SelectControl',
    label: 'X Axis',
    description: 'Metric assigned to the [X] axis',
    default: null,
    validators: [v.nonEmpty],
    optionRenderer: m => <MetricOption metric={m} />,
    valueRenderer: m => <MetricOption metric={m} />,
    valueKey: 'metric_name',
    mapStateToProps: state => ({
      options: (state.datasource) ? state.datasource.metrics : [],
    }),
  },

  y: {
    type: 'SelectControl',
    label: 'Y Axis',
    default: null,
    validators: [v.nonEmpty],
    description: 'Metric assigned to the [Y] axis',
    optionRenderer: m => <MetricOption metric={m} />,
    valueRenderer: m => <MetricOption metric={m} />,
    valueKey: 'metric_name',
    mapStateToProps: state => ({
      options: (state.datasource) ? state.datasource.metrics : [],
    }),
  },

  size: {
    type: 'SelectControl',
    label: 'Bubble Size',
    default: null,
    validators: [v.nonEmpty],
    optionRenderer: m => <MetricOption metric={m} />,
    valueRenderer: m => <MetricOption metric={m} />,
    valueKey: 'metric_name',
    mapStateToProps: state => ({
      options: (state.datasource) ? state.datasource.metrics : [],
    }),
  },

  url: {
    type: 'TextControl',
    label: 'URL',
    description: 'The URL, this control is templated, so you can integrate ' +
    '{{ width }} and/or {{ height }} in your URL string.',
    default: 'https://www.youtube.com/embed/AdSZJzb-aX8',
  },

  x_axis_label: {
    type: 'TextControl',
    label: 'X Axis Label',
    renderTrigger: true,
    default: '',
  },

  y_axis_label: {
    type: 'TextControl',
    label: 'Y Axis Label',
    renderTrigger: true,
    default: '',
  },

  where: {
    type: 'TextControl',
    label: '自定义where语句',
    default: '',
    description: '支持自定义sql条件过滤',
  },

  having: {
    type: 'TextControl',
    label: '分组过滤（having）',
    default: '',
    description: '针对分组过滤支持sql表达式.',
  },

  compare_lag: {
    type: 'TextControl',
    label: 'Comparison Period Lag',
    isInt: true,
    description: 'Based on granularity, number of time periods to compare against',
  },

  compare_suffix: {
    type: 'TextControl',
    label: 'Comparison suffix',
    description: 'Suffix to apply after the percentage display',
  },

  table_timestamp_format: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Table Timestamp Format',
    default: '%Y-%m-%d %H:%M:%S',
    validators: [v.nonEmpty],
    clearable: false,
    choices: D3_TIME_FORMAT_OPTIONS,
    description: 'Timestamp Format',
  },

  series_height: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Series Height',
    default: '25',
    choices: formatSelectOptions(['10', '25', '40', '50', '75', '100', '150', '200']),
    description: 'Pixel height of each series',
  },

  page_length: {
    type: 'SelectControl',
    freeForm: true,
    label: '每页显示数量',
    default: 0,
    choices: formatSelectOptions([0, 10, 25, 40, 50, 75, 100, 150, 200]),
    description: '每一页显示的数据数量，0代表不分页',
  },

  x_axis_format: {
    type: 'SelectControl',
    freeForm: true,
    label: 'X Axis Format',
    renderTrigger: true,
    default: '.3s',
    choices: D3_FORMAT_OPTIONS,
    description: D3_FORMAT_DOCS,
  },

  x_axis_time_format: {
    type: 'SelectControl',
    freeForm: true,
    label: 'X Axis Format',
    renderTrigger: true,
    default: 'smart_date',
    choices: D3_TIME_FORMAT_OPTIONS,
    description: D3_FORMAT_DOCS,
  },

  y_axis_format: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Y Axis Format',
    renderTrigger: true,
    default: '.3s',
    choices: D3_FORMAT_OPTIONS,
    description: D3_FORMAT_DOCS,
  },

  y_axis_2_format: {
    type: 'SelectControl',
    freeForm: true,
    label: 'Right Axis Format',
    default: '.3s',
    choices: D3_FORMAT_OPTIONS,
    description: D3_FORMAT_DOCS,
  },

  markup_type: {
    type: 'SelectControl',
    label: 'Markup Type',
    clearable: false,
    choices: formatSelectOptions(['markdown', 'html']),
    default: 'markdown',
    validators: [v.nonEmpty],
    description: 'Pick your favorite markup language',
  },

  rotation: {
    type: 'SelectControl',
    label: 'Rotation',
    choices: formatSelectOptions(['random', 'flat', 'square']),
    default: 'random',
    description: 'Rotation to apply to words in the cloud',
  },

  line_interpolation: {
    type: 'SelectControl',
    label: 'Line Style',
    renderTrigger: true,
    choices: formatSelectOptions(['linear', 'basis', 'cardinal',
      'monotone', 'step-before', 'step-after']),
    default: 'linear',
    description: 'Line interpolation as defined by d3.js',
  },

  pie_label_type: {
    type: 'SelectControl',
    label: 'Label Type',
    default: 'key',
    choices: [
      ['key', 'Category Name'],
      ['value', 'Value'],
      ['percent', 'Percentage'],
    ],
    description: 'What should be shown on the label?',
  },

  code: {
    type: 'TextAreaControl',
    label: 'Code',
    description: 'Put your code here',
    mapStateToProps: state => ({
      language: state.controls && state.controls.markup_type ? state.controls.markup_type.value : 'markdown',
    }),
    default: '',
  },

  pandas_aggfunc: {
    type: 'SelectControl',
    label: '汇总方法',
    clearable: false,
    choices: [
     ['sum','求和'],
     ['mean','平均'],
      ['min','最小值'],
      ['max','最大值'],
      ['median','中位数'],
      ['median','中位数'],
      ['median','中位数'],
      ['stdev','标准差'] ,
      ['var','方差'],
    ],
    default: 'sum',
    description: '分组指标汇总',
  },

  size_from: {
    type: 'TextControl',
    isInt: true,
    label: 'Font Size From',
    default: '20',
    description: 'Font size for the smallest value in the list',
  },

  size_to: {
    type: 'TextControl',
    isInt: true,
    label: 'Font Size To',
    default: '150',
    description: 'Font size for the biggest value in the list',
  },

  instant_filtering: {
    type: 'CheckboxControl',
    label: 'Instant Filtering',
    renderTrigger: true,
    default: true,
    description: (
      'Whether to apply filters as they change, or wait for' +
      'users to hit an [Apply] button'
    ),
  },

  show_brush: {
    type: 'CheckboxControl',
    label: 'Range Filter',
    renderTrigger: true,
    default: false,
    description: 'Whether to display the time range interactive selector',
  },

  date_filter: {
    type: 'CheckboxControl',
    label: '时间过滤器',
    default: false,
    description: '是否有时间过滤',
  },

  show_datatable: {
    type: 'CheckboxControl',
    label: 'Data Table',
    default: false,
    description: 'Whether to display the interactive data table',
  },

  include_search: {
    type: 'CheckboxControl',
    label: '查询框',
    renderTrigger: true,
    default: true,
    description: '是否有查询框',
  },

  table_filter: {
    type: 'CheckboxControl',
    label: '表过滤器',
    default: false,
    description: '是否在列表上过滤',
  },

  show_bubbles: {
    type: 'CheckboxControl',
    label: 'Show Bubbles',
    default: false,
    renderTrigger: true,
    description: 'Whether to display bubbles on top of countries',
  },

  show_legend: {
    type: 'CheckboxControl',
    label: '图例',
    renderTrigger: true,
    default: true,
    description: '是否有图例',
  },

  x_axis_showminmax: {
    type: 'CheckboxControl',
    label: 'X bounds',
    renderTrigger: true,
    default: true,
    description: 'Whether to display the min and max values of the X axis',
  },

  rich_tooltip: {
    type: 'CheckboxControl',
    label: 'Rich Tooltip',
    renderTrigger: true,
    default: true,
    description: 'The rich tooltip shows a list of all series for that ' +
    'point in time',
  },

  y_log_scale: {
    type: 'CheckboxControl',
    label: 'Y Log Scale',
    default: false,
    renderTrigger: true,
    description: 'Use a log scale for the Y axis',
  },

  x_log_scale: {
    type: 'CheckboxControl',
    label: 'X Log Scale',
    default: false,
    renderTrigger: true,
    description: 'Use a log scale for the X axis',
  },

  donut: {
    type: 'CheckboxControl',
    label: 'Donut',
    default: false,
    renderTrigger: true,
    description: 'Do you want a donut or a pie?',
  },

  labels_outside: {
    type: 'CheckboxControl',
    label: 'Put labels outside',
    default: true,
    renderTrigger: true,
    description: 'Put the labels outside the pie?',
  },

  contribution: {
    type: 'CheckboxControl',
    label: 'Contribution',
    default: false,
    description: 'Compute the contribution to the total',
  },

  num_period_compare: {
    type: 'TextControl',
    label: 'Period Ratio',
    default: '',
    isInt: true,
    description: '[integer] Number of period to compare against, ' +
    'this is relative to the granularity selected',
  },

  period_ratio_type: {
    type: 'SelectControl',
    label: 'Period Ratio Type',
    default: 'growth',
    choices: formatSelectOptions(['factor', 'growth', 'value']),
    description: '`factor` means (new/previous), `growth` is ' +
    '((new/previous) - 1), `value` is (new-previous)',
  },

  time_compare: {
    type: 'TextControl',
    label: 'Time Shift',
    default: null,
    description: 'Overlay a timeseries from a ' +
    'relative time period. Expects relative time delta ' +
    'in natural language (example:  24 hours, 7 days, ' +
    '56 weeks, 365 days)',
  },

  subheader: {
    type: 'TextControl',
    label: 'Subheader',
    description: 'Description text that shows up below your Big Number',
  },

  mapbox_label: {
    type: 'SelectControl',
    multi: true,
    label: '气泡点',
    default: [],
    description: '气泡点汇总字段',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.all_cols : [],
    }),
  },

  mapbox_style: {
    type: 'SelectControl',
    label: '地图样式',
    choices: [
      ['mapbox://styles/mapbox/streets-v9', '街道'],
      ['mapbox://styles/mapbox/dark-v9', '黑色'],
      ['mapbox://styles/mapbox/light-v9', '光亮'],
      ['mapbox://styles/mapbox/satellite-streets-v9', '卫星街道'],
      ['mapbox://styles/mapbox/satellite-v9', '卫星'],
      // ['mapbox://styles/mapbox/outdoors-v9', '户外'],
    ],
    default: 'mapbox://styles/mapbox/streets-v9',
    description: '地图的布局样式',
  },

  clustering_radius: {
    type: 'SelectControl',
    freeForm: true,
    label: '气泡点聚合半径',
    default: '60',
    choices: formatSelectOptions([
      '0',
      '20',
      '40',
      '60',
      '80',
      '100',
      '200',
      '500',
      '1000',
    ]),
    description: '将半径内的单点聚合为气泡点，过大的半径可能导致延迟',
  },

  point_radius: {
    type: 'SelectControl',
    label: '单点半径',
    default: 'Auto',
    description: '单点半径大小',
    mapStateToProps: state => ({
      choices: [].concat([['Auto', '自动']], state.datasource.all_cols),
    }),
  },

  point_radius_unit: {
    type: 'SelectControl',
    label: '单点半径大小',
    default: 'Pixels',
    choices: [['Pixels','像素'],['Miles','米'],['Kilometers','千米']],
    description: '单点半径大小',
  },

  global_opacity: {
    type: 'TextControl',
    label: '透明度',
    default: 1,
    isFloat: true,
    description: '单点和气泡点的透明度',
  },

  viewport_zoom: {
    type: 'TextControl',
    label: '缩放比例',
    isFloat: true,
    default: 11,
    description: '地图缩放比例（1~20）',
    places: 8,
  },
  viewport_latitude: {
    type: 'TextControl',
    label: '纬度',
    default: 39.915378,
    isFloat: true,
    description: '默认视角维度',
    places: 8,
  },
  viewport_longitude: {
    type: 'TextControl',
    label: '经度',
    default:   116.404844,
    isFloat: true,
    description: '默认视角经度',
    places: 8,
  },

  render_while_dragging: {
    type: 'CheckboxControl',
    label: '自动渲染',
    default: true,
    description: '图像将会随着视角变动自动变化',
  },

  mapbox_color: {
    type: 'SelectControl',
    freeForm: true,
    label: '配色',
    default: 'rgb(0, 122, 135)',
    choices: [
      ['rgb(0, 139, 139)', '深青色'],
      ['rgb(128, 0, 128)', '紫色'],
      ['rgb(255, 215, 0)', '金色'],
      ['rgb(69, 69, 69)', '灰色'],
      ['rgb(220, 20, 60)', '深红色'],
      ['rgb(34, 139, 34)', '绿色'],
    ],
    description: '单点和坐标点的颜色',
  },

  ranges: {
    type: 'TextControl',
    label: 'Ranges',
    default: '',
    description: 'Ranges to highlight with shading',
  },

  range_labels: {
    type: 'TextControl',
    label: 'Range labels',
    default: '',
    description: 'Labels for the ranges',
  },

  markers: {
    type: 'TextControl',
    label: 'Markers',
    default: '',
    description: 'List of values to mark with triangles',
  },

  marker_labels: {
    type: 'TextControl',
    label: 'Marker labels',
    default: '',
    description: 'Labels for the markers',
  },

  marker_lines: {
    type: 'TextControl',
    label: 'Marker lines',
    default: '',
    description: 'List of values to mark with lines',
  },

  marker_line_labels: {
    type: 'TextControl',
    label: 'Marker line labels',
    default: '',
    description: 'Labels for the marker lines',
  },

  filters: {
    type: 'FilterControl',
    label: '',
    default: [],
    description: '',
    mapStateToProps: state => ({
      datasource: state.datasource,
    }),
  },

  having_filters: {
    type: 'FilterControl',
    label: '',
    default: [],
    description: '',
    mapStateToProps: state => ({
      choices: (state.datasource) ? state.datasource.metrics_combo
        .concat(state.datasource.filterable_cols) : [],
      datasource: state.datasource,
    }),
  },

  slice_id: {
    type: 'HiddenControl',
    label: 'Slice ID',
    hidden: true,
    description: 'The id of the active slice',
  },

  cache_timeout: {
    type: 'HiddenControl',
    label: '缓存时间 (秒)',
    hidden: true,
    description: '缓存的有效时间',
  },

  order_by_entity: {
    type: 'CheckboxControl',
    label: 'Order by entity id',
    description: 'Important! Select this if the table is not already sorted by entity id, ' +
    'else there is no guarantee that all events for each entity are returned.',
    default: true,
  },

  min_leaf_node_event_count: {
    type: 'SelectControl',
    freeForm: false,
    label: 'Minimum leaf node event count',
    default: 1,
    choices: formatSelectOptionsForRange(1, 10),
    description: 'Leaf nodes that represent fewer than this number of events will be initially ' +
    'hidden in the visualization',
  },
};
export default controls;
