(function($) {
    $.fn.cement=function(options) {

        var defaults = {
                'columns': 4,
                'brickSelector': '> *',
                'horizontalGutter': 5,
                'verticalGutter': 5,
                'transitionDuration': '.4s',
            },
            _ = $.extend(defaults, options),
            PARAM_WIDTH = 'w',
            PARAM_HEIGHT = 'h';

        function refresh(event) {
            $(event.data.containers).each(function() {
                var container = $(this);

                // Set default values
                if(container.css('position') === 'static')
                    container.css('position', 'relative');
                var paddingTop = parseInt(container.css('paddingTop').replace(/[^0-9-]/g, '')),
                    paddingLeft = parseInt(container.css('paddingLeft').replace(/[^0-9-]/g, ''));

                // Set variables
                var unit = (container.width() - _.horizontalGutter * (_.columns - 1)) / _.columns,
                    items = container.find(_.brickSelector),
                    matrix = new Array(_.columns + 1).join('0');

                // Iterate over items
                items.each(function() {
                    var item = $(this);

                    // Set default values
                    if(typeof item.data(PARAM_WIDTH) === 'undefined')
                        item.data(PARAM_WIDTH, 1);
                    if(typeof item.data(PARAM_HEIGHT) === 'undefined')
                        item.data(PARAM_HEIGHT, 1);

                    // Fix boundaries
                    if(item.data(PARAM_WIDTH) > _.columns)
                        item.data(PARAM_WIDTH, _.columns);

                    // Define position
                    var index = -1,
                        min = 0,
                        brick = Array.apply(
                                null,
                                new Array(item.data(PARAM_HEIGHT))
                            ).map(function() {
                                return new Array(item.data(PARAM_WIDTH) + 1).join('1')
                            }).join(
                                new Array(_.columns - item.data(PARAM_WIDTH) + 1).join('0')
                            ),
                        search = brick.replace(/0/g, '.').replace(/1/g, '0');
                    do {
                        // Search for an available place
                        var match = matrix.substr(min).match(search);
                        if(!match) {
                            // Not enough place ? Add a row
                            matrix += new Array(item.data(PARAM_WIDTH) + 1).join('0');
                        } else {
                            var index = match.index + min;
                            // Enough place ? Check if we're not at the end of a line
                            var line = matrix.substr(Math.floor(index / _.columns) * _.columns, _.columns) + '1';
                            if(line.indexOf(new Array(item.data(PARAM_WIDTH) + 1).join('0')) == -1) {
                                // End of a line ? Search further
                                matrix += new Array(4 - matrix.length % 4 + 1).join('0');
                                min = (Math.floor(index / _.columns) + 1) * _.columns;
                                index = -1;
                            }
                        }
                    } while(index == -1);

                    // Update matrix
                    var n = search.length,
                        prefix = matrix.substr(0, index),
                        segment = matrix.substr(index, n),
                        suffix = matrix.substr(index + n);
                    matrix = prefix;
                    for(var i = 0; i < n; i++) {
                        matrix += parseInt(segment.charAt(i)) || parseInt(brick.charAt(i));
                    }
                    matrix += suffix;

                    // Positioning element
                    var x = Math.floor(index / _.columns),
                        y = index % _.columns;
                    item.css({
                        'position': 'absolute',
                        'transition-property': 'top, left, bottopm, right',
                        'transition-duration': _.transitionDuration,
                        'top': (x * unit + _.horizontalGutter * (x - 1) + paddingTop) + 'px',
                        'left': (y * unit + _.verticalGutter * (y - 1) + paddingLeft) + 'px',
                        'width': (item.data(PARAM_WIDTH) * unit + _.horizontalGutter * (item.data(PARAM_WIDTH) - 1)) + 'px',
                        'height': (item.data(PARAM_HEIGHT) * unit + _.verticalGutter * (item.data(PARAM_HEIGHT) - 1)) + 'px',
                    });
                });

                container.on('DOMNodeInserted DOMNodeRemoved', {containers: container}, refresh);
            });
        }

        $(window).on('resize', {containers: $(this)}, refresh);
        refresh({data: {containers: $(this)}});

        return this;

    };
})(jQuery);
