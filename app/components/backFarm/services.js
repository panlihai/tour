"use strict";
/**
 * 首页 service 服务
 */
clesunClound
    //分类管理
    .service("ccatalogService", ["$rootScope", "actService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, commonService, utilsService, constantService) {
            var appid = 'CCATALOG';
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
                return {
                    'CATALOGNAME': '',//小类名称
                    'ORDERID': '',//订单编号
                    'HASCHILD': '',//子集?
                    'USERID': '',//会员ID
                    'WHOLESERVICE': '',//委托交收
                    'AUDITTIME': '',//审核时间
                    'PAYFORINLINE': 'Y',//线上支付?
                    'PARENT': '',//父级编码
                    'PARENTCATALOGID': '',//上级分类
                    'REALNAME': '',//会员名称
                    'RESPONDSTATUS': '',//应单状态
                    'FROMPLACE': '',//发站
                    'ITEMCODE': '',//物资编码
                    'HWMS': '',//货物描述
                    'QUANTITY': '',//数量
                    'AUDITUSER': '',//审核人
                    'FROMDATESTART': '',//执行开始时间
                    'GOODSNAME': '',//货物名称
                    'SUPERVISE': '',//监管机构
                    'COLLATEQUANTITY': '',//挂单数量
                    'ITEMSPEC': '',//规格
                    'CURRENCY': '',//交易币种
                    'CREATETIME': '',//发布日期
                    'TOPLACE': '',//到站
                    'REMARK': '',//备注
                    'QBILLID': '',//报单ID
                    'TELEPHONE': '',//联系电话
                    'PID': '',//产品ID
                    'ITEMMODEL': '',//型号
                    'BUSSTYPE': '',//业务类别
                    'CATALOGID': '',//小类编码
                    'FROMDATESTOP': '',//执行结束时间
                    'AUDITDESC': '',//审核意见
                    'PREDEALTYPE': '',//优先成交方式
                    'SUPPLYORDEMAND': '',//报单类型
                    'UNIT': '',//单位
                    'STATUS': '',//报单状态
                    'PRICE': '',//单价
                    'CONTACT': '',//联系人
                    'ID': '',//主键ID
                    'MLEVEL': '',//等级
                    'PRODUCING': ''//原产地
                };
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
        }])
    .service("productService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = 'VCPRODUCT';
            this.getSowingList = function (pageNum) {
                if (!pageNum) {
                    pageNum = 0;
                }
                return actService.query(appid, {
                    'PAGENUM': pageNum,
                    'PAGESIZE': 20,
                    'WHERE': "ACCOUNTID='" + $rootScope.USERINFO.ACCOUNTID + "'",
                    'ORDER': 'CREATETIME desc'
                });
            };
            this.getProductList = function (pageNum) {
                if (!pageNum) {
                    pageNum = 0;
                }
                return actService.query(appid, {
                    'PAGENUM': pageNum,
                    'PAGESIZE': 499,
                    'WHERE': "ENABLE='Y' AND ACCOUNTID='" + $rootScope.USERINFO.ACCOUNTID + "'",
                    'ORDER': 'CREATETIME desc'
                });
            };
            this.createSowing = function () {
                return {
                    'ITEMSPEC': '',//规格
                    'ENABLE': 'N',//启用?
                    'SAILWEIGHT': '',//实际销量
                    'SOURCEAID': 'CACCOUNT',//关联元数据编码
                    'SOURCEID': '',//关联编码
                    'PRODUCTLEVEL': '',//产品等级
                    'SUPERVISE': constantService.SUPERVISE,//监管机构
                    'ACCOUNTID': '',//交易商编号
                    'ITEMTYPE': '',//产品分类
                    'PRODUCTID': '',//产品ID
                    'PICPATHID': '',//图片资源ID
                    'CREATETIME': commonService.getTimestamp(),//创建时间
                    'QUANTITY': '',//实际种植面积
                    'STATUS': 'N',//当前状态
                    'LOCNAME': '',//位置名称
                    'LOCID': '',//位置编码
                    'ITEMCODE': '',//产品名称
                    'ITEMDESC': '',//产品名称
                    'ITEMMODAL': '',//型号
                    'REALWEIGHT': '',//实际产量
                    'BUILDTIME': commonService.getTimestamp(),//生产日期
                    'FORECASEWEIGHT': '',//预计产量
                    'PID': '',//产品ID
                    'PARENTTYPE': '',//经营分类
                    'MEMO': '',//备注
                    'FORECASEQUANTITY': '',//下次预计种植面积
                    'PRICE': '',//参考单价
                    'FORECASESAILWEIGHT': '',//预计销量
                    'ID': '',//主键ID
                    'PRODUCTUSER': '',
                    'CREATEUSER': ''
                };
            };
            //获取经营分类
            this.getBusinesssCatalogList = function (where) {
                return actService.getCatalogList('BUSINESSTYPE', where);
            };
            this.saveSowing = function (product) {
                return actService.save('CPRODUCT', product);
            };
            this.updateProduct = function (product) {
                return actService.update('CPRODUCT', product);
            };
            //获取当前
            this.getProductByProductId = function (productid) {
                return actService.get('VCPRODUCT', {'PRODUCTID': productid});
            };
            //获取产品等级
            this.getProductLevelList = function () {
                return appService.getAppDic(appService.getApp('CPRODUCT'), "PRODUCTLEVEL");
            };
            /**
             * 上传文件
             * @param file
             * @author 18611140788@163.com
             */
            this.upLoadFile = function (file, title, sourceAid, sourceId) {
                //文件上传的必须信息，
                var resJson = {
                    //图片类型
                    FILETYPE: "PIC",
                    //标题
                    RESTITLE: title,
                    SOURCEAID: sourceAid,
                    SOURCEID: sourceId
                };
                //文件上传
                return actService.upLoadFileT(file, resJson);
            };
        }])
    //农事活动
    .service("produceService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = 'CPRODUCE';
            this.getProduceList = function (accountid, productid, pageNum) {
                if (!pageNum) {
                    pageNum = 0;
                }
                return actService.query("VCPRODUCE", {
                    'PAGENUM': pageNum,
                    'PAGESIZE': 200,
                    'WHERE': " PRODUCTID='" + productid + "' and ACCOUNTID='" + accountid + "'",
                    'ORDER': 'createtime desc'
                });
            };
            this.createProduce = function () {
                return {
                    'PRODUCEID': '',//生产活动ID
                    'ACTIONTIME': commonService.getTimestamp(),//操作时间
                    'CONTENT': '',//生产内容
                    'ACCOUNTID': '',
                    'ACTIONUSER': $rootScope.USERINFO.USERID,//操作人
                    'USERID': $rootScope.USERINFO.USERID,//从事用户
                    'SOURCEID': '',//关联编码
                    'SOURCEAID': 'CPRODUCT',//关联元数据编码
                    'INTYPE': '',//投入品子类名称
                    'INPCTYPE': '',//投入品二级分类
                    'ID': '',//ID主键
                    'INCOUNT': '',//投入数量
                    'INNAME': '',//投入品名称
                    'INSTORETYPE': '',//存贮类型
                    'ENDTIME': '',//生产结束时间
                    'PRODUCETYPE': '',//生产类型
                    'SUPERVISE': constantService.SUPERVISE,//监管机构
                    'PRODUCETIME': commonService.getTimestamp(),//生产时间
                    'INPREVENT': '',//防治对象
                    'ASSETSID': '',//使用设备ID
                    'INPTYPE': '',//投入品父级分类
                    'MEMO': '',//备注
                    'CREATETIME': commonService.getTimestamp(),//创建时间
                    'REMARK': '',//备注
                    'BEGINTIME': commonService.getTimestamp(),//生产开始时间
                    'LOCID': '',//所在地块ID
                    'ENABLE': 'Y',//启用?
                    'STATUS': 'Y',//当前状态
                    'INSUPPLIER': '',//供应商
                    'PID': '',//产品ID
                    'GROWTHCYCLE': '',//生长周期
                    'PRODUCTID': '',//产品ID
                    'INTRANSLATEDATE': '',//出厂日期
                    'INUNIT': '',//投入单位
                    'PICPATHID': ''//图片资源ID
                };
            };
            var app = appService.getApp(appid);
            //农事活动内容
            this.getProductContentList = function () {
                return appService.getAppDic(app, 'CONTENT');
            };
            //获取经营分类
            this.getProduceIntypeCatalogList = function (where) {
                return actService.getCatalogList('PRODUCEINTYPE', where);
            };
            //存储分类
            this.getInstoreTypeList = function () {
                return appService.getAppDic(app, 'INSTORETYPE');
            };
            //计量单位
            this.getInUtilList = function () {
                return appService.getAppDic(app, 'INUNIT');
            };
            //生长周期 GROWTHCYCLE
            this.getGrowthCycleList = function () {
                return appService.getAppDic(app, 'GROWTHCYCLE');
            };
            //工时
            this.getProduceWorktimeList = function () {
                return appService.getAppDic(app, 'PRODUCEWORKTIME');
            };
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
            this.saveProduce = function (produce) {
                return actService.save(appid, produce);
            };
        }])
    //农场服务，农场数据从登陆的时候。
    //轮播图
    .service("bannerService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = 'CBANNER';
            this.createObj = function () {
                return {
                    'SOURCEID': '',//元数据数据对应ID
                    'REMARK': '',//备注
                    'TITLE': '',//标题
                    'IMGPATHID': '',//图片地址
                    'PID': '',//产品ID
                    'CREATETIME': '',//创建时间
                    'SUPERVISE': '',//监管机构
                    'CLIENTTYPE': '',//终端类型
                    'SOURCEAID': '',//元数据编码
                    'SORT': '',//排序号
                    'BANNERID': '',//轮播ID
                    'BUSINESSTYPE': '',//业务类型
                    'LINKPATH': '',//链接地址
                    'ID': '',//主键id
                    'ENABLE': 'Y'//启用?
                }
            };
            //获取设备
            this.getList = function (sourceId, sourceAid) {
                return actService.query('VCBANNER', {
                    'PAGESIZE': 499,
                    'WHERE': "SOURCEID='" + sourceId + "' and SOURCEAID='" + sourceAid + "'",
                    'ORDER':'CREATETIME'
                });
            };

            this.saveObj = function (banner) {
                return actService.save(appid, banner);
            };
            //保存
            this.updateObj = function (obj) {
                return actService.update(appid, obj);
            };
            //保存
            this.updateList = function (list) {
                return actService.updateList(appid, list);
            };
        }])
    //活动服务
    .service("activityService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = 'CACTIVITY';
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
                return {
                    'ID': '',//主键ID
                    'ACTIVITYID': '',//活动id
                    'ACTIVITYITEM': '',//活动辅助分类1
                    'ACTIVITYITEM2': '',//活动辅助分类2
                    'TITLE': '',//活动标题
                    'STATUS': '',//活动状态
                    'STARTTIME': commonService.getTimestamp(),//开始时间
                    'ENDTIME': '',//结束时间
                    'PUBLISHTIME': commonService.getTimestamp(),//活动发布时间
                    'LOCID': '',//地块编码
                    'LOCNAME': '',//地块名称
                    'PRICE': '',//活动单价
                    'SOURCEPRICE': '',//活动原价
                    'CONTENT': '',//活动包含
                    'RULES': '',//活动规则
                    'REMARK': '',//活动简介
                    'SUPERVISE': '',//监管机构
                    'PUBLISHUSERID': '',//活动发布人ID
                    'ACTIVITYLIMIT': '',//活动人数上限
                    'ENABLE': 'N',//启用?
                    'SOURCEID': '',//元数据数据ID
                    'IMGPATHID': '',//上传图片路径
                    'ACTIVITYTYPE': '',//活动分类
                    'PID': '',//产品ID
                    'SOURCEAID': '',//元数据编码
                    'SOURCEPARENTID': ''//上级编码
                };
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
        }])
    //报单
    .service("cquotationbillService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = 'CQUOTATIONBILL';
            this.getList = function (pageNum) {
                if (!pageNum) {
                    pageNum = 0;
                }
                return actService.query(appid, {
                    'PAGENUM': pageNum,
                    'PAGESIZE': 499,
                    'WHERE': "accountid='" + $rootScope.USERINFO.ACCOUNTID + "'",
                    'ORDER': 'CREATETIME desc'
                });
            };
            this.createObj = function () {
                return {
                    'ACCOUNTID': '',//交易商编号
                    'REALNAME': '',//会员名称
                    'USERID': '',//会员ID
                    'TELEPHONE': '',//联系电话
                    'ORDERID': '',//订单编号
                    'TITLE': '',//标题
                    'CATALOGID': '',//小类编码
                    'CATALOGNAME': '',//小类名称
                    'LOCID': '',//农场地块
                    'LOCNAME': '',//农场地块
                    'SOURCEPRICE': '',//原价
                    'ITEMCODE': '',//物资编码
                    'ITEMMODEL': '',//型号
                    'ITEMSPEC': '',//规格
                    'GOODSNAME': '',//货物名称
                    'HWMS': '',//货物描述
                    'CONTENT': '',//内容
                    'PRODUCING': '',//原产地
                    'MLEVEL': '',//等级
                    'QUANTITY': '',//数量
                    'CURRENCY': '人民币',//交易币种
                    'PRICE': '',//单价
                    'UNIT': '',//单位
                    'FROMDATESTART': commonService.getTimestamp(),//执行开始时间
                    'LEASESTARTTIME': '',//租赁开始
                    'LEASEENDTIME': '',//租赁截止
                    'RULES': '',//规则
                    'SUPERVISE': '',//监管机构
                    'COLLATEQUANTITY': '',//挂单数量
                    'CONTACT': '',//联系人
                    'CREATETIME': commonService.getTimestamp(),//发布日期
                    'AUDITTIME': '',//审核时间
                    'AUDITUSER': '',//审核人
                    'FROMPLACE': '',//发站
                    'TOPLACE': '',//到站
                    'REMARK': '',//备注
                    'QBILLID': '',//报单ID
                    'PID': '',//产品ID
                    'BUSSTYPE': '',//业务类别
                    'PAYFORINLINE': 'Y',//线上支付?
                    'FROMDATESTOP': '',//执行结束时间
                    'AUDITDESC': '',//审核意见
                    'PREDEALTYPE': '',//优先成交方式
                    'SUPPLYORDEMAND': '',//报单类型
                    'STATUS': 'N',//报单状态
                    'PARENT': '',//父级编码
                    'HASCHILD': 'N',//子集?
                    'PARENTCATALOGID': '',//上级分类
                    'WHOLESERVICE': '',//委托交收
                    'RESPONDSTATUS': '',//应单状态
                    'ID': ''//主键ID
                };
            };

            //获取明细单
            this.getCquotationbillByQbillId = function (cbillid, pageNum) {
                return actService.get(appid, {
                    'PAGENUM': pageNum,
                    'PAGESIZE': 100,
                    'WHERE': "qbillid='" + cbillid + "'",
                    'ORDER': 'CREATETIME desc'
                });
            };
            //获取经营分类
            this.getBussTypeCatalogList = function (where) {
                return actService.getCatalogList('BUSSTYPE', where);
            };
            var app = appService.getApp(appid);
            /**
             * 上传文件
             * @param file
             * @author 18611140788@163.com
             */
            this.upLoadFile = function (file, title) {
                //文件上传的必须信息，
                //文件上传的必须信息，
                var resJson = {
                    //图片类型
                    FILETYPE: "PIC",
                    //标题
                    RESTITLE: title
                };
                return actService.upLoadFileT(file, resJson);
            };
            /**
             * 上传文件
             * @param file
             * @author 18611140788@163.com
             */
            this.upLoadAllFile = function (file, resJson) {
                //文件上传
                return actService.upLoadFileT(file, resJson);
            };
            //保存
            this.saveObj = function (obj) {
                return actService.save(appid, obj);
            };
            this.updateObj = function (obj) {
                return actService.update(appid, obj);
            }
        }])
    //订单
    .service("corderdetailService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = 'CORDERDETAIL';
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
                return {
                    'CATALOGNAME': '',//小类名称
                    'ORDERID': '',//订单编号
                    'HASCHILD': '',//子集?
                    'USERID': '',//会员ID
                    'WHOLESERVICE': '',//委托交收
                    'AUDITTIME': '',//审核时间
                    'PAYFORINLINE': 'Y',//线上支付?
                    'PARENT': '',//父级编码
                    'PARENTCATALOGID': '',//上级分类
                    'REALNAME': '',//会员名称
                    'RESPONDSTATUS': '',//应单状态
                    'FROMPLACE': '',//发站
                    'ITEMCODE': '',//物资编码
                    'HWMS': '',//货物描述
                    'QUANTITY': '',//数量
                    'AUDITUSER': '',//审核人
                    'FROMDATESTART': '',//执行开始时间
                    'GOODSNAME': '',//货物名称
                    'SUPERVISE': '',//监管机构
                    'COLLATEQUANTITY': '',//挂单数量
                    'ITEMSPEC': '',//规格
                    'CURRENCY': '',//交易币种
                    'CREATETIME': '',//发布日期
                    'TOPLACE': '',//到站
                    'REMARK': '',//备注
                    'QBILLID': '',//报单ID
                    'TELEPHONE': '',//联系电话
                    'PID': '',//产品ID
                    'ITEMMODEL': '',//型号
                    'BUSSTYPE': '',//业务类别
                    'CATALOGID': '',//小类编码
                    'FROMDATESTOP': '',//执行结束时间
                    'AUDITDESC': '',//审核意见
                    'PREDEALTYPE': '',//优先成交方式
                    'SUPPLYORDEMAND': '',//报单类型
                    'UNIT': '',//单位
                    'STATUS': '',//报单状态
                    'PRICE': '',//单价
                    'CONTACT': '',//联系人
                    'ID': '',//主键ID
                    'MLEVEL': '',//等级
                    'PRODUCING': ''//原产地
                };
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
        }])
    //交易商位置
    .service("clocService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = 'CLOC';
            this.getList = function (accountId, pageNum) {
                if (!pageNum) {
                    pageNum = 0;
                }
                return actService.query(appid, {
                    'PAGENUM': pageNum,
                    'PAGESIZE': 200,
                    'WHERE': "ACCOUNTID='" + accountId + "'",
                    'ORDER': 'createtime desc'
                });
            };
            this.createObj = function () {
                return {
                    'ENABLE': 'Y',//启用?
                    'LOCSPEC': '',//长宽
                    'CREATETIME': commonService.getTimestamp(),//创建时间
                    'PARENT': '',//上级编码
                    'HASCHILD': '',//有子集?
                    'PICPATHID': '',//图片资源ID
                    'LAT': '',//纬度
                    'ID': '',//主键ID
                    'SUPERVISE': '',//监管机构
                    'LOCMODEL': '',//型号
                    'SOURCEAID': 'CACCOUNT',//关联元数据编码
                    'CATALOGNAME': '',//分类名称
                    'PID': '',//产品ID
                    'LOCNAME': '',//位置名称
                    'CATALOGID': '',//分类编码
                    'SOURCEID': '',//关联元数据ID
                    'REMARK': '',//备注
                    'LNG': '',//经度
                    'LOCID': '',//位置编码
                    'STATUS': 'N'//状态
                };
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
        }])
    //交易商资产
    .service("cassetsService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = 'CASSETS';
            this.getList = function (accountid, pageNum) {
                if (!pageNum) {
                    pageNum = 0;
                }
                return actService.query(appid, {
                    'PAGENUM': pageNum,
                    'PAGESIZE': 499,
                    'WHERE': "sourceid='"+accountid+"' and sourceaid='CACCOUNT' and haschild='Y'",
                    'ORDER': ''
                });
            };
            this.createObj = function () {
                return {
                    'CATALOGNAME': '',//小类名称
                    'ORDERID': '',//订单编号
                    'HASCHILD': '',//子集?
                    'USERID': '',//会员ID
                    'WHOLESERVICE': '',//委托交收
                    'AUDITTIME': '',//审核时间
                    'PAYFORINLINE': 'Y',//线上支付?
                    'PARENT': '',//父级编码
                    'PARENTCATALOGID': '',//上级分类
                    'REALNAME': '',//会员名称
                    'RESPONDSTATUS': '',//应单状态
                    'FROMPLACE': '',//发站
                    'ITEMCODE': '',//物资编码
                    'HWMS': '',//货物描述
                    'QUANTITY': '',//数量
                    'AUDITUSER': '',//审核人
                    'FROMDATESTART': '',//执行开始时间
                    'GOODSNAME': '',//货物名称
                    'SUPERVISE': '',//监管机构
                    'COLLATEQUANTITY': '',//挂单数量
                    'ITEMSPEC': '',//规格
                    'CURRENCY': '',//交易币种
                    'CREATETIME': '',//发布日期
                    'TOPLACE': '',//到站
                    'REMARK': '',//备注
                    'QBILLID': '',//报单ID
                    'TELEPHONE': '',//联系电话
                    'PID': '',//产品ID
                    'ITEMMODEL': '',//型号
                    'BUSSTYPE': '',//业务类别
                    'CATALOGID': '',//小类编码
                    'FROMDATESTOP': '',//执行结束时间
                    'AUDITDESC': '',//审核意见
                    'PREDEALTYPE': '',//优先成交方式
                    'SUPPLYORDEMAND': '',//报单类型
                    'UNIT': '',//单位
                    'STATUS': '',//报单状态
                    'PRICE': '',//单价
                    'CONTACT': '',//联系人
                    'ID': '',//主键ID
                    'MLEVEL': '',//等级
                    'PRODUCING': ''//原产地
                };
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
        }])
    //文章
    .service("carticleService", ["$rootScope", "actService", "appService", "commonService", "utilsService", "constantService",
        function ($rootScope, actService, appService, commonService, utilsService, constantService) {
            var appid = 'CARTICLE';
            this.getList = function (sourceId, sourceAid, pageNum) {
                if (!pageNum) {
                    pageNum = 0;
                }
                return actService.query("VCNEWS", {
                    'PAGENUM': pageNum,
                    'PAGESIZE': 200,
                    'WHERE': "SOURCEAID='" + sourceAid + "' and SOURCEID='" + sourceId + "'",
                    'ORDER': 'CREATETIME DESC'
                });
            };
            this.createObj = function () {
                return {
                    'TITLE': '',//标题
                    'ARTICLETYPE': '',//文章类型
                    'CONTENT': '',//文章内容
                    'SUBTITLE': '',//副标题
                    'PUBLISHUSER': '',//发布人
                    'SUPERVISE': '',//监管机构
                    'DATAFROM': '',//来源
                    'ENABLE': 'Y',//启用?
                    'AUTHOR': '',//作者
                    'SOURCEID': '',//元数据数据ID
                    'SOURCETYPE': '',//来源类型
                    'PUBLISHTIME': commonService.getTimestamp(),//发表时间
                    'PICPATHID': '',//文章图片
                    'SOURCEAID': '',//元数据编码
                    'ARTICLEID': '',//文章ID
                    'CREATETIME': commonService.getTimestamp(),//创建时间
                    'THUMBNAILID': '',//缩略图id
                    'STATUS': 'PUBLISH',//状态
                    'PID': '',//产品ID
                    'ID': ''//主键ID
                };
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
            //保存
            this.updateList = function (list) {
                return actService.updateList(appid, list);
            };
        }])
;
