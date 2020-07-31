function formatData(jsonUrl) {
    return $.getJSON(jsonUrl).then(function (data) {
        let TableColumnsName = [];
        let values = [];


        data.forEach(function (dataVal, index) {
            TableColumnsName[index] = dataVal.key;
            //console.log(TableColumnsName)
        });

        TableColumnsName.forEach(function (item, ind) {
            values[ind] = item.replace(/Applications./g, '');
            //values[ind+1] = {
                //dataField: "type_ois",
                //groupIndex: 0
               //dataField: item.replace(/Applications./g, ''),
                //groupIndex: ind
            //};
        });
        console.log(values);

        var returnData = {
            values: values
        };
        console.log(returnData);


        return returnData;
    });
}