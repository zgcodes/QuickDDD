
$(document).ready(function () {

    // === datepicker === //
    $("body").delegate("input[data-type = 'datepicker']", "click focus", function () {
        if (!$(this).hasClass("hasDatepicker")) {
            $(this).datepicker({
                showButtonPanel: true,
                dateFormat: 'yy-mm-dd'
            });
        }
    });
	
	
	// === Sidebar navigation === //
	
	$('.submenu > a').click(function(e)
	{
		e.preventDefault();
		var submenu = $(this).siblings('ul');
		var li = $(this).parents('li');
		var submenus = $('#sidebar li.submenu ul');
		var submenus_parents = $('#sidebar li.submenu');
		if(li.hasClass('open'))
		{
			if(($(window).width() > 768) || ($(window).width() < 479)) {
				submenu.slideUp();
			} else {
				submenu.fadeOut(250);
			}
			li.removeClass('open');
		} else 
		{
		    if (($(window).width() > 768) || ($(window).width() < 479)) {
				submenus.slideUp();			
				submenu.slideDown();
		    } else {
				submenus.fadeOut(250);			
				submenu.fadeIn(250);
			}
			submenus_parents.removeClass('open');		
			li.addClass('open');	
		}
	});
	
	var ul = $('#sidebar > ul');
	
	$('#sidebar > a').click(function(e)
	{
		e.preventDefault();
		var sidebar = $('#sidebar');
		if(sidebar.hasClass('open'))
		{
			sidebar.removeClass('open');
			ul.slideUp(250);
		} else 
		{
			sidebar.addClass('open');
			ul.slideDown(250);
		}
	});
	
	// === Resize window related === //
	$(window).resize(function()
	{
		if($(window).width() > 479)
		{
			ul.css({'display':'block'});	
			$('#content-header .btn-group').css({width:'auto'});		
		}
		if($(window).width() < 479)
		{
			ul.css({'display':'none'});
			fix_position();
		}
		if($(window).width() > 768)
		{
			$('#user-nav > ul').css({width:'auto',margin:'0'});
            $('#content-header .btn-group').css({width:'auto'});
		}
	});
	
	if($(window).width() < 468)
	{
		ul.css({'display':'none'});
		fix_position();
	}
	
	if($(window).width() > 479)
	{
	   $('#content-header .btn-group').css({width:'auto'});
		ul.css({'display':'block'});
	}
	
	// === Tooltips === //
	//$('.tip').tooltip();	
	//$('.tip-left').tooltip({ placement: 'left' });	
	//$('.tip-right').tooltip({ placement: 'right' });	
	//$('.tip-top').tooltip({ placement: 'top' });	
	//$('.tip-bottom').tooltip({ placement: 'bottom' });	
	
	// === Search input typeahead === //
	$('#search input[type=text]').typeahead({
		source: ['Dashboard','Form elements','Common Elements','Validation','Wizard','Buttons','Icons','Interface elements','Support','Calendar','Gallery','Reports','Charts','Graphs','Widgets'],
		items: 4
	});
	
	// === Fixes the position of buttons group in content header and top user navigation === //
	function fix_position()
	{
		var uwidth = $('#user-nav > ul').width();
		$('#user-nav > ul').css({width:uwidth,'margin-left':'-' + uwidth / 2 + 'px'});
        
        var cwidth = $('#content-header .btn-group').width();
        $('#content-header .btn-group').css({width:cwidth,'margin-left':'-' + uwidth / 2 + 'px'});
	}
	
	// === Style switcher === //
	$('#style-switcher i').click(function()
	{
		if($(this).hasClass('open'))
		{
			$(this).parent().animate({marginRight:'-=190'});
			$(this).removeClass('open');
		} else 
		{
			$(this).parent().animate({marginRight:'+=190'});
			$(this).addClass('open');
		}
		$(this).toggleClass('icon-arrow-left');
		$(this).toggleClass('icon-arrow-right');
	});
	
	$('#style-switcher a').click(function()
	{
		var style = $(this).attr('href').replace('#','');
		$('.skin-color').attr('href','css/maruti.'+style+'.css');
		$(this).siblings('a').css({'border-color':'transparent'});
		$(this).css({'border-color':'#aaaaaa'});
	});
	
	$('.lightbox_trigger').click(function(e) {
		
		e.preventDefault();
		
		var image_href = $(this).attr("href");
		
		if ($('#lightbox').length > 0) {
			
			$('#imgbox').html('<img src="' + image_href + '" /><p><i class="icon-remove icon-white"></i></p>');
		   	
			$('#lightbox').slideDown(500);
		}
		
		else { 
			var lightbox = 
			'<div id="lightbox" style="display:none;">' +
				'<div id="imgbox"><img src="' + image_href +'" />' + 
					'<p><i class="icon-remove icon-white"></i></p>' +
				'</div>' +	
			'</div>';
				
			$('body').append(lightbox);
			$('#lightbox').slideDown(500);
		}
		
	});
	

	$('#lightbox').live('click', function() { 
		$('#lightbox').hide(200);
	});
	
    // === 左侧导航选中 === //
	var indexActive = true;
	var locationUrl = location.href;
	$(".childmenu a").each(function () {
	    var rel = $(this).attr('rel');
	    if (locationUrl.indexOf(rel) > -1) {
	        $(this).parent().addClass("child-active");
	        $(this).parent().parent().parent().addClass("open");

	        $(".child-active span").addClass("menu-text");
	        //$(".parent-active span").addClass("menu-text");

	        indexActive = false;
	        return true;
	    }
	});
	if (indexActive) {
	    $(".index").addClass("parent-active");
	    $(".parent-active span").addClass("menu-text");
	}

});


