 $(document).ready(function(){

	 FastClick.attach(document.body);

var _defult={
	// imgauto height width
	imgAuto:function(imgID){
		var img = $(imgID)[0];
		var url = $(imgID).attr("src");
		var W = $(".paln-head").width(), H = $(".paln-head").height();
		var bl=W/H;
		if(!$(imgID)[0]){
			return;
		}

		var loadHtml = "<div class='i-loading'><div><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div>";
		$(imgID).parent().append(loadHtml);
		$.ajax({
		 	url: url,
		 	type: 'GET',
		 	global: false,

		 	beforeSend : function(){
		 	},
		 // success: function(){


			// 			console.log("suc");
		 //  },
		  complete: function(){
		  	var w=img.naturalWidth,h=img.naturalHeight,wh=w/h;
		  	$(imgID).parent().find('.i-loading').remove();
						  if(wh<bl){
						    $(imgID).css("width","100%")
						  }else{
						  	$(imgID).css("height","100%")
						  }

						  $(imgID).show();

		  }
 });
	}
}
_defult.imgAuto("#headImage");



// 点击图片放大效果
$(".head-nobg").on("tap",".image",function(){
	var viewport = document.querySelector("meta[name=viewport]");
	var url = $(this).attr("src");
	var html = '<div class="img-popup" id="J_imgPopup"><img src='+url+' alt=""  /><div class="maskblack"></div></div>'
	viewport.setAttribute('content', 'width=device-width');
	$(this).parent().parent().before().append(html);
})
	// 关闭图片
$(".bd").on("tap","#J_imgPopup", function(e) {
	$(this).remove();
});




	//全局所有元素切换hover类
				$(document).bind("mousedown touchstart",function(e){
					// console.log($(e.target).parent()[0].tagName)
						var tar=$(e.target);
						if(e.target.tagName=="I"){
							if($(e.target).parent()[0].tagName=="I"){
								tar=$(e.target).parent().parent();
							}else{
								tar=$(e.target).parent()
							}

						}
						//alert(e.target.tagName)
						tar.addClass("hover");
				})
				// 判断tar是否是i标签，如果是一直向上寻找不是i标签作为触发事件
			$(document).bind("mouseup touchend touchmove", function(e) {
				var tar = $(e.target);
				if (e.target.tagName == "I") {
					if($(e.target).parent()[0].tagName=="I"){
								tar=$(e.target).parent().parent();
							}else{
								tar=$(e.target).parent()
							}
				}
				tar.removeClass("hover");
			})


//  开始选择是否
$(".select-fix").on("tap","span",function(){
	var t = $(this);
	var index = t.index()-1;
	// var i = t.index();
	$("#J_selectbd").find('.selectbd').eq(index).show().siblings().hide();
	$("#J_selectYesNo").show();
	$("#J_selectYesNo .t-right").find('span').eq(index).removeClass('i-selceted-dis').addClass('i-selceted').siblings().removeClass('i-selceted').addClass('i-selceted-dis');
	$(this).parent().hide();
	$(".bd").removeClass('fixBottom');
	if(index == 0){
		$("#isDone").val('Y');
	}else{
		$("#isDone").val('N');
	}

	$(window).scrollTop($(document).height());
})

$("#J_selectYesNo .t-right").on("tap","span",function(){
	var index = $(this).index();
	$("#J_selectbd").find('.selectbd').eq(index).show().siblings().hide();
	$(this).removeClass('i-selceted-dis').addClass('i-selceted');
	$(this).siblings().removeClass('i-selceted').addClass('i-selceted-dis');
	if(index == 0){
		$("#isDone").val('Y');
	}else{
		$("#isDone").val('N');
	}
})

//验证选择狗粮是否是第一个项目
function ConfirmSelect(id){
	var index = $(id).find(".select-01")[0].selectedIndex;
	$(id).find(".select-01").parents(".col-2").removeClass("dou");
	if(index!=0){
		return true;
	}else{
		$(id).find(".select-01").parents(".col-2").addClass("dou");
	}
}



function ConfirmData(id){
	var val = $(id).find(".paln-time").val();
	if($("#J_t").hasClass("dou")){
		$(id).find(".paln-time").parents(".col-2").removeClass("dou");
	}
	if(val!=""){
		return true;
	}else{
		$(id).find(".paln-time").parents(".col-2").addClass("dou");
		return false;
	}
}

// 当选择免疫过 － 是否显示计划
function showPaln(id){
	var val = $(id).find(".paln-time").attr("data-init");
	var h = $(id).find(".paln-time").html();
	var index = $(id).find(".select-01")[0].selectedIndex;
	if(val!=h && index!=0 ){
		$("#J_paln").show();
	}
}
// 选择狗粮
$("#J_showTrue").on("change",".select-01",function(){

	var t = $(this);
	showPaln("#J_showTrue");
	var index =t[0].selectedIndex;
	var n = t.find("option").eq(index).attr("value");
	 // console.log()
	if(index!=0){
		t.addClass('cur');
	}else{
		t.removeClass('cur')
	}
	if(n == "PCF"){
		t.before('<span class="tip-lable-tuijian">推荐</span>');
	}else{
		t.parent().find('.tip-lable-tuijian').remove();
	}

})


// 选择时间
$("#J_showTrue").on("blur",".paln-time",function(){
	showPaln("#J_showTrue")
})

// 当选择没有免疫过 选择狗粮
$("#J_showNone").on("change",".select-01",function(){
	var t = $(this);
	var index = t[0].selectedIndex;
	var n = t.find("option").eq(index).attr("value");
	if(index!=0){
		$("#J_palnNone").show();
		t.addClass('cur');
	}else{
		t.removeClass('cur')
	}
	if(n == "PCF"){
		t.before('<span class="tip-lable-tuijian">推荐</span>');
	}else{
		t.parent().find('.tip-lable-tuijian').remove();
	}
})

// 通用多选购粮
$(".select-02").on("change",function(){
	var t = $(this);
	var index =t[0].selectedIndex;
	var n = t.find("option").eq(index).attr("value");
	if(index!=0){
		t.addClass('cur');
	}else{
		t.removeClass('cur')
	}
	if(n == "PCF"){
		t.before('<span class="tip-lable-tuijian">推荐</span>');
	}else{
		t.parent().find('.tip-lable-tuijian').remove();
	}

})

function datainit(){
	var t = $(".paln-fangan").find('.font-c-gray').attr("data-init");
	$(".paln-fangan").find('.font-c-gray').html(t);
}
// 阶段样式切换
$(".paln-fangan .i-point").on("click",function(){
	var t = $(this),
			tParent = t.parent(),
			Prev = (tParent.prev().attr("class") == "electDis") ? false : true,
			length = tParent.parent().find('li').length-1,
			l = tParent.parent().find('li').length,
			indexsSelf = tParent.index(),
			lastIndex = (length==tParent.index()) ? true : false,
			tParentIndex = tParent.index();
	var parentName = tParent.attr("class");

	var lastStr = $('#setLastDate').html();
	if($('#setLastDate').html() == ""){
		lastStr = $('#setLastDate').val();
	}

	_dataTime = lastStr.split(" ")[0];
	_sTime = getNextExeDate(_dataTime,"21");
	_sYear = getNextExeDate(_dataTime,"365");

	switch (parentName){

		case "dis" ://已注射

			datainit();
			tParent.parent().find('li').each(function(index) {

				if($(this).hasClass("electDis")){
					return;
				}else{
					if(indexsSelf < index){
						$(this).attr("class","select")
					}else{
						$(this).attr("class","dis")
					}
				}

			});

			if(indexsSelf == 0){
				//第一针恢复默认
				tParent.attr("class","select");
			}else{
				tParent.attr("class","selected");
			}

			tParent.next().attr("class","select").find(".tip-lable-mini").html("");
			t.prev().find('.tip-lable-mini').html("将注射");
			if(indexsSelf != 0){
				//如果点击的非第一针才有建议下次注射时间
				tParent.find('.font-c-gray').html("建议下次注射日期:"+_sTime);
			}

			tParent.prev().find('.font-c-gray').html("上次注射日期:"+_dataTime);

		break;

		case "selected" ://将注射

			datainit();
			tParent.parent().find('li').each(function(index) {

				if($(this).hasClass("electDis")){
					return;
				}
				if(indexsSelf<index){
					$(this).attr("class","select")
				}
			});
			tParent.attr("class","dis").next().attr("class","selected").find(".tip-lable-mini").html("将注射");
			t.prev().find('.tip-lable-mini').html("已注射");
			tParent.find('.font-c-gray').html("上次注射日期:"+_dataTime);
			if(tParentIndex == 2){
				tParent.next().find('.font-c-gray').html(_sYear);
			}else{
				tParent.next().find('.font-c-gray').html("建议下次注射日期:"+_sTime);
			}

			break;

		case "select" ://未注射
				datainit();
				tParent.parent().find('li').each(function(index) {

					if($(this).hasClass("electDis")){
						return;
					}else{
						if(index < indexsSelf){
							$(this).attr("class","dis");
					}else{
						$(this).attr("class","select");
					}
					if(tParent.prev().hasClass("electDis")){
						tParent.attr("class","dis").next().attr("class","selected").find(".tip-lable-mini").html("将注射");
						tParent.find('.font-c-gray').html("上次注射日期:"+_dataTime);
						tParent.next().find('.font-c-gray').html("建议下次注射日期:"+_sTime);
					}else{
						tParent.attr("class","dis").next().attr("class","selected").find(".tip-lable-mini").html("将注射");
						tParent.prev().attr("class","dis").find(".tip-lable-mini").html("已注射");
						t.prev().find('.tip-lable-mini').html("已注射");
						tParent.find('.font-c-gray').html("上次注射日期:"+_dataTime);

						if(tParentIndex == 2){
							tParent.next().find('.font-c-gray').html(_sYear);
						}else{
							tParent.next().find('.font-c-gray').html("建议下次注射日期:"+_sTime);
						}

					}


				}

			});


			break;
		default :
			// console.log("none");
	}

	var isSelected = 'N';
	tParent.parent().find('li').each(function(index) {

		if(index == 3 || index == 2){
			if($(this).hasClass("dis")){
				isSelected = 'Y';
			}
		}

	});
	adjustNextImmuneTime(isSelected);


})



// 验证
_yanzheng = {
	// 判断选择是否的免疫，返回true则是选择“是”。
	getYesNo : function(){
		return $("#J_selectYesNo .t-right").find("span").first().hasClass('i-selceted');
	},

	// 获取选择框的值，id是这个选择框的id，需要加上
	getSelectVal: function(id){
		var i = $(id)[0].selectedIndex;
		return $(id)[0].getElementsByTagName("option")[i].value;
	},

	// 获取选取的步骤，这里返回当前的值，1表示第一步，2表示第二步。
	getLevel: function(id){
		var length = $(id).find('.dis').length;
		return length;
	}
}


	// console.log(_yanzheng.getYesNo())
	// console.log(_yanzheng.getLevel("#J_selectPaln"))
	// console.log(_yanzheng.getSelectVal("#J_yimian"))

// 页面头部的报错信息
$(".btnSubmit").bind("tap",function(){
		ConfirmData("#J_showTrue");
		ConfirmSelect("#J_showTrue");
		ConfirmSelect("#J_showNone");

		$(".erro-tip-common").show().css("opacity",1);

		setTimeout("$('.erro-tip-common').animate({opacity: 0},500)",5000);

})


// 日期加减
var _dataTime = "2015-02-12";
var _sTime = dateOperator(_dataTime,"21","+");
var _sYear = dateOperator(_dataTime,"365","+");


//滑动条动画效果
$("#SelectLine").on("click","[data-select]",function(){
	 	var _self = $(this);
	 	var _className = _self.hasClass('icon-cross');
	 	var _width = ($("#SelectLine").width())-26;
	 	// 未注射
	 	if(_className){
	 		$("#SelectLine").find('.i-point-big').animate({left:_width}, 300,function(){
	 		_self.addClass('cur').siblings().removeClass('cur');
	 		$("#J_showNone").show();
	 		$("#J_showYes").hide();
	 		$("#J_showYes").attr('title', 'N');
	 		})
	 	}else{
	 		$("#SelectLine").find('.i-point-big').animate({left:"28px"}, 300,function(){
	 		_self.addClass('cur').siblings().removeClass('cur');
	 		$("#J_showYes").show();
	 		$("#J_showNone").hide();
	 		$("#J_showYes").attr('title', 'Y');
	 		})
	 	}
	})

//select
$("[data-select]").change(function(){
	var t = $(this);
	var mianyiPz = $(this).val();
	var index =t[0].selectedIndex;
	$('.J_paln').hide();
	if(index==0){
		t.addClass('font-c-gray').removeClass('font-c-base');
	}else{
		t.removeClass('font-c-gray').addClass('font-c-base');

		if($("#J_showYes").attr('title') == 'Y'){
			//选择时间后才显示
			if(isLastTimeSelected()){
				var showId = '#J_preLeve'+mianyiPz;
				$(showId).show();
			}else{
				callAppAlert('请选择上次免疫时间');
				return false;
			}

		}

		$(window).scrollTop($(document).height());
	}
});



});



