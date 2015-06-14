(function ($) {
    function guidDialogId() {
        var s4 = function () {
            return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
        };
        return "XiuCai-" + (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4())
    }
    $.hDialog = function (options) {
        options = $.extend({}, $.hDialog.defaults, options || {});
        var dialogId = guidDialogId();
        if (options.id) {
            dialogId = options.id
        }
        var defaultBtn = [{
            text: "确定",
            iconCls: "icon-ok",
            handler: options.submit
        }, {
            text: "关闭",
            iconCls: "icon-cancel",
            handler: function () {
                $("#" + dialogId).dialog("close");
                $("#" + dialogId).dialog("destroy");

            }
        }];
        
        var threeBtn = [{
            text: "保存",
            iconCls: "icon-ok",
            handler: options.submit
        },
            {
                text: "保存并继续",
                iconCls: "icon-ok",
                handler: options.submitContinue
            },{
            text: "关闭",
            iconCls: "icon-cancel",
            handler: function () {
                $("#" + dialogId).dialog("close");
            }
        }];

        if (options.threeBtns) {
            defaultBtn = threeBtn;
        }
        if (!options.showBtns) {
            defaultBtn = []
        }
        if (options.buttons.length == 0) {
            options.buttons = defaultBtn
        }

        

        if (options.max) {
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            options.width = winWidth - 20;
            options.height = winHeight - 20
        }
        var $dialog = $("<div/>").css("padding", options.boxPadding).appendTo($("body"));
        var dialog = $dialog.dialog($.extend(options, {
            onClose: function () {
                dialog.dialog("destroy")
            }
        })).attr("id", dialogId);
        $dialog.find(".dialog-button").css("text-align", options.align);
        return dialog
    };
    $.hDialog.defaults = $.extend({}, $.fn.dialog.defaults, {
        boxPadding: "3px",
        align: "right",
        href: "",
        id: "",
        content: "",
        height: 200,
        width: 400,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closable: true,
        modal: true,
        shadow: false,
        mask: true,
        cache: false,
        closed: false,
        showBtns: true,
        buttons: [],
        submit: function () {
            alert("写入可执行代码");
            return false
        },
        submitContinue: function () {
            alert("写入可执行代码");
            return false
        },
        onBeforeClose: function () {
            $(this).find(".combo-f").each(function () {
                var panel = $(this).data().combo.panel;
                panel.panel("destroy")
            });
            $(this).empty()
        },
        onMove: function (left, right) {
            $(".validatebox-tip").remove()
        }
    });
    $.hWindow = function (options) {
        var windowId = guidDialogId();
        options = $.extend({}, $.hDialog.defaults, options || {});
        if (!options.href && !options.content) {
            alert("缺少必要的参数 href or content");
            return false
        }
        var $dialog = $("<div/>").attr("id", windowId).appendTo($("body"));
        if (options.max) {
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            options.width = winWidth - 20;
            options.height = winHeight - 20
        }
        var win = $dialog.window($.extend(options, {
            onClose: function () {
                win.window("destroy")
            }
        })).window("refresh").attr("id", windowId);
        return win
    };
    $.hWindow.defaults = $.extend({}, $.fn.window.defaults, {
        href: "",
        content: "",
        height: 300,
        width: 400,
        collapsible: false,
        closable: true,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: "窗口标题",
        modal: true,
        draggable: true,
        max: false,
        onBeforeClose: function () {
            $(this).find(".combo-f").each(function () {
                var panel = $(this).data().combo.panel;
                //alert(panel.html());
                panel.panel("destroy")
            });
            $(this).empty()
        }
    });
    $.extend($.fn.datagrid.methods, {
        getSelectedIndex: function (jq) {
            var row = $(jq).datagrid("getSelected");
            if (row) {
                return $(jq).datagrid("getRowIndex", row)
            } else {
                return -1
            }
        },
        checkRows: function (jq, idValues) {
            if (idValues && idValues.length > 0) {
                var rows = $(jq).datagrid("getRows");
                var keyFild = $(jq).datagrid("options").idField;
                $.each(rows, function (i, n) {
                    if ($.inArray(n[keyFild], idValues)) {
                        $(jq).datagrid("checkRow", row)
                    }
                })
            }
            return jq
        }
    });
    $.extend($.fn.combobox.methods, {
        selectedIndex: function (jq, index) {
            if (!index) {
                index = 0
            }
            var data = $(jq).combobox("options").data;
            var vf = $(jq).combobox("options").valueField;
            $(jq).combobox("setValue", eval("data[index]." + vf))
        }
    });
    ///added by jwang comobox方法，检查输入的值是否在列表的值的范围之内，在的话就返回true,否则返回false
    $.extend($.fn.combobox.methods, {
        checkEnterValue: function (jq) {
            var enterVal = $(jq).combobox("getValue");
            var data = $(jq).combobox("options").data;
            var vf = $(jq).combobox("options").valueField;
            var i = 0;
            for (i = 0; i < data.length; i++) {
                var val = eval("data[i]." + vf);
                if (enterVal == val) {
                    break;
                }
            }
            if (i < data.length) {
                return true;
            } else {
                return false;
            }
        }
    });

    $.fn.panel.defaults = $.extend({}, $.fn.panel.defaults, {
        onBeforeDestroy: function () {
            var frame = $("iframe", this);
            if (frame.length > 0) {
                frame[0].contentWindow.document.write("");
                frame[0].contentWindow.close();
                frame.remove();
                if ($.browser.msie) {
                    CollectGarbage()
                }
            }
        }
    });
    $.extend($.fn.tree.methods, {
        checkedAll: function (jq, target) {
            var data = $(jq).tree("getChildren");
            if (target) {
                data = $(jq).tree("getChildren", target)
            }
            $.each(data, function (i, n) {
                $(jq).tree("check", n.target)
            })
        }
    });
    $.extend($.fn.tree.methods, {
        uncheckedAll: function (jq) {
            var data = $(jq).tree("getChildren");
            $.each(data, function (i, n) {
                $(jq).tree("uncheck", n.target)
            })
        }
    });
    $.extend($.fn.validatebox.defaults.rules, {
        equalTo: {
            validator: function (value, param) {
                return $(param[0]).val() == value
            },
            message: "字段不匹配"
        }
    });

    
    $.extend($.fn.validatebox.defaults.rules, {
        CHS: {
            validator: function (value, param) {
                return /^[\u0391-\uFFE5]+$/.test(value);
            },
            message: '请输入汉字'
        },
        ZIP: {
            validator: function (value, param) {
                return /^[1-9]\d{5}$/.test(value);
            },
            message: '邮政编码不存在'
        },
        QQ: {
            validator: function (value, param) {
                return /^[1-9]\d{4,13}$/.test(value);
            },
            message: 'QQ号码不正确'
        },
        ComoboxEdit: {
            validator: function (value, param) {
                var param2 = $("#" + param).combobox("checkEnterValue");
                return param2;
            },
            message: '输入的值不正确'
        },
        mobile: {
            validator: function (value, param) {
                return /^1[3|4|5|8][0-9]\d{8}$/.test(value);
            },
            message: '手机号码不正确'
        },
        loginName: {
            validator: function (value, param) {
                return /^[\u0391-\uFFE5\w]+$/.test(value);
            },
            message: '登录名称只允许汉字、英文字母、数字及下划线。'
        },
        safepass: {
            validator: function (value, param) {
                return safePassword(value);
            },
            message: '密码由字母和数字组成，至少6位'
        },
        equalTo: {
            validator: function (value, param) {
                return value == $(param[0]).val();
            },
            message: '两次输入的字符不一至'
        },
        number: {
            validator: function (value, param) {
                return /^\d+$/.test(value);
            },
            message: '请输入数字'
        },
        idcard: {
            validator: function (value, param) {
                return idCard(value);
            },
            message: '请输入正确的身份证号码'
        },
        yxYear: {
            validator: function (value, param) {
                return /^(1\d{3})|(2\d{3})/.test(value);
            },
            message: '请输入有效的年份：如2013'
            
        }
    });

    /* 密码由字母和数字组成，至少6位 */
    var safePassword = function (value) {
        return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value));
    }

    var idCard = function (value) {
        //if (value.length == 18 && 18 != value.length) return false;
        //var number = value.toLowerCase();
        //var d, sum = 0, v = '10x98765432', w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
        //var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
        //if (re == null || a.indexOf(re[1]) < 0) return false;
        //if (re[2].length == 9) {
        //    number = number.substr(0, 6) + '19' + number.substr(6);
        //    d = ['19' + re[4], re[5], re[6]].join('-');
        //} else d = [re[9], re[10], re[11]].join('-');
        //if (!isDateTime.call(d, 'yyyy-MM-dd')) return false;
        //for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
        //return (re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11));
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
    }

    var isDateTime = function (format, reObj) {
        format = format || 'yyyy-MM-dd';
        var input = this, o = {}, d = new Date();
        var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
        var len = f1.length, len1 = f3.length;
        if (len != f2.length || len1 != f4.length) return false;
        for (var i = 0; i < len1; i++) if (f3[i] != f4[i]) return false;
        for (var i = 0; i < len; i++) o[f1[i]] = f2[i];
        o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
        o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
        o.dd = s(o.dd, o.d, d.getDate(), 31);
        o.hh = s(o.hh, o.h, d.getHours(), 24);
        o.mm = s(o.mm, o.m, d.getMinutes());
        o.ss = s(o.ss, o.s, d.getSeconds());
        o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
        if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) return false;
        if (o.yyyy < 100) o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
        d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
        var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM && d.getDate() == o.dd && d.getHours() == o.hh && d.getMinutes() == o.mm && d.getSeconds() == o.ss && d.getMilliseconds() == o.ms;
        return reVal && reObj ? d : reVal;
        function s(s1, s2, s3, s4, s5) {
            s4 = s4 || 60, s5 = s5 || 2;
            var reVal = s3;
            if (s1 != undefined && s1 != '' || !isNaN(s1)) reVal = s1 * 1;
            if (s2 != undefined && s2 != '' && !isNaN(s2)) reVal = s2 * 1;
            return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
        }
    };


    jQuery.fn.clear = function () {
        var $form = $(this);
        $form.find("INPUT:text, INPUT:password, INPUT:file, SELECT, TEXTAREA,.combo-value").val("");
        $form.find("INPUT:checkbox, INPUT:radio").removeAttr("checked").removeAttr("selected");
        return this
    }
})(jQuery);