import { D3_TIME_FORMAT_OPTIONS } from './controls';
import * as v from '../validators';

export const sections = {
  druidTimeSeries: {
    label: '时间',
    description: '',
    controlSetRows: [
      ['granularity', 'druid_time_origin'],
      ['since', 'until'],
    ],
  },
  datasourceAndVizType: {
    label: '数据指标分类&报表类型',
    controlSetRows: [
      ['datasource'],
      ['viz_type'],
      ['slice_id', 'cache_timeout'],
    ],
  },
  sqlaTimeSeries: {
    label: '时间',
    description: '时间类型范围',
    controlSetRows: [
      ['granularity_sqla','time_grain_sqla'],
      ['since', 'until'],
    ],
  },
    TableTimeSeries: {
        label: '时间',
        description: '时间类型范围',
        controlSetRows: [
            ['granularity_sqla','time_grain_sqla']
        ],
    },
    TableTimePick: {
        label: '时间范围',
        controlSetRows: [
            ['date_timepick_st','date_timepick_end']
        ],
    },
    TableTimeText: {
        label: '报表更新时间（如果需要将查询生成自动更新报表，请配置报表更新时间）',
        controlSetRows: [
            ['since','until']
        ],
    },
  NVD3TimeSeries: [
    {
      label: null,
      controlSetRows: [
        ['metrics'],
        ['groupby'],
        ['limit', 'timeseries_limit_metric'],
      ],
    },
    {
      label: 'Advanced Analytics',
      description: 'This section contains options ' +
                   'that allow for advanced analytical post processing ' +
                    'of query results',
      controlSetRows: [
          ['rolling_type', 'rolling_periods'],
          ['time_compare'],
          ['num_period_compare', 'period_ratio_type'],
          ['resample_how', 'resample_rule'],
          ['resample_fillmethod'],
      ],
    },
  ],
  filters: [
    {
      label: '过滤器',
      description: '过滤指定字段',
      controlSetRows: [['filters']],
    },
    {
      label: '结果过滤器',
      description: '针对结果进行过滤（having）',
      controlSetRows: [['having_filters']],
    },
  ],
    sqlClause: {
        label: 'SQL',
        controlSetRows: [
            ['where'],
            ['having'],
        ],
        description: '可以使用直接添加sql条件',
    },
};

