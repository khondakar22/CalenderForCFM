/************ ************ VARIABLES ************ ************/
window.indochinaViewportSmall = 540;
window.indochinaViewportMedium = 740;
window.indochinaViewportLarge = 1080;
window.indochinaViewportextraLarge = 1080;
/********** ********* MOBILE NAVIGATION ********* ************/
function openMobileNavigation() {
    $(".mobileNavigation").show();
    setTimeout(function() {
        $(".mobileNavigation").addClass("open");
    }, 10);
    disableBodyScroll();
}

function closeMobileNavigation() {
    $(".mobileNavigation").removeClass("open");
    setTimeout(function() {
        $(".mobileNavigation").hide();
    }, 500);
    enableBodyScroll();
}

function openMobileSubnavigation(navigationType) {
    $("#monav" + navigationType).show();
    $(".mobileNavigation__container").css("marginLeft", "-100%");
}
$(".mobileNavigation__backLink").click(function() {
    $(".mobileNavigation__container").removeAttr("style");
    $(this).parents(".mobileNavigation__secondLevel").fadeOut();
});
/******** ************* SMOOTH SCROLL ************** *********/
$('a').smoothScroll({
    offset: -150,
});
/******** ********* SET STARTSCREEN HEIGHT ********* *********/
function setStartscreenHeight() {
    var bodyHeight = $("body").outerHeight();
    var uspHeight = $(".startscreen").next(".contentSection").outerHeight();
    $(".startscreen").css("height", bodyHeight);
    if ($(window).outerWidth() > indochinaViewportLarge) {
        $(".startscreen").css("height", bodyHeight - uspHeight);
    }
}
/************ ************ NO SCROLL ************ ************/
function disableBodyScroll() {
    window.scrolledPixels = $(document).scrollTop();
    $('.siteWrapper').addClass('noScroll');
    $('.siteWrapper').css('marginTop', -scrolledPixels);
}

function enableBodyScroll() {
    $('.siteWrapper').removeClass('noScroll');
    $('.siteWrapper').removeAttr('style');
    $(document).scrollTop(scrolledPixels);
}
/************ ************ CONTACT OVERLAY ************ ************/
function positionContact() {
    var containerWidth = $(".contactOverlay__container").outerWidth();
    var containerHeight = $(".contactOverlay__container").outerHeight();
    var contentWidth = $(".contactOverlay__content").outerWidth();
    var contentHeight = $(".contactOverlay__content").outerHeight();
    if (contentWidth < containerWidth) {
        $(".contactOverlay").addClass("contactOverlay--centeredHorizontal");
        $(".contactOverlay__content").css("marginLeft", -(contentWidth / 2));
    } else {
        $(".contactOverlay").removeClass("contactOverlay--centeredHorizontal");
        $(".contactOverlay__content").css("marginLeft", 0);
    }
    if (contentHeight < containerHeight) {
        $(".contactOverlay").addClass("contactOverlay--centeredVertical");
        $(".contactOverlay__content").css("marginTop", -(contentHeight / 2));
    } else {
        $(".contactOverlay").removeClass("contactOverlay--centeredVertical");
        $(".contactOverlay__content").css("marginTop", 0);
    }
}
$(".openContactOverlay").click(function(event) {
    event.preventDefault();
    $(".contactOverlay__background").fadeIn();
    $(".contactOverlay").addClass("contactOverlay--open");
    disableBodyScroll();
});
$(".contactOverlay__closer").click(function(event) {
    $(".contactOverlay").removeClass("contactOverlay--open");
    $(".contactOverlay__background").fadeOut();
    enableBodyScroll();
});
/************ ************ BACKSTRETCH ************ ************/
function magicBackstretch() {
    var img = 0;
    $(".backstretchImg").each(function() {
        try {
            img = $(this).find("img");
            $(this).backstretch(img.attr("src"));
            img.remove();
        } catch (err) {
            document.title = err.message;
        }
    });
}

function magicBackstretchByElem(elem) {
    var img = 0;
    try {
        img = $(elem).find("img");
        $(elem).backstretch(img.attr("src"));
        img.remove();
    } catch (err) {
        document.title = err.message;
    }
}
/********* ************ STARTSCREEN SLOGAN *********** **********/
function positionStartscreenSlogan() {
    var sloganHeight = $(".startscreen__slogan").outerHeight();
    var sloganMarginTop = (sloganHeight / 2 + 5) * -1;
    $(".startscreen__slogan").css('marginTop', sloganMarginTop);
}
/********* ********** CLOSE HEADER OVERLAYS *********** *********/
function closeHeaderOverlays() {
    $(".subNavigation__greyWrapper").fadeOut();
    $(".mainNavigation__link").removeClass("open");
    $(".travelSearch--header").fadeOut();
}
/************ ************* NAVIGATION ************* ************/
$(".mainNavigation__link ").click(function() {
    if ($(this).hasClass("open")) {
        $(this).parent().find(".subNavigation__greyWrapper").fadeOut();
        $(this).removeClass("open");
    } else {
        closeHeaderOverlays();
        $(this).parent().find(".subNavigation__greyWrapper").slideDown();
        $(this).addClass("open");
    }
});
/********* ************* SEARCH OVERLAYS ************** *********/
function openSearchoverlay(overlayid) {
    $("#overlayopener" + overlayid).click(function() {
        $("#overlay" + overlayid).fadeIn();
        disableBodyScroll();
    });
}
openSearchoverlay("Destinations");
openSearchoverlay("Time");
openSearchoverlay("Departures");
openSearchoverlay("Travelers");

