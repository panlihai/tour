"use strict";
/**
 * 微信服务启动
 */
clesunClound.service("weixinService", ["daoService",
    function (daoService) {
        /**
         * wxReqUrl 请求服务的url
         * wxappId 微信公众号appid
         * reqUrl当前网页的url
         */
        this.wxAct = function (wxReqUrl, wxappId, requrl) {
            daoService.doAct(wxReqUrl, {"url": requrl}).then(function (res) {
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wxappId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.noncestr, // 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名，见附录1
                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo",
                        "onMenuShareQZone", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice",
                        "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice",
                        "chooseImage", "previewImage", "uploadImage", "downloadImage", "translateVoice",
                        "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu",
                        "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem",
                        "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard",
                        "chooseCard", "openCard"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

            });
        }
    }])
/**
 * 获取用户usertoken
 */
    .service("userService", ["$rootScope", "baseService", "cacheService", "commonService", "constantService","appService",
        function ($rootScope, baseService, cacheService, commonService, constantService,appService) {
            //登录
            this.login = function (user) {
                var url = "USER/" + constantService.SUPERVISE + "/LOGIN";
                var json = {
                    "USERID": commonService.enCode64(user.USERID),
                    "PASSWORD": commonService.enCode64(user.PASSWORD)
                };
                return baseService.doAct(url, json);
            };
            // 自动启动
            // base64加密结束
            // 获取手机验证码
            this.getTelsms = function (mobilephone, random) {
                var url = "SMS/" + constantService.SUPERVISE + "/TELSMS";
                var json = {
                    "RANDOM": random,
                    "MOBILEPHONE": mobilephone
                };
                return baseService.doAct(url, json);
            };
            //手机短息验证码校验,根据手机号，验证码及随机号进行校验
            this.checkTelSms = function (mobilephone, authcode, random) {
                return baseService.doAct("APPCOUNT/" + constantService.SUPERVISE + "/COUNT", {
                    APPCODE: 'CTELSMS',
                    WHERE: " RANDOM='" + random + "' and SMSCODE='" + authcode + "' and USERTOKEN='" + $rootScope.USERTOKEN + "' and MOBILEPHONE='" + mobilephone + "'"
                });
            };
            //注册
            this.register = function (user) {
                var url = "USER/" + constantService.SUPERVISE + "/REGISTER";
                return baseService.doAct(url, user);
            };
            //注销
            this.logout = function () {
                cacheService.set("AUTOLOGIN", "false");
                $rootScope.isLogin = false;
                $rootScope.USERINFO = {};
                var url = "USER/" + constantService.SUPERVISE + "/LOGOUT";
                var json = {
                    "USERID": commonService.enCode64(cacheService.get("USERID"))
                };
                return baseService.doAct(url, json);
            };
            this.getUserToken = function () {
                var usertoken = cacheService.get("USERTOKEN");
                if (usertoken && usertoken != '') {
                    $rootScope.USERTOKEN = usertoken;
                    // this.autoLogin();
                } else {
                    var url = "USERTOKEN/" + constantService.SUPERVISE + "/CREATE";
                    var json = {};
                    var userS = this;
                    baseService.doAct(url, json).then(function (res) {
                        // 获取资源对象
                        if (res.CODE == 0) {
                            var usertoken = res.DATA[0].USERTOKEN;
                            cacheService.set("USERTOKEN", usertoken);
                            $rootScope.USERTOKEN = usertoken;
                            // userS.autoLogin();
                        } else {
                            console.error(res.MSG);
                        }
                    });
                }
            };
            // this.autoLogin = function () {
            //     var userinfo = cacheService.getObject("USERINFO");
            //     var autoLogin = cacheService.get("AUTOLOGIN");
            //     if (userinfo != undefined && autoLogin != undefined
            //         && autoLogin == "true") {
            //         // 自动登录
            //         $rootScope.USERINFO = userinfo;
            //         $rootScope.isLogin = true;
            //     } else {
            //         $rootScope.$state.go("index.login");
            //     }
            // };

            this.createObj = function () {
                return {
                    'HEADIMGURL': '',//用户头像路径
                    'SUBSCRIBETIME': '',//关注时间
                    'GROUPID': '',//所在机构ID
                    'REALNAME': '',//用户名
                    'ADDRESS': '',//详细地址
                    'CREATETIME': '',//创建时间
                    'DEVICEID': '',//设备ID
                    'SUPERVISE': '',//监管机构
                    'UNIONID': '',//UNIONID
                    'NICKNAME': '',//昵称
                    'SEX': '',//默认男性，0.男，1.女
                    'OPENID': '',//OPENID
                    'REMARK': '',//备注
                    'PARENTUSERID': '',//推荐人
                    'COUNTY': '',//县
                    'USERTOKEN': '',//用户凭证
                    'ACCOUNTID': '',//交易商ID
                    'SUBSCRIBE': '',//关注?
                    'AUTHID': '',//授权码
                    'PWD': '',//密码
                    'TEL': '',//手机号码
                    'ENABLE': '',//启用?
                    'USERID': '',//用户唯一编码
                    'PROVINCE': '',//省份
                    'CITY': '',//城市
                    'ID': ''//主键ID
                }
            };
            this.saveObj = function (cuser) {
                return actService.save('CUSER', obj);
            };
            this.getList = function () {
                return actService.query("CUSER", {"PAGENUM": 0, PAGESIZE: 400});
            };
            this.updateObj = function (cuser) {
                return actService.update('CUSER', cuser);
            };
            this.createAddress = function (userid) {
                return {
                    USERID: userid,
                    ENABLE: 'Y',
                    PROVINCE: $rootScope.USERINFO.PROVINCE,
                    CITY: $rootScope.USERINFO.CITY,
                    COUNTY: $rootScope.USERINFO.COUNTY,
                    ADDRESS: $rootScope.USERINFO.ADDRESS,
                    ISDEFAULT: 'Y'
                }
            };
            this.saveAddress = function (cuseradd) {
                return actService.save('CUSERADD', cuseradd);
            };
            this.getUserAddressList = function (userid) {
                return actService.query("CUSERADD", {"USERID": userid, "PAGENUM": 0, PAGESIZE: 400});
            };
            this.updateAddress = function (cuseradd) {
                return actService.update('CUSERADD', cuseradd);
            };

            var cuserapp = appService.getApp("CUSER");
            this.getSexList = function () {
                return appService.getAppDic(cuserapp, "SEX");
            };
        }])
