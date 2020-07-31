function render(blockId) {
    prepareData().then(function () {
        $.getJSON('widgetOptions.json').then(function (widgetOptions) {
            if ('showColumnLines' in settings === false) {
                settings = widgetOptions;
                console.log("use default settings");
            }

            var columns = [];
            resultAnalytData.tableColumns.forEach(function (column, index) {
                if (column.key !== "")
                    columns.push({
                        dataField: column.key,
                        caption: column.titleRus
                        //alignment: settings.columnsAlignment
                    })
            })

            console.log(filteredData);
            console.log(columns);

            var pivotGrid = $(blockId).dxPivotGrid({
                allowFiltering: settings.allowFiltering,
                allowSorting: settings.allowSorting,
                allowExpandAll: settings.allowExpandAll,
                allowSortingBySummary: settings.allowSortingBySummary,
                height: settings.height,
                showBorders: settings.showBorders,
                showColumnGrandTotals: settings.showColumnGrandTotals,
                showRowGrandTotals: settings.showRowGrandTotals,
                showRowTotals: settings.showRowTotals,
                showColumnTotals: settings.showColumnTotals,
                //columns: columns,
                headerFilter: {
                    allowSearch: settings.headerFilterAllowSearch,
                    showRelevantValues: settings.headerFilterShowRelevantValues,
                    width: settings.headerFilterWidth,
                    height: settings.headerFilterHeight
                },
                fieldChooser: {
                    enabled: settings.fieldChooserEnabled,
                    allowSearch: settings.fieldChooserAllowSearch
                },
                fieldPanel: {
                    showFilterFields: settings.fieldPanelShowFilterFields,
                    allowFieldDragging: settings.fieldPanelAllowFieldDragging,
                    visible: settings.fieldPanelVisible
                },
                //dataSource: filteredData,
                onContextMenuPreparing: function (e) {
                    console.log(e);
                    var dataSource = e.component.getDataSource();
                    console.log(dataSource.fields());
                    var fields = dataSource.fields();
                    console.log(fields[e.field.index].area);
                    if (fields[e.field.index].area === "data") {
                        $.each(summaryTotalTypes, function (_, summaryTotalType) {
                            var summaryTotalTypeValue = summaryTotalType.value;

                            e.items.push({
                                text: summaryTotalType.text,
                                selected: e.field.summaryTotalType === summaryTotalTypeValue,
                                onItemClick: function () {
                                    dataSource.field(e.field.index, {
                                        summaryType: summaryTotalTypeValue
                                        //format: format,
                                        //caption: caption
                                    });

                                    dataSource.load();
                                }
                            });
                        });
                    }
                },
                dataSource: {
                    fields: columns,
                    store: filteredData
                },
                allowColumnReordering: settings.allowColumnReordering,
                grouping: {
                    autoExpandAll: settings.groupingAutoExpandAll
                },
                searchPanel: {
                    visible: settings.searchPanelVisible
                },
                paging: {
                    pageSize: settings.pagingPageSize
                },
                groupPanel: {
                    visible: settings.groupPanelVisible
                }, stateStoring: {
                    enabled: true,
                    type: "localStorage",
                    storageKey: "dx-widget-gallery-pivotgrid-storing"
                },
            }).dxPivotGrid("instance");
        });
    });

    var summaryTotalTypes = [
        {text: "None", value: "none"},
        {text: "Average", value: "avg"},
        {text: "Sum", value: "sum"},
        {text: "Minimum", value: "min"},
        {text: "Maximum", value: "max"},
        {text: "Count", value: "count"}
        /*{ text: "Absolute Variation", value: "absoluteVariation" },
        { text: "Percent Variation", value: "percentVariation" },
        { text: "Percent of Column Total", value: "percentOfColumnTotal" },
        { text: "Percent of Row Total", value: "percentOfRowTotal" },
        { text: "Percent of Column Grand Total", value: "percentOfColumnGrandTotal" },
        { text: "Percent of Row Grand Total", value: "percentOfRowGrandTotal" },
        { text: "Percent of Grand Total", value: "percentOfGrandTotal" }*/
    ];
}