const visTypes = {
  // dist_bar: {
  //   label: '柱状图',
  //   controlPanelSections: [
  //     {
  //       label: '图表参数',
  //       controlSetRows: [
  //         ['metrics'],
  //         ['groupby'],
  //         ['columns'],
  //         ['row_limit'],
  //         ['show_legend', 'show_bar_value'],
  //         ['bar_stacked', 'order_bars'],
  //         ['y_axis_format', 'bottom_margin'],
  //         ['x_axis_label', 'y_axis_label'],
  //         ['reduce_x_ticks', 'contribution'],
  //         ['show_controls'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     groupby: {
  //       label: '列',
  //     },
  //     columns: {
  //       label: 'Breakdowns',
  //       description: 'Defines how each series is broken down',
  //     },
  //   },
  // },
  //
  // pie: {
  //   label: 'Pie Chart',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['metrics', 'groupby'],
  //         ['limit'],
  //         ['pie_label_type'],
  //         ['donut', 'show_legend'],
  //         ['labels_outside'],
  //       ],
  //     },
  //   ],
  // },
  //
  // line: {
  //   label: 'Time Series - Line Chart',
  //   requiresTime: true,
  //   controlPanelSections: [
  //     sections.NVD3TimeSeries[0],
  //     {
  //       label: 'Chart Options',
  //       controlSetRows: [
  //         ['show_brush', 'show_legend'],
  //         ['rich_tooltip', 'y_axis_zero'],
  //         ['y_log_scale', 'contribution'],
  //         ['show_markers', 'x_axis_showminmax'],
  //         ['line_interpolation'],
  //         ['x_axis_format', 'y_axis_format'],
  //         ['x_axis_label', 'y_axis_label'],
  //       ],
  //     },
  //     sections.NVD3TimeSeries[1],
  //   ],
  // },
  //
  // dual_line: {
  //   label: 'Time Series - Dual Axis Line Chart',
  //   requiresTime: true,
  //   controlPanelSections: [
  //     {
  //       label: 'Chart Options',
  //       controlSetRows: [
  //         ['x_axis_format'],
  //       ],
  //     },
  //     {
  //       label: 'Y Axis 1',
  //       controlSetRows: [
  //         ['metric'],
  //         ['y_axis_format'],
  //       ],
  //     },
  //     {
  //       label: 'Y Axis 2',
  //       controlSetRows: [
  //         ['metric_2'],
  //         ['y_axis_2_format'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     metric: {
  //       label: 'Left Axis Metric',
  //       description: 'Choose a metric for left axis',
  //     },
  //     y_axis_format: {
  //       label: 'Left Axis Format',
  //     },
  //   },
  // },
  //
  // bar: {
  //   label: 'Time Series - Bar Chart',
  //   requiresTime: true,
  //   controlPanelSections: [
  //     sections.NVD3TimeSeries[0],
  //     {
  //       label: 'Chart Options',
  //       controlSetRows: [
  //         ['show_brush', 'show_legend', 'show_bar_value'],
  //         ['rich_tooltip', 'y_axis_zero'],
  //         ['y_log_scale', 'contribution'],
  //         ['x_axis_format', 'y_axis_format'],
  //         ['line_interpolation', 'bar_stacked'],
  //         ['x_axis_showminmax', 'bottom_margin'],
  //         ['x_axis_label', 'y_axis_label'],
  //         ['reduce_x_ticks', 'show_controls'],
  //       ],
  //     },
  //     sections.NVD3TimeSeries[1],
  //   ],
  // },
  //
  // compare: {
  //   label: 'Time Series - Percent Change',
  //   requiresTime: true,
  //   controlPanelSections: [
  //     sections.NVD3TimeSeries[0],
  //     {
  //       label: 'Chart Options',
  //       controlSetRows: [
  //         ['x_axis_format', 'y_axis_format'],
  //       ],
  //     },
  //     sections.NVD3TimeSeries[1],
  //   ],
  // },
  //
  // area: {
  //   label: 'Time Series - Stacked',
  //   requiresTime: true,
  //   controlPanelSections: [
  //     sections.NVD3TimeSeries[0],
  //     {
  //       label: 'Chart Options',
  //       controlSetRows: [
  //         ['show_brush', 'show_legend'],
  //         ['rich_tooltip', 'y_axis_zero'],
  //         ['y_log_scale', 'contribution'],
  //         ['x_axis_format', 'y_axis_format'],
  //         ['x_axis_showminmax', 'show_controls'],
  //         ['line_interpolation', 'stacked_style'],
  //       ],
  //     },
  //     sections.NVD3TimeSeries[1],
  //   ],
  // },

  table: {
    label: '数据交叉表',
    controlPanelSections: [
      {
        label: '汇总查询',
        description: '选择分组维度，以及计算指标',
        controlSetRows: [
          ['groupby', 'metrics'],
        ],
      },
      {
        label: '明细查询模式',
        description: '选择需要的明细数据列表',
        controlSetRows: [
          ['all_columns']
        ],
      },
      {
        label: '选项',
        controlSetRows: [
          ['row_limit', 'page_length'],
          [ 'include_search','include_time'],
        ],
      },
    ],
    controlOverrides: {
      metrics: {
        validators: [],
      },
      time_grain_sqla: {
        default: null,
      },
    },
  },

  // markup: {
  //   label: 'Markup',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['markup_type'],
  //         ['code'],
  //       ],
  //     },
  //   ],
  // },
  //
  pivot_table: {
    label: '透视图',
    controlPanelSections: [
      {
        label:  '选项',
        controlSetRows: [
          ['groupby', 'columns'],
          ['metrics', 'pandas_aggfunc'],
          ['pivot_margins', 'combine_metric'],

        ],
      },
    ],
    controlOverrides: {
      groupby: { includeTime: true },
      columns: { includeTime: true },
    },
  },
  //
  // separator: {
  //   label: 'Separator',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['code'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     code: {
  //       default: '####Section Title\n' +
  //                'A paragraph describing the section' +
  //                'of the dashboard, right before the separator line ' +
  //                '\n\n' +
  //                '---------------',
  //     },
  //   },
  // },
  //
  // word_cloud: {
  //   label: 'Word Cloud',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['series', 'metric', 'limit'],
  //         ['size_from', 'size_to'],
  //         ['rotation'],
  //       ],
  //     },
  //   ],
  // },
  //
  // treemap: {
  //   label: 'Treemap',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['metrics'],
  //         ['groupby'],
  //       ],
  //     },
  //     {
  //       label: 'Chart Options',
  //       controlSetRows: [
  //         ['treemap_ratio'],
  //         ['number_format'],
  //       ],
  //     },
  //   ],
  // },
  //
  // cal_heatmap: {
  //   label: 'Calendar Heatmap',
  //   requiresTime: true,
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['metric'],
  //         ['domain_granularity'],
  //         ['subdomain_granularity'],
  //       ],
  //     },
  //   ],
  // },
  //
  // box_plot: {
  //   label: 'Box Plot',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['metrics'],
  //         ['groupby', 'limit'],
  //       ],
  //     },
  //     {
  //       label: 'Chart Options',
  //       controlSetRows: [
  //         ['whisker_options'],
  //       ],
  //     },
  //   ],
  // },
  //
  // bubble: {
  //   label: 'Bubble Chart',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['series', 'entity'],
  //         ['x', 'y'],
  //         ['size', 'limit'],
  //       ],
  //     },
  //     {
  //       label: 'Chart Options',
  //       controlSetRows: [
  //         ['x_log_scale', 'y_log_scale'],
  //         ['show_legend'],
  //         ['max_bubble_size'],
  //         ['x_axis_label', 'y_axis_label'],
  //       ],
  //     },
  //   ],
  // },
  //
  // bullet: {
  //   label: 'Bullet Chart',
  //   requiresTime: false,
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['metric'],
  //         ['ranges', 'range_labels'],
  //         ['markers', 'marker_labels'],
  //         ['marker_lines', 'marker_line_labels'],
  //       ],
  //     },
  //   ],
  // },
  //
  // big_number: {
  //   label: 'Big Number with Trendline',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['metric'],
  //         ['compare_lag'],
  //         ['compare_suffix'],
  //         ['y_axis_format'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     y_axis_format: {
  //       label: 'Number format',
  //     },
  //   },
  // },
  //
  // big_number_total: {
  //   label: 'Big Number',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['metric'],
  //         ['subheader'],
  //         ['y_axis_format'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     y_axis_format: {
  //       label: 'Number format',
  //     },
  //   },
  // },
  //
  // histogram: {
  //   label: 'Histogram',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['all_columns_x'],
  //         ['row_limit'],
  //       ],
  //     },
  //     {
  //       label: 'Histogram Options',
  //       controlSetRows: [
  //         ['link_length'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     all_columns_x: {
  //       label: 'Numeric Column',
  //       description: 'Select the numeric column to draw the histogram',
  //     },
  //     link_length: {
  //       label: 'No of Bins',
  //       description: 'Select number of bins for the histogram',
  //       default: 5,
  //     },
  //   },
  // },
  //
  // sunburst: {
  //   label: 'Sunburst',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['groupby'],
  //         ['metric', 'secondary_metric'],
  //         ['row_limit'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     metric: {
  //       label: 'Primary Metric',
  //       description: 'The primary metric is used to define the arc segment sizes',
  //     },
  //     secondary_metric: {
  //       label: 'Secondary Metric',
  //       description: 'This secondary metric is used to ' +
  //                    'define the color as a ratio against the primary metric. ' +
  //                    'If the two metrics match, color is mapped level groups',
  //     },
  //     groupby: {
  //       label: 'Hierarchy',
  //       description: 'This defines the level of the hierarchy',
  //     },
  //   },
  // },
  //
  // sankey: {
  //   label: 'Sankey',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['groupby'],
  //         ['metric'],
  //         ['row_limit'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     groupby: {
  //       label: 'Source / Target',
  //       description: 'Choose a source and a target',
  //     },
  //   },
  // },
  //
  // directed_force: {
  //   label: 'Directed Force Layout',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['groupby'],
  //         ['metric'],
  //         ['row_limit'],
  //       ],
  //     },
  //     {
  //       label: 'Force Layout',
  //       controlSetRows: [
  //         ['link_length'],
  //         ['charge'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     groupby: {
  //       label: 'Source / Target',
  //       description: 'Choose a source and a target',
  //     },
  //   },
  // },
  //
  // world_map: {
  //         label: 'World Map',
  //         controlPanelSections: [
  //             {
  //                 label: null,
  //                 controlSetRows: [
  //                     ['entity'],
  //                     ['country_fieldtype'],
  //                     ['metric'],
  //                 ],
  //             },
  //             {
  //                 label: 'Bubbles',
  //                 controlSetRows: [
  //                     ['show_bubbles'],
  //                     ['secondary_metric'],
  //                     ['max_bubble_size'],
  //                 ],
  //             },
  //         ],
  //         controlOverrides: {
  //             entity: {
  //                 label: 'Country Control',
  //                 description: '3 letter code of the country',
  //             },
  //             metric: {
  //                 label: 'Metric for color',
  //                 description: 'Metric that defines the color of the country',
  //             },
  //             secondary_metric: {
  //                 label: 'Bubble size',
  //                 description: 'Metric that defines the size of the bubble',
  //             },
  //         },
  // },
  //
  // filter_box: {
  //   label: 'Filter Box',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['date_filter', 'instant_filtering'],
  //         ['groupby'],
  //         ['metric'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     groupby: {
  //       label: 'Filter controls',
  //       description: 'The controls you want to filter on',
  //       default: [],
  //     },
  //   },
  // },
  //
  // iframe: {
  //   label: 'iFrame',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['url'],
  //       ],
  //     },
  //   ],
  // },
  //
  // para: {
  //   label: 'Parallel Coordinates',
  //   controlPanelSections: [
  //     {
  //       label: null,
  //       controlSetRows: [
  //         ['series'],
  //         ['metrics'],
  //         ['secondary_metric'],
  //         ['limit'],
  //         ['show_datatable', 'include_series'],
  //       ],
  //     },
  //   ],
  // },
  //
  // heatmap: {
  //   label: 'Heatmap',
  //   controlPanelSections: [
  //     {
  //       label: 'Axis & Metrics',
  //       controlSetRows: [
  //         ['all_columns_x'],
  //         ['all_columns_y'],
  //         ['metric'],
  //       ],
  //     },
  //     {
  //       label: 'Heatmap Options',
  //       controlSetRows: [
  //         ['linear_color_scheme'],
  //         ['xscale_interval', 'yscale_interval'],
  //         ['canvas_image_rendering'],
  //         ['normalize_across'],
  //       ],
  //     },
  //   ],
  // },
  //
  // horizon: {
  //   label: 'Horizon',
  //   controlPanelSections: [
  //     sections.NVD3TimeSeries[0],
  //     {
  //       label: 'Chart Options',
  //       controlSetRows: [
  //         ['series_height', 'horizon_color_scale'],
  //       ],
  //     },
  //   ],
  // },
  //
  mapbox: {
    label: '地图',
    controlPanelSections: [
      {
        label: null,
        controlSetRows: [
          ['all_columns_x', 'all_columns_y'],
          ['clustering_radius'],
          ['row_limit'],
          ['groupby'],
          ['render_while_dragging'],
        ],
      },
      {
        label: '单点',
        controlSetRows: [
          ['point_radius'],
          ['point_radius_unit'],
        ],
      },
      {
        label: '汽包点',
        controlSetRows: [
          ['mapbox_label'],
          ['pandas_aggfunc'],
        ],
      },
      {
        label: '地图选项',
        controlSetRows: [
          ['mapbox_style'],
          ['global_opacity'],
          ['mapbox_color'],
        ],
      },
      {
        label: '视角',
        controlSetRows: [
          ['viewport_longitude'],
          ['viewport_latitude'],
          ['viewport_zoom'],
        ],
      },
    ],
    controlOverrides: {
      all_columns_x: {
        label: '经度',
        description: '经度字段',
      },
      all_columns_y: {
        label: '维度',
        description: '维度字段',
      },
      pandas_aggfunc: {
        label: '气泡点汇总方法',
        description: '气泡点数值汇总方法',
      },
      rich_tooltip: {
        label: '工具',
        description: 'Show a tooltip when hovering over points and clusters ' +
                     'describing the label',
      },
      groupby: {
        description: '按数据分组，经纬度字段必须包括',
      },
    },
  },

  // event_flow: {
  //   label: 'Event flow',
  //   requiresTime: true,
  //   controlPanelSections: [
  //     {
  //       label: 'Event definition',
  //       controlSetRows: [
  //         ['entity'],
  //         ['all_columns_x'],
  //         ['row_limit'],
  //         ['order_by_entity'],
  //         ['min_leaf_node_event_count'],
  //       ],
  //     },
  //     {
  //       label: 'Additional meta data',
  //       controlSetRows: [
  //         ['all_columns'],
  //       ],
  //     },
  //   ],
  //   controlOverrides: {
  //     entity: {
  //       label: 'Column containing entity ids',
  //       description: 'e.g., a "user id" column',
  //     },
  //     all_columns_x: {
  //       label: 'Column containing event names',
  //       validators: [v.nonEmpty],
  //       default: control => (
  //         control.choices && control.choices.length > 0 ?
  //           control.choices[0][0] : null
  //       ),
  //     },
  //     row_limit: {
  //       label: 'Event count limit',
  //       description: 'The maximum number of events to return, equivalent to number of rows',
  //     },
  //     all_columns: {
  //       label: 'Meta data',
  //       description: 'Select any columns for meta data inspection',
  //     },
  //   },
  // },
  //   chord: {
  //       label: 'Chord Diagram',
  //       controlPanelSections: [
  //           {
  //               label: null,
  //               controlSetRows: [
  //                   ['groupby', 'columns'],
  //                   ['metric'],
  //                   ['row_limit', 'y_axis_format'],
  //               ],
  //           },
  //       ],
  //       controlOverrides: {
  //           y_axis_format: {
  //               label: 'Number format',
  //               description: 'Choose a number format',
  //           },
  //           groupby: {
  //               label: 'Source',
  //               multi: false,
  //               validators: [v.nonEmpty],
  //               description: 'Choose a source',
  //           },
  //           columns: {
  //               label: 'Target',
  //               multi: false,
  //               validators: [v.nonEmpty],
  //               description: 'Choose a target',
  //           },
  //       },
  //   },
};

export default visTypes;

export function sectionsToRender(vizType, datasourceType) {
  const viz = visTypes[vizType];
  return [].concat(
    sections.datasourceAndVizType,
    // datasourceType === 'table' ? sections.sqlaTimeSeries : sections.druidTimeSeries,
    datasourceType === 'table' ? sections.TableTimeSeries : sections.druidTimeSeries,
    datasourceType === 'table' ? sections.TableTimePick : sections.druidTimeSeries,
    datasourceType === 'table' ? sections.TableTimeText : sections.druidTimeSeries,
    viz.controlPanelSections,
    datasourceType === 'table' ? sections.filters[0] : sections.filters,
  );
}
