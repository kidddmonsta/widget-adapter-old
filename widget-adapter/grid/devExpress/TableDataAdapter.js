function formatTableData(jsonUrl) {

    return $.getJSON(jsonUrl).then(function (data) {

        console.log(data.series);

        return data.series
    });
}
