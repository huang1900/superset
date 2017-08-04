export const STATE_BSSTYLE_MAP = {
  failed: 'danger',
  pending: 'info',
  fetching: 'info',
  running: 'warning',
  stopped: 'danger',
  success: 'success',
};

export const STATUS_OPTIONS = [
  'success',
  'failed',
  'running',
];

export const TIME_OPTIONS = [
  'now',
  '1 hour ago',
  '1 day ago',
  '7 days ago',
  '28 days ago',
  '90 days ago',
  '1 year ago',
];

export const VISUALIZE_VALIDATION_ERRORS = {
  REQUIRE_CHART_TYPE: '请选则一种图表类型!',
  REQUIRE_TIME: '请至设置一个字段为时间类型',
  REQUIRE_DIMENSION: '请至少设置一个维度',
  REQUIRE_AGGREGATION_FUNCTION: '请至少设置一个汇总函数',
};
