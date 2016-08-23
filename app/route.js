'use strict';
// Declare app level module which depends on views, and components


/**
 * 配置路由。 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 *
 * @param {[type]}
 *            $stateProvider
 * @param {[type]}
 *            $urlRouterProvider
 * @return {[type]}
 */

clesunClound.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");
    $stateProvider.state("index", {
        url: "/index",
        views: {
            "": {
                templateUrl: "views/index.html",
                controller: "navCtrl"
            },
            "loginregister@index": {
                templateUrl: "views/common/loginregister.html"
            }
        }
    }).state("index.publishproduct", {
        url: "/publishproduct?productid",
        templateUrl: "views/farm/publishproduct.html",
        controller: "publishproductCtrl"
    }).state("index.publishproduce", {
        url: "/publishproduce?productid",
        templateUrl: "views/farm/publishproduce.html",
        controller: "publishproduceCtrl"
    }).state("index.listsowing", {
        url: "/listsowing",
        templateUrl: "views/farm/listsowing.html",
        controller: "listsowingCtrl"
    }).state("index.publishsowing", {
        url: "/publishsowing",
        templateUrl: "views/farm/publishsowing.html",
        controller: "publishsowingCtrl"
    }).state("index.sowingdetail", {
        url: "/sowingdetail?productid",
        templateUrl: "views/farm/sowingdetail.html",
        controller: "sowingdetailCtrl"
    }).state("index.listproduct", {
        url: "/listproduct",
        templateUrl: "views/farm/listproduct.html",
        controller: "listproductCtrl"
    }).state("index.productdetail", {
        url: "/productdetail?productid",
        templateUrl: "views/farm/productdetail.html",
        controller: "productdetailCtrl"
    }).state("index.publishcquotationbill", {
        url: "/publishcquotationbill",
        templateUrl: "views/farm/publishcquotationbill.html",
        controller: "publishcquotationbillCtrl"
    }).state("index.modifycbill", {
        url: "/modifycbill?qbillid",
        templateUrl: "views/farm/modifycbill.html",
        controller: "modifycbillCtrl"
    }).state("index.listcquotationbill", {
        url: "/listcquotationbill",
        templateUrl: "views/farm/listcquotationbill.html",
        controller: "listcquotationbillCtrl"
    }).state("index.cbilldetail", {
        url: "/cbilldetail?qbillid",
        templateUrl: "views/farm/cbilldetail.html",
        controller: "cbilldetailCtrl"
    }).state("index.login", {
        url: "/login",
        templateUrl: "views/common/login.html"
    }).state("index.register", {
        url: "/register",
        templateUrl: "views/common/register.html"
    }).state("index.home", {
        url: "/home",
        templateUrl: "views/home.html",
        controller: "homeCtrl"
    }).state("index.placeorder", {
        url: "/placeorder",
        templateUrl: "views/placeorder.html",
        controller: "placeorderCtrl"
    }).state("index.order", {
        url: "/order",
        templateUrl: "views/user/order.html",
        controller: "orderCtrl"
    }).state("index.account", {
        url: "/account",
        templateUrl: "views/user/account.html",
        controller: "accountCtrl"
    }).state("index.profile", {
        url: "/profile",
        templateUrl: "views/user/profile.html",
        controller: "profileCtrl"
    }).state("index.userinfo", {
        url: "/userinfo",
        templateUrl: "views/user/userinfo.html",
        controller: "userinfoCtrl"
    }).state("index.customer", {
        url: "/customer",
        templateUrl: "views/user/customer.html",
        controller: "customerCtrl"
    }).state("index.invitation", {
        url: "/invitation",
        templateUrl: "views/user/invitation.html",
        controller: "invitationCtrl"
    }).state("index.attention", {
        url: "/attention",
        templateUrl: "views/user/attention.html",
        controller: "attentionCtrl"
    }).state("index.collect", {
        url: "/collect",
        templateUrl: "views/user/collect.html",
        controller: "collectCtrl"
    }).state("index.listmessage", {
        url: "/listmessage",
        templateUrl: "views/user/listmessage.html",
        controller: "listmessageCtrl"
    }).state("index.messagedetail", {  //我的消息详情列表
        url: "/messagedetail",
        templateUrl: "views/user/messagedetail.html",
        controller: "messagedetailCtrl"
    }).state("index.say", {
        url: "/say",
        templateUrl: "views/user/say.html",
        controller: "sayCtrl" //吐槽
    }).state("index.help", {
        url: "/help",
        templateUrl: "views/user/help.html",
        controller: "helpCtrl"
    }).state("index.listloc", {
        url: "/listloc",
        templateUrl: "views/user/listloc.html",
        controller: "listlocCtrl"
    }).state("index.publishloc", {
        url: "/publishloc",
        templateUrl: "views/user/publishloc.html",
        controller: "publishlocCtrl"
    }).state("index.locdetail", {
        url: "/locdetail",
        templateUrl: "views/user/locdetail.html",
        controller: "locdetailCtrl"
    }).state("index.listassets", {
        url: "/listassets",
        templateUrl: "views/user/listassets.html",
        controller: "listassetsCtrl"
    }).state("index.publishassets", {
        url: "/publishassets",
        templateUrl: "views/user/publishassets.html",
        controller: "publishassetsCtrl"
    }).state("index.assetsdetail", {
        url: "/assetsdetail",
        templateUrl: "views/user/assetsdetail.html",
        controller: "assetsdetailCtrl"
    });
});