function closeSearchoverlay(overlayid) {
    $(".overlaycloser" + overlayid).click(function() {
        $("#overlay" + overlayid).fadeOut();
        enableBodyScroll();
    });
}
$('.searchOverlay__background').click(function(event) {
    $(".searchOverlay").fadeOut();
    enableBodyScroll();
});
closeSearchoverlay("Destinations");
closeSearchoverlay("Time");
closeSearchoverlay("Departures");
/************ ************ TRAVELSEARCH ************ ************/
function positionTravelsearch() {
    var overlayHeight = $('.travelSearch--header').height();
    if (overlayHeight > 330) {
        $(".travelSearch--header").addClass("travelSearch--centeredVertical");
    } else {
        $(".travelSearch--header").removeClass("travelSearch--centeredVertical");
    }
    var overlayWidth = $('.travelSearch--header').width();
    if (overlayWidth > 450) {
        $(".travelSearch--header").addClass("travelSearch--centeredHorizontal");
    } else {
        $(".travelSearch--header").removeClass("travelSearch--centeredHorizontal");
    }
}
$(".searchTrigger").click(function() {
    closeHeaderOverlays();
    $(".travelSearch__overlayBackground").fadeIn();
    $(".travelSearch").slideDown();
});
$(".searchCloser").click(function() {
    $(".travelSearch").slideUp();
    $(".travelSearch__overlayBackground").fadeOut();
    $(".searchContainer__trigger").removeClass("searchContainer__trigger--active");
});
$(".filterCloser--search").click(function() {
    $(".searchFilter").slideUp();
    $(".searchContainer__trigger--filter").removeClass("searchContainer__trigger--active");
});
$(".searchCloser--search").click(function() {
    $(".travelSearch--content").slideUp();
    $(".searchContainer__trigger--search").removeClass("searchContainer__trigger--active");
});
$(".travelSearch__trigger").click(function() {
    $(this).fadeOut(50);
    $(".travelSearch__container").fadeIn();
});
$(".travelSearch__closer").click(function() {
    $(this).parents(".travelSearch__container").fadeOut(50);
    setTimeout(function() {
        $(".travelSearch__trigger").fadeIn();
    }, 55);
});
/********* ************ SEARCH LIST ************ **********/
$(".searchContainer__trigger--search").click(function() {
    $(".searchContainer__trigger--filter").removeClass("searchContainer__trigger--active");
    $(this).toggleClass("searchContainer__trigger--active");
    $(".searchFilter").slideUp();
    setTimeout(function() {
        $(".travelSearch--content").slideToggle();
    }, 200);
});
$(".searchContainer__trigger--filter").click(function() {
    $(".searchContainer__trigger--search").removeClass("searchContainer__trigger--active");
    $(this).toggleClass("searchContainer__trigger--active");
    $(".travelSearch--content").slideUp();
    setTimeout(function() {
        $(".searchFilter").slideToggle();
    }, 200);
});
/********* ************ FIX FILTER ************ **********/
// var filterOffsetTop = $(".searchContainer").offset().top;
// $(window).scroll(function(){
//   var scrollPosition = $(window).scrollTop();
//   if ( scrollPosition > filterOffsetTop ) {
//     $(".searchContainer").addClass("searchContainer--fixed");
//   } else {
//     $(".searchContainer").removeClass("searchContainer--fixed");
//   }
// });
/********** ************ DETAILPAGE ********** ************/
// function detailGallerySettings(){
//   var galleryImageHeight = $(".cmsSliderFrame--detailSlider").find(".detailGallery__image").outerHeight();
//   var summaryHeight = $(".detailPage__summary").outerHeight();
//   var summaryPriceHeight = $(".detailPage__summaryPrice").outerHeight();
//   // alert(summaryPriceHeight);
//   // $(".detailPage__summary").addClass("open");
//   if ( $(window).outerWidth() > indochinaViewportMedium ){
//     if( summaryHeight > galleryImageHeight ){
//       $(".detailGallery__image").height(summaryHeight);
//     }
//     if( galleryImageHeight > summaryHeight ){
//       $(".detailPage__summary").height(galleryImageHeight);
//     }
//     var summaryHeight = $(".detailPage__summary").outerHeight();
//     $(".cmsSliderFrame--detailSlider").find("li.cmsSlideLi").css("height", summaryHeight);
//   }
//   else
//   {
//     $(".detailPage__summary").removeAttr('style');
//     $(".detailGallery__image").removeAttr('style');
//     $(".cmsSliderFrame--detailSlider").find("li.cmsSlideLi").css("height", "auto");
//   }
// };
$(".detailRoute__head").click(function() {
    $(this).toggleClass("detailRoute__head--open");
    $(this).parents(".detailRoute").find(".detailRoute__details").slideToggle();
});
$(".detailTabs__routeTrigger").click(function() {
    if ($(this).text().indexOf("einblenden") !== -1) {
        $(this).text("alles ausblenden");
        $(".detailRoute__head").addClass("detailRoute__head--open");
        $(".detailRoute__details").slideDown();
    } else {
        $(this).text("alles einblenden");
        $(".detailRoute__head").removeClass("detailRoute__head--open");
        $(".detailRoute__details").slideUp();
    }
});
$(".review__toggleTrigger").click(function() {
    if ($(this).hasClass(".review__toggleTrigger--open")) {
        $(this).removeClass(".review__toggleTrigger--open");
        $(this).text("alles lesen");

        function removeOpen(that) {
            setTimeout(function() {
                $(that).parents(".review").removeClass("review--open");
            }, 300);
        };
        $(this).parents(".review").find(".review__image").fadeOut(300, "swing", removeOpen(this));
    } else {
        $(this).addClass(".review__toggleTrigger--open");
        $(this).text("schließen");
        $(this).parents(".review").addClass("review--open");
        $(this).parents(".review").find(".review__image").fadeIn();
    }
});
$(window).scroll(function() {
    var scrollPosition = $(window).scrollTop();
    if (scrollPosition > 600) {
        $(".detailMoNav").addClass("detailMoNav--active");
    } else {
        $(".detailMoNav").removeClass("detailMoNav--active");
    }
});
/********** ************ DETAIL TABS ********** ***********/
function setDetailTabs() {
    if ($(".hxTabs__tab[data-index='1']").hasClass("hxTabs__tab--active")) {
        $(".hxTabs__tab").removeClass("hxTabs__tab--active");
        $(".hxTabs__tabContent").removeClass("hxTabs__tabContent--active");
        if ($(window).outerWidth() > indochinaViewportLarge) {
            $(".hxTabs__tab[data-index='2']").addClass("hxTabs__tab--active");
            $(".hxTabs__tabContent[data-index='2']").addClass("hxTabs__tabContent--active");
        } else {
            $(".hxTabs__tab[data-index='1']").addClass("hxTabs__tab--active");
            $(".hxTabs__tabContent[data-index='1']").addClass("hxTabs__tabContent--active");
        }
    }
}