/*******清除表单数据*********/
function ClearForm(obj) {
    obj.find(':input').not(':button, :submit, :reset').val('').removeAttr('checked').removeAttr('selected');
}


/*******注册验证脚本*********/
function RegisterForm() {
    $('#modal-content').removeData('validator');
    $('#modal-content').removeData('unobtrusiveValidation');
    $.validator.unobtrusive.parse('#modal-content');
}

/*******关闭弹出框*********/
function CloseModal() {
    $('#modal-form').modal('hide');
    ClearForm($("#modal-content"));
}

/*******刷新表格*********/
function ReloadDataTable(obj) {
    obj.fnDraw();
}


/*******初始化*********/
function InitDatatables(dataTableObj, actionUrl, aoColumns, oTable) {
    oTable = dataTableObj.dataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        'bLengthChange': true,
        "bFilter": false,
        "bInfo": true,
        'bPaginate': true,
        "bProcessing": true,
        "bAutoWidth": false,
        "bServerSide": true,
        "bStateSave": false,
        "iDisplayLength": 10,
        "aLengthMenu": [[10, 20, 50, 100], [10, 20, 50, 100]],
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "对不起，查询不到任何相关数据",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
            "sProcessing": "正在加载中...",
            "sSearch": "搜索",
            "oPaginate": {
                "sFirst": "第一页",
                "sPrevious": " 上一页 ",
                "sNext": " 下一页 ",
                "sLast": " 最后一页 "
            }
        },
        "sAjaxSource": actionUrl,
        "aoColumns": aoColumns
    });
    //初始化下拉框
    $('select').select2();

    return oTable;
}

/*******弹出表单*********/
function ShowModal(actionUrl, param, title) {

    //表单初始化
    $(".modal-title").html(title);
    $("#modal-content").attr("action", actionUrl);
    
    $.ajax({
        type: "GET",
        url: actionUrl,
        data: param,
        beforeSend: function () {
            //
        },
        success: function (result) {
            $("#modal-content").html(result);
            $('#modal-form').modal('show');
            RegisterForm();
        },
        error: function () {
            //
        },
        complete: function () {
            //
        }
    });
}


/*******保存表单*********/
function SaveModal(oTable) {
    var actionUrl = $("#modal-content").attr("action");
    var $form = $("#modal-content");

    if (!$form.valid()) {
        return;
    }

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: $form.serialize(),
        success: function (data) {
            //判断返回值，若为Object类型，即操作成功
            var result = ((typeof data == 'object') && (data.constructor == Object));
            if (result) {
                bootbox.alert(data.Message);
                $('#modal-form').modal('hide');
                ReloadDataTable(oTable);
            }
            else {
                $("#modal-content").html(data);
            }
        }
    });
}

/*******查询*********/
function SearchRecord(actionUrl, oTable) {
    oTable.fnReloadAjax(actionUrl);
}

/*******删除操作*********/
function DeleteRecord(actionUrl, param, oTable) {
    bootbox.dialog("你确认要删除这条记录？", [{
        "label": "删除",
        "class": "btn-danger",
        "callback": function () {
            $.ajax({
                type: "POST",
                url: actionUrl,
                data: param,
                beforeSend: function () {
                    //
                },
                success: function (result) {
                    bootbox.alert(result.Message);
                    if (result.ResultType == 0) {
                        ReloadDataTable(oTable);
                    }
                },
                error: function () {
                    //
                },
                complete: function () {
                    //
                }
            });
        }
    }, {
        "label": "取消",
        "class": "btn-default"
    }]);
}

/*******删除全部操作*********/
function DeleteAllRecord(actionUrl, oTable) {
    bootbox.dialog("你确认要删除所有记录？", [{
        "label": "删除",
        "class": "btn-danger",
        "callback": function () {
            $.ajax({
                type: "POST",
                url: actionUrl,
                beforeSend: function () {
                    //
                },
                success: function (result) {
                    bootbox.alert(result.Message);
                    if (result.ResultType == 0) {
                        ReloadDataTable(oTable);
                    }
                },
                error: function () {
                    //
                },
                complete: function () {
                    //
                }
            });
        }
    }, {
        "label": "取消",
        "class": "btn-default"
    }]);
}
