UniqueServicesClient = {

  config: {
    uniquesHost: 'https://t1.mediamath.com/uniques/v1',
    t1apiHost: 'https://t1.mediamath.com/api/v1'
  },

  getSegments: function(options, callback) {

    var segment = options.segmentName + ":" + options.id;

    var response = function(data) {
      callback(data);
    } 

    $.ajax([UniqueServicesClient.config.uniquesHost, 'segments', segment, 'stats', options.frequence].join('/'), {
      type:    'GET',
      success: response,
      error:   response
    });
  },

  getPixels: function(options, callback) {

    var url = [UniqueServicesClient.config.uniquesHost, 'pixels', options.id, 'stats', options.frequence].join('/');
    if (options.fromDate != undefined || options.untilDate != undefined)
      url = url + "?start_date=" + options.fromDate + "&end_date=" + options.untilDate;

    var response = function(data) {
      callback(data);
    }

    $.ajax(url, {
      type:    'GET',
      success: response,
      error: response
    });
  },

  getImpressions: function(options, callback) {

    var impression = options.organizationId + ':' + options.strategyId + ':' + options.exchangeId;

    var response = function(data) {
      callback(data);
    }

    $.ajax([UniqueServicesClient.config.uniquesHost, 'impressions', impression, 'stats', options.frequence].join('/'), {
      type:    'GET',
      success: response,
      error:   response
    });
  }


};

