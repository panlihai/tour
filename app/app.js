'use strict';
// Declare app level module which depends on views, and components
var clesunClound = angular.module('clesunClound', ["ngFileUpload", "ui.router", "ngAnimate", "ngSanitize"])


/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 *
 * @param {[type]}
 *            $rootScope
 * @param {[type]}
 *            $state
 * @param {[type]}
 *            $stateParams
 * @return {[type]}
 */
    .run(function ($rootScope, $state, $stateParams, appService, userService, locationService, cacheService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.USERINFO = {};
        //获取usertoken
        userService.getUserToken();

        $rootScope.$watch("USERTOKEN", function (data) {
            // 获取资源对象
            if (data) {
                appService.initApp(["CUSER", "CQUOTATIONBILL", "CORDERDETAIL", "CPRODUCT",
                    "CCATALOG", "CPRODUCE", "VCPRODUCT", "CARTICLE", "CNEWS", "CACTIVITY",
                    "CASSETS", "CLOC", "CCERT", "CPRODUCT", "VCBANNER", "CACCOUNT", "VCACCOUNT",
                    "CUSERINTEREST", "CUSERVOTE", "CUSERCOMMENT", "CMESSAGE", "CTELSMS", "CFEEDBACK",
                    "CVERSION", "CROLEUSER", "CROLEAUTH", "CROLE", "CINTEGRALRULES",
                    "CINTEGRALDETAIL", "CSESSION"]);
            }
        });

        //默认获取当前为在的经纬度
        locationService.doGetLocation().then(function (res) {
            if (res.status == '1') {
                //{"status":"1","info":"OK","infocode":"10000","province":"北京市","city":"北京市","adcode":"110000","rectangle":"116.0119343,39.66127144;116.7829835,40.2164962"}
                cacheService.setSObject("LOCATION", res);
                var latlng = res.rectangle.split(";");
                var lng11 = latlng[0].split(",");
                var lat11 = latlng[1].split(",");
                var lng = (parseFloat(lng11[0]) + parseFloat(lat11[0])) / 2;
                var lat = (parseFloat(lng11[1]) + parseFloat(lat11[1])) / 2;
                cacheService.setS("LNG", lng);
                cacheService.setS("LAT", lat);
            } else {
                if ($window.navigator.geolocation) {
                    var options = {
                        enableHighAccuracy: true
                    };
                    $window.navigator.geolocation.getCurrentPosition(function (position) {
                        // 获取到当前位置经纬度  本例中是chrome浏览器取到的是google地图中的经纬度
                        var LNG = position.coords.longitude;
                        var LAT = position.coords.latitude;
                        cacheService.setS("LNG", LNG);
                        cacheService.setS("LAT", LAT);
                    }, function (error) {
                        cacheService.setS("LNG", "0");
                        cacheService.setS("LAT", "0");
                    }, options);
                } else {
                    cacheService.setS("LNG", "0");
                    cacheService.setS("LAT", "0");
                }
            }
        });
    })
/**
 * 静态变量，系统配置。
 */
    .service("constantService", ["$rootScope", function ($rootScope) {
        this.PID = "YNY";
        // this.HOST = "http://192.168.1.3/server/";
        this.HOST = "http://192.168.1.26:8080/server/";
        //this.HOST = "http://d.nongyongtong.com:99/server/";
        this.REQURL = "api/";
        this.WXREQURL = "wxjsapi/";
        this.USERINFO = "USERINFO";
        this.SUPERVISE = 'ffba2f886242449eb08ff1e658289a78';//监管ID
        // this.cloundServer = "http://d.nongyongtong.com:99/clound/#/register";
        this.cloundServer = "http://localhost:8080/clound/#/register";
        //农场版 轮播图  SOURCEAID 和 SOURCEID  以及业务类型
        this.PRODUCT_BANNER = {
            SOURCEAID: "CACCOUNT", //交易商 指 政府
            SOURCEID: "ffba2f886242449eb08ff1e658289a78", //政府ID
            BANNERBUSINESSTYPE: {
                HOME: "HOME",    //	首页轮播	1
                PRODUCTSUPERVISE: "PRODUCTSUPERVISE",	//生产监管轮播	2
                PRICEANALYZE: "PRICEANALYZE",	//价格分析轮播	3
                PRODUCTSTORE: "PRODUCTSTORE",	//产品商城轮播	4
                PRODUCTSTOREAD: "PRODUCTSTOREAD",    //产品商城广告轮播	4
                NEWSANNUNCIATE: "NEWSANNUNCIATE" 	//新闻动态轮播	5
            }
        };
    }]);