/** 
 * jQuery Jalali Date Picker Plugin | v1.0.3 (https://github.com/Rmanaf/jalali-datepicker) 
 * Licensed under MIT (https://github.com/Rmanaf/jalali-datepicker/blob/main/LICENSE) 
 */
// Define an immediately-invoked function that takes jQuery as a parameter
(($) => {
    // Check if the global 'window.jdatepicker' object exists, or initialize it as an empty object
    if (!window.jdatepicker) {
        window.jdatepicker = {};
    }

    // Define a jQuery plugin called 'jdatepicker' that accepts customization options
    $.fn.jdatepicker = function (options) {
        // Initialize default date to the current date using the 'moment' library
        var _today = moment();

        // Define default configuration options for the date picker
        var _defaults = {
            // Date format, language, and various display options
            date: moment(),
            format: 'jYYYY/jM/jD',
            lang: 'fa',
            events: ['click'],
            container: 'body',
            prevMonthText: 'قبل',
            nextMonthText: 'بعد',
            dayNames: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
            monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
            yearRange: [parseInt(_today.format('jYYYY')) - 100, parseInt(_today.format('jYYYY')) + 20],
            placement: 'bottom',
            weekend: [6],
            theme: {},
            target: null,
            targetFormat: 'YYYY-MM-DD hh:mm:ss',
            minWidth: '260px',
            fullWidth: false,
            footer: true,
            today: true,
            year: true,
            month: true,
            dayOfWeek: (d) => {
                if (d > 5) {
                    d = d - 5;
                } else {
                    d = d + 2;
                }
                d = d - 1;
                return d;
            },
            // Function to filter digits in a string
            filterDigits: ((str) => {
                // Define an array of Persian digits
                const digits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
                var newStr = "";
                str = String(str);
                // Replace Latin digits with Persian digits
                for (i = 0; i < str.length; i++) {
                    if (str[i] >= '0' && str[i] <= '9') {
                        newStr += digits[parseInt(str.charAt(i))];
                    } else {
                        newStr += str[i];
                    }
                }
                return newStr;
            }),
             // Function to filter month names in a string
            filterMonthName: ((str) => {
                // Define an array of English month names
                const months = ['Farvardin', 'Ordibehesht', 'Khordaad', 'Tir', 'Mordaad', 'Shahrivar', 'Mehr', 'Aabaan', 'Aazar', 'Dey', 'Bahman', 'Esfand'];
                var newStr = String(str);
                // Replace English month names with Persian month names
                months.forEach(element => {
                    newStr = newStr.replace(element, _defaults.monthNames[months.indexOf(element)]);
                });
                return newStr;
            }),
            beforeHeader: (d) => {
                return ""
            },
            afterHeader: (d) => {
                return ""
            },
            beforeFooter: (d) => {
                return ""
            },
            afterFooter: (d) => {
                return ""
            }

        }

        // Extend the default theme configuration with CSS classes
        Object.keys(_defaults.theme).forEach(objName => {
            _defaults.theme[objName] = ['jdp-' + objName].concat(_defaults.theme[objName]);
        });


        // Iterate over each matched element in the jQuery selection
        return this.each(function () {

            var _t = $(this), _o = { ..._defaults },
                _id = "jdp_" + Math.floor(Math.random() * Date.now()),
                _init, _b, _initialized = false, _header, _body;

            var _tdataset = {};
            var _tdataset_raw = _t.data();

            for (var _dk in _t.data()) {
                if (_dk.indexOf('jdp') === 0) {
                    const _dnk = _dk.replace('jdp', '').replace(/^./, function (match) {
                        return match.toLowerCase();
                    });
                    _tdataset[_dnk] = _tdataset_raw[_dk];
                    if (['date', 'yearRange'].indexOf(_dnk) >= 0) {
                        _tdataset[_dnk] = Function("return " + _tdataset[_dnk])();
                    }
                }
            }

            $.extend(_o, options, _tdataset);

            var _initialDate = _o.date.clone();

            var _cmt = _o.comment || _o.filterDigits(_o.filterMonthName(_today.format(_o.format)));

            // Check if the target element is a <select> or an <input>
            var _tagName = _t[0].tagName.toLowerCase();

            if (_tagName === 'select') {
                // Handle date picker for <select> elements
                var _selectInputHandler = function () {
                    var yeardiff = Math.abs(_o.yearRange[1] - _o.yearRange[0]);

                    for (var y = 0; y < (_o.year ? yeardiff + 1 : 1); y++) {
                        var year = _o.year ? (parseInt(_o.yearRange[0]) + y) : (parseInt(_o.date.format('jYYYY')));

                        for (var m = 0; m < (_o.month ? 12 : 1); m++) {
                            var month = _o.month ? m + 1 : 1;

                            var _sdate = moment(year + '-' + month + '-1', 'jYYYY-jM-jD');

                            _t.append($('<option>', {
                                selected: _o.date.format('jYYYY-jM') === _sdate.format('jYYYY-jM'),
                                value: _sdate.format(_o.targetFormat),
                                text: _o.filterDigits(_o.filterMonthName(_sdate.format(_o.format)))
                            }));
                        }

                    }

                };

                _selectInputHandler();

                _t.on('change', function () {

                    _t.trigger('jdp.change', [{
                        date: moment($(this).val(), _o.targetFormat),
                        value: _t.find("option:selected").text(),
                        format: _o.format,
                        target: _t,
                        targetFormat: _o.targetFormat,
                    }]);
                });

                return;
            } else if (_tagName === 'input') {
                // Handle date picker for <input> elements
                var _hideHandler = function (e) {
                    if (!_b.is(e.target) && _b.has(e.target).length === 0) {
                        hide();
                    }
                }

                var _init = () => {

                    var _date = _o.date.clone();

                    _b = $(`<div id="${_id}" class="${_cl('container')}"></div>`);

                    _header = $(`<div class="${_cl('header')}">` + _o.beforeHeader(_date) +
                        `<div class="${_cl('headerWrap')}" role="group">
                                <select id="${_id}_month_select" class="${_cl('select')}"></select>` +
                        (_o.year ? `<select id="${_id}_year_select" class="${_cl('select')}"></select>` : '') +
                        `</div>` + _o.afterHeader(_date) +
                        `</div>`);

                    _footer = $(`<div class="${_cl('footer')}">` + _o.beforeFooter(_date) +
                        `<div class="${_cl('footerWrap')}" role="group">
                                <button type="button" id="${_id}_prev_btn" class="${_cl('prev')}">${_o.prevMonthText}</button>` +
                        (_o.today ? `<button type="button" id="${_id}_cmt_btn" class="${_cl('day')}">${_cmt}</button>` : '') +
                        `<button type="button" id="${_id}_next_btn" class="${_cl('next')}">${_o.nextMonthText}</button>
                            </div>` + _o.afterFooter(_date) +
                        `</div>`);

                    _body = $(`<div class="${_cl('body')}"></div>`);

                    _b.append(_header, _body);

                    if (_o.footer) {
                        _b.append(_footer);
                    }

                    _t.on('click', (e) => {
                        show();
                    });

                    setDate(_o.date);

                    _initialized = true;
                }

                var show = (d) => {

                    if (!_initialized)
                        return;

                    $(_o.container).append(_b);


                    $('#' + _id + '_prev_btn').on('click', (e) => {

                        _o.date = moment(_o.date).subtract(1, 'jMonth');

                        _updateHeader();

                        _render();

                    });


                    $('#' + _id + '_next_btn').on('click', (e) => {

                        _o.date = _o.date.clone().add(1, 'jMonth');

                        _updateHeader();

                        _render();

                    });


                    $('#' + _id + '_cmt_btn').on('click', (e) => {

                        setDate(_today.clone());

                        _updateHeader();

                        _render();

                    });


                    $('#' + _id + '_month_select').on('change', (e) => {

                        let _currentMonth = _o.date.format('jM') - 1;

                        let _diff = $('#' + _id + '_month_select').val() - _currentMonth;

                        if (_diff != 0) {
                            if (_diff > 0)
                                _o.date = _o.date.clone().add(_diff, 'jMonth');
                            else
                                _o.date = _o.date.clone().subtract(Math.abs(_diff), 'jMonth');
                        }

                        _updateHeader();

                        _render();

                    });

                    $('#' + _id + '_year_select').on('change', (e) => {

                        let _currentYear = _o.date.format('jYYYY');

                        let _diff = $('#' + _id + '_year_select').val() - _currentYear;

                        if (_diff != 0) {
                            if (_diff > 0)
                                _o.date = _o.date.clone().add(_diff, 'jYear');
                            else
                                _o.date = _o.date.clone().subtract(Math.abs(_diff), 'jYear');
                        }

                        _updateHeader();

                        _render();

                    });

                    _updateHeader();

                    _render(d);

                    _locate();

                    $(document).on('mouseup', _hideHandler);

                }

                var _updateHeader = () => {

                    $('#' + _id + '_month_select').empty();
                    $('#' + _id + '_year_select').empty();

                    for (var i = 0; i < _o.monthNames.length; i++) {
                        let _opt = $(`<option value="${i}">${_o.monthNames[i]}</option>`);

                        if ((i + 1) == _o.date.format('jM'))
                            _opt.attr('selected', 'selected');

                        $('#' + _id + '_month_select').append(_opt);
                    }

                    for (var i = _o.yearRange[0]; i <= _o.yearRange[1]; i++) {

                        let _opt = $(`<option value="${i}">
                                ${_o.filterDigits(i)}
                            </option>`);

                        if (i == _o.date.format('jYYYY'))
                            _opt.attr('selected', 'selected');

                        $('#' + _id + '_year_select').append(_opt);

                    }

                }

                var _updateFooter = () => {
                    _cmt = _o.filterDigits(_o.filterMonthName(moment(_o.date).format(_o.format)));
                    $('#' + _id + '_cmt_btn').text(_cmt);
                }

                var hide = () => {
                    $(document).off('mouseup', _hideHandler);
                    _b.remove();
                }

                var setDate = (date) => {

                    let value = _o.filterDigits(_o.filterMonthName(date.clone().format(_o.format)));

                    _o.date = date;
                    _initialDate = date.clone();

                    _t.val(value);

                    if (_o.target) {
                        $(_o.target).val(date.clone().format(_o.targetFormat));
                    }

                    _t.trigger('jdp.change', [{
                        date: date.clone(),
                        value: value,
                        format: _o.format,
                        target: _o.target,
                        targetFormat: _o.targetFormat
                    }]);

                }

                var getDate = () => {
                    return _o.date;
                }

                var _rightOffset = (t) => {
                    return ($(window).width() - (t.offset().left + t.outerWidth()));
                }

                var _locate = () => {

                    var _top, _right;

                    if (_o.placement == 'top') {
                        _top = _t.offset().top - _b.outerHeight();
                        _right = _rightOffset(_t);
                    } else if (_o.placement == 'bottom') {
                        _top = _t.offset().top + _t.outerHeight();
                        _right = _rightOffset(_t);
                    } else if (_o.placement == 'left') {
                        _top = _t.offset().top;
                        _right = _rightOffset(_t) + _b.outerWidth();
                    } else if (_o.placement == 'right') {
                        _top = _t.offset().top;
                        _right = _rightOffset(_t) - _t.outerWidth();
                    }

                    let params = {
                        top: _top,
                        minWidth: _o.minWidth,
                        right: _right
                    }

                    if (_o.fullWidth && (_o.placement == 'top' || _o.placement == 'bottom')) {
                        params.width = _t.outerWidth();
                    }

                    _b.css(params);

                }

                var _cl = (n) => {
                    return (_o.theme[n] || []).join(' ');
                }

                var _render = (d) => {

                    if (typeof d == 'undefined')
                        d = _o.date;

                    _body.empty();

                    let md = moment.isMoment(d) ? d : moment(d);

                    let _firstDay = md.clone().startOf('jMonth');

                    let _currentMonth = _firstDay.format('jM');

                    let _firstDayOfWeek = _o.dayOfWeek(_firstDay.weekday());

                    let _table = $(`<table class="${_cl('table')}"><thead><tr class="${_cl('tableHead')}"></tr></thead><tbody></tbody></table>`);

                    let _thead = _table.find('thead');

                    let _tbody = _table.find('tbody');

                    let _theadrow = _thead.find('tr');

                    for (let i = 0; i < 7; i++) {
                        _theadrow.append(`<th scope="col" class="${_cl('tableHeadCell')}">
                                    <span>${_o.dayNames[i]}</span>
                                </th>`);
                    }

                    let _tr = $('<tr></tr>');

                    for (let i = 0; i < _firstDayOfWeek; i++) {
                        _tr.append(`<td></td>`);
                    }

                    _tbody.append(_tr);



                    for (let i = 0; i <= 35; i++) {


                        let _td = $(`<td></td>`);

                        let _day = _firstDay.clone().add(i, 'days');

                        let _month = _day.format('jM');

                        if (_month != _currentMonth) {
                            break;
                        }

                        let _dayOfWeek = _o.dayOfWeek(_day.weekday());

                        if (_dayOfWeek == 0 && i > 0) {
                            _tr = $('<tr></tr>');
                            _tbody.append(_tr);
                        }


                        let _dnum = $(`<span role="button" class="${_cl('number')}">
                                ${_o.filterDigits(_day.jDate())}
                            </span>`);

                        _dnum.on('click', (e) => {
                            setDate(_day);
                            hide();
                        });


                        if (_o.weekend.indexOf(_dayOfWeek) > -1) {
                            _td.addClass(_cl('weekend'));
                        } else if (_day.isSame(_today, 'day')) {
                            _td.addClass(_cl('today'));
                        }

                        if (_day.format('jYYYY/jM/jD') == _initialDate.format('jYYYY/jM/jD')) {
                            _td.addClass(_cl('selected'));
                        }

                        _td.append(_dnum);

                        _tr.append(_td);

                    }

                    _body.append(_table);

                }

                _init();

            } else {
                // Handle other cases where the target is neither <select> nor <input>
                var _cval = _t.text().trim();
                if (_cval) {
                    _cval = moment(_cval, _o.targetFormat).format(_o.format);
                    _t.text( _o.filterDigits(_o.filterMonthName(_cval)));
                }
            }

        });


    }

})(jQuery)