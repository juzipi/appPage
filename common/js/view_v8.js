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
	},
	//弹出框图片垂直居中对齐
	heightCenter : function(el){
		var documentHeight = $(window).height();
		var elHeight = el.height();
		var half = elHeight/2; //通过margin-top负值，居中对齐。
		if(elHeight<documentHeight){//当图片高度小于窗口高度
			el.css({"margin-top":-half});
		}else{//当图片高度大于窗口高度
			el.css({"width":"auto","height":documentHeight,"position":"relative","top":"auto"});
			$(document).find('body').css("overflow","hidden");//不让下面的内容可以滚动。
		}
		
	},
		// 自动高度
		fullHeight : function(){
			var h = ($(window).height() < $(document).height()) ? $(document).height() :$(window).height();
			$(".fullHeight").height(h)
		}
}
_defult.imgAuto("#headImage");
_defult.fullHeight();



	// 关闭图片
$(document).on("click",".maskblack", function(e) {
	$("#J_imgPopup").hide();
});

// 单例
var singleFn = function(fn){
	var rel;
	return function(){
		return rel || (rel = fn.apply(this,arguments));
	}
}
// 创建img弹出框
var CreateImgPopup = function(url){
	var viewport = document.querySelector("meta[name=viewport]");
	var popup = document.createElement('div');
	popup.id = "J_imgPopup";
	popup.className = "img-popup";
	viewport.setAttribute('content', 'width=device-width');
	$(document).find('body').append(popup);
	return popup;
}
var creatImgPopup = singleFn(CreateImgPopup);

//约定data-popup带属性的具有弹出img
$("[data-popup]").on('click', function(event) {

	var url = $(this).attr("src");
	var popup = creatImgPopup();
	var image = document.createElement("img");
	image.src = url;
	image.id = "J_popupImg";
	// image.src = "../../common/img/icon_plan.png";
	var html = '<div class="i-loading"><div><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div><div class="maskblack"></div>'
	$(popup).html(html);
	$(popup).show();
	image.onload = function(){
		$(popup).find('.i-loading').hide();
		$(popup).append(image);
		_defult.heightCenter($("#J_popupImg"));
	}
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
			tParent.attr("class","selected");
			tParent.next().attr("class","select").find(".tip-lable-mini").html("未注射");
			t.prev().find('.tip-lable-mini').html("将注射");
			tParent.find('.font-c-gray').html("建议下次注射日期:"+_sTime);
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
			datainit()
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
	

})






// 日期加减
var _dataTime = "2015-02-12";
var _sTime = dateOperator(_dataTime,"21","+");
var _sYear = dateOperator(_dataTime,"356","+");
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
	 		})
	 	}else{
	 		$("#SelectLine").find('.i-point-big').animate({left:"28px"}, 300,function(){
	 		_self.addClass('cur').siblings().removeClass('cur');
	 		$("#J_showYes").show();
	 		$("#J_showNone").hide();
	 		})
	 	}
 	})

// fn
function showpre () {
	$("#J_preLeve").show();
	$(window).scrollTop($(document).height());
}
// select

$("[data-select]").change(function(){
	var t = $(this);
	var index =t[0].selectedIndex;
	if(index==0){
		t.addClass('font-c-gray').removeClass('font-c-base');
	}else{
		t.removeClass('font-c-gray').addClass('font-c-base');
		showpre ()
	}
})





 })




