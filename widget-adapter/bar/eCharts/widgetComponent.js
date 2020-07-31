function widgetData(jsonData) {
    return $.getJSON(jsonData).then(function (data) {
        let axisXName = [];
        let axisYName = [];
        let widgetBrand = [ECharts, DX, D3];
        let widgetType = [];
        let widgetLegend = [];

        data.forEach(function (dataVal, index) {
            dataVal.series.forEach(function(val, key) {
                axisXName[key] = val.axisXName;
                axisYName[key] = val.axisYName;
                widgetBrand[key] = val.widgetBrand;
                widgetType[key] = val.widgetType;
                widgetLegend[key] = val.widgetLegend
            });

            function nameAxisX(axisXName, widgetBrand) {
                if (widgetBrand == EChart) {
                    nameX = axisXName;
                }
            }

            console.log(nameAxisX());

            function nameAxisY(axisYName, widgetBrand) {
                if (widgetBrand == ECharts) {
                    nameY = axisYName;
                }
            }

            console.log(nameAxisY());

            function chartType(widgetType, widgetBrand) {
                if (widgetBrand == ECharts) {
                    type = widgetType
                }
            }

            console.log(chartType());

            function chartLegend(widgetLegend, widgetBrand) {
                if (widgetBrand == ECharts) {
                    legend = widgetLegend
                }
            }

            console.log(chartLegend());
        });

        var returnData = {
            axisXName: axisXName,
            axisYName: axisYName,
            widgetBrand: widgetBrand,
            widgetType: widgetType,
            widgetLegend: widgetLegend
        };
        console.log(returnData);
        return returnData;

    });
}
