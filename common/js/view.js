 $(document).ready(function(){ 
 
 var _G={
		//判断安卓版本，低版本不支持fixed属性
			fixAndroidPosition:function(){
				var n=navigator.appVersion;
				var onOff=n.indexOf("Android 2");//判断安卓2开头的版本修复fixed的bug
				if(onOff>-1){
					//$(".page").css("padding-top","0px");
					//$(".header").css("position","relative");
					$('.btn-fixed').css('position','absolute');
						$(window).bind('scroll',function(){
							var s = $(window).height();
							var n=$(window).scrollTop();
							var i=$('.btn-fixed').height();
									var fixedTitle = $('.btn-fixed');
									fixedTitle.css('position','absolute');
									fixedTitle.css('top',((s+n)-i) + 'px');
					});		
				}				
			},
			//修复ios定位问题
			fixIosPosition:function(){
				
				var n=navigator.appVersion;
				var onOff=n.indexOf("iPhone");
				var ipad=n.indexOf("iPad");
				//判断ios设备
				if(onOff>-1||ipad>-1){
					// alert(navigator.appVersion)
					$("input[type='text']").focus(function(){

						$(".header").css("position","absolute");
						
					})
					$("input[type='text']").blur(function(){

						$(".header").css("position","fixed");
					})
				
					
				}
			},
			//修复魅族不支持fixed问题
		fixMxFixed:function(){
				var n=navigator.userAgent;
				var onOff=n.indexOf("M040");
				if(onOff>-1){
					$(".page").css("padding-top","0px");
					$(".pageNoHead").css("padding-bottom","0px");
					$(".pageHeadBottom").css("padding-top","0px");
					$(".header").css("position","relative");
					$(".HomeFooterMod").css("position","relative");
					$(".btn-fixed").css({"position":"relative","margin-top":"10px"})
					$(".select-bank").css("padding-bottom","0px");
					$(".choicePayment").css("padding","0px");
					$(".tip-popup").css("position","absolute");
					$(".lchd-Mod").css("padding-top","0");
				}
			},
			//
			fixPlacehold:function(){
				$(".JNumber").focus(function(){
					$(this).attr("type","number");
				})
				$(".JNumber").blur(function(){
					$(this).attr("type","text");
				})
			}
		};
	//_G.fixAndroidPosition();
	//_G.fixIosPosition();
	_G.fixMxFixed();
	_G.fixPlacehold();



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

// 选择隐藏于显示
function showHide (id,showEel,hideEel){
	$(id).click(function(){
		$(showEel).show();
		$(hideEel).hide();
		$("#J_fixBottom").removeClass('fixBottom');
	});

}

showHide("#J_noMianyi","#J_showno","#J_mianyi")
showHide("#J_yesMianyi","#J_showyes","#J_mianyi")

function ConfirmSelect(id){
	var index = $(id).find(".select-01")[0].selectedIndex;
	$(id).find(".select-01").parents(".col-2").removeClass("dou");
	console.log(index)
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
	var val = $(id).find(".paln-time").val();
	var index = $(id).find(".select-01")[0].selectedIndex;
	if(val!="" && index!=0 ){
		$("#J_paln").show();
	}
}
// 选择狗粮
$("#J_showyes").on("change",".select-01",function(){

	showPaln("#J_showyes");

})
// 选择时间
$("#J_showyes").on("blur",".paln-time",function(){
	showPaln("#J_showyes")
})

// 当选择没有免疫过 选择狗粮
$("#J_showno").on("change",".select-01",function(){
	var index = $("#J_showno").find(".select-01")[0].selectedIndex;
	if(index!=0){
		$("#J_paln").show();
	}
})

// 把“将注射”样式切换成“已注射”
$("#J_selectPaln").on("tap",".selected .i-point",function(){
	var t = $(this);
	t.parent().attr("class","dis").next().attr("class","selected").find(".content").append('<div class="tip-lable-mini">将注射</div>');
	t.prev().find('.tip-lable-mini').html("已注射");
})


// 页面头部的报错信息
				$(".btnSubmit").bind("tap",function(){
						ConfirmData("#J_showyes");
						ConfirmSelect("#J_showyes");
						ConfirmSelect("#J_showno");
						$(".erro-tip-common").show().css("opacity",1);   

						setTimeout("$('.erro-tip-common').animate({opacity: 0},500)",5000);
				})

function scorllAuto (el){
	var srollTop = $(el).scrollTop();
	var setTop = $(el).offset().top;
	console.log(srollTop+"he"+setTop);
}






 
 // function showBanner(){
 // 	$("")
 // }
//  if(document.getElementById("index_banner")){
// 	document.getElementById("index_banner").onload=function(){
// 	 	var indexBanner=setTimeout("$('.banner').removeClass('none')",3000);
// 	 }
// }
 // $(window).scroll(function() {
 // 		var top=$(window).scrollTop();
 // 		var docHeight=$(document).height();
 // });

//  $(window).scroll(function(){
// 　　var scrollTop = $(this).scrollTop();
// 　　var scrollHeight = $(document).height()-30;
// 　　var windowHeight = $(this).height();
// 　　if(scrollTop + windowHeight > scrollHeight){
// 　　　　$("#J_downLoadTip").hide();
// 　　}else{
// 		$("#J_downLoadTip").show();
// }
// });




 })



