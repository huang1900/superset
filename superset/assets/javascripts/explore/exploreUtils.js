/* eslint camelcase: 0 */
import URI from 'urijs';

export function getExploreUrl(form_data, endpointType = 'base', force = false,
  curUrl = null, requestParams = {}) {
  if (!form_data.datasource) {
    return null;
  }


  // The search params from the window.location are carried through,
  // but can be specified with curUrl (used for unit tests to spoof
  // the window.location).
  let uri = URI(window.location.search);
  if (curUrl) {
    uri = URI(URI(curUrl).search());
  }

  // Building the directory part of the URI
  let directory = '/superset/explore/';
  if (['json', 'csv', 'query'].indexOf(endpointType) >= 0) {
    directory = '/superset/explore_json/';
  }
  const [datasource_id, datasource_type] = form_data.datasource.split('__');
  directory += `${datasource_type}/${datasource_id}/`;

  // Building the querystring (search) part of the URI
  const search = uri.search(true);
  search.form_data = JSON.stringify(form_data);
  if (force) {
    search.force = 'true';
  }
  if (endpointType === 'csv') {
    search.csv = 'true';
  }
  if (endpointType === 'standalone') {
    search.standalone = 'true';
  }
  if (endpointType === 'query') {
    search.query = 'true';
  }
  const paramNames = Object.keys(requestParams);
  if (paramNames.length) {
    paramNames.forEach((name) => {
      if (requestParams.hasOwnProperty(name)) {
        search[name] = requestParams[name];
      }
    });
  }
  uri = uri.search(search).directory(directory);
  return uri.toString();
}
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}