$(document).ready(function(){function t(){var t=$(".paln-fangan").find(".font-c-gray").attr("data-init");$(".paln-fangan").find(".font-c-gray").html(t)}function a(t,a,n){t=t.replace(/-/g,"/");var e=new Date(t);if(e=e.valueOf(),"+"==n)e+=24*a*60*60*1e3;else{if("-"!=n)return!1;e-=24*a*60*60*1e3}e=new Date(e);var s=e.getFullYear(),i=e.getMonth()+1,l=e.getDate();9>=i&&(i="0"+i),9>=l&&(l="0"+l);var c=s+"-"+i+"-"+l;return c}FastClick.attach(document.body);var n={imgAuto:function(t){var a=$(t)[0],n=$(t).attr("src"),e=$(".paln-head").width(),s=$(".paln-head").height(),i=e/s;if($(t)[0]){var l="<div class='i-loading'><div><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div>";$(t).parent().append(l),$.ajax({url:n,type:"GET",global:!1,beforeSend:function(){},complete:function(){var n=a.naturalWidth,e=a.naturalHeight,s=n/e;$(t).parent().find(".i-loading").remove(),i>s?$(t).css("width","100%"):$(t).css("height","100%"),$(t).show()}})}},heightCenter:function(t){var a=$(window).height(),n=t.height(),e=n/2;a>n?t.css({"margin-top":-e}):(t.css({width:"auto",height:a,position:"relative",top:"auto"}),$(document).find("body").css("overflow","hidden"))}};n.imgAuto("#headImage"),$(document).on("click",".maskblack",function(t){$("#J_imgPopup").hide()});var e=function(t){var a;return function(){return a||(a=t.apply(this,arguments))}},s=function(t){var a=document.querySelector("meta[name=viewport]"),n=document.createElement("div");return n.id="J_imgPopup",n.className="img-popup",a.setAttribute("content","width=device-width"),$(document).find("body").append(n),n},i=e(s);$("[data-popup]").on("click",function(t){var a=$(this).attr("src"),e=i(),s=document.createElement("img");s.src=a,s.id="J_popupImg";var l='<div class="i-loading"><div><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div><div class="maskblack"></div>';$(e).html(l),$(e).show(),s.onload=function(){$(e).find(".i-loading").hide(),$(e).append(s),n.heightCenter($("#J_popupImg"))}}),$(document).bind("mousedown touchstart",function(t){var a=$(t.target);"I"==t.target.tagName&&(a="I"==$(t.target).parent()[0].tagName?$(t.target).parent().parent():$(t.target).parent()),a.addClass("hover")}),$(document).bind("mouseup touchend touchmove",function(t){var a=$(t.target);"I"==t.target.tagName&&(a="I"==$(t.target).parent()[0].tagName?$(t.target).parent().parent():$(t.target).parent()),a.removeClass("hover")}),$(".paln-fangan .i-point").on("click",function(){var a=$(this),n=a.parent(),e="electDis"==n.prev().attr("class")?!1:!0,s=n.parent().find("li").length-1,i=n.parent().find("li").length,d=n.index(),p=s==n.index()?!0:!1,o=n.index(),h=n.attr("class");switch(h){case"dis":t(),n.parent().find("li").each(function(t){$(this).hasClass("electDis")||(t>d?$(this).attr("class","select"):$(this).attr("class","dis"))}),n.attr("class","selected"),n.next().attr("class","select").find(".tip-lable-mini").html("未注射"),a.prev().find(".tip-lable-mini").html("将注射"),n.find(".font-c-gray").html("建议下次注射日期:"+c),n.prev().find(".font-c-gray").html("上次注射日期:"+l);break;case"selected":t(),n.parent().find("li").each(function(t){$(this).hasClass("electDis")||t>d&&$(this).attr("class","select")}),n.attr("class","dis").next().attr("class","selected").find(".tip-lable-mini").html("将注射"),a.prev().find(".tip-lable-mini").html("已注射"),n.find(".font-c-gray").html("上次注射日期:"+l),2==o?n.next().find(".font-c-gray").html(r):n.next().find(".font-c-gray").html("建议下次注射日期:"+c);break;case"select":t(),n.parent().find("li").each(function(t){$(this).hasClass("electDis")||(d>t?$(this).attr("class","dis"):$(this).attr("class","select"),n.prev().hasClass("electDis")?(n.attr("class","dis").next().attr("class","selected").find(".tip-lable-mini").html("将注射"),n.find(".font-c-gray").html("上次注射日期:"+l),n.next().find(".font-c-gray").html("建议下次注射日期:"+c)):(n.attr("class","dis").next().attr("class","selected").find(".tip-lable-mini").html("将注射"),n.prev().attr("class","dis").find(".tip-lable-mini").html("已注射"),a.prev().find(".tip-lable-mini").html("已注射"),n.find(".font-c-gray").html("上次注射日期:"+l),2==o?n.next().find(".font-c-gray").html(r):n.next().find(".font-c-gray").html("建议下次注射日期:"+c)))})}});var l="2015-02-12",c=a(l,"21","+"),r=a(l,"356","+");$("#SelectLine").on("click","[data-select]",function(){var t=$(this),a=t.hasClass("icon-cross"),n=$("#SelectLine").width()-26;a?$("#SelectLine").find(".i-point-big").animate({left:n},300,function(){t.addClass("cur").siblings().removeClass("cur"),$("#J_showNone").show(),$("#J_showYes").hide()}):$("#SelectLine").find(".i-point-big").animate({left:"28px"},300,function(){t.addClass("cur").siblings().removeClass("cur"),$("#J_showYes").show(),$("#J_showNone").hide()})}),$("[data-select]").change(function(){var t=$(this),a=t[0].selectedIndex;0==a?t.addClass("font-c-gray").removeClass("font-c-base"):(t.removeClass("font-c-gray").addClass("font-c-base"),$("#J_preLeve").show(),$(window).scrollTop($(document).height()))})});