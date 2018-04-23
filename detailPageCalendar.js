/* global variables */
var g_startDate = null;
var g_endDate = null;


/************ ************ RENDER CALENDER VIEW: ADDED BY RIYAD ************ ************/
function onChangeCalender(dispatcher, right) {

    var month = $(dispatcher).data("month");

    var rightMonth = 0;
    var leftMonth = 0;

    $.ajax({
            url: g_rootUrl + "/_ajax/controller.cfm",
            data: {
                action: "renderDetailPageCalender",
                controller: "detail",
                type: 1,
                month: month,
            }
        })
        .done(function(result) {
            /*  debugger;*/
            if (result.length > 0) {

                $("#sliderHeaderCalendar").html(result);
                sliderControlCalendar.enableResponsive();
                $('#sliderHeaderCalendar').cfmCalendarForDetailPage({ clickable: 'onlyValid', dayClickedHandler: detailPageCalendarClickHandler });

                month = $(dispatcher).data("month");

                if (right == 1) {
                    yearNumber = month % 10000;
                    monthNumber = (month - yearNumber) / 10000;
                    ++monthNumber;
                    if (monthNumber == 12) {
                        leftMonth = (monthNumber - 1) * 10000 + yearNumber;
                        monthNumber = 1;
                        ++yearNumber;
                        rightMonth = monthNumber * 10000 + yearNumber;
                    } else {
                        rightMonth = monthNumber * 10000 + yearNumber;
                        leftMonth = (monthNumber - 1) * 10000 + yearNumber;
                    }
                } else {
                    yearNumber = month % 10000;
                    monthNumber = (month - yearNumber) / 10000;
                    --monthNumber;
                    if (monthNumber == 0) {
                        rightMonth = (monthNumber + 1) * 10000 + yearNumber;
                        monthNumber = 12
                            --yearNumber;
                        leftMonth = monthNumber * 10000 + yearNumber;
                    } else {
                        leftMonth = monthNumber * 10000 + yearNumber;
                        rightMonth = (monthNumber + 1) * 10000 + yearNumber;
                    }

                }   
                $("#leftButton").data("month", leftMonth);
                $("#rightButton").data("month", rightMonth);
            }
                detailPagecalendarSetActiveExt($('#sliderHeaderCalendar'));
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}

$(function($) {
    $('#sliderHeaderCalendar').cfmCalendarForDetailPage({ clickable: 'onlyValid', dayClickedHandler: detailPageCalendarClickHandler });
    //sliderControlCalendar.enableResponsive();
    detailPagecalendarSetActiveExt($('#sliderHeaderCalendar'));
    var emptyLastDateMessage = "bitte auswählen"
    $(".detailBooking__chosenDays").html("Ihr gewählter Reisezeitraum :<br><span>" + emptyLastDateMessage + "</span>")
})

/************ ************ SET THE CLASS ACTIVE FOR DAY IN CALENDER: ADDED BY RIYAD ************ ************/
function detailPagecalendarSetActiveExt(wrapper) {

    setStoredStartAndEndDate();

    var calendarWrapperStart = $(wrapper).find('.cmsDatePicker[data-calendartype="start"]');
    var calendarWrapperEnd = $(wrapper).find('.cmsDatePicker[data-calendartype="last"]');
    var activeStartDay = $(calendarWrapperStart).find('.cmsDatePicker__day.detailpagefirstactive');
    var activeEndDay = $(calendarWrapperEnd).find('.cmsDatePicker__day.detailpagelastactive');

    var lastActiveDay = $('.cmsDatePicker__day.detailpagelastactive');
    var dayLastActiveDay = lastActiveDay.data("day");

    var middleCalender = $('.cmsDatePicker[data-calendartype="middle"]').find('.cmsDatePicker__day.isValid');
    if (activeStartDay.length > 0) {
     activeStartDay.nextUntil('.cmsDatePicker__day:last').addClass('active');
    }
    if (activeEndDay.length > 0) {

        if (dayLastActiveDay == '01') {
            console.log('Kaput')

        } else {
              if ($('.cmsDatePicker[data-calendartype="middle"]').find('.cmsDatePicker__day.detailpagelastactive').length == 0) {
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
            var first = $(activeEndDay).siblings(".cmsDatePicker__day:first");
            first.addClass('active');
            first.nextUntil(activeEndDay).addClass('active');
        }

    }


    closeOverlay('Time', false);
    console.log("success");
}

/************ ************ Setting firstactive and last active for stored first and last date: ADDED BY RIYAD ************ ************/
function setStoredStartAndEndDate()
{

    if( g_startDate )
    {
        var dateParts = g_startDate.split(".");
        var dayDiv = $('div.cmsDatePicker__day[data-day="' + dateParts[0] + '"][data-month="' + dateParts[1] + '"][data-year="' + dateParts[2] + '"]');

        if( dayDiv.length > 0 )
        {
            dayDiv.addClass('detailpagefirstactive');
        }
    }

    if( g_endDate )
    {
        var dateParts = g_endDate.split(".");
        var dayDiv = $('div.cmsDatePicker__day[data-day="' + dateParts[0] + '"][data-month="' + dateParts[1] + '"][data-year="' + dateParts[2] + '"]');

        if( dayDiv.length > 0 )
        {

            dayDiv.addClass('detailpagelastactive');
            var middleCalender = $('.cmsDatePicker[data-calendartype="start"]').find('.cmsDatePicker__day.isValid');   
             if ($('.cmsDatePicker[data-calendartype="start"]').find('.cmsDatePicker__day.detailpagelastactive').length == 0) {
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
            var activeEndDay = $('.cmsDatePicker').find('.cmsDatePicker__day.detailpagelastactive');
            var first = $(activeEndDay).siblings(".cmsDatePicker__day:first");
            first.addClass('active');
            first.nextUntil(activeEndDay).addClass('active');
        }
    }
}

/************ ************ ADDING THE START DATE AND END DATE AS "FRÜHSTE HINREISE UND SPÄTESTE RÜCKREISE" : ADDED BY RIYAD ************ ************/
function detailPageCalendarClickHandler(dispatcher) {

    var firstActiveDay = $('.cmsDatePicker__day.detailpagefirstactive');
    if (firstActiveDay.length == 1) {
        var dayFirstActiveDay = firstActiveDay.data("day");
        var monthFirstActiveDay = firstActiveDay.data("month");
        var yearFirstActiveDay = firstActiveDay.data("year");

        g_startDate = dayFirstActiveDay + "." + monthFirstActiveDay + "." + yearFirstActiveDay;
            
    }

    var convertFirstMonth = [monthFirstActiveDay, dayFirstActiveDay, yearFirstActiveDay].join('/');
    var month_name = function(dt) {
        mlist = ["Januar", "Februar", "März", "April", "Mai", "June", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        return mlist[dt.getMonth()];
    };
    var convertedFirstMonthValue = month_name(new Date(convertFirstMonth));
    var firstDate = [dayFirstActiveDay, convertedFirstMonthValue, yearFirstActiveDay].join(' ');
    var lastActiveDay = $('.cmsDatePicker__day.detailpagelastactive');
    if (lastActiveDay.length == 1) {
        var dayLastActiveDay = lastActiveDay.data("day");
        var monthLastActiveDay = lastActiveDay.data("month");
        var yearLastActiveDay = lastActiveDay.data("year");
        var convertLastMonth = [monthLastActiveDay, dayLastActiveDay, yearLastActiveDay].join('/');
        var convertedLastMonthValue = month_name(new Date(convertLastMonth));
        var lastDate = [dayLastActiveDay, convertedLastMonthValue, yearLastActiveDay].join(' ');
        $(".detailBooking__chosenDays").html("Ihr gewählter Reisezeitraum :<br><span id='detailPageCalenderFirstDate'>" + firstDate + "</span> - <span id='detailPageCalenderLastDate'>" + lastDate + "</span>");

        g_endDate = dayLastActiveDay + "." + monthLastActiveDay + "." + yearLastActiveDay;
        
    } else {
        var emptyLastDateMessage = "bitte auswählen"
        $(".detailBooking__chosenDays").html("Ihr gewählter Reisezeitraum :<br><span id='detailPageCalenderFirstDate'>" + firstDate + "</span> - <span id='detailPageCalenderLastDate'>" + emptyLastDateMessage + "</span>");
    }
}