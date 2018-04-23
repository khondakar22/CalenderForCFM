(function($) {

    $.fn.cfmCalendar = function(order, params) {
        order = typeof order !== 'undefined' ? order : "";
        if (typeof order != "string") {
            params = order;
            order = "";

        }
        var calendarWrapper = this;

        if (order == "") {
            var clickableOnlyOnValid = false;
            if (typeof params != "undefined" && typeof params.clickable != "undefined" && params.clickable == "onlyValid") {
                clickableOnlyOnValid = true;
            }

            var dayClickedHandler = null;
            if (typeof params != "undefined" && typeof params.dayClickedHandler != "undefined") {
                dayClickedHandler = params.dayClickedHandler;
            }
            //$(calendarWrapper).find(".cmsDatePicker__day").click( function( event ){ dayClick( event, this, calendarWrapper, clickableOnlyOnValid, dayClickedHandler ); } );
            $(calendarWrapper).on("click", ".cmsDatePicker__day", function(event) { dayClick(event, this, calendarWrapper, clickableOnlyOnValid, dayClickedHandler); });
            //$(calendarWrapper).on("click", ".cmsDatePicker__day", function( event ){ dayClick( event, this, calendarWrapper, clickableOnlyOnValid, dayClickedHandler ); } );
        } else if (order == "setDate") {
            if (typeof params.day != "undefined" && typeof params.month != "undefined" && typeof params.year != "undefined") {
                setDate(params.day, params.month, params.year, calendarWrapper);
            }
        }
    }
    /*******************************************
       
    *******************************************/
    function showCalendar(event, calendarWrapper) {
        // close all other
        $(".tripInputForm__inputlayer").removeClass('tripInputForm__inputlayer--open')
        // open
        $(calendarWrapper).find('.tripInputForm__inputlayer').addClass('tripInputForm__inputlayer--open');
    }

    /*******************************************
       
    *******************************************/
    function hideCalendar(event, calendarWrapper) {
        $(".tripInputForm__inputlayer").removeClass('tripInputForm__inputlayer--open');

    }

    /*******************************************
       
    *******************************************/
    function toggleCalendar(event, calendarWrapper) {
        if ($(calendarWrapper).find('.tripInputForm__inputlayer').hasClass('tripInputForm__inputlayer--open')) {
            hideCalendar(event, calendarWrapper);
        } else {
            showCalendar(event, calendarWrapper);

        }
    }

    /*******************************************
   
    *******************************************/
    function calendarScroll(event, calendarWrapper) {
        var selected = $(calendarWrapper).find("select").val().split("_");
        var selectedMonth = selected[0];
        var selectedYear = selected[1];
        $(calendarWrapper).find(".cmsDatePicker__dayFrame").hide();
        $(calendarWrapper).find('.cmsDatePicker__dayFrame[data-month="' + selectedMonth + '"][data-year="' + selectedYear + '"]').show();
    }


    /*******************************************
   
    *******************************************/
    function dayClick(event, dispatcher, calendarWrapper, clickableOnlyOnValid, dayClickedHandler) {
        var day = $(dispatcher).data("day");
        var month = $(dispatcher).data("month");
        var year = $(dispatcher).data("year");
        var calendarType = $(dispatcher).parents(".cmsDatePicker").data("calendartype");

        if (!clickableOnlyOnValid || $(dispatcher).hasClass("isValid")) {
            if (isPickValid(day, month, year, calendarType, calendarWrapper)) {
                setDate(day, month, year, calendarType, calendarWrapper);
                hideCalendar(null, calendarWrapper);
                if (dayClickedHandler != null) {
                    dayClickedHandler(dispatcher);
                }
            }
        }
    }
    /*******************************************
   
    *******************************************/
    function isPickValid(day, month, year, calendarType, calendarWrapper) {
        var isValid = true;
        var calendarWrapperStart = $(calendarWrapper).find('.cmsDatePicker[data-calendartype="startdate"]');
        var calendarWrapperEnd = $(calendarWrapper).find('.cmsDatePicker[data-calendartype="enddate"]');
        var startDay = 0;
        var startMonth = 0;
        var startYear = 0;
        var endDay = 0;
        var endMonth = 0;
        var endYear = 0;
        //debugger;
        if (calendarType == "startdate") {
            startDay = day;
            startMonth = month;
            startYear = year;

            var tmp = calendarWrapperEnd.data("selected").split("-");
            endDay = tmp[2];
            endMonth = tmp[1];
            endYear = tmp[0];

        } else {
            var tmp = calendarWrapperStart.data("selected").split("-");
            startDay = tmp[2];
            startMonth = tmp[1];
            startYear = tmp[0];

            endDay = day;
            endMonth = month;
            endYear = year;
        }
        if (
                (
                    parseInt(startDay, 10) > parseInt(endDay, 10) &&
                    parseInt(startMonth, 10) == parseInt(endMonth, 10) &&
                    parseInt(startYear, 10) >= parseInt(endYear, 10)
                ) ||
                (
                    parseInt(startMonth, 10) > parseInt(endMonth, 10) &&
                    parseInt(startYear, 10) >= parseInt(endYear, 10)
                ) ||
                (
                    parseInt(startYear, 10) > parseInt(endYear, 10)
                )
            ) {
                    isValid = false;
        }
        return isValid;
    }

    /*******************************************
   
    *******************************************/
    function setDate(day, month, year, calendarType, calendarWrapper) {

        day = day.toString();
        month = month.toString();
        year = year.toString();

        var calendarWrapperStart = $(calendarWrapper).find('.cmsDatePicker[data-calendartype="startdate"]');
        var calendarWrapperEnd = $(calendarWrapper).find('.cmsDatePicker[data-calendartype="enddate"]');
        var currentWrapper = null;
        var currentActiveClass = "active";

        if (calendarType == "startdate") {
            currentWrapper = calendarWrapperStart;
            currentActiveClass = "firstactive";

        } else {
            currentWrapper = calendarWrapperEnd;
            currentActiveClass = "lastactive"
        }
        $(currentWrapper).find('.cmsDatePicker__day').removeClass('active');
        $(currentWrapper).find('.cmsDatePicker__day').removeClass(currentActiveClass);
        $(currentWrapper).find('.cmsDatePicker__day[data-day="' + day + '"][data-month="' + month + '"][data-year="' + year + '"]:not(.passed)').addClass(currentActiveClass);

        var activeDay = $(currentWrapper).find('.cmsDatePicker__day.' + currentActiveClass);
        var firstDay = $(currentWrapper).find('.cmsDatePicker__day[data-day="' + day + '"]');

        if (calendarType == "startdate") {
            activeDay.nextUntil('.cmsDatePicker__day:last').addClass('active');
        } else {

            if (day == "01") {
                console.log("Ich liebe dich")
            } else {
                var first = $(activeDay).siblings(".isValid:first");
                first.addClass('active');
                first.nextUntil(activeDay).addClass('active');
            }
        }
        currentWrapper.data("selected", year + "-" + month + "-" + day);

        
    }


}(jQuery));