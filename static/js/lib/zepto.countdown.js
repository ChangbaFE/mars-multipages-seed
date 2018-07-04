;
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['Zepto'], factory);
    } else {
        factory(Zepto);
    }
})(function($) {

    var PRECISION = 1000; // 0.1 seconds, used to update the DOM
    var instances = [],
        matchers = [];
    // Miliseconds
    // matchers.push(/^[0-9]*$/.source);
        matchers.push(/^[0-9]*$/.source);
    // Month/Day/Year [hours:minutes:seconds
    // matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
       matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    // Year/Day/Month [hours:minutes:seconds
    // matchers.push(/[0-9]{4}(\/[0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
       matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    // Cast the matchers to a regular expression object
    matchers.push(/^[0-9]*$/.source);
    matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers = new RegExp(matchers.join("|"));
    // Parse a Date formatted has String to a native object
    function parseDateString(dateString) {
        // Pass through when a native object is sent 
        if (dateString instanceof Date) {
            return dateString;
        }
        // Caste string to date object
        if (String(dateString).match(matchers)) {
            // If looks like a milisecond value cast to number before 
            // final casting (Thanks to @msigley)
            if (String(dateString).match(/^[0-9]*$/)) {
                dateString = Number(dateString);
            }
            if (String(dateString).match(/\-/)) {
                dateString = String(dateString).replace(/\-/g, "/");
            }
            // return new Date(dateString);
            return new Date(dateString);
        } else {
            throw new Error("Couldn't cast `" + dateString + "` to a date object.");
        }
    }

    var DIRECTIVE_KEY_MAP = {
        'Y': 'years',
        'm': 'months',
        'w': 'weeks',
        'd': 'days',
        'D': 'totalDays',
        'H': 'hours',
        'M': 'minutes',
        'S': 'seconds'
    };

    // Time string formatter 
    function strftime(offsetObject) {
        // console.log(offsetObject)
        return function(format) {
            // console.log(format)
            var directives = format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (directives) {
                for (var i = 0, len = directives.length; i < len; ++i) {
                    var directive = directives[i]
                        .match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        regexp = new RegExp(directive[0]),
                        modifier = directive[1] || '',
                        plural = directive[3] || '',
                        value = null;
                    // Get the key
                    directive = directive[2];
                    // Swap shot-versions directives
                    if (DIRECTIVE_KEY_MAP.hasOwnProperty(directive)) {
                        value = DIRECTIVE_KEY_MAP[directive];
                        value = Number(offsetObject[value]);
                    }
                    if (value !== null) {
                        // Pluralize
                        if (modifier === '!') {
                            value = pluralize(plural, value);
                        }
                        // Add zero-padding
                        if (modifier === '') {
                            if (value < 10) {
                                value = '0' + value.toString();
                            }
                        }
                        // Replace the directive
                        format = format.replace(regexp, value.toString());
                    }
                }
            }
            format = format.replace(/%%/, '%');
            return format;
        };
    }
    // Pluralize
    function pluralize(format, count) {
        var plural = 's',
            singular = '';
        if (format) {
            format = format.replace(/(:|;|\s)/gi, '').split(/\,/);
            if (format.length === 1) {
                plural = format[0];
            } else {
                singular = format[0];
                plural = format[1];
            }
        }
        if (Math.abs(count) === 1) {
            return singular;
        } else {
            return plural;
        }
    }

    function fireEvent(el, type, extra) {
        var ev = document.createEvent("HTMLEvents");
        // console.log(type);
        ev.initEvent(type, true, true)
        for (var key in extra) {
            ev[key] = extra[key]
            // console.log(extra[key])
        }
        el.dispatchEvent(ev);
        // console.log(el);
    }
    $.fn.On = function(name, cb) {
            if ($ == Zepto) {
                this.get(0).addEventListener(name, cb);
            } else {
                this.$el.on(name, callback);
            }
        }
        // The Final Countdown
    var Countdown = function(el, finalDate, callback) {
        this.el = el;
        this.$el = $(el);
        this.interval = null;
        this.offset = {};
        // Set the final date
        this.setFinalDate(finalDate);
        // Register this instance
        this.instanceNumber = instances.length;
        instances.push(this);
        // Save the reference
        this.$el.data('countdown-instance', this.instanceNumber);
        // Register the callbacks when supplied
        if (callback) {
            this.$el.On('update.countdown', callback);
            this.$el.On('stoped.countdown', callback);
            this.$el.On('finish.countdown', callback);
        }
        this.start();
    };
    Countdown.prototype.start = function() {

        if (this.interval !== null) {
            throw new Error("Countdown is already running!");
        }
        var self = this;
        this.update();
        this.interval = setInterval(function() {
            self.update.call(self);
        }, PRECISION);

    };
    Countdown.prototype.stop = function() {
        clearInterval(this.interval);
        this.interval = null;
        this.dispatchEvent('stoped');
    };
    Countdown.prototype.pause = function() {
        this.stop.call(this);
    };
    Countdown.prototype.resume = function() {
        this.start.call(this);
    };
    Countdown.prototype.remove = function() {
        this.stop();
        delete instances[this.instanceNumber];
    };
    Countdown.prototype.setFinalDate = function(value) {
        this.finalDate = parseDateString(value); // Cast the given date
    };
    Countdown.prototype.update = function() {
        // Stop if dom is not in the html (Thanks to @dleavitt)
        if (this.$el.closest('html').length === 0) {
            this.remove();
            return;
        }
        // Calculate the remaining time
        this.totalSecsLeft = this.finalDate.valueOf() -
            new Date().valueOf(); // In miliseconds
        this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1000);
        this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft;
        // Calculate the offsets
        this.offset = {
            seconds: this.totalSecsLeft % 60,
            minutes: Math.floor(this.totalSecsLeft / 60) % 60,
            hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
            days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
            totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
            weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
            months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
            years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)
        };
        // Dispatch an event
        if (this.totalSecsLeft === 0) {
            this.stop();
            this.dispatchEvent('finish');
        } else {
            this.dispatchEvent('update');
        }

    };
    Countdown.prototype.dispatchEvent = function(eventName) {
        var event = {}; //$.Event(eventName + '.countdown');
        event.finalDate = this.finalDate;
        event.offset = $.extend({}, this.offset);
        event.strftime = strftime(this.offset);
        if ($ == Zepto) {
            // console.log(eventName)
            fireEvent(this.$el.get(0), eventName + '.countdown', event);
        } else {
            this.$el.trigger(event);
        }
        // console.log(this)
        // console.log(event);
    };
    // Register the jQuery selector actions
    $.fn.countdown = function() {

        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        // console.log(argumentsArray[1])
        return this.each(function() {

            var instanceNumber = $(this).data('countdown-instance');
            // console.log(instanceNumber+'agd')
            // Verify if we already have a countdown for this node ...
            if (instanceNumber) {

                var instance = instances[instanceNumber],
                    method = argumentsArray[0];

                // If method exists in the prototype execute
                if (Countdown.prototype.hasOwnProperty(method)) {
                    instance[method].apply(instance,
                        argumentsArray.slice(1));
                    // If method look like a date try to set a new final date
                } else if (String(method).match(/^[$A-Z_][0-9A-Z_$]*$/i) === null) {
                    instance.setFinalDate.call(instance,
                        method);
                } else {
                    $.error('Method %s does not exist on jQuery.countdown'.replace(/\%s/gi, method));
                }
            } else {
                // ... if not we create an instance
                new Countdown(this, argumentsArray[0], argumentsArray[1]);

            }
        });
    };
});