/**
 * 增删改查
 */
    .service("actService", ["$rootScope", "baseService", "upLoadService", "constantService",
        function ($rootScope, baseService, upLoadService, constantService) {
            this.save = function (appid, json) {
                var array = [];
                json.SUPERVISE = constantService.SUPERVISE;
                array.push(json);
                return this.saveList(appid, array);
            };
            this.saveList = function (appid, json) {
                for (var i = 0; i < json.length; i++) {
                    json[i].SUPERVISE = constantService.SUPERVISE;
                }
                var js = JSON.stringify(json);
                return baseService.doAct(appid + "/" + constantService.SUPERVISE + "/CREATE", {DATA: js});
            };
            this.del = function (appid, json) {
                return baseService.doAct(appid + "/" + constantService.SUPERVISE + "/REMOVE", json);
            };
            this.update = function (appid, json) {
                var array = [];
                array.push(json);
                return this.updateList(appid, array);
            };
            this.updateList = function (appid, json) {
                var js = JSON.stringify(json);
                return baseService.doAct(appid + "/" + constantService.SUPERVISE + "/UPDATE", {DATA: js});
            };
            this.saveList = function (appid, json) {
                var js = JSON.stringify(json);
                return baseService.doAct(appid + "/" + constantService.SUPERVISE + "/CREATE", {DATA: js});
            };
            this.query = function (appid, json) {
                return baseService.doAct(appid + "/" + constantService.SUPERVISE + "/LISTINFO", json);
            };
            this.queryCount = function (appid, listwhere) {
                if (appid == undefined || appid.length == 0) {
                    console.error("请加入APPCODE参数");
                    return;
                }
                if (listwhere == undefined || listwhere.length == 0) {
                    listwhere = "1=1";
                }
                return baseService.doAct("APPCOUNT/" + constantService.SUPERVISE + "/COUNT", {
                    APPCODE: appid,
                    WHERE: listwhere
                });
            };
            this.get = function (appid, json) {
                return baseService.doAct(appid + "/" + constantService.SUPERVISE + "/INFO", json);
            };
            this.getApp = function (json) {
                return baseService.doAct("APPINFO/" + constantService.SUPERVISE + "/APPDETAIL", json);
            };
            this.upLoadFile = function (file, json) {
                return upLoadService.upLoadFile("UPLOAD/" + constantService.SUPERVISE + "/UPLOAD", file, json);
            };
            this.upLoadFileT = function (file, json) {
                return upLoadService.upLoadFile("UPLOADFILE/" + constantService.SUPERVISE + "/UPLOADFILE", file, json);
            };
            this.composite = function (json) {
                return baseService.doAct("COMPOSITE/" + constantService.SUPERVISE + "/COMPOSITE", json);
            };
            this.listdetail = function (appid, json) {
                return baseService.doAct(appid + "/" + constantService.SUPERVISE + "/LISTDETAIL", json);
            };
            //详情及子表
            this.infolist = function (appid, json) {
                return baseService.doAct(appid + "/" + constantService.SUPERVISE + "/INFOLIST", json);
            };
            //分类
            this.getCatalogList = function (catalogtype, where) {
                return this.query('CATALOG', {'CATALOGTYPE': catalogtype, 'WHERE': where, 'PAGESIZE': 499})
            };
        }])
