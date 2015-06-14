abp.upload = abp.upload || {};
(function () {
    //裁剪图片上传
    abp.upload.cutUpload = function (opts, uploadSuccessCallback, uploadDeleteCallback) {
        var finalWidth = opts.finalWidth;
        var finalHeight = opts.finalHeight;
        var needThumb = opts.thumbWidth != null && opts.thumbHeight != null;  //是否需要生成缩略图
        var thumbWidth = needThumb ? opts.thumbWidth : finalWidth;
        var thumbHeight = needThumb ? opts.thumbHeight : finalHeight;
        var allowMagnify = opts.allowMagnify == null ? true : opts.allowMagnify;
        var $divImg = $(opts.previewId);//预览区域
        var hidenInput;//隐藏域对象
        var uploadButton = $(opts.buttonId)[0];//上传按钮
        if (opts.auto) {//机器模式
            var uploadArea = $(opts.area);//整个上传区域
            hidenInput = uploadArea.find("input[type=hidden]");//隐藏域对象
            $divImg = uploadArea.find(".img-area");//预览区域
            uploadButton = uploadArea.find(".upload-button")[0];//上传按钮
            opts.imgUrl = hidenInput.val();
        }
        //初始化页面上的图片预览
        var initHtml = '<div class="s1" style="width:{0}px; height:{1}px;position:relative;">\
					<img style="width:{0}px; height:{1}px;" >\
					<div class="upload-delete-btn" title="删除"></div>\
				  </div>';
        $divImg.html(abp.format(initHtml, thumbWidth||160, thumbHeight||120));

        if (typeof (opts.imgUrl) == 'string' && $.trim(opts.imgUrl) != '') {
            $divImg.removeClass('hide').find('img').attr('src', opts.imgUrl.indexOf("http://") > 0 ? opts.imgUrl : abp.resourcePath + opts.imgUrl);
        }

        $divImg.find('.upload-delete-btn').click(function () {
            $divImg.addClass('hide').find('img').attr('src', '');
            if (opts.auto) {//机器模式
                hidenInput.val("");
            }
            if (uploadDeleteCallback) {  //删除图片时回调
                try {
                    uploadDeleteCallback();
                } catch (e) {
                    if (console) console.info("删除回掉方法出错:", e.message);
                }
            }
        })

        // 初始化Web Uploader
        var uploader = WebUploader.create({
            // 选完文件后，是否自动上传。
            auto: false,
            // swf文件路径
            //swf: '/js/admin/Uploader.swf',
            // 文件接收服务端。
            server: abp.resourcePath + '/UploadImage',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id:uploadButton,
                multiple: false
            },

            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            thumb: {
                width: 800,
                height: 600,

                // 图片质量，只有type为`image/jpeg`的时候才有效。
                quality: 95,

                // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                allowMagnify: false,

                // 是否允许裁剪。
                crop: false,

                // 为空的话则保留原有图片格式。
                // 否则强制转换成指定的类型。
                type: 'image/jpeg'
            },
            compress: {
                width: 1920,
                height: 1920,

                // 图片质量，只有type为`image/jpeg`的时候才有效。
                quality: 95,

                // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                allowMagnify: false,

                // 是否允许裁剪。
                crop: false,

                // 是否保留头部meta信息。
                preserveHeaders: true,

                // 如果发现压缩后文件大小比原来还大，则使用原来图片
                // 此属性可能会影响图片自动纠正功能
                noCompressIfLarger: true,

                // 单位字节，如果图片大小小于此值，不会采用压缩。
                compressSize: 0
            }
        });

        function getNewSize(maxWidth, maxHeight, imageOriginalWidth, imageOriginalHeight) {
            var w = 0;
            var h = 0;
            if (imageOriginalWidth < maxWidth && imageOriginalHeight < maxHeight) {
                w = imageOriginalWidth;
                h = imageOriginalHeight;
            }
            else if ((imageOriginalWidth / imageOriginalHeight) > (maxWidth / maxHeight)) {
                w = maxWidth;
                h = (w * imageOriginalHeight) / imageOriginalWidth;
            }
            else {
                h = maxHeight;
                w = (h * imageOriginalWidth) / imageOriginalHeight;
            }
            return { width: w, height: h };
        }

        function openCutWindow(file, src) {
            //console.log('file', file);
            var coord, dlg;
            var s = getNewSize(200, 200, thumbWidth, thumbHeight);
            var html = abp.format('<img class="preview-image" src="{0}" ><div class="cutPreviewDiv" style="width:{1}px; height:{2}px"><img class="cutImgPreview" src="{0}"></div>', src, s.width, s.height);
            dlg = abp.dialog({
                width: "1100px",
                height: "700px",
                title: "图片裁剪",
                message: html,
                animate: false,
                buttons: {
                    save: {
                        label: "上传裁剪图",
                        className: "btn-primary",
                        callback: function () {
                            startUpload();
                            //top.bootbox.alert("点击了“保存”按钮");
                        }
                    },
                    save2: {
                        label: "上传原图",
                        className: "btn-default",
                        callback: function () {
                            startUpload(true);
                            //top.bootbox.alert("点击了“保存”按钮");
                        }
                    },
                    cancel: {
                        label: "取消",
                        className: "btn-default",
                    }
                }
            });

            var img = dlg.find('.preview-image');
            var nw, nh, size;
            if (uploader.options.compress) {   //启用客户端压缩
                size = getNewSize(uploader.options.compress.width, uploader.options.compress.height, file._info.width, file._info.height);
            }
            else {
                size = { width: file._info.width, height: file._info.height };
            }
            nw = size.width / img.prop('width');
            nh = size.height / img.prop('height');

            function setPreview(coords) {
                dlg.find('.cutImgPreview').attr('src', dlg.find('.preview-image').attr('src'));
                //console.log('setPreview');
            }

            function showPreview(coords) {
                //console.log('showPreview');
                coord = coords;
                var rx = s.width / coords.w;
                var ry = s.height / coords.h;

                dlg.find('.cutImgPreview').css({
                    width: Math.round(rx * size.width / nw) + 'px',
                    height: Math.round(ry * size.height / nh) + 'px',
                    marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                    marginTop: '-' + Math.round(ry * coords.y) + 'px'
                });
            }

            dlg.find('.preview-image').Jcrop({
                allowSelect: false,
                //onSelect: setPreview,
                onChange: showPreview,
                //minSize : [thumbWidth / nw, thumbHeight / nh],
                setSelect: [0, 0, uploader.options.thumb.width, uploader.options.thumb.height],
                //setSelect: [0, 0, 500, 100],
                aspectRatio: finalWidth / finalHeight
            });

            function startUpload(isOriginal) {
                var formData = {
                    ImageX: Math.round(coord.x * nw),
                    ImageY: Math.round(coord.y * nh),
                    ImageW: Math.round(coord.w * nw),
                    ImageH: Math.round(coord.h * nh),
                    ImageFinalW: finalWidth,
                    ImageFinalH: finalHeight,
                    IsMagnify: allowMagnify,
                    IsCut: !!!isOriginal
                }
                if (needThumb) {
                    formData.ImageThumbW = thumbWidth;
                    formData.ImageThumbH = thumbHeight;
                }

                uploader.options.formData = $.extend(uploader.options.formData, formData);

                uploader.upload(file);
            }
        };
        //lz 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数
        uploader.on("uploadBeforeSend", function (object, data, headers) {
            data.ImageSize = data.size;

        });
        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            //$divImg.removeClass('hide');
            uploader.makeThumb(file, function (error, ret) {
                if (!error) {
                    openCutWindow(file, ret);
                }
                else {
                    abp.alert('上传图片失败，浏览器版本太低。');
                }
            });

        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            $divImg.removeClass('hide');

            var $percent = $divImg.find('.progress span');

            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<p class="progress"><span></span></p>').appendTo($divImg).find('span');
            }

            $percent.css('width', percentage * 100 + '%');
        });


        // 文件上传成功
        uploader.on('uploadSuccess', function (file, ret) {
            if (ret.success) $divImg.removeClass('hide').find('img').attr('src', needThumb ? abp.resourcePath + ret.result.thumbUrl : abp.resourcePath + ret.result.imgUrl);
            else abp.error(ret.error || "图片上传失败！");
            if (opts.auto) {//机器模式
                hidenInput.val(ret.result.imgUrl);
            }
            if (uploadSuccessCallback) {
                opts.file = file;
                uploadSuccessCallback(ret, opts);
            }
        });

        // 文件上传失败，显示上传出错。
        uploader.on('uploadError', function (file) {
            var $error = $divImg.find('div.error');

            // 避免重复创建
            if (!$error.length) {
                $error = $('<div class="error"></div>').appendTo($divImg);
            }

            $error.text('上传失败');
        });

        // 完成上传，成功或者失败，删除进度条，重置队列，以便让已选取过的文件可以再重新选。
        uploader.on('uploadComplete', function (file) {
            $divImg.find('.progress').remove();
            uploader.reset();
        });

    }

})();