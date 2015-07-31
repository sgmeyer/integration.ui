(function (angular) {
    'use strict';

    angular
        .module('hallmark.common')
        .factory('cardClassService', cardClassService);

    cardClassService.$inject = [];

    function cardClassService() {
        return {
            getCardClass: getCardClass
        };


        function getCardClass(index, total) {
            var cardClass = 'card-4-columns-' + ((index % 4) + 1) + ' ';
            cardClass += 'card-3-columns-' + ((index % 3) + 1) + ' ';
            cardClass += 'card-2-columns-' + ((index % 2) + 1) + ' ';

            if (isBottom(total, 4, index)) {
                cardClass += 'card-4-columns-bottom ';
            }
            if (isBottom(total, 3, index)) {
                cardClass += 'card-3-columns-bottom ';
            }
            if (isBottom(total, 2, index)) {
                cardClass += 'card-2-columns-bottom ';
            }
            if (isBottom(total, 1, index)) {
                cardClass += 'card-1-columns-bottom ';
            }

            return cardClass;
        };

        function isBottom(total, columns, index) {
            var bottomRowCount = getBottomRowCount(total, columns);
            if (index + 1 > total - bottomRowCount) {
                return true;
            }
            return false;
        };

        function getBottomRowCount(total, columns) {
            if (total % columns === 0) {
                return columns;
            }
            return total % columns;
        };
    };
})(angular);