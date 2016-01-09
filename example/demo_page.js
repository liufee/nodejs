/*
* @author liufee <job@feehi.com>
* @link http://blog.feehi.com
* @description nodejs分页demo
**/
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    	var mysql = require('../dao/mysql.js');
		var pg = require('../lib/page.js');//包含page类
		var db = new mysql('test');
		var sql = 'select count(id) total from nginx_error;';
        db.query(sql, '' , function(err, results, fields){
			if(err){
				console.log(err);
			}else{
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
				var p = new pg(req, results[0]['total'], params);
				var limit = p.getLimit();
				var pageList = p.showPage();
				sql2 = 'SELECT *,date_format(time+"", "%Y-%m-%d %H:%m:%S") as date from nginx_error '+limit;
				db.query(sql2, '', function(err2, results2, fields2){
					if(err){
						console.log(err);
					}else{
						res.render('demo', {log: results2,total: results['total'], pageList: pageList});
					}
				})
			}
		});
});

module.exports = router;