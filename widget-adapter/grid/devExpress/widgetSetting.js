function initNewGrid(dataSource, blockId) {
    var widSet = localStorage.getItem('storage');
    console.log(widSet);
    console.log(dataSource);
    var grid;
    $.getJSON('widgetOptions.json').then(function (widgetOptions) {
        settings = widgetOptions;
        $("#buttonContainer").dxButton({
            text: "Построить таблицу",
            onClick: function () {

                var oldGrid = $(blockId).dxDataGrid('instance');
                var dataGridOption = oldGrid.option();
                console.log(dataGridOption);

                grid = $("#dataGridContainer").dxDataGrid(dataGridOption);
                /*grid = $("#dataGridContainer").dxDataGrid({
                    dataSource: dataSource,
                    showBorders: settings.showBorders,
                    searchPanel: {
                        visible: settings.searchPanelVisible,
                        highlightCaseSensitive: settings.searchPanelhighlightCaseSensitive,
                        width: settings.searchPanelWidth,
                        placeholder: settings.searchPanelPlaceholder
                    },
                    paging: {
                        pageSize: JSON.parse(widSet).pageSize
                    },
                    pager: {
                        showPageSizeSelector: true,
                        allowedPageSizes: JSON.parse(widSet).allowedPageSizes
                    },
                    filterPanel: {
                        filterEnabled: JSON.parse(widSet).filterPanel.filterEnabled
                    },

                }).dxDataGrid('instance');*/
                console.log(widSet);
                console.log(dataGridOption);
                //grid = $("#dataGridContainer").dxDataGrid("option", "dxDataSource");
                /*grid.option(JSON.parse(widSet));
                console.log(JSON.parse(widSet));
                console.log(JSON.parse(widSet).allowedPageSizes);
                console.log(JSON.parse(widSet).filterPanel.filterEnabled);
                console.log(JSON.parse(widSet).pageSize);
*/
                /*
                            grid.option({

                            });
                */
            }
        })
    })
}

/*
function widgetSetting() {
    var widSet = localStorage.getItem('storage');
    console.log(widSet);
    //return widSet
    dataGridInstance.option({
        dataSource: widSet,
    })
}
*/


