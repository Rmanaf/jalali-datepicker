# jQuery Jalali Date Picker Plugin

The jQuery Jalali Date Picker Plugin is a customizable date picker designed for Persian (Jalali) date selection in web applications. This lightweight and user-friendly plugin simplifies the process of capturing and formatting Persian dates, making it an ideal choice for projects targeting Persian-speaking users.

[![GitHub license](https://img.shields.io/github/license/Rmanaf/jalali-datepicker)](https://github.com/Rmanaf/jalali-datepicker/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Rmanaf/jalali-datepicker)](https://github.com/Rmanaf/jalali-datepicker/issues) 

## Installation

Before using the jQuery Jalali Date Picker Plugin, ensure you have the following dependencies installed:

- [jQuery](https://jquery.com/): A fast and feature-rich JavaScript library.
- [Moment.js](https://momentjs.com/): A powerful library for parsing, formatting, and manipulating dates and times.
- [Jalali Moment (jalali-moment.browser.js)](https://github.com/jalalihaghjoo/jalali-moment): A library for working with Jalali (Persian) dates and times.

You can include these dependencies in your project using script tags or package managers like npm or yarn.

```html
<!-- Include jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Include Moment.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

<!-- Include Jalali Moment -->
<script src="path/to/jalali-moment.browser.js"></script>
```

## Usage

To use the jQuery Jalali Date Picker Plugin, follow these steps:

1. Include the required dependencies in your HTML file, as mentioned in the installation section.

2. Include the jQuery Jalali Date Picker Plugin script in your HTML file:


```html
<!-- Include the jQuery Jalali Date Picker Plugin -->
<script src="path/to/jquery-jalali-datepicker.js"></script>
```

3. Initialize the date picker on your input elements using jQuery. For example, if you have an input element with the ID "datepicker-input," you can initialize it like this:

```js
$(document).ready(function() {
    $('#datepicker-input').jdatepicker({
        // Customize date picker options as needed
    });
});
```

## Options

* `date`: The initial date to display in the date picker.
* `format`: The date format to use for display and input.
* `lang`: The language/locale for the date picker (default is 'fa' for Persian).
* `theme`: Custom CSS classes for styling the date picker.
* `events`: Events that trigger the date picker (e.g., 'click').
* `container`: The HTML element to which the date picker is appended.
* `prevMonthText`: Text for the "previous month" button.
* `nextMonthText`: Text for the "next month" button.
* `dayNames`: Names of days of the week.
* `monthNames`: Names of months.
* `yearRange`: Range of selectable years.
* `placement`: Position of the date picker relative to the input element.
* `weekend`: Days of the week that are considered weekends.
* `minWidth`: Minimum width of the date picker.
* `fullWidth`: Whether the date picker should expand to the full width of the input element.
* `footer`: Whether to display a footer with buttons.
* `today`: Whether to include a "Today" button.
* `year`: Whether to include a year selection dropdown.
* `month`: Whether to include a month selection dropdown.
* `dayOfWeek`: A function to customize the mapping of days of the week.
* `filterDigits`: A function to filter and replace digits in input.
* `filterMonthName`: A function to filter and replace month names in input.
* `beforeHeader`: A function to customize content before the date picker header.
* `afterHeader`: A function to customize content after the date picker header.
* `beforeFooter`: A function to customize content before the date picker footer.
* `afterFooter`: A function to customize content after the date picker footer.

## Demo 
See demo [here](https://rmanaf.github.io/jalali-datepicker/index.html)