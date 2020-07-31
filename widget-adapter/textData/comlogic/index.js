function render(blockId) {
    prepareData().then(function () {
        $.getJSON('widgetOptions.json').then(function (widgetOptions) {
            console.log(settings);
            if ('backgroundColor' in settings === false) {
                settings = widgetOptions;
                console.log("use default settings");
            }

            console.log(filteredData);

            title = settings.title
            body = settings.body
            //data = filteredData[0].AmountOfApps
            /*width = settings.width
            height = settings.height
            fontColor = settings.fontColor
            backgroundColor = settings.backgroundColor
            fontFamily = settings.fontFamily
            fontWeight = settings.fontWeight
            fontStyle = settings.fontStyle
            fontSize = settings.fontSize
*/
            $(".block-title").append(title);
            $(".block-body").append(body);
            //$(blockId).css( "color", "red" );
            //$(blockId).on("click", function () {

            var stylesTitle = {
                width: settings.width,
                height: settings.heightTitle,
                backgroundColor: settings.backgroundColor,
                fontSize: settings.fontSizeTitle,
                color: settings.fontColor,
                fontFamily: settings.fontFamily,
                fontWeight: settings.fontWeight,
                fontStyle: settings.fontStyle,
                textAlign: settings.textAlign,
                wordBreak: settings.wordBreak,
                padding: settings.paddingTitle
            };

            var stylesBody = {
                width: settings.widthBody,
                height: settings.heightBody,
                backgroundColor: settings.backgroundColor,
                fontSize: settings.fontSizeBody,
                color: settings.fontColor,
                fontFamily: settings.fontFamily,
                fontWeight: settings.fontWeightBody,
                fontStyle: settings.fontStyle,
                textAlign: settings.textAlign,
                boxSizing: settings.boxSizing,
                wordBreak: settings.wordBreak
            };

            $(".block-title").css(stylesTitle);
            $(".block-body").css(stylesBody);

            /*            $( this ).css( "background-color", backgroundColor );
                          $( this ).css( "color", textColor );
                          $( this ).css( "font-family", fontFamily );
                          $( this ).css( "font-weight", fontWeight );
                          $( this ).css( "font-style", fontWeight );
                          $( this ).css( "font-size", fontSize );
                          $( this ).css( "width", width );
                          $( this ).css( "height", height );
            */
        });

    })
    //})
}