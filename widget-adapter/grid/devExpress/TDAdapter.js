function formatTable(jsonUrl) {
    return $.getJSON(jsonUrl).then(function (data) {
        // console.log(data);

        let jsonValue = [];
        //let formattedTime = [];
        //let formattedJsonValue = [];
        let newJson = [];

        for (key in data.series) {
            //console.log(data.series[key]);
            //console.log(JSON.stringify(data.series[key]));
            let str = JSON.stringify(data.series[key]);
            let value = /Applications./g;
            str = str.replace(value, "");
            jsonValue[key] = JSON.parse(str);

        }

        for (key in jsonValue) {
            let newStr = JSON.stringify(jsonValue[key]);
            //console.log(jsonValue[key]);
            let newTime = jsonValue[key].time;
            //console.log(newTime);
            if (data.timeInterval == "day") {
                newStr = newStr.replace(newTime, moment(newTime).format("YYYY-MM-DD"));
            }
            if (data.timeInterval == "month") {
                newStr = newStr.replace(newTime, moment(newTime).format("YYYY-MM"));
            }
            if (data.timeInterval == "year") {
                newStr = newStr.replace(newTime, moment(newTime).format("YYYY"));
            }
            console.log(data.timeInterval);
            //console.log(newStr);
            newJson[key] = JSON.parse(newStr);
            //console.log(newJson);
        }


    var returnData = {
        //newJson: newJson
        jsonValue: jsonValue,
        //formattedTime: formattedTime
    };
    console.log(newJson);
    console.log(jsonValue);
    //console.log(formattedTime);
    return newJson;
    });
}
