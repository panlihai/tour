/**
 * Created by panlihai on 2016-07-26.
 */
"use strict";
/**
 * 微信服务启动
 */
clesunClound
.service("homeService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
    function ($rootScope, actService, appService, commonService, utilsService, constantService) {
        var appid = '';
        this.getList = function (accountid, productid, pageNum) {
            if (!pageNum) {
                pageNum = 0;
            }
            return actService.query(appid, {
                'PAGENUM': pageNum,
                'PAGESIZE': 200,
                'WHERE': "1=1",
                'ORDER': ''
            });
        };
        this.createObj = function () {
            return {};
        };
        var app = appService.getApp(appid);
        /**
         * 上传文件
         * @param file
         * @author 18611140788@163.com
         */
        this.upLoadFile = function (file, title) {
            //文件上传的必须信息，
            var resJson = {
                //图片类型
                FILETYPE: "PIC",
                //标题
                RESTITLE: title
            };
            //文件上传
            return actService.upLoadFileT(file, resJson);
        };
        //保存
        this.saveObj = function (obj) {
            return actService.save(appid, obj);
        };
        //保存
        this.updateObj = function (obj) {
            return actService.update(appid, obj);
        };
    }
]).service("placeorderService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
    function ($rootScope, actService, appService, commonService, utilsService, constantService) {
        var appid = '';
        this.getList = function (accountid, productid, pageNum) {
            if (!pageNum) {
                pageNum = 0;
            }
            return actService.query(appid, {
                'PAGENUM': pageNum,
                'PAGESIZE': 200,
                'WHERE': "1=1",
                'ORDER': ''
            });
        };
        this.createObj = function () {
            return {};
        };
        var app = appService.getApp(appid);
        /**
         * 上传文件
         * @param file
         * @author 18611140788@163.com
         */
        this.upLoadFile = function (file, title) {
            //文件上传的必须信息，
            var resJson = {
                //图片类型
                FILETYPE: "PIC",
                //标题
                RESTITLE: title
            };
            //文件上传
            return actService.upLoadFileT(file, resJson);
        };
        //保存
        this.saveObj = function (obj) {
            return actService.save(appid, obj);
        };
        //保存
        this.updateObj = function (obj) {
            return actService.update(appid, obj);
        };
    }
]).service("orderService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
    function ($rootScope, actService, appService, commonService, utilsService, constantService) {
        var appid = '';
        this.getList = function (accountid, productid, pageNum) {
            if (!pageNum) {
                pageNum = 0;
            }
            return actService.query(appid, {
                'PAGENUM': pageNum,
                'PAGESIZE': 200,
                'WHERE': "1=1",
                'ORDER': ''
            });
        };
        this.createObj = function () {
            return {};
        };
        var app = appService.getApp(appid);
        /**
         * 上传文件
         * @param file
         * @author 18611140788@163.com
         */
        this.upLoadFile = function (file, title) {
            //文件上传的必须信息，
            var resJson = {
                //图片类型
                FILETYPE: "PIC",
                //标题
                RESTITLE: title
            };
            //文件上传
            return actService.upLoadFileT(file, resJson);
        };
        //保存
        this.saveObj = function (obj) {
            return actService.save(appid, obj);
        };
        //保存
        this.updateObj = function (obj) {
            return actService.update(appid, obj);
        };
    }
]).service("accountService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
    function ($rootScope, actService, appService, commonService, utilsService, constantService) {
        var appid = 'CACCOUNT';
        this.getList = function (accountid, productid, pageNum) {
            if (!pageNum) {
                pageNum = 0;
            }
            return actService.query("VACCOUNT", {
                'PAGENUM': pageNum,
                'PAGESIZE': 200,
                'WHERE': "1=1",
                'ORDER': ''
            });
        };

        /**
         * 获取网站模板种类 CATALOGTYPE='SITETYPE'为网站模板种类
         * @returns {*}
         * @author 18611140788@163.com
         */
        this.getCatalogFromSiteType = function () {
            return actService.query("CCATALOG", {//获取网站模板种类 CATALOGTYPE='SITETYPE'为网站模板种类
                PAGENUM: 0,//分页数 从0开始计数
                PAGESIZE: 20,//偏移量
                WHERE: "CATALOGTYPE='SITETYPE' AND ENABLE='Y'",
                ORDER: 'SORT'
            });
        };
        /**
         * 获取经营种类 CATALOGTYPE='BUSINESSTYPE'为经营种类
         * @returns {*}
         * @author 18611140788@163.com
         */
        this.getCatalogFromProsecution = function () {
            return actService.query("CCATALOG", {
                PAGENUM: 0,//分页数 从0开始计数
                PAGESIZE: 20,//偏移量
                WHERE: "CATALOGTYPE='BUSINESSTYPE' AND ENABLE='Y' AND (parent is null or parent='')", ORDER: 'SORT'
            });
        };
        this.getLocList = function (accountid, pageNum) {
            if (!pageNum) {
                pageNum = 0;
            }
            return actService.query("CLOC", {
                'PAGENUM': pageNum,
                'PAGESIZE': 200,
                'WHERE': "accountid='"+accountid+"'",
                'ORDER': 'LOCID'
            });
        };
        this.createObj = function () {
            return {};
        };
        var app = appService.getApp(appid);
        /**
         * 上传文件
         * @param file
         * @author 18611140788@163.com
         */
        this.upLoadFile = function (file, title) {
            //文件上传的必须信息，
            var resJson = {
                //图片类型
                FILETYPE: "PIC",
                //标题
                RESTITLE: title
            };
            //文件上传
            return actService.upLoadFileT(file, resJson);
        };
        //保存
        this.saveObj = function (obj) {
            return actService.save(appid, obj);
        };
        //保存
        this.updateObj = function (obj) {
            return actService.update(appid, obj);
        };
    }
]).service("customerService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
    function ($rootScope, actService, appService, commonService, utilsService, constantService) {
        var appid = '';
        this.getList = function (accountid, productid, pageNum) {
            if (!pageNum) {
                pageNum = 0;
            }
            return actService.query(appid, {
                'PAGENUM': pageNum,
                'PAGESIZE': 200,
                'WHERE': "1=1",
                'ORDER': ''
            });
        };
        this.createObj = function () {
            return {};
        };
        var app = appService.getApp(appid);
        /**
         * 上传文件
         * @param file
         * @author 18611140788@163.com
         */
        this.upLoadFile = function (file, title) {
            //文件上传的必须信息，
            var resJson = {
                //图片类型
                FILETYPE: "PIC",
                //标题
                RESTITLE: title
            };
            //文件上传
            return actService.upLoadFileT(file, resJson);
        };
        //保存
        this.saveObj = function (obj) {
            return actService.save(appid, obj);
        };
        //保存
        this.updateObj = function (obj) {
            return actService.update(appid, obj);
        };
    }
]).service("invitationService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
    function ($rootScope, actService, appService, commonService, utilsService, constantService) {
        var appid = '';
        this.getList = function (accountid, productid, pageNum) {
            if (!pageNum) {
                pageNum = 0;
            }
            return actService.query(appid, {
                'PAGENUM': pageNum,
                'PAGESIZE': 200,
                'WHERE': "1=1",
                'ORDER': ''
            });
        };
        this.createObj = function () {
            return {};
        };
        var app = appService.getApp(appid);
        /**
         * 上传文件
         * @param file
         * @author 18611140788@163.com
         */
        this.upLoadFile = function (file, title) {
            //文件上传的必须信息，
            var resJson = {
                //图片类型
                FILETYPE: "PIC",
                //标题
                RESTITLE: title
            };
            //文件上传
            return actService.upLoadFileT(file, resJson);
        };
        //保存
        this.saveObj = function (obj) {
            return actService.save(appid, obj);
        };
        //保存
        this.updateObj = function (obj) {
            return actService.update(appid, obj);
        };
    }
]).service("attentionService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
    function ($rootScope, actService, appService, commonService, utilsService, constantService) {
        var appid = 'CUSERINTEREST';
        this.getList = function (id, pageNum) {
            if (!pageNum) {
                pageNum = 0;
            }
            return actService.query('V'+appid, {
                'PAGENUM': pageNum,
                'PAGESIZE': 200,
                'WHERE': "sourceaid='CUSER' and sourceid='"+id+"' and SUBSCRIBTYPE='INTEREST'",
                'ORDER': 'CREATETIME desc'
            });
        };
        this.createObj = function () {
            return {};
        };
        var app = appService.getApp(appid);
        /**
         * 上传文件
         * @param file
         * @author 18611140788@163.com
         */
        this.upLoadFile = function (file, title) {
            //文件上传的必须信息，
            var resJson = {
                //图片类型
                FILETYPE: "PIC",
                //标题
                RESTITLE: title
            };
            //文件上传
            return actService.upLoadFileT(file, resJson);
        };
        //保存
        this.saveObj = function (obj) {
            return actService.save(appid, obj);
        };
        //保存
        this.updateObj = function (obj) {
            return actService.update(appid, obj);
        };
    }
]).service("collectService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
    function ($rootScope, actService, appService, commonService, utilsService, constantService) {
        var appid = '';
        this.getList = function (accountid, productid, pageNum) {
            if (!pageNum) {
                pageNum = 0;
            }
            return actService.query(appid, {
                'PAGENUM': pageNum,
                'PAGESIZE': 200,
                'WHERE': "1=1",
                'ORDER': ''
            });
        };
        this.createObj = function () {
            return {};
        };
        var app = appService.getApp(appid);
        /**
         * 上传文件
         * @param file
         * @author 18611140788@163.com
         */
        this.upLoadFile = function (file, title) {
            //文件上传的必须信息，
            var resJson = {
                //图片类型
                FILETYPE: "PIC",
                //标题
                RESTITLE: title
            };
            //文件上传
            return actService.upLoadFileT(file, resJson);
        };
        //保存
        this.saveObj = function (obj) {
            return actService.save(appid, obj);
        };
        //保存
        this.updateObj = function (obj) {
            return actService.update(appid, obj);
        };
    }
]).service("messageService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
    function ($rootScope, actService, appService, commonService, utilsService, constantService) {
        var appid = 'VCMESSAGE';
        this.getList = function(userid, pageNum) {
            if (!pageNum) {
                pageNum = 0;
            }
            return actService.query(appid, {
                'PAGENUM': pageNum,
                'PAGESIZE': 499,
                'WHERE': "PUBLISHUSER='"+userid+"'",
                'ORDER': 'PUBLISHTIME desc'
            });
        };
        this.createObj = function () {
            return {};
        };
        var app = appService.getApp(appid);
        /**
         * 上传文件
         * @param file
         * @author 18611140788@163.com
         */
        this.upLoadFile = function (file, title) {
            //文件上传的必须信息，
            var resJson = {
                //图片类型
                FILETYPE: "PIC",
                //标题
                RESTITLE: title
            };
            //文件上传
            return actService.upLoadFileT(file, resJson);
        };
        //保存
        this.saveObj = function (obj) {
            return actService.save(appid, obj);
        };
        //保存
        this.updateObj = function (obj) {
            return actService.update(appid, obj);
        };
    }
]).service("sayService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
    function ($rootScope, actService, appService, commonService, utilsService, constantService) {
        //吐槽
        var appid = 'CFEEDBACK';
        this.createObj = function () {
            return {
                'INFO': '',//反馈内容
                'USERID': $rootScope.USERINFO.USERID,//反馈用户ID
                'CREATETIME': commonService.getTimestamp(),//反馈时间
                'PROBLEMTYPE': 'FEEDBACK',//问题类型
                'ID': '',
                'CFEEDBACKID': '',
                'CONTACTWAY': '',
                'STATUS': '',
                'DEALCONTENT': '',
                'DEALUSERID': '',
                'DEALTIME': '',
                'PID': '',
                'SUPERVISE': ''
            };
        };
        //保存内容
        this.saveObj = function (obj) {
            return actService.save(appid, obj);
        };
    }
]).service("helpService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = '';
            this.getList = function (accountid, productid, pageNum) {
                if (!pageNum) {
                    pageNum = 0;
                }
                return actService.query(appid, {
                    'PAGENUM': pageNum,
                    'PAGESIZE': 200,
                    'WHERE': "1=1",
                    'ORDER': ''
                });
            };
            this.createObj = function () {
                return {};
            };
            var app = appService.getApp(appid);
            /**
             * 上传文件
             * @param file
             * @author 18611140788@163.com
             */
            this.upLoadFile = function (file, title) {
                //文件上传的必须信息，
                var resJson = {
                    //图片类型
                    FILETYPE: "PIC",
                    //标题
                    RESTITLE: title
                };
                //文件上传
                return actService.upLoadFileT(file, resJson);
            };
            //保存
            this.saveObj = function (obj) {
                return actService.save(appid, obj);
            };
            //保存
            this.updateObj = function (obj) {
                return actService.update(appid, obj);
            };
        }
]).service("certService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = 'CCERT';
            this.getList = function (sourceAid,sourceId, pageNum) {
                if (!pageNum) {
                    pageNum = 0;
                }
                return actService.query('V'+appid, {
                    'PAGENUM': pageNum,
                    'PAGESIZE': 499,
                    'WHERE': " sourceaid='"+sourceAid+"' and sourceid='"+sourceId+"'",
                    'ORDER': 'SIGNINTIME'
                });
            };
            this.createObj = function () {
                return {};
            };
            var app = appService.getApp(appid);
            /**
             * 上传文件
             * @param file
             * @author 18611140788@163.com
             */
            this.upLoadFile = function (file, title) {
                //文件上传的必须信息，
                var resJson = {
                    //图片类型
                    FILETYPE: "PIC",
                    //标题
                    RESTITLE: title
                };
                //文件上传
                return actService.upLoadFileT(file, resJson);
            };
            //保存
            this.saveObj = function (obj) {
                return actService.save(appid, obj);
            };
            //保存
            this.updateObj = function (obj) {
                return actService.update(appid, obj);
            };
        }
    ]);

