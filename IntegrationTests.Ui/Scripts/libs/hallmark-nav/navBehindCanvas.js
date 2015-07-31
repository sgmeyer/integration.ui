$(document).ready(function () {
    function behindCanvasBrowserCompatibilityFix() { //for firefox 28.0
        var $offCanvasMenu = $('.row-behindcanvas-right .sidebar-behindcanvas');
        if ($offCanvasMenu.hasClass('open')) {
            $offCanvasMenu.removeClass("open");
        } else {
            setTimeout(function () {
                $offCanvasMenu.addClass("open");
            }, 400);
        }
    }

    $('[data-toggle=behindcanvas]').click(function () {
        $('.row-behindcanvas').toggleClass('active');
        $('.navbar-fixed-top').toggleClass('active');
        $('.row-fixed-top').toggleClass('active');
        behindCanvasBrowserCompatibilityFix();
    });
});