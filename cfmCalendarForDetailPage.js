(function($) {

    $.fn.cfmCalendarForDetailPage = function(order, params) {
        order = typeof order !== 'undefined' ? order : "";

        if (typeof order != "string") {
            params = order;
            order = "";
        }

        var calendarWrapper = this;

        if (order == "") {
            $(calendarWrapper).find(".cmsDatePicker__close.icon-close").click(function(event) { hideCalendar(event, calendarWrapper); });
            $(calendarWrapper).find(".cmsDatePicker__button").click(function(event) { hideCalendar(event, calendarWrapper); });


            $(calendarWrapper).find("select.monthSelect").change(function(event) { calendarScroll(event, calendarWrapper); });

            var clickableOnlyOnValid = false;
            if (typeof params != "undefined" && typeof params.clickable != "undefined" && params.clickable == "onlyValid") {
                clickableOnlyOnValid = true;
            }

            var dayClickedHandler = null;
            if (typeof params != "undefined" && typeof params.dayClickedHandler != "undefined") {
                dayClickedHandler = params.dayClickedHandler;
            }

            $(calendarWrapper).find(".cmsDatePicker__day").click(function(event) { dayClick(event, this, calendarWrapper, clickableOnlyOnValid, dayClickedHandler); });
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
        $(".tripInputForm__inputlayer").removeClass('tripInputForm__inputlayer--open');

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
        //var type = $(this).data("type");
        $(calendarWrapper).find(".cmsDatePicker__dayFrame").hide();
        $(calendarWrapper).find('.cmsDatePicker__dayFrame[data-month="' + selectedMonth + '"][data-year="' + selectedYear + '"]').show();
    }


    /*******************************************
   
	*******************************************/
    function dayClick(event, dispatcher, calendarWrapper, clickableOnlyOnValid, dayClickedHandler) {
        var day = $(dispatcher).data("day");
        var month = $(dispatcher).data("month");
        var year = $(dispatcher).data("year");

        if (!clickableOnlyOnValid || $(dispatcher).hasClass("isValid")) {
            setDate(day, month, year, calendarWrapper);

            hideCalendar(null, calendarWrapper);

            if (dayClickedHandler != null) {
                dayClickedHandler(dispatcher);
            }
        }

    }

    /*******************************************
   
	*******************************************/
    function setDate(day, month, year, calendarWrapper) {

        day = day.toString();
        month = month.toString();
        year = year.toString();


       /* debugger; */

        var firstActiveDay = $(calendarWrapper).find('.cmsDatePicker__day.detailpagefirstactive');
        var lastActiveDay = $(calendarWrapper).find('.cmsDatePicker__day.detailpagelastactive');


        if (firstActiveDay.length == 0 || lastActiveDay.length > 0) {
            /*alert(2)*/
            $(calendarWrapper).find('.cmsDatePicker__day').removeClass('active');
            $(calendarWrapper).find('.cmsDatePicker__day').removeClass('detailpagefirstactive');
            $(calendarWrapper).find('.cmsDatePicker__day').removeClass('detailpagelastactive');
            $(calendarWrapper).find('.cmsDatePicker__day[data-day="' + day + '"][data-month="' + month + '"][data-year="' + year + '"]:not(.passed)').addClass('detailpagefirstactive');
        } else {
            /*alert(3)*/
            var dayFirstActiveDay = firstActiveDay.data("day");
            var monthFirstActiveDay = firstActiveDay.data("month");
            var yearFirstActiveDay = firstActiveDay.data("year");


            if ((
                    parseInt(dayFirstActiveDay, 10) > parseInt(day, 10) &&
                    parseInt(monthFirstActiveDay, 10) == parseInt(month, 10) &&
                    parseInt(yearFirstActiveDay, 10) >= parseInt(year, 10)
                ) ||
                (
                    parseInt(monthFirstActiveDay, 10) > parseInt(month, 10) &&
                    parseInt(yearFirstActiveDay, 10) >= parseInt(year, 10)
                ) ||
                (
                    parseInt(yearFirstActiveDay, 10) > parseInt(year, 10)
                )
            ) {
                /*alert(4)*/
                firstActiveDay.removeClass('detailpagefirstactive').addClass('detailpagelastactive');
                $(calendarWrapper).find('.cmsDatePicker__day[data-day="' + day + '"][data-month="' + month + '"][data-year="' + year + '"]:not(.passed)').addClass('detailpagefirstactive');
            } else {
                /*alert(5)*/
                $(calendarWrapper).find('.cmsDatePicker__day[data-day="' + day + '"][data-month="' + month + '"][data-year="' + year + '"]:not(.passed)').addClass('detailpagelastactive');
            }

            if (monthFirstActiveDay == month && yearFirstActiveDay == year) {
                /*alert(6)*/
                firstActiveDay = $(calendarWrapper).find('.cmsDatePicker__day.detailpagefirstactive');
                lastActiveDay = $(calendarWrapper).find('.cmsDatePicker__day.detailpagelastactive');

                firstActiveDay.nextUntil(lastActiveDay).addClass('active');
            } else {

              
                /*alert(7)*/
                firstActiveDay = $(calendarWrapper).find('.cmsDatePicker__day.detailpagefirstactive');
                lastActiveDay = $(calendarWrapper).find('.cmsDatePicker__day.detailpagelastactive');

                firstActiveDay.nextUntil('.cmsDatePicker__day:last').addClass('active');

                var middleCalender = $('.cmsDatePicker[data-calendartype="middle"]').find('.cmsDatePicker__day.isValid');
                if (day == '01') {
                    /*alert(8)*/
                    console.log('Ich liebe dich');
                } else {
                    /*alert(9)*/
                    if ( $('.cmsDatePicker[data-calendartype="middle"]').find('.cmsDatePicker__day.detailpagelastactive').length == 0 ) {
                        var length = middleCalender.length;
                        var start = 0;

                        for (var i = 0; i < length; i++) {
                            if (middleCalender.eq(i).hasClass('firstActive')) {
                                start = i;
                            }
                        }
                        for (var x = start; x < length; x++) {
                            middleCalender.eq(x).addClass('active')
                        }
                    }
                    var first = $(lastActiveDay).siblings(".isValid:first");
                    first.addClass('active')
                    first.nextUntil(lastActiveDay).addClass('active');
                }
            }
        }
    }
}(jQuery));