/**
 *
 */
    .service("appService", ["$rootScope", "actService", "cacheService",
        function ($rootScope, actService, cacheService) {
            //初始化应用程序,从后台获取应用程序数据.
            this.initApp = function (apps) {
                var appids = '';
                for (var i = 0; i < apps.length; i++) {
                    var appid = apps[i];
                    var app = cacheService.getObject(appid);
                    if (app.APPID == undefined) {
                        appids += appid + ",";
                    }
                }
                if (appids.length > 0) {
                    appids = appids.substr(0, appids.length - 1);
                    actService.getApp({"APPCODE": appids}).then(function (res) {
                        if (res.CODE == "0") {
                            var appList = res.DATA;
                            for (var i = 0; i < apps.length; i++) {
                                var appBean = appList[apps[i]];
                                if (appBean) {
                                    cacheService.setObject(apps[i], appBean);
                                }
                            }
                        }
                    });
                }
            };
            //获取APP;
            this.getApp = function (appid) {
                if (appid == undefined) {
                    console.error("appid不能为空");
                    return;
                }
                return cacheService.getObject(appid);
            };
            //获取数据字典;
            this.getAppDic = function (app, fieldCode) {
                if (app == undefined) {
                    console.error("应用未加载,请先初始化,调用appService.initApp()方法");
                    return;
                }
                var diccode = this.getAppField(app, fieldCode).DICCODE;
                var item = {};
                for (var i = 0; i < app.P_APPDICS.length; i++) {
                    if (app.P_APPDICS[i].values) {
                        var dic = app.P_APPDICS[i].values;
                        if (dic.DICID == diccode) {
                            item = dic;
                            break;
                        }
                    }
                }
                return item.P_APPDICDETAILS;
            };
            this.getAppLinks = function (app) {
                if (app == undefined) {
                    console.error("应用未加载,请先初始化,调用appService.initApp()方法");
                    return;
                }
                return app.P_APPLINKS;
            };
            this.getAppLink = function (app, linkAppId) {
                var items = this.getAppLinks(app);
                if (linkAppId == undefined || linkAppId.length == 0) {
                    console.error("linkAppId不能为空");
                    return;
                }
                var item = {};
                for (var i = 0; i < items.length; i++) {
                    var a = items[i].values;
                    if (a.ITEMAPP == linkAppId) {
                        item = a;
                        break;
                    }
                }
                return item;
            };
            this.getAppButtons = function (app) {
                if (app == undefined) {
                    console.error("应用未加载,请先初始化,调用appService.initApp()方法");
                    return;
                }
                return app.P_APPBUTTONS;
            };
            this.getAppButton = function (app, btnCode) {
                var items = this.getAppButtons(app);
                if (btnCode == undefined || btnCode.length == 0) {
                    console.error("btnCode不能为空");
                    return;
                }
                var item = {};
                for (var i = 0; i < items.length; i++) {
                    var a = items[i].values;
                    if (a.BTNCODE == btnCode) {
                        item = a;
                        break;
                    }
                }
                return item;
            };
            this.getAppFields = function (app) {
                if (app == undefined) {
                    console.error("应用未加载,请先初始化,调用appService.initApp()方法");
                    return;
                }
                return app.P_APPFIELDS;
            };

            this.getAppField = function (app, fieldCode) {
                var items = this.getAppFields(app);
                if (fieldCode == undefined || fieldCode.length == 0) {
                    console.error("linkAppId不能为空");
                    return;
                }
                var item = {};
                for (var i = 0; i < items.length; i++) {
                    var a = items[i].values;
                    if (a.FIELDCODE == fieldCode) {
                        item = a;
                        break;
                    }
                }
                return item;
            };
            this.getAppField = function (app, fieldCode) {
                var items = this.getAppFields(app);
                if (fieldCode == undefined || fieldCode.length == 0) {
                    console.error("linkAppId不能为空");
                    return;
                }
                var item = {};
                for (var i = 0; i < items.length; i++) {
                    var a = items[i].values;
                    if (a.FIELDCODE == fieldCode) {
                        item = a;
                        break;
                    }
                }
                return item;
            };
            this.getAppBtnListOne = function (appid) {
                var btnList = [];
                var btnListAll = this.getAppButtons(this.getApp(appid));
                for (var i = 0; i < btnListAll.length; i++) {
                    var btnObj = btnListAll[i].values;
                    if (btnObj.BTNTYPE == 'LISTONE') {
                        btnList.push(btnObj);
                    }
                }
                return btnList;
            };
            this.getAppBtnList = function (appid) {
                var btnList = [];
                var btnListAll = this.getAppButtons(this.getApp(appid));
                for (var i = 0; i < btnListAll.length; i++) {
                    var btnObj = btnListAll[i].values;
                    if (btnObj.BTNTYPE == 'LIST') {
                        btnList.push(btnObj);
                    }
                }
                return btnList;
            };
            this.getAppBtnCardList = function (appid) {
                var btnList = [];
                var btnListAll = this.getAppButtons(this.getApp(appid));
                for (var i = 0; i < btnListAll.length; i++) {
                    var btnObj = btnListAll[i].values;
                    if (btnObj.BTNTYPE == 'CARD') {
                        btnList.push(btnObj);
                    }
                }
                return btnList;
            };
        }])


