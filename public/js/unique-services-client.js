UniqueServicesClient = {

  config: {
    uniquesHost: 'https://t1.mediamath.com/uniques/v1',
    t1apiHost: 'https://t1.mediamath.com/api/v1'
  },

  endSession: function(options) {
    //logout
  },

  startSession: function(options, callback) { 
    //login
  },

  getSegments: function(options, callback) {

    var response = function(data) {
      callback(data);
    }

    $.ajax([UniqueServicesClient.config.uniquesHost, 'segments', options.idSegment, 'stats', options.frequence].join('/'), {
      type:    'GET',
      success: response,
      error:   response
    });
  },

  getPixels: function(options, callback) {

    console.log(options);

    var response = function(data) {
      callback(data);
    }

    $.ajax([UniqueServicesClient.config.uniquesHost, 'pixels', options.id, 'stats', options.frequence].join('/'), {
      type:    'GET',
      success: response,
      error: response
    });
  },

  getOrgIdFromStrategyId: function(strategyId, callback) {

    var response = function(data) {
      callback(data);
    }

    $.ajax([UniqueServicesClient.config.t1apiHost, 'pixels', options.idPixel, 'stats', options.frequence].join('/'), {
      type:    'GET',
      success: response,
      error:   response
    });
  },

  getImpressions: function(options, callback) {

    parameter = options.organizationId + ':' + options.strategyId + ':' + options.exchangeId;

    var response = function(data) {
      callback(data);
    }

    $.ajax([UniqueServicesClient.config.uniquesHost, 'impressions', parameter, 'stats', options.frequence].join('/'), {
      type:    'GET',
      success: response,
      error:   response
    });
  }


};

