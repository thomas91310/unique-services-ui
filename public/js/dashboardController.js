function dashboardController($scope) {

      $scope.chartConfig = {
        options: {
            chart: {
                type: 'line'
            }
        },
        title: {
            text: $scope.title,
            x: -20 //center
        },
        subtitle: {
            text: $scope.subtitle,
            x: -20
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Hours'
            },
            type: 'datetime',
            dateTimeLabelFormats : {
                hour: '%H:%M'
            }
        },
        yAxis: {
            title: {
                text: $scope.titleyAxis
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        tooltip: {
            valueSuffix: '°C'
        },
        series: [{
            name: 'Loads',
            data: [
                [Date.UTC(2014, 4, 12, 6, 37), 37],
                [Date.UTC(2014, 4, 12, 7, 37), 44],
                [Date.UTC(2014, 4, 12, 8, 37), 45],
                [Date.UTC(2014, 4, 12, 9, 37), 62],
                [Date.UTC(2014, 4, 12, 10, 37), 77],
                [Date.UTC(2014, 4, 12, 11, 37), 83],
                [Date.UTC(2014, 4, 12, 12, 37), 100],
                [Date.UTC(2014, 4, 12, 13, 37), 116],
                [Date.UTC(2014, 4, 12, 14, 37), 122],
                [Date.UTC(2014, 4, 12, 15, 37), 132],
                [Date.UTC(2014, 4, 12, 16, 37), 0],
                [Date.UTC(2014, 4, 12, 17, 37), 0]
            ]
        }, {
            name: 'Uniques',
            data: [
                [Date.UTC(2014, 4, 12, 6, 37), 58],
                [Date.UTC(2014, 4, 12, 7, 37), 69],
                [Date.UTC(2014, 4, 12, 8, 37), 72],
                [Date.UTC(2014, 4, 12, 9, 37), 98],
                [Date.UTC(2014, 4, 12, 10, 37), 111],
                [Date.UTC(2014, 4, 12, 11, 37), 121],
                [Date.UTC(2014, 4, 12, 12, 37), 143],
                [Date.UTC(2014, 4, 12, 13, 37), 163],
                [Date.UTC(2014, 4, 12, 14, 37), 172],
                [Date.UTC(2014, 4, 12, 15, 37), 188],
                [Date.UTC(2014, 4, 12, 16, 37), 213],
                [Date.UTC(2014, 4, 12, 17, 37), 219]
            ]
        }],
        loading: false
    }

    $scope.title = "Pixel Data ";
    $scope.subtitle = "";
    $scope.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.titleyAxis = "";

   $scope.addSeries = function (name, rnd) {
        $scope.chartConfig.series.push({
            name: name,
            data: rnd
        })
    }

    $scope.addSeries('Loads',
                [Date.UTC(2014, 4, 12, 6, 37), 0],
                [Date.UTC(2014, 4, 12, 7, 37), 0],
                [Date.UTC(2014, 4, 12, 8, 37), 0],
                [Date.UTC(2014, 4, 12, 9, 37), 0],
                [Date.UTC(2014, 4, 12, 10, 37), 0],
                [Date.UTC(2014, 4, 12, 11, 37), 0],
                [Date.UTC(2014, 4, 12, 12, 37), 100],
                [Date.UTC(2014, 4, 12, 13, 37), 116],
                [Date.UTC(2014, 4, 12, 14, 37), 122],
                [Date.UTC(2014, 4, 12, 15, 37), 132],
                [Date.UTC(2014, 4, 12, 16, 37), 0],
                [Date.UTC(2014, 4, 12, 17, 37), 0]);

    $scope.$on('updateSeries', function (event, args) {
       var passedData = args.data;
       var options = args.options;
       $scope.setSeries(passedData, options);
    });


    $scope.setSeries = function(passedData, options) {
        var now = moment.utc();
        series = [];
        dataLoads = [];
        dataUniques = [];
        for (var i = 0; i < passedData.length; i++ ) {
            load = [];
            unique = [];
            load[0] = passedData[i].datetime;
            load[1] = passedData[i].loads;
            unique[0] = passedData[i].datetime;
            unique[1] = passedData[i].uniques;
            dataUniques.push(unique);
            dataLoads.push(load);     
        }
        
        $scope.addSeries("Loads", dataLoads);
        $scope.addSeries("Uniques", dataUniques);
    }
}


//MOM STUFF


 /*   for (var i = 0; i < 48; i++) {
            var mom = now.subtract(1, 'hours');
            console.log("year :", mom.years());
            console.log("month : ", mom.months());
            console.log("hour : ", mom.hours());
            console.log("minutes", mom.minutes());
            var minutes = 0;

            series.push(Date.UTC(mom.years(), mom.months(), mom.days(), mom.hours(), 0));
            now = mom;
        } */