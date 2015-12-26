/*
* @author liufee <job@feehi.com>
* @link http://blog.feehi.com
* @description nodejs分页类
**/
var url = require('url');

module.exports = function(page, total, req){

		//var config = require("../conf/config.js");
		this.page = page?page:1;
		this.pageListNum = 10;//分页按钮数量
		this.pageSign = 'page';//分页标识符
		this.total = total;
		this.perpage = 20;//每页显示多少条记录
		this.totalPage = Math.ceil(this.total/this.perpage);
		this.req = req;//request对象
		
		/*获取sql语句中limit部分*/
		this.getLimit = function(){
			if(this.page&&this.page>0){
				var start = (this.page-1) * this.perpage;
			}else{
				page = 1;
				var start = 1;
			}
			return "limit "+start+','+this.perpage;
		}

		/*获取分页的列表*/
		this.getPageList=function(){
			var urls =url.parse(this.req.url, true);
			var query = this.req._parsedOriginalUrl.pathname+'?';
			for(var index in urls.query){
				if( index != this.pageSign ){
					query += index+'='+urls.query[index]+'&';
				}
			}
			query += this.pageSign+'=';
			//console.log(query);return false;
			var nums = Math.ceil(this.pageListNum/2);
			if(this.page<=nums){//当前页不足显示分页数木的一半，从1-pageListNum
				var lis='';
				if(this.page!=1){
					var prev = parseInt(this.page)-1;//前一页
					lis += '<li><a href="'+query+'1" aria-label="fisrt"><span aria-hidden="true">首页</span></a></li>';
					lis += '<li><a href="'+query+prev+'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
				}
				for(var i=1; i<=this.pageListNum; i++){
					var status = 'disable';
					if(i == this.page){
						status = 'active';
					}
					lis += '<li class="'+status+'"><a href="'+query+i+'">'+i+' <span class="sr-only">(current)</span></a></li>';
				}
				if(this.page<this.totalPage){
					var next = parseInt(this.page)+1;
					lis += '<li><a href="'+query+next+'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
					lis += '<li><a href="'+query+this.totalPage+'" aria-label="last"><span aria-hidden="true">尾页</span></a></li>';
				}
			}else{//从当前页，向前一半，向后一半
				var prev = this.page-1;//前一页
				var lis = '<li><a href="'+query+'1" aria-label="fisrt"><span aria-hidden="true">首页</span></a></li>';
				lis += '<li><a href="'+query+prev+'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
				var p;
				for(var i=nums; i>0; i--){//前半部分li
					p = this.page-i;
					lis += '<li class="disable"><a href="'+query+p+'">'+p+' <span class="sr-only">(current)</span></a></li>';
				}
				lis += '<li class="active"><a href="#">'+this.page+' <span class="sr-only">(current)</span></a></li>';
				for(var i=1;i<nums;i++){//后半部分li
					p = parseInt(this.page)+i;
					if(p>this.totalPage) break;
					lis += '<li class=disable><a href="'+query+p+'">'+p+' <span class="sr-only">(current)</span></a></li>';
				}
				if(this.page<this.totalPage){//下一页
					var next = parseInt(this.page)+1;
					lis += '<li><a href="'+query+next+'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
					lis += '<li><a href="'+query+this.totalPage+'" aria-label="last"><span aria-hidden="true">尾页</span></a></li>';
				}
			}
			var page =  '<ul class="pagination">'+lis+'</ul>';
			//<li>共'+this.total+'条记录,显示'+this.page+'/'+this.totalPage+'页&nbsp;&nbsp</li>
			return page;
		}
}