function getImmuneCode(){
	if($("#J_showYes").attr('title') == 'Y'){
		return getImmuneCodeWhenImmunedBefore();
	}else{
		return getImmuneCodeWhenNeverImmuned();
	}
}

function getImmuneCodeWhenNeverImmuned(){
	var mianyiPz = $('#noMainyiPz').val();

	if(mianyiPz == '' || mianyiPz == undefined){
		return '';
	}

	var reg= /^[A-Za-z]+$/;
	if(!reg.test(mianyiPz)){
		return '';
	}

	if(mianyiPz == 'ICF'){
		return 'ICTF';
	}else{
		return mianyiPz+'F';
	}
}

function getImmuneCodeWhenImmunedBefore(){
	var immuneCode = '';
	var mianyiPz = $('#yesMainyiPz').val();
	var showId = '#J_preLeve'+mianyiPz;
	$(showId).find("ul").children().each(function(){
			if($(this).attr("class")=="dis"){
				immuneCode= mianyiPz+$(this).attr("title");
				if(immuneCode =="ICFICTF"){
					immuneCode="ICTF";//
				}
			}
	});
	return immuneCode;
}


function getNextImmuneCodeWhenImmunedBefore(){
	var immuneCode = '';
	var mianyiPz = $('#yesMainyiPz').val();
	var showId = '#J_preLeve'+mianyiPz;
	$(showId).find("ul").children().each(function(){
			if($(this).attr("class")=="selected"){
				immuneCode= mianyiPz+$(this).attr("title");
				return;
			}
	});

	if(immuneCode == ''){
		return getImmuneCode();
	}
	return immuneCode;
}


