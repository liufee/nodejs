# A library for nodejs

## Introduction
1. lib/page.js

##Usage
1. lib/page.js
```
var pg = require('../lib/page.js');      //inclued page class
var params = {//配置分页参数,pageListNum为显示页码按钮的数量:默认为15，perPage为每页显示的记录数:默认为20,pageSign为分页标识码：默认为page, config为分页模版
					pageListNum : 15,
					perPage : 10,
					pageSign : "p",
					config : {
						"header" : '<span style="position:relative;top:8px;left:10px" class="rows">第%CURRENT%------%TOTAL%页</span>',
						'first'  : '<li><a href="%HREF%" aria-label="fisrt"><span aria-hidden="true">首页</span></a></li>',
						'prev'   : '<li><a href="%HREF%" aria-label="Previous"><span aria-hidden="true">上一页</span></a></li>',
						'next'   : '<li><a href="%HREF%" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>',
						'last'   : '<li><a href="%HREF%" aria-label="last"><span aria-hidden="true">尾页</span></a></li>',
						'list'	 : '<li class="%STATUS%"><a href="%HREF%">%NUM%</a></li>',//要输出的分页列表模版
						'theme'  : '<nav><ul class="pagination">%FIRST% %PREV% %PAGES% %NEXT% %LAST% %HEADER%</ul></nav>'
					}
			}
var p = new pg(req, results[0]['total'], params);      //nodejs request object, total rows, page config params
var limit = p.getLimit();      //get limit sql part
var pageList = p.showPage();   //get page list
```
				