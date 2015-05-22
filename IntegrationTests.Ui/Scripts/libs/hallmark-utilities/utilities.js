(function (window, $) {
    'use strict';

    var hallmark = window.Hallmark || {};
    hallmark.Helpers = hallmark.Helpers || {};

    hallmark.Helpers.clearSection = function ($element) {
        $element.find('input, textarea').val('');
    };

    hallmark.Helpers.wireUpClearButtons = function ($elements) {
        $elements.on('click', function () {
            if (confirm('Are you sure you want to clear?')) {
                var $element = $($(this).data('selectortoclear'));

                Hallmark.Helpers.clearSection($element);
            }
        });
    };

    hallmark.Helpers.isStringBlank = function (str) {
        return (!str || /^\s*$/.test(str));
    };

    /**
     * Prevent iOS from zooming onfocus
     * https://github.com/h5bp/mobile-boilerplate/pull/108
     * Adapted from original jQuery code here: http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
     *
     * This code was adopted from HTML5 Boilerplates mobile-bp project.  It is used to prevent zoom on
     * mobile iOS mobile devices when they are focused.
     */
    hallmark.Helpers.preventZoom = function () {
        var viewportmeta = window.document.querySelector && window.document.querySelector('meta[name="viewport"]');
        if (viewportmeta && hallmark.Helpers.platform().match(/iPad|iPhone|iPod/i)) {
            var contentString = 'width=device-width,initial-scale=1,maximum-scale=';

            var setViewportOnFocus = function () {
                viewportmeta.content = contentString + '1';
            };

            var setViewportOnBlur = function () {
                viewportmeta.content = contentString + '10';
            };

            $(document).on('focus', 'input, select, textarea', setViewportOnFocus);
            $(document).on('blur', 'input, select, textarea', setViewportOnBlur);
        }
    };

    function isTextInput(node) {
        return ['INPUT', 'TEXTAREA'].indexOf(node.nodeName) !== -1;
    }

    hallmark.Helpers.enablePredictableKeyboard = function () {
        var wireUpEvent = function () {
            document.addEventListener('touchstart', function (e) {
                if (!isTextInput(e.target) && isTextInput(document.activeElement)) {
                    document.activeElement.blur();
                }
            }, false);
        };

        if (hallmark.Helpers.platform().match(/iPad|iPhone|iPod/i)) {
            wireUpEvent();
        }
    };

    hallmark.Helpers.platform = function () {
        return window.navigator.platform;
    };    

    //Helpers to proxy around document.location.    
    //Written in large part to make the subsequent logout related items testable.
    hallmark.Helpers.location =
    {
        //Gets the document.location
        get: function () {
            return document.location;
        },
        //Sets document.location to the supplied value
        set: function (value) {
            document.location = value;
        },
        //returns the origin from document.location
        origin: function () {
            return document.location.origin;
        },
        //Provides access to the search part of document.location.
        search: {
            //Gets the search string minus the leading '?' or the empty string if there is no search string.
            get: function () {
                if (document.location.search.length && document.location.search[0] === '?') {
                    return document.location.search.substring(1);
                }

                return "";
            },
            //Builds a object hash out of the query string parameters.
            getAsHash: function () 
            {
                //Translate the query string into a hash for ease of use.
                //Getting the origin from the parent is core for proper function.
                var obj = {};

                //key=value&keytoo=value -> ['key=value', keytoo=value']
                var allPairsAsString = hallmark.Helpers.location.search.get().split('&');
                for (var i = 0; i < allPairsAsString.length; i++) {
                    //key=value -> ['key', 'value']
                    var kvps = allPairsAsString[i].split('=');

                    //Make sure we at least have ['key']
                    if (kvps.length > 0 && kvps[0]) {
                        //Create the obj.key property and initalize it to null.
                        obj[kvps[0]] = null;

                        //If we have the second position in the array, the value
                        if (kvps.length > 1) {
                            //set obj.key = value
                            obj[kvps[0]] = decodeURIComponent(kvps[1]);
                        }
                    }
                }

                return obj;
            },
            //sets the search part of the url to the provided string.
            set: function (value) {
                document.location.search = value;
            }
        }
    };

    (function (window, hallmark, $) {
        var $iframe = null;
        //Starts the iframe based logout process.
        hallmark.Helpers.beginLogout = function (logoutSrc) {
            $iframe = $('<iframe src="' + logoutSrc + '?origin=' + hallmark.Helpers.location.origin() + '" style="display: none;"></iframe>');
            $('body').append($iframe);
        }

        //Put the handler in the closure here to keep it from being loaded more than once
        $(window).on('message', function (e) {
            var message = JSON.parse(e.originalEvent.data);
            if (message.messageType === 'redirect' && message.url) {
                $iframe.remove();
                hallmark.Helpers.location.set(message.url);
            }
        });
    })(window, hallmark, $);

    //Temporary event listener to capture when the user clicks on a link meant to log them out.
    $('[data-logout-trigger]').on('click', function (e) {
        var url = $(this).attr('data-logout-trigger');
        hallmark.Helpers.beginLogout(url);
        e.preventDefault();
    })

    //Common logic to notify a parent window that this subdomain has finished cleanup.
    hallmark.Helpers.logoutCompleted = function () {
        var obj = hallmark.Helpers.location.search.getAsHash();

        //Tell the parent that clean up is complete
        //Choosing to send a stringified object in order to
        //make it easer to extend with additional features in the future.
        var message = JSON.stringify({ messageType: 'cleaned' });
        parent.postMessage(message, obj.origin);
    }

    $('button[data-loading-text]').on('click', function () {
        var btn = $(this);
        btn.button('loading');
        setTimeout(function () {
            btn.button('reset');
        }, 10000);
    });

    window.Hallmark = hallmark;
}(window, jQuery));