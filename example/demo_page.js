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
				var page = req.query.page;
				var p = new pg(page, results[0]['total'], req);
				var limit = p.getLimit(page);//获取limit sql语句部分
				var pageList = p.getPageList();//获取page列表
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