function goToOverview() {
    $(".hxTabs__tab").removeClass("hxTabs__tab--active");
    $(".hxTabs__tabContent").removeClass("hxTabs__tabContent--active");
    $(".hxTabs__tab[data-index='2']").addClass("hxTabs__tab--active");
    $(".hxTabs__tabContent[data-index='2']").addClass("hxTabs__tabContent--active");
}
function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
}
/********** ************ UPDATE URL ON CLICK CATEGORIE ********** ***********/
function updateUrlByCatorie(callFrom) {
    var newURL = updateQueryStringParameter(document.URL, "kategorie", callFrom
        );
    window.location.href = newURL;
}
/********** ************ HIGH TEASER ********** ***********/
function setHighOfferHeadline() {
    var contentHeight = 0;
    if ($(window).outerWidth() < indochinaViewportLarge) {
        $(".offerTeaser--highVersion").each(function() {
            $(this).find(".offerTeaser__headline").removeAttr('style');
        });
    } else {
        $(".offerTeaser--highVersion").each(function() {
            var contentHeight = $(this).find(".offerTeaser__content").outerHeight();
            var headlinePosition = contentHeight;
            $(this).find(".offerTeaser__headline").css("bottom", headlinePosition)
        });
    }
}
/********** *********** BUBBLE TEASER ********** **********/
function setBubbleteaserHeadlines() {
    $(".bubbleTeaser").each(function() {
        var headlineHeight = $(this).find(".bubbleTeaser__headlineContainer").outerHeight();
        $(this).css('paddingBottom', headlineHeight);
    });
    setEqualheight();
}
/******** ********* ACCORDEON FUNCTION ********** *********/
$(".accordion__head").click(function() {
    $(this).parents(".accordion").toggleClass("accordion--active");
    $(this).parents(".accordion").find(".accordion__content").slideToggle();
})
/******** ********* PAYMENT ACCORDION  ********** *********/
$(".persdataPayment__head").click(function() {
    if (!$(this).parents(".persdataPayment").hasClass("active")) {
        $(".persdataPayment").removeClass("active");
        $(".persdataPayment__content").slideUp();
        $(this).parents(".persdataPayment").addClass("active");
        $(this).parents(".persdataPayment").find(".persdataPayment__content").slideDown();
    }
});
/************ ************ FOOTER ************ ************/
$(".footer__navigationHeadLink").click(function(event) {
    if (($("body").width()) <= 1080) {
        if ($(this).hasClass("open")) {
            event.preventDefault();
            $(this).removeClass("open");
            $(this).parent().find(".footer__navigationContainer").slideUp();
        } else {
            event.preventDefault();
            $(this).addClass("open");
            $(this).parent().find(".footer__navigationContainer").slideDown();
        }
    }
});
$(".footer__contactHeadline").click(function() {
    if ($(this).hasClass("footer__contactHeadline--open")) {
        $(this).removeClass("footer__contactHeadline--open");
        $(this).parent().find(".footer__contactContent").slideUp();
    } else {
        $(this).addClass("footer__contactHeadline--open");
        $(this).parent().find(".footer__contactContent").slideDown();
    }
});
/************ ************ Formular ************ ************/
function textChanged(event) {
    if ($(this).val().length == 0) {
        $(this).parent().addClass("isEmpty");
    } else {
        $(this).parent().removeClass("isEmpty");
    }
}

function inputFocus(event) {
    $('.cssInput.active').removeClass('active');
    var $parent = $(this).parent('.cssInput');
    $parent.addClass('active');
}

