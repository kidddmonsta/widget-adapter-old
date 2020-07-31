var settings, resultAnalytData, widgetJson, filteredData;

function prepareData() {

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var wid = urlParams.get('wid');
    //wid = '32027938-35c5-4781-9277-b6d94d252c53';


    return $.getJSON(IP_TO_WIDGET_CORE + wid).then(function (widgetData) {
        widgetJson = widgetData;
        $("#title").text(widgetData.widgetProperties.title);
        console.log("WD", widgetData);
        settings = widgetJson.widgetOptions;
        return $.getJSON(IP_TO_ANALYT_QUERY_CORE + widgetJson.analytQueryID + '/result').then(function (resultList) {
            //console.log(resultList);
            resultId = resultList.resultIdFinal;

            // !!!!!!!! Метод отвечающий за формирование данных необходимых конкретному компоненту
            return $.getJSON(IP_TO_RESULT_ANALYT_QUERY_CORE + resultId).then(function (resultData) {
                resultAnalytData = resultData;
                console.log("RAD", resultAnalytData);

                filteredData = resultAnalytData.tableData.series;


                function filterItems(dimensionName, dimensionValue) {
                    return filteredData.filter(function (el) {
                        return dimensionValue === el[dimensionName];
                    })
                }
                function filterItemsRange(dimensionName, dimensionValueFrom, dimensionValueTo) {
                    return filteredData.filter(function (el) {
                        return (dimensionValueFrom <= el[dimensionName] && dimensionValueTo >= el[dimensionName]);
                    })
                }
                resultAnalytData.tableColumns.forEach(function (dimensionName, index) {
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

                        console.log("filtered table data", filteredData);
                    }
                });

            });
        });
    });
}