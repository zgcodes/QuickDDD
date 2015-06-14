(function () {


    /* 弹出框 *********************************************/
    // 必须在abp.js之前引用bootstrap-modalmanager.js、bootstrap-modal.js、bootbox.js
    q.success = top.bootbox.success;
    q.info = top.bootbox.info;
    q.error = top.bootbox.error;
    q.alert = top.bootbox.alert;
    q.confirm = top.bootbox.confirm;
    q.prompt = top.bootbox.prompt;
    q.dialog = top.bootbox.dialog;

    //在弹出窗口中调用此方法关闭自身窗口，并调用回调方法返回参数值
    q.closeDialog = function (args) {
        if (window.modalDialog != null && window.modalDialog.options != null) {
            var dialog = window.modalDialog;

            if ($.isFunction(dialog.options.callback)) {
                dialog.options.callback(args);
            }
            window.modalDialog.close();
        }
    };
})