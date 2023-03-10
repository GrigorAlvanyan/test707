/*
 * Slug 2.1.1, jQuery plugin
 *
 * Copyright(c) 2016, Samuel De Backer
 * http://www.typi.be
 *
 * Fill a field with a slug generated from another field value.
 * Add data-slug="origin-field-id" attribute to a slug field.
 *
 * Inspired by jQuery slugIt plug-in
 * https://github.com/diegok/slugit-jquery/blob/master/jquery.slugit.js
 * Thanks to the jQuery community
 * Licenced under the MIT Licence
 */
(function ($) {
    'use strict';

    var methods = {
        init: function () {
            return this.each(function () {

                var self = this;

                this.titleField = $('[id="' + $(this).data('slug') + '"]');
                this.slugGenerateButton = $(this).parent().find('.btn-slug');

                if (!this.titleField.val()) {
                    this.titleField.keyup(function () {
                        var slug = methods.convertToSlug($(this).val());
                        $(self).val(slug);
                    });
                }

                this.slugGenerateButton.click(function () {
                    var string = self.titleField.val(),
                        slug = methods.convertToSlug(string);
                    $(self).val(slug);
                    return false;
                });

            });
        },
        convertToSlug: function (text) {

            var defaults = {
                    separator: '-',
                    map: false,
                    before: false,
                    after: false
                },
                opts = defaults,
                chars = {},
                slug = '',
                i;

            chars = methods.latin_map();
            chars = jQuery.extend(chars, methods.greek_map());
            chars = jQuery.extend(chars, methods.turkish_map());
            chars = jQuery.extend(chars, methods.russian_map());
            chars = jQuery.extend(chars, methods.ukranian_map());
            chars = jQuery.extend(chars, methods.czech_map());
            chars = jQuery.extend(chars, methods.latvian_map());
            chars = jQuery.extend(chars, methods.polish_map());
            chars = jQuery.extend(chars, methods.symbols_map());
            chars = jQuery.extend(chars, methods.currency_map());

            text = jQuery.trim(text.toString());

            for (i = 0; i < text.length; i++) {
                if (chars[text.charAt(i)]) {
                    slug += chars[text.charAt(i)];
                } else {
                    slug += text.charAt(i);
                }
            }

            // Ensure separator is composable into regexes
            var sep_esc = opts.separator.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            var re_trail = new RegExp('^' + sep_esc + '+|' + sep_esc + '+$', 'g');
            var re_multi = new RegExp(sep_esc + '+', 'g');

            slug = slug.replace(/[^-\w]/g, opts.separator); // swap spaces and unwanted chars
            slug = slug.replace(re_trail, '');              // trim leading/trailing separators
            slug = slug.replace(re_multi, opts.separator);  // eliminate repeated separatos
            slug = slug.toLowerCase();

            return slug;

        },

        latin_map: function () {
            return {
                '??':'A', '??':'A', '??':'A', '??':'A', '??':'A', '??':'A', '??':'AE', '??':'C',
                '??':'E', '??':'E', '??':'E', '??':'E', '??':'I', '??':'I', '??':'I', '??':'I',
                '??':'D', '??':'N', '??':'O', '??':'O', '??':'O', '??':'O', '??':'O', '??':'O',
                '??':'O', '??':'U', '??':'U', '??':'U', '??':'U', '??':'U', '??':'Y', '??':'TH',
                '??':'ss', '??':'a', '??':'a', '??':'a', '??':'a', '??':'a', '??':'a', '??':'ae',
                '??':'c', '??':'e', '??':'e', '??':'e', '??':'e', '??':'i', '??':'i', '??':'i',
                '??':'i', '??':'d', '??':'n', '??':'o', '??':'o', '??':'o', '??':'o', '??':'o',
                '??':'o', '??':'o', '??':'u', '??':'u', '??':'u', '??':'u', '??':'u', '??':'y',
                '??':'th', '??':'y'
            };
        },

        greek_map: function () {
            return {
                '??':'a', '??':'b', '??':'g', '??':'d', '??':'e', '??':'z', '??':'h', '??':'8',
                '??':'i', '??':'k', '??':'l', '??':'m', '??':'n', '??':'3', '??':'o', '??':'p',
                '??':'r', '??':'s', '??':'t', '??':'y', '??':'f', '??':'x', '??':'ps', '??':'w',
                '??':'a', '??':'e', '??':'i', '??':'o', '??':'y', '??':'h', '??':'w', '??':'s',
                '??':'i', '??':'y', '??':'y', '??':'i',
                '??':'A', '??':'B', '??':'G', '??':'D', '??':'E', '??':'Z', '??':'H', '??':'8',
                '??':'I', '??':'K', '??':'L', '??':'M', '??':'N', '??':'3', '??':'O', '??':'P',
                '??':'R', '??':'S', '??':'T', '??':'Y', '??':'F', '??':'X', '??':'PS', '??':'W',
                '??':'A', '??':'E', '??':'I', '??':'O', '??':'Y', '??':'H', '??':'W', '??':'I',
                '??':'Y'
            };
        },

        turkish_map: function () {
            return {
                '??':'s', '??':'S', '??':'i', '??':'I', '??':'c', '??':'C', '??':'u', '??':'U',
                '??':'o', '??':'O', '??':'g', '??':'G'
            };
        },

        russian_map: function () {
            return {
                '??':'a', '??':'b', '??':'v', '??':'g', '??':'d', '??':'e', '??':'yo', '??':'zh',
                '??':'z', '??':'i', '??':'j', '??':'k', '??':'l', '??':'m', '??':'n', '??':'o',
                '??':'p', '??':'r', '??':'s', '??':'t', '??':'u', '??':'f', '??':'h', '??':'c',
                '??':'ch', '??':'sh', '??':'sh', '??':'', '??':'y', '??':'', '??':'e', '??':'yu',
                '??':'ya',
                '??':'A', '??':'B', '??':'V', '??':'G', '??':'D', '??':'E', '??':'Yo', '??':'Zh',
                '??':'Z', '??':'I', '??':'J', '??':'K', '??':'L', '??':'M', '??':'N', '??':'O',
                '??':'P', '??':'R', '??':'S', '??':'T', '??':'U', '??':'F', '??':'H', '??':'C',
                '??':'Ch', '??':'Sh', '??':'Sh', '??':'', '??':'Y', '??':'', '??':'E', '??':'Yu',
                '??':'Ya'
            };
        },

        ukranian_map: function () {
            return {
                '??':'Ye', '??':'I', '??':'Yi', '??':'G', '??':'ye', '??':'i', '??':'yi', '??':'g'
            };
        },

        czech_map: function () {
            return {
                '??':'c', '??':'d', '??':'e', '??': 'n', '??':'r', '??':'s', '??':'t', '??':'u',
                '??':'z', '??':'C', '??':'D', '??':'E', '??': 'N', '??':'R', '??':'S', '??':'T',
                '??':'U', '??':'Z'
            };
        },

        polish_map: function () {
            return {
                '??':'a', '??':'c', '??':'e', '??':'l', '??':'n', '??':'o', '??':'s', '??':'z',
                '??':'z', '??':'A', '??':'C', '??':'e', '??':'L', '??':'N', '??':'o', '??':'S',
                '??':'Z', '??':'Z'
            };
        },

        latvian_map: function () {
            return {
                '??':'a', '??':'c', '??':'e', '??':'g', '??':'i', '??':'k', '??':'l', '??':'n',
                '??':'s', '??':'u', '??':'z', '??':'A', '??':'C', '??':'E', '??':'G', '??':'i',
                '??':'k', '??':'L', '??':'N', '??':'S', '??':'u', '??':'Z'
            };
        },

        currency_map: function () {
            return {
                '???':'euro', '$':'dollar', '???':'cruzeiro', '???':'french franc', '??':'pound',
                '???':'lira', '???':'mill', '???':'naira', '???':'peseta', '???':'rupee',
                '???':'won', '???':'new shequel', '???':'dong', '???':'kip', '???':'tugrik',
                '???':'drachma', '???':'penny', '???':'peso', '???':'guarani', '???':'austral',
                '???':'hryvnia', '???':'cedi', '??':'cent', '??':'yen', '???':'yuan',
                '???':'yen', '???':'rial', '???':'ecu', '??':'currency', '???': 'baht'
            };
        },

        symbols_map: function symbols_map() {
            return {
                '??':'(c)', '??':'oe', '??':'OE', '???':'sum', '??':'(r)', '???':'+',
                '???':'"', '???':'"', '???':"'", '???':"'", '???':'d', '??':'f', '???':'tm',
                '???':'sm', '???':'...', '??':'o', '??':'o', '??':'a', '???':'*',
                '???':'delta', '???':'infinity', '???':'love', '&':'and', '???':'e', '??':'2', '??':'3', '??':'x'
            };
        }
    };
    $.fn.slug = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.slug');
        }
    };

    // launch plugin
    $('[data-slug]').slug();

})(jQuery);
