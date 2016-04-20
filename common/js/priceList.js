// $.ajax({
// 				url:"../../common/data/priceClass.json",
// 				dataType:"json",
// 				beforeSend : function(){
// 					console.log("b")
// 				},
// 				complete : function(d){
// 					var s = d.response;
// 					var data = $.parseJSON(s);
// 					console.log(d.response);
// 				var Arr_item = [];
// 			$.each(data,function(index,item){
// 				// 建立最顶部div
// 				var div = document.createElement("div");
// 				div.setAttribute("id", index);
// 				div.setAttribute("class", "none");
				
// 				var parentUl = document.createElement("ul");
// 				parentUl.setAttribute("class", "priceList");

// 				$.each(item,function(i,t){
// 					var _a='';//li这是第二级别需要的li
// 					_a += '<div class="parentList">'+ t +'<i class="icon-angle-right"></i></div>';	
// 					Arr_item.push(t);	
// 					var parentLi = document.createElement("li");
// 					$(parentLi).append(_a);
// 					$.get("../../common/data/priceList.json",function(listData){

// 								var chlidUl = document.createElement("ul");
// 										chlidUl.setAttribute("class", "priceDetail");
// 										$.each(listData[t],function(index,item){
// 											var chlidLi = '';
// 											chlidLi += '<li><div class="priceTitle">'+item.name+'</div><sub class="font-c-gray">'+item.remark+'</sub><div class="price">'+item.price+'</div></li> ';
// 											$(chlidUl).append(chlidLi);
// 										})
										
// 									$(parentLi).append(chlidUl);
									
// 						})
					
// 					$(parentUl).append(parentLi);
// 				})
				
// 				$(div).append(parentUl)
				
// 				$("#priceClassList").append(div)
// 			})
				
// 				var url = window.location.hash;
// 				$(url).show().siblings().hide();
// 				}
// 			})

		$(document).ready(function(){ 
				$(document).on("click",".parentList",function(){
					// $(".priceDetail").hide();
					// alert("you")
					$(this).next().toggle();
					$(this).find("i").toggleClass("icon-angle-down");
				})
		})