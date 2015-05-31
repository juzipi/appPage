//默认从第2页开始加载

var footTime = 0;

function getMoreNews(){
	var lastTime = jQuery('#lastTimeInput').val();
	var requestUrl= rootPath+"/ajax/news/getIndexMoreNews.htm?lastTime="+lastTime;
	jQuery.ajax({
       	type: "GET",
       	url: requestUrl,
    	timeout: 20000,
       	success: function(data){
			var result = jQuery.parseJSON(data);
			if('OK'== result.returnCode)
			{

				var tableHmtl ="";
				jQuery.each(result.newsList, function (i,story) {
					jQuery('#lastTimeInput').val(story.modifyDateStr);
					tableHmtl += '<li><div class="qushi-img-ov-min">';
					if(story.pics==''){
					tableHmtl += '<a target="_blank"  href="/news/newsDetail.htm?newsId='+story.id+'&contentType='+story.contentType+'"><img alt="狗管家-养狗-宠物网-狗狗新闻-宠物社区" src="'+rootPath+'/htdocs/images/beijing.png" ></a>';
					}else{
					tableHmtl += '<a target="_blank"  href="/news/newsDetail.htm?newsId='+story.id+'&contentType='+story.contentType+'"><img alt="狗管家-养狗-宠物网-狗狗新闻-宠物社区" src="'+story.pics+'!index300"></a>';
					}
					tableHmtl += '</div><div class="qushi-c">';
					tableHmtl += '<div class="qushi-c-bd"><a target="_blank"  href="/news/newsDetail.htm?newsId='+story.id+'&contentType='+story.contentType+'">'+story.title+'</a>';
					tableHmtl += '<div class="qushi-con-mini">';
					if(story.storyAbstract!=""){
					tableHmtl += story.storyAbstract.substring(0,32)+'...';
					}else{
					tableHmtl += '一切尽在不言中';
					}
					tableHmtl += '</div>';
					tableHmtl += '</div>';
					tableHmtl += '<div class="clear">';
					tableHmtl += story.modifyDateShort;
					if(story.ext ==""){
						tableHmtl += '<div class="ar-Authors f-right">狗管家编辑</div>';
					}else{
						tableHmtl += '<div class="ar-Authors f-right">'+story.ext+'</div>';
					}
					tableHmtl += '</div>';
					tableHmtl += '</div>';
					tableHmtl += '</li>';
				});

				jQuery(tableHmtl).appendTo('#qushi-list').hide().fadeIn(500);
				$('#moreButton').attr('data-loading','0');
				
				if(result.isLastPage==1){
					jQuery('#moreFlag').html("没有更多狗狗趣事");
				}else{
    				jQuery('#moreButton').html("查看更多新鲜事");
				}
			}else{
				jQuery('#moreButton').html("加载失败");
			}
       	},
		beforeSend: function() {
			jQuery('#moreButton').html("一大波狗狗袭来...");
			$('#moreButton').attr('data-loading','1');
		},
		error: function() {
			jQuery('#moreButton').html("加载失败");
		},
	});
}


	//滚动加载更多

	$(window).scroll(function(){
		if($('#moreButton').attr('data-loading') == '1'){
			return false;
		}
		
		if(footTime<4){
		
		var _windowTop=$(window).scrollTop();
		var _windowHeight=$(window).height();
		var _footer_top=$("#moreButton").offset().top;
		
			if(_footer_top - _windowTop - _windowHeight < 50){
			//加载ajax
		
				getMoreNews()
				return footTime +=1;
				
				
			}
			
		}
	});

