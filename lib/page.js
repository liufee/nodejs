/*
* @author liufee <job@feehi.com>
* @link http://blog.feehi.com
* @description nodejs分页类
**/
var url = require('url');

module.exports = function(page, total, req){

		this.page = page ? page : 1;
		this.pageListNum = 10;//分页按钮数量
		this.pageSign = 'page';//分页标识符
		this.total = total;//总记录数
		this.perPage = 20;//每页显示多少条记录
		this.totalPage = Math.ceil(this.total/this.perPage);
		this.req = req;//request对象
		this.config = {
			"header" : '<span class="rows">共 %TOTAL_ROW% 条记录</span>',
			'first'  : '<li><a href="%HREF%" aria-label="fisrt"><span aria-hidden="true">首页</span></a></li>',
			'prev'   : '<li><a href="%HREF%" aria-label="Previous"><span aria-hidden="true">上一页</span></a></li>',
			'next'   : '<li><a href="%HREF%" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>',
			'last'   : '<li><a href="%HREF%" aria-label="last"><span aria-hidden="true">尾页</span></a></li>',
			'list'	 : '<li class="%STATUS%"><a href="%HREF%">%NUM%</a></li>',//要输出的分页列表模版
			'theme'  : '<nav><ul class="pagination">%FIRST% %PREV% %PAGES% %NEXT% %LAST%</ul></nav>'
		};
		
		/*获取sql语句中limit部分*/
		this.getLimit = function(){
			if(this.page&&this.page>0){
				var start = (this.page-1) * this.perPage;
			}else{
				page = 1;
				var start = 1;
			}
			return "limit "+start+','+this.perPage;
		}

		this.parseUrl = function(){
			var query = '';
			var urls = url.parse(this.req.url, true);
			var query = this.req._parsedOriginalUrl.pathname+'?';
			for(var index in urls.query){
				if( index != this.pageSign ){
					query += index+'='+urls.query[index]+'&';
				}
			}
			this.query = query+this.pageSign+'=';
		}

		this.getFirst = function(){
					var first = '';
					if(this.page != 1){
						first = this.config.first.replace(/%HREF%/, this.query+1);
					}
					return first;
		}

		this.getPrev = function(){
					var prev = '';
					if(this.page != 1){
						var i = parseInt(this.page)-1;
						prev = this.config.prev.replace(/%HREF%/, this.query+i);
					}
					return prev;
		}

		this.getNext = function(){
					var next = '';
					if(this.page<this.totalPage){
						var i = parseInt(this.page)+1;
						next = this.config.next.replace(/%HREF%/, this.query+i);
					}
					return next;
		}

		this.getLast = function(){
					var last = '';
					if(this.page < this.totalPage){
						last = this.config.last.replace(/%HREF%/, this.query+this.totalPage);
					}
					return last;
		}

		this.getPages = function(){
					var nums = Math.ceil(this.pageListNum/2);
					var pages = '';
					var temp = '';
					if(this.page<=nums){//当前页不足显示分页数木的一半，从1-pageListNum
						for(var i=1; i<=this.pageListNum; i++){
							var status = 'disable';
							if(i == this.page){
								status = 'active';
							}
							temp = this.config.list.replace(/%STATUS%/, status).replace(/%HREF%/, this.query+i).replace(/%NUM%/, i);
							pages += temp;
						}
					}else{//从当前页，向前一半，向后一半
						for(var j=nums; j>0; j--){//前半部分li
							i = this.page-j;
							temp = this.config.list.replace(/%STATUS%/, 'disable').replace(/%HREF%/, this.query+i).replace(/%NUM%/, i);
							pages += temp;
						}
						pages += this.config.list.replace(/%STATUS%/, 'active').replace(/%HREF%/, this.query+this.page).replace(/%NUM%/, this.page);
						for(var j=1;j<nums;j++){//后半部分li
							i = parseInt(this.page)+j;
							if(i>this.totalPage) break;
							temp = this.config.list.replace(/%STATUS%/, 'disable').replace(/%HREF%/, this.query+i).replace(/%NUM%/, i);
							pages += temp;
						}
					}
					return pages;
		}

		this.showPage = function(){
			this.parseUrl();
			var first = this.getFirst();
			var prev = this.getPrev();
			var next = this.getNext();
			var last = this.getLast();
			var pages = this.getPages();
			return this.config.theme.replace(/%FIRST%/, first).replace(/%PREV%/, prev).replace(/%PAGES%/, pages).replace(/%NEXT%/, next).replace(/%LAST%/, last);
		}
}