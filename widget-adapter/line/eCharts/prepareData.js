var settings, resultAnalytData, widgetJson, filteredData;

function prepareData() {

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var wid = urlParams.get('wid');
    //wid = '32027938-35c5-4781-9277-b6d94d252c53';


    return $.getJSON(IP_TO_WIDGET_CORE + wid).then(function (widgetData) {
        widgetJson = widgetData;
        //console.log(widgetData);
        settings = widgetJson.widgetOptions;
        return $.getJSON(IP_TO_ANALYT_QUERY_CORE + widgetJson.analytQueryID + '/result').then(function (resultList) {
            //console.log(resultList);
            resultId = resultList.resultIdFinal;

            // !!!!!!!! Метод отвечающий за формирование данных необходимых конкретному компоненту
            return $.getJSON(IP_TO_RESULT_ANALYT_QUERY_CORE + resultId).then(function (resultData) {
                resultAnalytData = resultData;
                //console.log(resultAnalytData);

                filteredData = resultData.tableData.series;


                function filterItems(dimensionName, dimensionValue) {
                    return filteredData.filter(function (el) {
                        return dimensionValue.indexOf(el[dimensionName]) !== -1;
                    })
                }

                settings.tooltipDimensions.forEach(function (dimensionName, index) {
                    if (urlParams.has(dimensionName)) {
                        var dimensionValue = urlParams.get(dimensionName);
                        if (dimensionValue[0] !== "[") {
                            filteredData = filterItems(dimensionName, dimensionValue);
                        } else {
                            var paramString = dimensionValue.substring(1, dimensionValue.length - 1);
                            var dimensionValues = paramString.split(",");
                            resultData = [];
                            dimensionValues.forEach(function (dimVal, i) {
                                resultData = resultData.concat(filterItems(dimensionName, dimVal));
                            });
                            filteredData = resultData;
                        }

                        //console.log(filteredData);
                    }
                });


            });
        });
    });
}