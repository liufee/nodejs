# A library for nodejs

## Introduction
1. lib/page.js

##Usage
1. lib/page.js
```
var pg = require('../lib/page.js');      //inclued page class
var p = new pg(page, results[0]['total'], req);      //page,current page;results[0]['total'],total rows;req,nodejs request object
var limit = p.getLimit(page);      //get limit sql part
var pageList = p.getPageList();    //get page list
```