function textareaFocus(event) {
    $('.cssTextarea.active').removeClass('active');
    var $parent = $(this).parent('.cssTextarea');
    $parent.addClass('active');
}
$('.cssInput input[type="text"]').change(textChanged);
$('.cssInput input[type="email"]').change(textChanged);
$('.cssTextarea textarea').change(textChanged);
$('.cssInput input').focus(inputFocus);
$('.cssInput textarea').focus(textareaFocus);
/****** ****** Zusatzleistungen Checkbox Active ******* *****/
function checkOptionalBooking() {
    if ($(this).parents(".optionalBooking__checkboxes").find("input[type=checkbox]:checked").length) {
        $(this).parents(".optionalBooking--booking").find(".optionalBooking__checkbox").addClass("optionalBooking__checkbox--active");
    } else {
        $(this).parents(".optionalBooking--booking").find(".optionalBooking__checkbox").removeClass("optionalBooking__checkbox--active");
    }
}
$(".optionalBooking__checkboxes input").click(checkOptionalBooking);
/************** ********** WATCHLIST *********** ************/
$(".openWatchlist").click(function() {
    $(".watchlist").fadeIn();
    setTimeout(function() {
        $(".watchlist").addClass("watchlist--open");
    }, 150);
    disableBodyScroll();
});
$(".closeWatchlist").click(function() {
    $(".watchlist").removeClass("watchlist--open");
    setTimeout(function() {
        $(".watchlist").fadeOut();
    }, 150);
    enableBodyScroll();
});
/************** ********* READ MORE ********* ***************/
$(".readMore--shortdesc .link a").click(function() {
    $(this).parents(".readMore").find(".readMore__link").slideUp();
    $(this).parents(".readMore").find(".readMore__inner").slideDown();
    $(this).parents(".readMore").addClass("readMore--open");
});
$(".readMore--shortdesc .readMore__closer").click(function() {
    $(this).parents(".readMore").find(".readMore__inner").slideUp();
    $(this).parents(".readMore").removeClass("readMore--open");
    $(this).parents(".readMore").find(".readMore__link").slideDown();
});
$(".readMore--gradient .link a").click(function() {
    var innerHeight = $(this).parents(".readMore").find(".readMore__inner").outerHeight();
    $(this).parents(".readMore").css('height', innerHeight);
    $(this).parents(".readMore").find(".readMore__link").fadeOut();
    $(this).parents(".readMore").addClass("readMore--open");
});
$(".readMore--gradient .readMore__inner .readMore__closer").click(function() {
    $(this).parents(".readMore").removeAttr("style");
    $(this).parents(".readMore").find(".readMore__link").fadeIn();
    $(this).parents(".readMore").removeClass("readMore--open");
});
/************ ************ Switch Detail Hotel Tabs ************ ************/
$(".detailTabs__hotelHead").click(function() {
    $(".detailTabs__hotelHead").removeClass("active");
    $(this).addClass("active");
    $(".detailTabs__hotelContainer").removeClass("active");
    if ($(this).hasClass("standard")) {
        $(".detailTabs__hotelContainer.standard").addClass("active");
    } else if ($(this).hasClass("superior")) {
        $(".detailTabs__hotelContainer.superior").addClass("active");
    } else if ($(this).hasClass("deluxe")) {
        $(".detailTabs__hotelContainer.deluxe").addClass("active");
    }
});
/************ ************ EQHeight ************ ************/
function setEqualheight() {
    $(function() {
        $('.equalHeight').matchHeight();
        $('.teammember__member').matchHeight();
        $('.gridEqHeight').matchHeight();
        $('.textTeaser').matchHeight();
        $('.textTeaser h4').matchHeight();
        $('.offerTeaser__content').matchHeight();
        $('.infoTeaser__content').matchHeight();
        $('.infoTeaser__contentInner').matchHeight();
        $('.specialGrid__horizontalContainer').matchHeight();
        $('.listOffer__location').matchHeight();
        $('.listOffer h4').matchHeight();
        $('.listOffer__description').matchHeight();
        $('.listOffer__iconContainer').matchHeight();
    });
}
/************ ************ RENDER CALENDER VIEW: ADDED BY RIYAD ************ ************/
function showCalender(firCalenderMonth, secondCalenderMonth) {
    var dayFirstActiveDay = localStorage.getItem('dd') || '';
    var monthFirstActiveDay = localStorage.getItem('mm') || '';
    var yearFirstActiveDay = localStorage.getItem('yy') || '';
    var dayLastActiveDay = localStorage.getItem('ldd') || '';
    var monthLastActiveDay = localStorage.getItem('lmm') || '';
    var yearLastActiveDay = localStorage.getItem('lyy') || '';

    var today = new Date();
    var day = today.getUTCDate();
    var lastday = (y, m) => { return new Date(y, m + 1, 0).getDate(); }
    var year = today.getUTCFullYear();
    var stringYear = year.toString();
    var monthLastDay = lastday(year, 11)
    var currentMonth = today.getMonth() + 1;
    var secondMonth = today.getMonth() + 1;
    var secondeDay = day + 14;
    var restOfTheDay = '';
    var exacteDay = '';


    //getting First Date value from user clicked
    var firstActiveDay = $('.cmsDatePicker__day.firstactive');
    if (firstActiveDay.length == 1) {
        var dayFirstActiveDay = firstActiveDay.data("day");
        var monthFirstActiveDay = firstActiveDay.data("month");
        var yearFirstActiveDay = firstActiveDay.data("year");
    }
    //setting the First Date value into the session
    localStorage.setItem('dd', dayFirstActiveDay);
    localStorage.setItem('mm', monthFirstActiveDay);
    localStorage.setItem('yy', yearFirstActiveDay);
    //getting Last Date value from user clicked
    var lastActiveDay = $('.cmsDatePicker__day.lastactive');
    if (lastActiveDay.length == 1) {
        var dayLastActiveDay = lastActiveDay.data("day");
        var monthLastActiveDay = lastActiveDay.data("month");
        var yearLastActiveDay = lastActiveDay.data("year");
    }
    //setting the Last Date value into the session
    localStorage.setItem('ldd', dayLastActiveDay);
    localStorage.setItem('lmm', monthLastActiveDay);
    localStorage.setItem('lyy', yearLastActiveDay);

    if (firCalenderMonth == 0) {
        firCalenderMonth = monthFirstActiveDay + '' + yearFirstActiveDay;
    }

    if (secondCalenderMonth == 0) {
        secondCalenderMonth = monthLastActiveDay + '' + yearLastActiveDay
    }

    if (secondeDay > 31) {
        restOfTheDay = monthLastDay - day;
        exacteDay = 14 - restOfTheDay;
        secondeDay = exacteDay;
        if (secondeDay < 10) {
            secondeDay = '0' + secondeDay;
        }
        secondMonth = secondMonth + 1;
        if (secondMonth < 10) {
            secondMonth = '0' + secondMonth;
        }

    }

    if (secondMonth > currentMonth && secondCalenderMonth == 0) {
        secondCalenderMonth = secondMonth + '' + stringYear;
    }

    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth;

    }
    if (secondMonth < 10) {
        secondMonth = '0' + secondMonth;
    }


    if (day < 10) {
        day = '0' + day;
    }
    var startDate = [day, currentMonth, stringYear].join('.');
    var lastDate = [secondeDay, secondMonth, stringYear].join('.');
    $.ajax({
            url: g_rootUrl + "/_ajax/controller.cfm",
            data: {
                action: "renderCalender",
                controller: "searchMask",
                type: 1,
                month: firCalenderMonth,
                secondCalenderMonth: secondCalenderMonth,
                selectedFirstDay: dayFirstActiveDay,
                selectedFirstMonth: monthFirstActiveDay,
                selectedFirstYear: yearFirstActiveDay,
                selectedLastDay: dayLastActiveDay,
                selectedLastMonth: monthLastActiveDay,
                selectedLastYear: yearLastActiveDay,
            }
        })
        .done(function(result) {

            /*    debugger;*/
            if (result.length > 1) {
                $('#datepicker').html(result);
                $('#datepicker').cfmCalendar({ clickable: 'onlyValid', dayClickedHandler: calendarClickHandler });
            }
            /*   calendarSetActive( dayFirstActiveDay, monthFirstActiveDay, yearFirstActiveDay,
            dayLastActiveDay, monthLastActiveDay, yearLastActiveDay );*/



            if (dayFirstActiveDay == 0) {
                $('.searchOverlay__calendar #firstPartOfCalender div[data-month="' + currentMonth + '"][data-day="' + day + '"]').addClass('firstactive');

                if (currentMonth == secondMonth) {
                    $('.searchOverlay__calendar #secondPartOfCalender div[data-month="' + currentMonth + '"][data-day="' + secondeDay + '"]').addClass('lastactive');
                } else {
                    $('.searchOverlay__calendar #secondPartOfCalender div[data-month="' + secondMonth + '"][data-day="' + secondeDay + '"]').addClass('lastactive');
                }
            }
            calendarSetActiveExt($('#datepicker'));

            if ($('#firstDate').text() == '..' && $('#lastDate').text() == '..') {
                /* $("#reisedatenLabel").html("<b>Frühste Hinreise</b><br><span id='firstDate'>" + 'beliebig' + "</span><br><br><b>Späteste Rückreise</b><br><span id='lastDate'>" + 'beliebig' + "</span>");*/
                $("#reisedatenLabel").html("<b>Frühste Hinreise</b><br><span id='firstDate'>" + startDate + "</span><br><br><b>Späteste Rückreise</b><br><span id='lastDate'>" + lastDate + "</span>");
            }


        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}
/************ ************ CHANGE FIRST PART OF THE CALENDER: ADDED BY RIYAD ************ ************/
function getFirstCalendarPart(month) {
    var selected = $('.searchOverlay__calendar #firstPartOfCalender').data("selected");
    var selectedLast = $('.searchOverlay__calendar #secondPartOfCalender').data("selected");
    var selectedParts = selected.split("-");
    var selectedLastParts = selectedLast.split("-");


    var monthFirstActiveDay = localStorage.getItem('mm') || '';
    var yearFirstActiveDay = localStorage.getItem('yy') || '';
    if (month == 0) {
        month = monthFirstActiveDay + '' + yearFirstActiveDay;
    }

    $.ajax({
            url: g_rootUrl + "/_ajax/controller.cfm",
            data: {
                action: "onChangeFirstPartCalender",
                controller: "searchMask",
                type: "start",
                month: month,
                selectedFirstDay: selectedParts[2],
                selectedFirstMonth: selectedParts[1],
                selectedFirstYear: selectedParts[0]
            }
        })
        .done(function(result) {
            /*debugger;*/
            if (result.length > 1) {
                $('.searchOverlay__calendar #firstPartOfCalender').replaceWith(result);
                $('.searchOverlay__calendar #firstPartOfCalender').data("selected", selected);
            }

            /*calendarSetActive( selectedParts[2], selectedParts[1], selectedParts[0], selectedLastParts[2], selectedLastParts[1], selectedLastParts[0] );*/
            calendarSetActiveExt($('#datepicker'));
            if ($('#firstDate').text() == '..' && $('#lastDate').text() == '..') {
                $("#reisedatenLabel").html("<b>Frühste Hinreise</b><br><span id='firstDate'>" + 'beliebig' + "</span><br><br><b>Späteste Rückreise</b><br><span id='lastDate'>" + 'beliebig' + "</span>");
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}
/************ ************ CHANGE SECOND PART OF THE CALENDER: ADDED BY RIYAD ************ ************/
function getSecondCalendarPart(month) {
    var selected = $('.searchOverlay__calendar #secondPartOfCalender').data("selected");
    var selectedFirst = $('.searchOverlay__calendar #firstPartOfCalender').data("selected");
    var selectedParts = selected.split("-");
    var selectedFirstParts = selectedFirst.split("-");


    var monthLastActiveDay = localStorage.getItem('lmm') || '';
    var yearLastActiveDay = localStorage.getItem('lyy') || '';
    if (month == 0) {
        month = monthLastActiveDay + '' + yearLastActiveDay;
    }

    $.ajax({
            url: g_rootUrl + "/_ajax/controller.cfm",
            data: {
                action: "onChangeFirstPartCalender",
                controller: "searchMask",
                type: "end",
                month: month,
                selectedLastDay: selectedParts[2],
                selectedLastMonth: selectedParts[1],
                selectedLastYear: selectedParts[0]
            }
        })
        .done(function(result) {
            /*    debugger;*/
            if (result.length > 1) {
                $('.searchOverlay__calendar #secondPartOfCalender').replaceWith(result);
                $('.searchOverlay__calendar #secondPartOfCalender').data("selected", selected);
            }
            /*calendarSetActive( selectedFirstParts[2], selectedFirstParts[1], selectedFirstParts[0], selectedParts[2], selectedParts[1], selectedParts[0] );*/
            calendarSetActiveExt($('#datepicker'));
            if ($('#firstDate').text() == '..' && $('#lastDate').text() == '..') {
                $("#reisedatenLabel").html("<b>Frühste Hinreise</b><br><span id='firstDate'>" + 'beliebig' + "</span><br><br><b>Späteste Rückreise</b><br><span id='lastDate'>" + 'beliebig' + "</span>");
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}
/************ ************ SET THE CLASS ACTIVE FOR DAY IN CALENDER: ADDED BY RIYAD ************ ************/
function calendarSetActiveExt(wrapper) {
    var calendarWrapperStart = $(wrapper).find('.cmsDatePicker[data-calendartype="startdate"]');
    var calendarWrapperStartLastActive = $(wrapper).find('.cmsDatePicker[data-calendartype="startdate"]');
    var calendarWrapperEnd = $(wrapper).find('.cmsDatePicker[data-calendartype="enddate"]');

    var activeStartDay = $(calendarWrapperStart).find('.cmsDatePicker__day.firstactive');
    var activeStartDayLastActive = $(calendarWrapperStartLastActive).find('.cmsDatePicker__day.lastactive');
    var activeEndDay = $(calendarWrapperEnd).find('.cmsDatePicker__day.lastactive');

    var lastActiveDay = $('.cmsDatePicker__day.lastactive');
    var dayLastActiveDay = lastActiveDay.data("day");


    if (activeStartDayLastActive.length>0) {
        

         if (activeStartDayLastActive.length > 0) {
            var first = $(activeStartDayLastActive).siblings(".isValid:first");
            first.addClass('active');
            first.nextUntil(activeStartDayLastActive).addClass('active');
        }



    } else {

        if (activeStartDay.length > 0) {
            activeStartDay.nextUntil('.cmsDatePicker__day:last').addClass('active');
        }

        if (activeEndDay.length > 0) {
            if (dayLastActiveDay == '01') {
                console.log('Kaput')
            } else {
                var first = $(activeEndDay).siblings(".isValid:first");
                first.addClass('active');
                first.nextUntil(activeEndDay).addClass('active');
            }
        }
       
    }

    

    var startDate = [localStorage.getItem('dd'), localStorage.getItem('mm'), localStorage.getItem('yy')].join('.');
    var endDate = [localStorage.getItem('ldd'), localStorage.getItem('lmm'), localStorage.getItem('lyy')].join('.');

    $("#reisedatenLabel").html("<b>Frühste Hinreise</b><br><span id='firstDate'>" + startDate + "</span><br><br><b>Späteste Rückreise</b><br><span id='lastDate'>" + endDate + "</span>");

    closeOverlay('Time', false);
    console.log("success");
}
/************ ************ SET THE CLASS ACTIVE FOR DAY IN CALENDER: ADDED BY RIYAD ************ ************/
function calendarSetActive(dayFirstActiveDay, monthFirstActiveDay, yearFirstActiveDay,
    dayLastActiveDay, monthLastActiveDay, yearLastActiveDay) {
    /*First Condition*/
    if (monthFirstActiveDay == monthLastActiveDay) {
        $('div[data-month="' + firstMonth + '"][data-day="' + firstDate + '"]').addClass('firstactive');
        for (var i = dayFirstActiveDay; i <= dayLastActiveDay; i++) {
            if (i < 10) {
                $('div[data-month="' + monthFirstActiveDay + '"][data-day="0' + i + '"]').addClass('active');
            } else {
                $('div[data-month="' + monthFirstActiveDay + '"][data-day="' + i + '"]').addClass('active');
            }
        }
    } else {
        for (var i = 1; i <= dayLastActiveDay; i++) {
            if (i < 10) {
                $('div[data-month="' + monthLastActiveDay + '"][data-day="0' + i + '"]').addClass('active');
            } else {
                $('div[data-month="' + monthLastActiveDay + '"][data-day="' + i + '"]').addClass('active');
            }
        }
        if (dayLastActiveDay != null && dayLastActiveDay != "null") {
            var startOfMonth = parseInt($('.passed[data-month=' + monthFirstActiveDay + '] span')[0].innerHTML);
            for (var i = startOfMonth; i <= 31; i++) {
                $('.passed[data-month="' + monthFirstActiveDay + '"][data-day="' + i + '"]').addClass('active');
            }
            for (var i = dayFirstActiveDay; i <= 31; i++) {
                if (i < 10) {
                    $('div[data-month="' + monthFirstActiveDay + '"][data-day="0' + i + '"]').addClass('active');
                } else {
                    $('div[data-month="' + monthFirstActiveDay + '"][data-day="' + i + '"]').addClass('active');
                }
            }
        }
    }
    if (dayFirstActiveDay == null || dayLastActiveDay == null || dayLastActiveDay == "null") {
        if (dayFirstActiveDay == null) {
            $("#firstDate").html("");
        }
        if (dayLastActiveDay == null || dayLastActiveDay == "null") {
            $("#lastDate").html("");
        }
    } else {
        var firstDate = dayFirstActiveDay + "." + monthFirstActiveDay + "." + yearFirstActiveDay;
        var lastDate = dayLastActiveDay + "." + monthLastActiveDay + "." + yearLastActiveDay;
        var lastMonth = monthLastActiveDay;
        $("#reisedatenLabel").html("<b>Frühste Hinreise</b><br><span id='firstDate'>" + firstDate + "</span><br><br><b>Späteste Rückreise</b><br><span id='lastDate'>" + lastDate + "</span>");
    }
    var firstDateMonth = $("#StartDate").val().split('.');
    var firstDate = firstDateMonth[0];
    var firstMonth = firstDateMonth[1];
    if (firstMonth === firstMonth) {
        $('div[data-month="' + firstMonth + '"][data-day="' + firstDate + '"]').addClass('firstactive');
    }
    var lastDateMonth = $("#EndDate").val().split('.');
    var lastDate = lastDateMonth[0];
    var lastMonth = lastDateMonth[1];
    $('div[data-month="' + lastMonth + '"][data-day="' + lastDate + '"]').addClass('lastactive');
    closeOverlay('Time', false);
    console.log("success");
}
/************ ************ ADDING THE START DATE AND END DATE AS "FRÜHSTE HINREISE UND SPÄTESTE RÜCKREISE" : ADDED BY RIYAD ************ ************/
function calendarClickHandler(dispatcher) {
    // var calendarType = $(dispatcher).parents(".cmsDatePicker").data("calendartype");

    var firstActiveDay = $('.cmsDatePicker__day.firstactive');

    if (firstActiveDay.length == 1) {

        var dayFirstActiveDay = firstActiveDay.data("day");
        var monthFirstActiveDay = firstActiveDay.data("month");
        var yearFirstActiveDay = firstActiveDay.data("year");
    }
    var firstDate = [dayFirstActiveDay, monthFirstActiveDay, yearFirstActiveDay].join('.');
    $("#StartDate").val(firstDate);
    var lastActiveDay = $('.cmsDatePicker__day.lastactive');

    if (lastActiveDay.length == 1) {

        var dayLastActiveDay = lastActiveDay.data("day");
        var monthLastActiveDay = lastActiveDay.data("month");
        var yearLastActiveDay = lastActiveDay.data("year");
        var lastDate = [dayLastActiveDay, monthLastActiveDay, yearLastActiveDay].join('.');
        $("#EndDate").val(lastDate);
        $("#reisedatenLabel").html("<b>Frühste Hinreise</b><br><span id='firstDate'>" + firstDate + "</span><br><br><b>Späteste Rückreise</b><br><span id='lastDate'>" + lastDate + "</span>");
    } else {
        var emptyLastDateMessage = "bitte auswählen"
        $("#reisedatenLabel").html("<b>Frühste Hinreise</b><br><span id='firstDate'>" + firstDate + "</span><br><br><b>Späteste Rückreise</b><br><span id='lastDate'>" + emptyLastDateMessage + "</span>");
    }
}
/************ ************ DAY CLICK HANDLER FOR SAVING THE VALU INTO LOCAL STORAGE AS WELL AS : ADDED BY RIYAD ************ ************/
$('.searchOverlayCloseTime').click(function(event) {
    var dayFirstActiveDay = localStorage.getItem('dd') || '';
    var monthFirstActiveDay = localStorage.getItem('mm') || '';
    var yearFirstActiveDay = localStorage.getItem('yy') || '';
    var dayLastActiveDay = localStorage.getItem('ldd') || '';
    var monthLastActiveDay = localStorage.getItem('lmm') || '';
    var yearLastActiveDay = localStorage.getItem('lyy') || '';
    //getting First Date value from user clicked
    var firstActiveDay = $('.cmsDatePicker__day.firstactive');
    if (firstActiveDay.length == 1) {
        var dayFirstActiveDay = firstActiveDay.data("day");
        var monthFirstActiveDay = firstActiveDay.data("month");
        var yearFirstActiveDay = firstActiveDay.data("year");
    }
    //setting the First Date value into the session
    localStorage.setItem('dd', dayFirstActiveDay);
    localStorage.setItem('mm', monthFirstActiveDay);
    localStorage.setItem('yy', yearFirstActiveDay);
    //getting Last Date value from user clicked
    var lastActiveDay = $('.cmsDatePicker__day.lastactive');
    if (lastActiveDay.length == 1) {
        var dayLastActiveDay = lastActiveDay.data("day");
        var monthLastActiveDay = lastActiveDay.data("month");
        var yearLastActiveDay = lastActiveDay.data("year");
    }
    //setting the Last Date value into the session
    localStorage.setItem('ldd', dayLastActiveDay);
    localStorage.setItem('lmm', monthLastActiveDay);
    localStorage.setItem('lyy', yearLastActiveDay);
});
/************ ************RENDER THE START DATE,END DATE, AND COUNTRYLIST INTO SEARCH TABS  : ADDED BY RIYAD ************ ************/
$(function() {
    var startDate = [localStorage.getItem('dd'), localStorage.getItem('mm'), localStorage.getItem('yy')].join('.');
    var endDate = [localStorage.getItem('ldd'), localStorage.getItem('lmm'), localStorage.getItem('lyy')].join('.');
    if (startDate.length == 10 && endDate.length == 10) {
        $('#StartDate').val(startDate);
        $('#EndDate').val(endDate);
        $('#overlayopenerTime').text(startDate + ' - ' + endDate);
    }

    if (!localStorage.getItem('dd')) {
        var today = new Date();
        var day = today.getUTCDate();
        var lastday = (y, m) => { return new Date(y, m + 1, 0).getDate(); }
        var year = today.getUTCFullYear();
        var stringYear = year.toString();
        var monthLastDay = lastday(year, 11)
        var currentMonth = today.getMonth() + 1;
        var secondMonth = today.getMonth() + 1;
        var secondeDay = day + 14;
        var restOfTheDay = '';
        var exacteDay = '';



        if (secondeDay > 31) {
            restOfTheDay = monthLastDay - day;
            exacteDay = 14 - restOfTheDay;
            secondeDay = exacteDay;
            if (secondeDay < 10) {
                secondeDay = '0' + secondeDay;
            }
            secondMonth = secondMonth + 1;
            if (secondMonth < 10) {
                secondMonth = '0' + secondMonth;
            }

        }

        if (secondMonth > currentMonth) {
            secondCalenderMonth = secondMonth + '' + stringYear;
        }
        if (currentMonth < 10) {
            currentMonth = '0' + currentMonth;

        }
        if (secondMonth < 10) {
            secondMonth = '0' + secondMonth;
        }

        if (day < 10) {
            day = '0' + day;
        }

        var firstDate = [day, currentMonth, stringYear].join('.');
        var lastDate = [secondeDay, secondMonth, stringYear].join('.');
        $('#StartDate').val(firstDate);
        $('#EndDate').val(lastDate);
        $('#overlayopenerTime').text(firstDate + ' - ' + lastDate);
    }

    //For showing the Country List value into search Tab input[REISELAND]  by taking localstorage
    var countryStorageValue = localStorage.getItem('cl');
    if (countryStorageValue != null) {
        if (countryStorageValue.length > 0) {
            var valueTokens = countryStorageValue.split(/[!@#$%^&*/,]/),
                result = [],
                depth = 0;
            valueTokens.forEach(function scan(token) {
                if (!token)
                    return;
                if (token === "/") {
                    ++depth;
                    return;
                }
                if (token === ",") {
                    --depth;
                    return;
                }
                result.push(token);
            });
            var getting = result;
            var getCountryID = getting.filter(item => item.length < 3);
            var convertToString = getCountryID.toString()
            $("#CountryCount").val(convertToString);
            var removeString = getting.filter(item => item.length > 3);
            if (removeString.length == 1) {
                $("#overlayopenerDestinations").html(removeString);
            } else {
                $("#overlayopenerDestinations").html(removeString.length + " Länder");
            }
        }
    }
});
/************ ************FOR CLOSING SEARCH OPTIONS : ADDED BY RIYAD ************ ************/
function closeOverlay(overlayName, isFilter) {
    $(".searchOverlayClose" + overlayName).click(function() {
        $("#overlay" + overlayName).fadeOut();
        enableBodyScroll();
    });
}
closeOverlay('Time');
closeOverlay('Destinations');
/************ ************FOR SHOWING THE TRAVEL COUNTRY LIST : ADDED BY RIYAD ************ ************/
function showCountryList(event) {
    var countryStorageValue = localStorage.getItem('cl');
    $.ajax({
            url: g_rootUrl + "/_ajax/controller.cfm",
            data: {
                action: "getCountryList",
                controller: "searchMask",
                selectedCountryValue: countryStorageValue
            },
        })
        .done(function(result) {
            if (result.length > 1) {
                $('#travelCountryList').html(result);
                $("#alle_reiseziele").click(function() {
                    $('#countryCheckbox input:checkbox').prop('checked', this.checked);
                });

                if (!localStorage.getItem('cl')) {
                    $('#countryCheckbox input:checkbox').attr("checked", true)
                }

                if (countryStorageValue) {
                    var separatedCountriesList = countryStorageValue.split(",");
                    for (var i = 0; i <= separatedCountriesList.length; i++) {
                        $(':checkbox[value="' + separatedCountriesList[i] + '"]').attr("checked", true);
                    }
                }
            }
            closeOverlay('Destinations', false);
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}
/************ ************ FOR BUTTON VALIDATION FROM CLIENT SIDE  : ADDED BY RIYAD ************ ************/
/* If need then use
$(".travelSearch__submitButton").click(function(event) {
    if ($("#CountryCount").val().length == 0) {
        event.preventDefault();
        alertMX('Reiseland muss auswählen!');
        //alert("Reiseland muss auswählen");
    }
});

$("<style type='text/css'>#boxMX{display:none;background: #333;padding: 10px;border: 2px solid #ddd;float: left;font-size: 1.2em;position: fixed;top: 50%; left: 50%;z-index: 99999;box-shadow: 0px 0px 20px #999; -moz-box-shadow: 0px 0px 20px #999; -webkit-box-shadow: 0px 0px 20px #999; border-radius:6px 6px 6px 6px; -moz-border-radius: 6px; -webkit-border-radius: 6px; font:13px Arial, Helvetica, sans-serif; padding:6px 6px 4px;width:300px; color: white;}</style>").appendTo("head");

function alertMX(t) {
    $("body").append($("<div id='boxMX'><p class='msgMX'></p><p>CLOSE</p></div>"));
    $('.msgMX').text(t);
    var popMargTop = ($('#boxMX').height() + 24) / 2,
        popMargLeft = ($('#boxMX').width() + 24) / 2;
    $('#boxMX').css({ 'margin-top': -popMargTop, 'margin-left': -popMargLeft }).fadeIn(600);
    $("#boxMX").click(function() { $(this).remove(); });
};*/

/************ ************ SETTING THE DATE VALUE INTO [REISEZEIT] INPUT BOX  : ADDED BY RIYAD ************ ************/
function setDateValue(result) {
    if (result == 'Time') {
        $("#overlayopenerTime").html($("#StartDate").val() + " - " + $("#EndDate").val());
    } else if (result == 'Destinations') {
        //For showing the Country List value into search Tab input[REISELAND]  by clicking Übernehemn Button
        var check = "";
        $.each($("input[name='countries']:checked"), function() {
            check = check + $(this).val() + ",";
        });
        var valueString = check.substring(0, check.length - 1);
        localStorage.setItem('cl', valueString);
        var valueTokens = valueString.split(/[!@#$%^&*/,]/),
            result = [],
            depth = 0;
        valueTokens.forEach(function scan(token) {
            if (!token) return;
            if (token === "/") {
                depth++;
                return;
            }
            if (token === ",") {
                depth--;
                return;
            }
            result.push(token);
        });
        var getting = result;
        var removeString = getting.filter(item => item.length < 3);
        var settheValue = $("#CountryCount").val(removeString);
        var checkboxes = $(".cheking:checked").length;
        var checkboxesValue = $(".cheking:checked").val();
        if (checkboxes == 1) {
            $("#overlayopenerDestinations").html(getting[1]);
        } else if (checkboxes > 1) {
            $("#overlayopenerDestinations").html(checkboxes + " Länder");
        } else {
            $("#overlayopenerDestinations").html('Reiseland');
        }
    }
}
/************ ************ FOR RENDERING (SUCHBEGRIFF) SEARCH INPUT TEXT  : ADDED BY RIYAD ************ ************/
function getSearchItem() {
    var dInput = $('#searchItem').val();
    $.ajax({
            url: g_rootUrl + "/_ajax/controller.cfm?_t=" + Math.random(),
            type: "POST",
            data: {
                controller: 'searchMask',
                action: 'getSearchItemLists',
                dInput: dInput
            },
            dataType: 'json',
        })
        .done(function(result) {

            $('#suggetionsBox').html(result.html);

            if ($("#searchItem").val().length > 0) {
                $("#suggetionsBox").show();
            } else {
                $("#suggetionsBox").hide();
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}
/************ ************ FOR SEARCH ITEM VALUE SET TO "SUCHBEGRIFF" INPUT FIELD  : ADDED BY RIYAD ************ ************/
$(document).on('click', '#getTheSearchValue', function(event) {
    var searchValue = $(this).text();
    $('#searchItem').val(searchValue);
    this.parentNode.parentNode.parentNode
        .removeChild(this.parentNode.parentNode);
    return false;
});

function closeSearch(overlayName) {
    $("#overlayopener" + overlayName).click(function() {
        $("#suggetionsBox").hide();
        enableBodyScroll();
    });
}
closeSearch('Filter');
closeSearch('Time');
closeSearch('Destinations');

$("#searchItem").on("click", function() {
    $(this).select();
});

$('#searchItem').mousemove(function() {
    if ($('#searchItem').val().length == 0) {
        localStorage.removeItem('searchItem');
    };
})

$(window).click(function(e) {
    $("#suggetionsBox").hide();
});

$(function() {
    $("button[type='submit']").click(function(event) {
        var searchValue = $('#searchItem').val()
        localStorage.setItem('searchItem', searchValue);
        var getSearchItemValueFromLocal = localStorage.getItem('searchItem') || '';
        $('#searchItem').val(getSearchItemValueFromLocal);

    });
});
/************ ************ FOR RENDERING OFFER BY USING FILTER RANGESLIDER OPTION & CHECKBOX OPTION  : ADDED BY RIYAD ************ ************/
$(document).on('change', '.searchFilter__innerWrapper', function(event) {
    /*    debugger;*/
    var countryStorageValue = localStorage.getItem('cl');
    var valueTokens = countryStorageValue.split(/[!@#$%^&*/,]/),
        result = [],
        depth = 0;
    valueTokens.forEach(function scan(token) {
        if (!token) return;
        if (token === "/") {
            depth++;
            return;
        }
        if (token === ",") {
            depth--;
            return;
        }
        result.push(token);
    });
    var getting = result;
    var removeString = getting.filter(item => item.length < 3);

    var CountryCount = removeString.toString();
    var $checkedItem = $("input[name='reisethema']:checked");
    var sliderrange = $('input[type="range"]').rangeslider().val();
    var checkedValue = [];
    var standard = 10;
    var superior = 20;
    var deluxe = 30;
    var rangedValue;
    if (sliderrange > 0 && sliderrange < 20) {
        rangedValue = "";

    } else if (sliderrange >= 20 && sliderrange <= 50) {
        rangedValue = standard;
    } else if (sliderrange >= 50 && sliderrange <= 85) {
        rangedValue = superior;
    } else if (sliderrange >= 85) {
        rangedValue = deluxe;
    }
    $checkedItem.each(function(index, elem) {
        checkedValue.push($(elem).val());
    });
    checkedValue = checkedValue.join(',');
    var $searchList = $('#searchList');
    $.ajax({
            url: g_rootUrl + "/_ajax/controller.cfm",
            type: 'POST',
            data: {
                controller: 'searchOfferLists',
                action: 'renderSearchOfferLists',
                checkedValue: checkedValue,
                rangedValue: rangedValue,
                countryCount: CountryCount
            },
        })
        .done(function(result) {
            $searchList.html(result);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
});


// QUANTITY SELECTOR

// add parent
$(".quantitySelector__quantityChanger--plusParent").click( function()
{
  var quantity = $(this).parent().find(".quantitySelector__quantityField").html();

  if (quantity <= 4) {
    quantity = parseInt(quantity) + 1;
    $( '#ANZPERS' ).val(quantity);
    $(this).parent().find(".quantitySelector__quantityField").html(quantity);
  }


  disableQuantityChangerParents(quantity);

})

//reduce parent

$(".quantitySelector__quantityChanger--minusParent").click( function()
{
  var quantity = $(this).parent().find(".quantitySelector__quantityField--parent").html();

  if (quantity >= 2) {
    quantity = parseInt(quantity) - 1;
    $( '#ANZPERS' ).val(quantity);
    $(this).parent().find(".quantitySelector__quantityField--parent").html(quantity);
  }

  disableQuantityChangerParents(quantity);

})

// parent selector disabling/enabling

function disableQuantityChangerParents(quantityHelper){

  if( quantityHelper <= 1) {
    $(".quantitySelector__quantityChanger--minusParent").addClass("quantitySelector__quantityChanger--disabled");
  } else if( quantityHelper >= 5 ){
    $(".quantitySelector__quantityChanger--plusParent").addClass("quantitySelector__quantityChanger--disabled");
  } else {
    $(".quantitySelector__quantityChanger--plusParent").removeClass("quantitySelector__quantityChanger--disabled");
    $(".quantitySelector__quantityChanger--minusParent").removeClass("quantitySelector__quantityChanger--disabled");

  }

}

// add child
$(".quantitySelector__quantityChanger--plusToddler").click( function()
{
  var quantity = $(this).parent().find(".quantitySelector__quantityField").html();

  if (quantity < 3) {
    quantity = parseInt(quantity) + 1;
    $( '#ANZTODD' ).val(quantity);
    $(this).parent().find(".quantitySelector__quantityField").html(quantity);
  }

  disableQuantityChangerToddler(quantity);
})

//reduce child

$(".quantitySelector__quantityChanger--minusToddler").click( function()
{
  var quantity = $(this).parent().find(".quantitySelector__quantityField--toddler").html();

  if (quantity > 0) {
    quantity = parseInt(quantity) - 1;
    $( '#ANZTODD' ).val(quantity);
    $(this).parent().find(".quantitySelector__quantityField--toddler").html(quantity);
  }

  disableQuantityChangerToddler(quantity);

})

// toddler selector disabling/enabling

function disableQuantityChangerToddler(quantityHelper){

  console.log(quantityHelper);

  if( quantityHelper == 0) {
    $(".quantitySelector__quantityChanger--minusToddler").addClass("quantitySelector__quantityChanger--disabled");
  } else if( quantityHelper == 3){
    $(".quantitySelector__quantityChanger--plusToddler").addClass("quantitySelector__quantityChanger--disabled");
  } else {
    $(".quantitySelector__quantityChanger--minusToddler").removeClass("quantitySelector__quantityChanger--disabled");
    $(".quantitySelector__quantityChanger--plusToddler").removeClass("quantitySelector__quantityChanger--disabled");
  }


  //  else if( quantityHelper >= 1){
  //   $(".quantitySelector__quantityChanger--minusChild").removeClass("quantitySelector__quantityChanger--disabled");
  // }

}

// add child
$(".quantitySelector__quantityChanger--plusChild").click( function()
{
  var quantity = $(this).parent().find(".quantitySelector__quantityField").html();

  if (quantity < 3) {
    quantity = parseInt(quantity) + 1;
    $( '#ANZCHILD' ).val(quantity);
    $(this).parent().find(".quantitySelector__quantityField").html(quantity);
  }

  disableQuantityChangerChilds(quantity);
})

//reduce child

$(".quantitySelector__quantityChanger--minusChild").click( function()
{
  var quantity = $(this).parent().find(".quantitySelector__quantityField--child").html();

  if (quantity > 0) {
    quantity = parseInt(quantity) - 1;
    $( '#ANZCHILD' ).val(quantity);
    $(this).parent().find(".quantitySelector__quantityField--child").html(quantity);
  }

  disableQuantityChangerChilds(quantity);

})

// child selector disabling/enabling

function disableQuantityChangerChilds(quantityHelper){

  console.log(quantityHelper);

  if( quantityHelper == 0) {
    $(".quantitySelector__quantityChanger--minusChild").addClass("quantitySelector__quantityChanger--disabled");
  } else if( quantityHelper == 3){
    $(".quantitySelector__quantityChanger--plusChild").addClass("quantitySelector__quantityChanger--disabled");
  } else {
    $(".quantitySelector__quantityChanger--minusChild").removeClass("quantitySelector__quantityChanger--disabled");
    $(".quantitySelector__quantityChanger--plusChild").removeClass("quantitySelector__quantityChanger--disabled");
  }


  //  else if( quantityHelper >= 1){
  //   $(".quantitySelector__quantityChanger--minusChild").removeClass("quantitySelector__quantityChanger--disabled");
  // }

}


// CHILD SELECTMENU
//$( "#childAge_1" ).selectmenu();
//$( "#childAge_2" ).selectmenu();



/************ ************ DOCUMENT FUNCTIONS ************ ************/
$(document).ready(function() {
    magicBackstretch();
    positionTravelsearch();
    positionContact();
    setStartscreenHeight();
    setHighOfferHeadline();
    setBubbleteaserHeadlines();
    //detailGallerySettings();
    positionStartscreenSlogan();
    setEqualheight();
    setDetailTabs();
});
$(window).resize(function() {
    positionTravelsearch();
    positionContact();
    setStartscreenHeight();
    setHighOfferHeadline();
    setBubbleteaserHeadlines();
    //detailGallerySettings();
    positionStartscreenSlogan();
    setDetailTabs();
});