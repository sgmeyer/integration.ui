// This section should contain synchronous loading of JavaScript files
// Things that have heavy impact on the visual components and are
// considered required.
//
// Also, anything needed to avoid FOUC can go here.
(function (window, modernizr, navigator) {
    window.Browser = {
        IsIe: function () {
            return navigator.appVersion.indexOf("MSIE") !== -1;
        },
        IsIeMobile10: function () {
            return navigator.userAgent.match(/IEMobile\/10\.0/);
        },
        Navigator: navigator.appVersion,
        Version: function () {
            var version = 999; // we assume a sane browser
            if (navigator.appVersion.indexOf("MSIE") !== -1) {
                // bah, IE again, lets downgrade version number
                version = parseFloat(navigator.appVersion.split("MSIE")[1]);
                return version;
            }
        }
    };

    if (!modernizr.mq('only all')) {
        var body = window.document.getElementsByTagName('body')[0];
        var script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.src = "/Scripts/libs/respond.js";
        body.appendChild(script);
    }

    if (!modernizr.svg) {
        $('img[src*="svg"]').attr('src', function () {
            return $(this).attr('src').replace('.svg', '.png');
        });
    }

    /** Used in conjunction with @-ms-viewport { width: device-width; } 
      * support win phone 8 and ie10 snap mode
      * http://timkadlec.com/2013/01/windows-phone-8-and-device-width/
      * http://css-tricks.com/snippets/javascript/fix-ie-10-on-windows-phone-8-viewport/
      */
    (function () {
        if (window.Browser.IsIeMobile10()) {
            var msViewportStyle = window.document.createElement("style");
            msViewportStyle.appendChild(
                window.document.createTextNode("@-ms-viewport{width:auto!important}")
            );
            window.document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
        }
        // IE9-
        if (window.Browser.IsIe() && window.Browser.Version() <= 10) {
            var i = 0;
            var selectBoxes = $(".custom-select-box");
            var $ss = $('#base-stylesheet');
            $ss[0].href = $ss[0].href; //ignore jslint
            for (i; i < selectBoxes.length; i++) {
                $(selectBoxes[i]).removeClass("custom-select-box full-width")
                                 .attr("style", "width:100%")
                                 .find("select")
                                 .removeClass("form-control")
                                 .attr("style", "width:100%");
            }
        }
    }());
}(window, Modernizr, navigator));

// This section should manage our asynchornous conditional loading of 
// dependencies.  Since these load asynchrounously it provides
// better perceived performance.  This is more of a progressive
// enhancement section.
//
// Use this if you don't need a polyfill right away.
(function (window, modernizr) {
    modernizr.load([
        {
            test: modernizr.input.placeholder,
            nope: ['/Scripts/libs/jquery-placeholder/jquery.placeholder.js'],
            callback: function () {
                $("input, textarea").placeholder();
            }
        },
        {
            test: window.JSON,
            nope: ['/Scripts/libs/json3.min.js']
        }
    ]);
}(window, Modernizr));