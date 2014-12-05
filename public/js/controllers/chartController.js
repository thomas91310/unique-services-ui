function chartController($scope) {

    $scope.now = moment();

    $scope.addSeries = function (name, data) {
        console.log("name : ", name);
        console.log("data : ", data);
        $scope.highchartsNG.series.push({
            name: name,
            data: data
        });
        console.log($scope.highchartsNG.series);
    }

    $scope.removeSeries = function () {
        $scope.highchartsNG.series = [];
        console.log($scope.highchartsNG.series);
    }

    $scope.options = {
        type: 'line'
    }

    // $scope.swapChartType = function () {
    //     if (this.highchartsNG.options.chart.type === 'line') 
    //         this.highchartsNG.options.chart.type = 'column'
    //     else 
    //         this.highchartsNG.options.chart.type = 'line'
    // }

    $scope.highchartsNG = {
        options: {
            chart: {
                type: 'line'
            }
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Hours'
            },
            type: 'datetime'
        },
        yAxis: {
            title: {
                enabled: true,
                text: 'Loads / Uniques'
            }
        },
        series: [],
        title: {
            text: 'Loads / Uniques'
        },
        loading: false
    }

    $scope.buildAndAddData = function(passedData, options) {
        var dataLoads = [];
        var dataUniques = [];
        var now = moment().utc();
        var _2daysAgo = moment().utc().subtract(2, 'days');
        var indexPassedData = 0;
        if (options.frequence == "hourly") {
            $scope.highchartsNG.options.chart.type = 'line';
            $scope.highchartsNG.xAxis = {};
            $scope.highchartsNG.xAxis.title = "Hours";
            $scope.highchartsNG.xAxis.type = "datetime";
            var mom = _2daysAgo;
            var dateIndexPassedData = 0;
            for (var i = 0; i < 48; i++) {
                if (indexPassedData < passedData.length) 
                    dateIndexPassedData = moment(passedData[indexPassedData].datetime);
                else
                    dateIndexPassedData = moment(0); //fake anterior date. (1970) to continue looping even if there are no more items in the data sent back by the API.
                if ($scope.areSameDates(dateIndexPassedData, mom)) { 
                    dataLoads.push([Date.UTC(mom.year(), mom.months(), mom.date(), mom.hours()), passedData[indexPassedData].loads]);
                    dataUniques.push([Date.UTC(mom.year(), mom.months(), mom.date(), mom.hours()), passedData[indexPassedData].uniques]);
                    indexPassedData++;
                } else {
                    dataLoads.push([Date.UTC(mom.year(), mom.months(), mom.date(), mom.hours()), 0]);
                    dataUniques.push([Date.UTC(mom.year(), mom.months(), mom.date(), mom.hours()), 0]);
                }
                mom = _2daysAgo.add(1, 'hours');
            }
            $scope.removeSeries();
            $scope.addSeries("Loads", dataLoads);
            $scope.addSeries("Uniques", dataUniques);
            $scope.$apply();
        } else if (options.frequence == "total") {
            $scope.highchartsNG.options.chart.type = 'column';
            $scope.highchartsNG.xAxis = {};
            $scope.highchartsNG.xAxis = { categories : ['Total'] };
            $scope.highchartsNG.xAxis.type = "";
            $scope.highchartsNG.yAxis.title = "Total Loads/Uniques";
            $scope.removeSeries();
            $scope.addSeries("Loads", [passedData[0].loads]);
            $scope.addSeries("Uniques", [passedData[0].uniques]);
            $scope.$apply();
        } else if (options.frequence == "daily") {
            $scope.highchartsNG.xAxis = {};
            $scope.highchartsNG.options.chart.type = 'line';
            $scope.highchartsNG.xAxis.title = "Days";
            $scope.highchartsNG.xAxis.type = "datetime";
            var dataLoads = [];
            var dataUniques = [];
            var now = moment().utc();
            var _30daysAgo = moment().utc().subtract(30, 'days');
            mom = _30daysAgo;
            var indexPassedData = 0;
            if (options.fromDate == undefined || options.untilDate == undefined) {
                //get 30 days of data by default
                for (var i = 0; i < 30; i++) {
                    if (indexPassedData < passedData.length)
                        dateIndexPassedData = moment(passedData[indexPassedData].date); //date current API object
                    else
                        dateIndexPassedData = moment(0); //fake anterior date. (1970) to continue looping even if there are no more items in the data sent back by the API.
                    if ($scope.areSameDays(dateIndexPassedData, mom)) { 
                        dataLoads.push([Date.UTC(mom.year(), mom.months(), mom.date()), passedData[indexPassedData].loads]);
                        dataUniques.push([Date.UTC(mom.year(), mom.months(), mom.date()), passedData[indexPassedData].uniques]);
                        indexPassedData++;
                    } else {
                        dataLoads.push([Date.UTC(mom.year(), mom.months(), mom.date()), 0]);
                        dataUniques.push([Date.UTC(mom.year(), mom.months(), mom.date()), 0]);
                    }
                    mom = _30daysAgo.add(1, 'days');
                }
                $scope.removeSeries();
                $scope.addSeries("Loads", dataLoads);
                $scope.addSeries("Uniques", dataUniques);
                $scope.$apply();
            } else {
                var fromDate = moment(options.fromDate);
                var untilDate = moment(options.untilDate);
                var _45daysAgo = untilDate.subtract(45, 'days');
                if (fromDate > _45daysAgo) {
                    //it's ok 
                    $scope.highchartsNG.xAxis = {};
                    $scope.highchartsNG.options.chart.type = 'line';
                    $scope.highchartsNG.xAxis.title = "Days";
                    $scope.highchartsNG.xAxis.type = "datetime";
                    var dataLoads = [];
                    var dataUniques = [];
                    var indexPassedData = 0;
                    var currentMom = fromDate;
                    var lastMom = untilDate;
                    var now = moment();
                    console.log("current : ", currentMom);
                    console.log(lastMom.unix());
                    console.log("until ", lastMom);
                    console.log(lastMom.unix());
                    //problem here
                    
                    while (currentMom.isBefore(untilDate)) {
                        console.log("HEYYYYY");
                        if (indexPassedData < passedData.length) 
                            dateIndexPassedData = moment(passedData[indexPassedData].date); //date current API object
                        else
                            dateIndexPassedData = moment(0); //fake anterior date. (1970) to continue looping even if there are no more items in the data sent back by the API.
                        if ($scope.areSameDays(dateIndexPassedData, currentMom)) { 
                            dataLoads.push([Date.UTC(currentMom.year(), currentMom.months(), currentMom.date()), passedData[indexPassedData].loads]);
                            dataUniques.push([Date.UTC(currentMom.year(), currentMom.months(), currentMom.date()), passedData[indexPassedData].uniques]);
                            indexPassedData++;
                        } else {
                            dataLoads.push([Date.UTC(currentMom.year(), currentMom.months(), currentMom.date()), 0]);
                            dataUniques.push([Date.UTC(currentMom.year(), currentMom.months(), currentMom.date()), 0]);
                        }
                        currentMom = currentMom.add(1, 'days');
                    }
                    $scope.removeSeries();
                    $scope.addSeries("Loads", dataLoads);
                    $scope.addSeries("Uniques", dataUniques);
                    $scope.$apply();
                } else {
                    //we don't accept and we return an error

                }
                //parse data
                //remove series
                //add to series
            } 
        }
    }

    $scope.$on('updateSeries', function (event, args) {
       var passedData = args.data;
       var options = args.options;
       $scope.buildAndAddData(passedData, options);
    });

    $scope.areSameDays = function(dateAPI, dateLoop) {
        console.log("dateAPI : y : ", dateAPI.year(), " m :", dateAPI.months(), "d : ", dateAPI.date());
        console.log("dateLoop : y : ", dateLoop.year(), " m :", dateLoop.months(), "d : ", dateLoop.date());
        console.log("date Loop :", dateLoop);
        if (dateAPI.year() == dateLoop.year() && dateAPI.months() == dateLoop.months() && dateAPI.date() == dateLoop.date()) 
            return true;
        else 
            return false;
    }

    $scope.areSameDates = function(dateAPI, dateLoop) {
        if (dateAPI.year() == dateLoop.year() && dateAPI.months() == dateLoop.months() && dateAPI.date() == dateLoop.date() && dateAPI.hours() == dateLoop.hours())
            return true;
        else 
            return false;
    };
};