function getNextExeDate(date,days){
	var nextDate = dateOperator(date,days,"+");
	var curDate = CurentDate();
	if(daysBetween(nextDate,curDate) <= 0){
		nextDate = dateOperator(curDate,"1","+");
	}
	return nextDate;
}

function dateOperator(date,days,operator){

    date = date.replace(/-/g,"/"); //更改日期格式
    var nd = new Date(date);
    nd = nd.valueOf();
    if(operator=="+"){
     nd = nd + days * 24 * 60 * 60 * 1000;
    }else if(operator=="-"){
        nd = nd - days * 24 * 60 * 60 * 1000;
    }else{
        return false;
    }
    nd = new Date(nd);

    var y = nd.getFullYear();
    var m = nd.getMonth()+1;
    var d = nd.getDate();
    if(m <= 9) m = "0"+m;
    if(d <= 9) d = "0"+d;
    var cdate = y+"-"+m+"-"+d;
    return cdate;
}

function daysBetween(DateOne,DateTwo)
{
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));

    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));

    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
    return cha;
}


function CurentDate()
{
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day;

    return(clock);
}

function getDateStringByUnixTimeStamp(unixTime){

	var now = new Date(parseInt(unixTime) * 1000);

	var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";

    	clock += hh + ":";
    if (mm < 10) clock += '0';
    	clock += mm;

    return(clock);

}