/**
 *工具类 service 杨草凌
 */
    .service("utilsService", ["$rootScope", "actService", "cacheService",
        function ($rootScope, actService, cacheService) {
            //初始化样式 - 二级路由选中状态
            this.secondLevelActive = function (index) {
                var obj = {};
                obj.isHomePageActive = false;
                obj.isWisdomFarmActive = false;
                obj.isMarketIntActive = false;
                obj.isProducctActive = false;
                obj.isNewsActive = false;
                switch (index) {
                    case 0:
                        obj.isHomePageActive = true;
                        break;
                    case 1:
                        obj.isWisdomFarmActive = true;
                        break;
                    case 2:
                        obj.isMarketIntActive = true;
                        break;
                    case 3:
                        obj.isProducctActive = true;
                        break;
                    case 4:
                        obj.isNewsActive = true;
                        break;
                    default:
                        obj.isHomePageActive = true;
                        break;
                }
                return obj;
            };
            /*****
             * 轮播图查询serive
             *  * Vcbanner 元数据
             * 参数 ：
             * SOURCEAID : 元数据编码
             * SOURCEID 元数据数据记录ID
             * CLIENTTYPE ：web终端类型
             * clienttType 终端类型 PC：电脑端
             * enable 是否启用 Y:启用 N:停用
             *
             */
            this.getWebVcbanner = function (pJson) {
                if (pJson == null || pJson == undefined) return null;
                if (pJson.PAGENUM == null || pJson.PAGENUM == undefined)pJson.PAGENUM = 0;
                if (pJson.PAGESIZE == null || pJson.PAGESIZE == undefined)pJson.PAGESIZE = 5;

                if (pJson.WHERE != null && pJson.PAGESIZE != undefined)  pJson.WHERE = " AND " + pJson.WHERE;
                else pJson.WHERE = '';
                return actService.query("VCBANNER", {
                    PAGENUM: pJson.PAGENUM,//分页数 从0开始
                    PAGESIZE: pJson.PAGESIZE,//偏移量
                    WHERE: "CLIENTTYPE='WEB' AND  ENABLE='Y' " + pJson.WHERE,
                    ORDER: 'SORT'
                });
            };
            /*****
             * 文章查询serive
             *  * CARTICLE 元数据
             * 参数 ：
             * SOURCEAID : 元数据编码
             * SOURCEID 元数据数据记录ID
             * CLIENTTYPE ：web终端类型
             * clienttType 终端类型 PC：电脑端
             * enable 是否启用 Y:启用 N:停用
             *
             */
            this.getCarticle = function (pJson) {
                if (pJson == null || pJson == undefined) return null;
                if (pJson.PAGENUM == null || pJson.PAGENUM == undefined)pJson.PAGENUM = 0;
                if (pJson.PAGESIZE == null || pJson.PAGESIZE == undefined)pJson.PAGESIZE = 200;
                if (pJson.WHERE != null && pJson.PAGESIZE != undefined)pJson.WHERE = " and " + pJson.WHERE;
                else pJson.WHERE = '';
                return actService.query("CARTICLE", {
                    PAGENUM: pJson.PAGENUM,//分页数 从0开始
                    PAGESIZE: pJson.PAGESIZE,//偏移量
                    WHERE: "  ENABLE='Y' " + pJson.WHERE,
                    ORDER: 'SORT'
                });
            };

            this.upLoadFileT = function (file, json) {
                return actService.upLoadFileT(file, {
                    RESTITLE: json.RESTITLE,
                    FILETYPE: json.FILETYPE
                });
            };


            /******
             * list to tree 转换
             * dataList :  数据集合
             * keyName ：id名称
             * parentName ：父ID名称
             * pidValue : 父id默认值 默认为空
             * haschildName : 是否具有子节点名称
             * haschild : 是否具有子节点
             */

            this.listToTree = function (dataList, keyName, parentName, pidValue, haschildName, haschild) {
                var object = [];
                for (var i in dataList) {
                    var data = dataList[i];
                    var keyValue = data['' + keyName + ''];
                    if (data['' + parentName + ''] == pidValue) { //父节点 默认为''
                        if (data['' + haschildName + ''] == haschild) {//是否具有子节点 Y:具有 N:没有
                            data.CHILDREN = this.listToTree(dataList, keyName, parentName, keyValue, haschildName, haschild);
                        }
                        object.push(data);
                    }
                }
                return object;
            };
            this.getCatalogParentLink = function (dataList, resList, catalogid) {
                for (var i = 0; i < dataList.length; i++) {
                    var json = dataList[i];
                    if (json.CATALOGID == catalogid) {
                        resList.push(json);
                        if (json.PARENT != "" && json.PARENT != null) {
                            this.getCatalogParentLink(dataList, resList, json.PARENT);
                        }
                    }
                }
            };
            /******
             * tree to list 转换
             * treeList ： tree集合名称
             * dataList:节点存放处 为最真实的数据值
             * childrenName 子节点 存放处List
             * haschildName 是否具有子节点key名称
             * haschildValue 是否具有子节点value
             * ***/
            this.treeToList = function (treeObject, dataList, childrenName, haschildName, haschildValue) {
                if (treeObject['' + haschildName + ''] == haschildValue) { //是否具有子节点 Y:具有 N:没有
                    var childrenTree = treeObject['' + childrenName + ''];
                    if (childrenTree != undefined && childrenTree != null) {
                        for (var i in childrenTree) {
                            this.treeToList(childrenTree[i], dataList, childrenName, haschildName, haschildValue);
                        }
                    }
                    // treeObject[''+childrenName+''] = null; // 移除子节点集合
                }
                dataList.push(treeObject);
            };

            this.getAppfieldDictMapList = function (APPID) {
                var CNEWS_OBJ = cacheService.getObject(APPID);
                var P_APPDICS = CNEWS_OBJ.P_APPDICS;
                var P_APPFIELDS = CNEWS_OBJ.P_APPFIELDS;
                var s = {};
                for (var i = 0; i < P_APPDICS.length; i++) {
                    var dicid = P_APPDICS[i].values.DICID;
                    var P_APPDICDETAILS = P_APPDICS[i].values.P_APPDICDETAILS;
                    var ss = [];
                    for (var j = 0; j < P_APPDICDETAILS.length; j++) {
                        ss.push(P_APPDICDETAILS[j].values);
                    }
                    s[dicid] = ss;
                }
                var res = {};
                for (var i = 0; i < P_APPFIELDS.length; i++) {
                    var DICCODE = P_APPFIELDS[i].values.DICCODE;
                    var FIELDCODE = P_APPFIELDS[i].values.FIELDCODE;
                    if (DICCODE == "") continue;
                    for (var j in s) {
                        if (DICCODE == j) {
                            res[FIELDCODE] = s[j];
                        }
                    }
                }
                return res;
            }

        }])


