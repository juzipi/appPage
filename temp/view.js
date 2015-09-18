 $(document).ready(function(){ 

 	// window.alert =function(context){
 	// 	$("#J_alert").html(context);
 	// 	$(".popup-alert").show();
 	// }



 $(".btn-sure").click("click",function() {
 	$(this).parents(".popup").hide();
 });
 

 	// fix click 300
 	FastClick.attach(document.body);

 		$(document).bind("mousedown touchstart",function(e){
						var tar=$(e.target);
						tar.addClass("hover");
		})
			
			$(document).bind("mouseup touchend touchmove", function(e) {
				var tar = $(e.target);
				tar.removeClass("hover");
			})

			//显示那一页
			var showPage = function (page){
				$(".page").css("display","none");
				$(page).show();
				return false;
			}

		// loading
		var _imgTemp= false;
		var loading = function(){
			var ags=0;
			var urls=arguments;
			var l=urls.length;
			for(var i=0; i<l; i++){
				var Ima=new Image();
				Ima.src=urls[i];
				Ima.onload=function(){
					ags+=1;
					if(ags==l){
					// return _imgTemp = true;
					showPage("#gameStart"); 
				}
			}
	} 
}

loading("img/index.jpg","img/answer_1.jpg","img/answer_2.jpg","img/answer_3.jpg","img/answer_4.jpg","img/answer_5.jpg","img/answer_6.jpg","img/answer_7.jpg","img/answer_8.jpg","img/answer_9.jpg","img/share_tip.png");

 				// 开始第一步
			$("#next-1").click(function() {
					showPage("#gameStep1");
			});	

			var _Score = 0,
					_n = 7.15;
			for(var i=1; i<14; i++){
				(function(i){
					$("#list"+i+" li").click(function() {
						if($(this).hasClass("answer")){
							_Score = _Score + _n;
						}
						showPage("#gameStep"+(i+1)); 
						console.log(_Score);
					});	
				})(i)
			}

			// 最后一步

			$("#list14 li").click(function() {
					showPage("#gameEnd"); 
					if($(this).hasClass("answer")){
							_Score = _Score + _n;
						}
						_Score = Math.round(_Score);
					$("#ChengJi").html(_Score);
					if(_Score<51 && _Score>0){
						$("#ChengHu").html("狗狗迫害者");
						$("#J_link").html("快来消除狗狗怨恨");
						$("#PingYu").html("<p>你对狗狗可以说是完全不了解，</p><p>狗狗日常的很多明示暗示你都不懂，</p><p>狗狗心中有千万只草泥马奔过</p><p>相处至今你们家狗没咬你</p><p>对你就是真爱！</p>")
						document.title = _Score+"分，我居然是“狗狗迫害者”，相处到现在，我们家狗狗没咬我对我就是真爱！你行你上啊！";
					}else if (_Score>50 && _Score <71) {
						$("#ChengHu").html("狗奴");
						$("#J_link").html("快来消除狗狗怨恨");
						$("#PingYu").html("<p>你对狗狗有一定的了解，</p><p>可是仅限于饿了给吃，渴了给水，</p><p>狗狗的精神娱乐在你这里得不到满足</p><p>在狗狗眼中你就是个铲屎的</p><p>资深狗奴而！</p>");
						document.title = _Score+"分，我居然是“狗奴”，在狗狗眼中，我就是个铲屎的！你不是你来测啊！";
					}else if (_Score>70 && _Score <86) {
						$("#ChengHu").html("合格狗主人");
						$("#PingYu").html("<p>你对狗狗的了解其实还不错，</p><p>对狗狗的照顾也可以说是无微不至，</p><p>偶尔狗狗看你的眼神会充满崇拜</p><p>可是有时候也会让狗狗抓狂</p><p>感叹曾经那个懂它的主人去哪里了！</p>");
						document.title = _Score+"分，我居然是“合格狗主人”，可有时候也会让狗狗抓狂，快来测测你是什么？";
					}else if (_Score>87 && _Score <101) {
						$("#ChengHu").html("狗语者");
						$("#PingYu").html("<p>你对狗狗的了解已经非常透彻，</p><p>狗狗的一举一动都在你的掌控之中，</p><p>你可以很好地和狗狗交流沟通</p><p>在狗狗眼中你就是神的化身</p><p>知它莫若你也！</p>");
						document.title = _Score+"分，我居然是“狗语者”，在狗狗眼中，我就是神的化身！快来看看你是什么？";
					}

			});

				// 分享 mask
				$("#J_showShare").click(function() {
						$("#J_shareBox").show();
				});
				// 隐藏分享
					$("#J_shareMask").click(function() {
						$("#J_shareBox").hide();
					});

					// 重新测试
					$("#resetGame").click(function() {
							_Score = 0;
							showPage("#gameStep1"); 
					});

		
		
 });