function getSubmitDateStringByUnixTimeStamp(unixTime){

	var now = new Date(parseInt(unixTime) * 1000);

	var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year.toString();

    if(month < 10)
        clock+= "0";

    clock+=month;

    if(day < 10)
    	clock+="0";

    clock+=day;

    if(hh < 10)
    	clock+="0";

    clock+=hh;
    if (mm < 10) clock+='0';
    clock+=mm;

    return(clock+="00");

}

function isSameDay(webDateStr, longFormatStr){
	webDateStr = webDateStr.replace(/-/g,"");
	longFormatStr = longFormatStr.substr(0,8);
	if(webDateStr == longFormatStr){
		return true;
	}
	return false;
}

function getSelectStatusWhenImmunedBefore(mianyiPz){
	var showId = '#J_preLeve'+mianyiPz;
	var i = 0;
	var arr = new Array();
	arr[0] = mianyiPz;
	$(showId).find("ul").children().each(function(){
		arr[++i] = $(this).attr("class");
	});
	return arr;
}

function isImmuneCodeSameWhenImmunedBefore(orgArr, arr){
	if(orgArr.length != arr.length){
		return false;
	}

	for(var i=0; i<arr.length; i++){
		if(arr[i].trim() != orgArr[i].trim()){
			return false;
		}
	}
	return true;
}



function getWebDateStrFromUnix(unixtime){

	var now = new Date(parseInt(unixtime) * 1000);

	var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日


    var clock = year.toString()+"-";

    if(month < 10)
        clock+= "0";

    clock+=month+"-";

    if(day < 10)
    	clock+="0";

    clock+=day;

	return clock;
}