/**
 * 地图公用服务，add by lsw
 */
/*.service("mapService", ["$rootScope", "actService", "cacheService",
 function ($rootScope, actService, cacheService) {

 var map = new BMap.Map("map", {minZoom: 8, maxZoom: 13});
 //返回一个蒙版地图
 this.initMap = function (cityName) {
 map.setCurrentCity(cityName);

 map.setCenter(cityName);     // 设置地图显示的城市 此项是必须设置的
 var bdary = new BMap.Boundary();
 bdary.get(cityName, function (rs) {       //获取行政区域
 // map.clearOverlays();        //清除地图覆盖物
 //添加遮罩层
 //思路：利用行政区划点的集合与外围自定义东南西北形成一个环形遮罩层
 //1.获取选中行政区划边框点的集合  rs.boundaries[0]
 var strs = [];
 strs = rs.boundaries[0].split(";");
 var EN = "";    //行政区划东北段点的集合
 var NW = ""; //行政区划西北段点的集合
 var WS = ""; //行政区划西南段点的集合
 var SE = ""; //行政区划东南段点的集合
 var pt_e = strs[0]; //行政区划最东边点的经纬度
 var pt_n = strs[0]; //行政区划最北边点的经纬度
 var pt_w = strs[0]; //行政区划最西边点的经纬度
 var pt_s = strs[0]; //行政区划最南边点的经纬度
 var n1 = ""; //行政区划最东边点在点集合中的索引位置
 var n2 = ""; //行政区划最北边点在点集合中的索引位置
 var n3 = ""; //行政区划最西边点在点集合中的索引位置
 var n4 = ""; //行政区划最南边点在点集合中的索引位置

 //2.循环行政区划边框点集合找出最东南西北四个点的经纬度以及索引位置
 for (var n = 0; n < strs.length; n++) {
 var pt_e_f = parseFloat(pt_e.split(",")[0]);
 var pt_n_f = parseFloat(pt_n.split(",")[1]);
 var pt_w_f = parseFloat(pt_w.split(",")[0]);
 var pt_s_f = parseFloat(pt_s.split(",")[1]);

 var sPt = [];
 try {
 sPt = strs[n].split(",");
 var spt_j = parseFloat(sPt[0]);
 var spt_w = parseFloat(sPt[1]);
 if (pt_e_f < spt_j) {   //东
 pt_e = strs[n];
 pt_e_f = spt_j;
 n1 = n;
 }
 if (pt_n_f < spt_w) {  //北
 pt_n_f = spt_w;
 pt_n = strs[n];
 n2 = n;
 }

 if (pt_w_f > spt_j) {   //西
 pt_w_f = spt_j;
 pt_w = strs[n];
 n3 = n;
 }
 if (pt_s_f > spt_w) {   //南
 pt_s_f = spt_w;
 pt_s = strs[n];
 n4 = n;
 }
 }
 catch (err) {
 alert(err);
 }
 }
 //3.得出东北、西北、西南、东南四段行政区划的边框点的集合
 if (n1 < n2) {     //第一种情况 最东边点在索引前面
 for (var o = n1; o <= n2; o++) {
 EN += strs[o] + ";"
 }
 for (var o = n2; o <= n3; o++) {
 NW += strs[o] + ";"
 }
 for (var o = n3; o <= n4; o++) {
 WS += strs[o] + ";"
 }
 for (var o = n4; o < strs.length; o++) {
 SE += strs[o] + ";"
 }
 for (var o = 0; o <= n1; o++) {
 SE += strs[o] + ";"
 }
 }
 else {   //第二种情况 最东边点在索引后面
 for (var o = n1; o < strs.length; o++) {
 EN += strs[o] + ";"
 }
 for (var o = 0; o <= n2; o++) {
 EN += strs[o] + ";"
 }
 for (var o = n2; o <= n3; o++) {
 NW += strs[o] + ";"
 }
 for (var o = n3; o <= n4; o++) {
 WS += strs[o] + ";"
 }
 for (var o = n4; o <= n1; o++) {
 SE += strs[o] + ";"
 }
 }
 //4.自定义外围边框点的集合
 var E_JW = "170.672126, 39.623555;";            //东
 var EN_JW = "170.672126, 81.291804;";       //东北角
 var N_JW = "105.913641, 81.291804;";        //北
 var NW_JW = "-169.604276,  81.291804;";     //西北角
 var W_JW = "-169.604276, 38.244136;";       //西
 var WS_JW = "-169.604276, -68.045308;";     //西南角
 var S_JW = "114.15563, -68.045308;";            //南
 var SE_JW = "170.672126, -68.045308 ;";         //东南角
 //4.添加环形遮罩层
 //            var ply1 = new BMap.Polygon(EN + NW + WS + SE + E_JW + SE_JW + S_JW + WS_JW + W_JW + NW_JW + EN_JW + E_JW, { strokeColor: "rgba(0,0,0,1)", fillColor: "rgba(255,255,255,1)", fillOpacity:"1", strokeOpacity: 10 }); //建立多边形覆盖物
 var ply1 = new BMap.Polygon(EN + NW + WS + SE + E_JW + SE_JW + S_JW + WS_JW + W_JW + NW_JW + EN_JW + E_JW,
 {
 strokeStyle: "solid 10px black",
 strokeColor: "none",
 fillColor: "rgba(0,0,0,1)",
 fillOpacity: "1",
 strokeOpacity: 0
 }); //建立多边形覆盖物

 map.addOverlay(ply1);//遮罩物是半透明的，如果需要纯色可以多添加几层
 //5. 给目标行政区划添加边框，其实就是给目标行政区划添加一个没有填充物的遮罩层
 var ply = new BMap.Polygon(rs.boundaries[0], {
 strokeWeight: 2,
 strokeColor: "white",
 fillColor: "none"
 });
 map.addOverlay(ply);
 map.setViewport(ply.getPath());    //调整视野
 //loadCityMapInfo(map);

 });
 return map;

 };

 //另一种创建蒙版地图的方式
 /!*  this.getBoundary = function (sRegion) {
 var bdary = new BMap.Boundary();
 bdary.get(sRegion, function (rs) { //获取行政区域
 map.clearOverlays(); //清除地图覆盖物
 var count = rs.boundaries.length; //行政区域的点有多少个
 for (var i = 0; i < count; i++) {
 var ply = new BMap.Polygon(rs.boundaries[i], {
 strokeWeight: 2,
 strokeColor: "#4A7300",
 fillColor: ""
 }); //建立多边形覆盖物
 map.addOverlay(ply); //添加覆盖物
 map.setViewport(ply.getPath()); //调整视野
 }
 });
 }*!/


 }]);
 */
