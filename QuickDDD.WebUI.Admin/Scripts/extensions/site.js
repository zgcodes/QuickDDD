// JavaScript source code
$(function () {
    /*激活所有tooltip和popover*/
    $("body").tooltip({ selector: "[data-toggle='tooltip']", container: 'body', animation: false });
    //$("[data-toggle='tooltip']").tooltip({ container: 'body', delay: { show: 300, hide: 100 } });
    $("[data-toggle='popover']").popover({ container: 'body' });

    /** 设置提示框样式 */
    $(".wx-listview").tooltip({ selector: ".col-action .btn", container: 'body', animation: false });

    /*表单页底部按钮栏(form-footer)为固定在底部(fixed)时，设置page-content的padding-bottom*/
    $(".wx-form-footer.fixed").closest("body").css("padding-bottom", "75px");

    /*表单页底部“取消”按钮*/
    $(".wx-form-footer #btn-cancel").click(function () {
        if (window == top.frames["main"]) {
            //在主窗口中
            window.history.go(-1);
        }
        else {
            //在弹出窗口中关闭自己
            if (window.modalDialog != null) {
                window.modalDialog.close();
            }
        }
    });

    try {
        /*时期选择器*/
        $('.date-picker').datetimepicker({
            autoclose: true,
            todayBtn: true,
            weekStart: 1,
            minView: 2,  //只能选择到天，不显示时间
            format: 'yyyy-mm-dd',
            language: 'zh-CN'
        });
    } catch (err) { }


    try {
        /*时期时间选择器，页面中需要引用bootstrap-datetimepicker.min.js 和 bootstrap-datetimepicker.zh-CN.js*/
        $('.datetime-picker').datetimepicker({
            autoclose: true,
            todayBtn: true,
            startDate: new Date(),
            weekStart: 1,
            minView: 1,  //可以选择到分，如果只需要选择到小时，此值设置为1
            format: 'yyyy-mm-dd hh:00',
            language: 'zh-CN'
        });
    } catch (err) { }

    try {
        /*时期时间选择器，页面中需要引用bootstrap-datetimepicker.min.js 和 bootstrap-datetimepicker.zh-CN.js*/
        $('.datetime2-picker').datetimepicker({
            autoclose: true,
            todayBtn: true,
            //startDate: new Date(),
            weekStart: 1,
            minView: 0,  //可以选择到分，如果只需要选择到小时，此值设置为1
            format: 'yyyy-mm-dd hh:ii',
            language: 'zh-CN'
        });
    } catch (err) { }

    //初始化上传组件
    $(".upload-init").each(function () {
        var _this = $(this);
        var opts = {
            finalWidth: _this.data("final-width"),
            finalHeight: _this.data("final-height")
        }
        var defaultOpt = {
            auto: true,
            area: this
        };
        $.extend(defaultOpt, opts);
        abp.upload.cutUpload(defaultOpt)
    });

    abp.key = 0;
    $(window).keydown(function (e) {
        if (e.ctrlKey) {
            abp.key = 1;
        } else if (e.shiftKey) {
            abp.key = 2;
        }
    }).keyup(function () {
        abp.key = 0;
    });

    $(document).on("selectstart", ".wx-listview", function () {
        if (abp.key == 2) {
            return false;
        }
    });

    $("#isActiveId").change(function () {
        if ($(this).val() == 'True') {
            $('#btnActive').html("<i class='icon-exchange'></i>下架");
        } else {
            $('#btnActive').html("<i class='icon-exchange'></i>上架");
        }
    });

    $("#IsActive").change(function () {
        var object = $(this).find('option:selected').val();
        console.info(typeof eval(object), eval(object))
        if (eval(object)) {
            $('#btnActive span:first').text("停用");
        } else {
            $('#btnActive span:first').text("启用");
        }
    });

    if (top == window) {
        initNotification();  //初始化通知消息组件
    }
});

function initNotification() {
    try {
        if (!$.connection) return;
        var hub = $.connection.msgHub;
        hub.client.broadcastMessage = function (message) {
            //TODO 定义队列,消息接连弹出
            //播放音乐通知

            //显示通知(function(){$(\'.Module_DeliveryService\').click()})()
            var notification = new NotificationFx({
                message: '<div class="ns-thumb"><img style="width:64px;height:64px;" src="http://wanzao2.b0.upaiyun.com/system/pictures/95/original/6.png"/></div><div class="ns-content"><p>新订单:您有新的外卖订单,请及时处理.<a href="javascript:gotofuncmenu(\'DeliveryService\',\'/Takeaway/ServiceOrder/Index\')">去看看</a></p></div>',
                layout: 'other',
                ttl: 10000,
                effect: 'thumbslider',
                type: 'notice', // notice, warning, error or success
                onClose: function () {
                    setTimeout(function () { $(".ns-box").remove(); }, 1000)

                }
            });
            notification.show();
        };
        $.connection.hub.start();
    } catch (e) {
        console.error(e);
    }
}