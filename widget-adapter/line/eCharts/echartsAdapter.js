function formatData(jsonUrl) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);


    return $.getJSON(jsonUrl).then(function (data) {
        tooltipData = data;
        //todo заполнять легенду названиями серий
        let legendDataNames = [];
        let series = [];
        let xAxis = [];
        var unformatteData = data.tableData.series;
        var seriesDataValues = [];
        console.log(data);
        var filteredData = data.tableData.series;


        function filterItems(dimensionName, dimensionValue) {
            return filteredData.filter(function (el) {
                return dimensionValue.indexOf(el[dimensionName]) !== -1;
            })
        }

        function filterItemsRange(dimensionName, dimensionValueFrom, dimensionValueTo) {
            return filteredData.filter(function (el) {
                return (dimensionValueFrom <= el[dimensionName] && dimensionValueTo >= el[dimensionName]);
            })
        }

        data.tableColumns.forEach(function (dimensionName, index) {
            if (urlParams.has(dimensionName.key)) {
                var dimensionValue = urlParams.get(dimensionName.key);
                switch (dimensionValue[0]) {
                    case "[":
                        var paramString = dimensionValue.substring(1, dimensionValue.length - 1);
                        var dimensionValues = paramString.split(",");
                        resultData = [];
                        dimensionValues.forEach(function (dimVal, i) {
                            resultData = resultData.concat(filterItems(dimensionName.key, dimVal));
                        });
                        filteredData = resultData;
                        break;
                    case "$":
                        var paramString = dimensionValue.substring(1, dimensionValue.length);
                        var dimensionValues = paramString.split(":");
                        filteredData = filterItemsRange(dimensionName.key, dimensionValues[0], dimensionValues[1]);
                        console.log(dimensionValues, filteredData);
                        break;
                    default:
                        filteredData = filterItems(dimensionName.key, dimensionValue);
                        break;
                }
                console.log(filteredData);
            }
        });


        //Формируем массив Иксов и Значений серий
        filteredData.forEach(function (seria, index) {
            if (settings.customDimension == null) {
                console.log(settings.timeDimensionGranularity);
                switch (seria[settings.timeDimensionGranularity]) {
                    case "day":
                        xAxis[index] = moment(seria[settings.timeDimension]).format("YYYY-MM-DD");
                        break;
                    case "month":
                        xAxis[index] = moment(seria[settings.timeDimension]).format("YYYY-MM");
                        break;
                    case "year":
                        xAxis[index] = moment(seria[settings.timeDimension]).format("YYYY");
                        break;
                    default:
                        xAxis[index] = seria[settings.timeDimension];
                        break;
                }
            } else {
                xAxis[index] = seria[settings.customDimension];
            }
            settings.series.forEach(function (value, ind) {
                if (typeof seriesDataValues[value] == 'undefined') {
                    seriesDataValues[value] = [];
                }
                if (seria[value] == null) {
                    seriesDataValues[value][index] = 0;
                } else {
                    seriesDataValues[value][index] = seria[value];
                }
            });
        });

        function getPair(dimension, dimensionValue, filteredData) {
            var sdv = [], xAx = [];
            filteredData.forEach(function (seria, index) {
                var indexOfX = xAx.indexOf(seria[dimension]);
                if (indexOfX === -1) {
                    xAx.push(seria[dimension]);
                    if (seria[dimensionValue] == null) {
                        sdv.push(0);
                    } else {
                        sdv.push(seria[dimensionValue]);
                    }
                } else {
                    if (sdv[indexOfX] === 0 && seria[dimensionValue] !== null) {
                        sdv[indexOfX] = seria[dimensionValue];
                    }
                }
            });
            var result = [];
            result['xAxis'] = xAx;
            result[dimensionValue] = sdv;
            console.log(result);
            return result;
        }

        //Формируем серии для компонента графика @todo нужно брать имена на русском они в объекте data tableColumns есть

        function getRussianName(key, dataArray) {
            dataArray.forEach(function (value, index) {
                if (value.key === key) {
                    result = value.titleRus
                }
            })
            return result
        }

        settings.series.forEach(function (value, ind) {
            var russianName = getRussianName(value, data.tableColumns);
            var dataValues = getPair(settings.customDimension, value, filteredData);
            xAxis = dataValues['xAxis'];
            series[ind] = {
                name: russianName,
                data: dataValues[value],
                type: 'line',
                symbol: settings.seriesSymbol,
                symbolSize: settings.seriesSymbolSize,
                lineStyle: {
                    type: settings.seriesLineStyleType
                }
            };
            legendDataNames[ind] = russianName;
        });
        var returnData = {
            legendDataNames: legendDataNames,
            series: series,
            xAxis: xAxis,
            unformatteData: filteredData
            //unformatteData: unformatteData
        };
        console.log(returnData);
        return returnData;
    });
}
