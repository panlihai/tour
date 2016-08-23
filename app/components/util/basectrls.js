"use strict";
/**
 * 导航栏功能控制器
 */
clesunClound.controller("navCtrl", ["$rootScope", "$scope", "$state", "userService", "commonService",
    "cacheService", "$window", "constantService", "utilsService", "actService",
    function ($rootScope, $scope, $state, userService, commonService,
              cacheService, $window, constantService, utilsService, actService) {


        // 用户界面绑定数据
        $scope.userLoginInfo = {
            // 用户名称
            USERID: cacheService.get("USERID", ""),
            // 用户密码
            PASSWORD: cacheService.get("PASSWORD", ""),
            // 是否自动登录
            autoLogin: cacheService.get("AUTOLOGIN", "true") == "true" ? true : false,
            // 是否有错误
            error: false,
            // 错误消息
            msg: "",
            // 验证码
            CAPTCHATEXT: ""
        };

        //打开登录 页面
        $scope.openLogin = function () {
            $("#login_modal_page").modal("show");
            $('#login_modal_page a[href="#loginView"]').tab('show')
        };
        //打开登录 页面
        $scope.openRegister = function () {
            $("#login_modal_page").modal("show");
            $('#login_modal_page a[href="#registerView"]').tab('show')
        };
        /**
         * 点击菜单后隐藏
         */
        $scope.hiddenCollapse = function () {
            $(".collapse").collapse("hide");
        };
        $scope.openCloundRegister = function () {
            window.open(constantService.cloundServer);
        }
        /**
         * 登录系统
         */
        $scope.login = function () {
            /**
             * @param 产品名称
             * @param 用户界面信息
             */
            if ($rootScope.loginErrorSeq > 3 && $rootScope.CAPTCHATEXTs != $scope.userLoginInfo.CAPTCHATEXT) {
                $rootScope.CAPTCHA = true;//验证码是否显示
                $scope.userLoginInfo.msg = "验证码错误";//登录结果提示信息
                $rootScope.CAPTCHATEXTs = commonService.Random(4);
                $rootScope.CAPTCHATEXT = $rootScope.CAPTCHATEXTs[0] + " " + $rootScope.CAPTCHATEXTs[1] + " " + $rootScope.CAPTCHATEXTs[2] + " " + $rootScope.CAPTCHATEXTs[3];
                return;
            }
            userService.login($scope.userLoginInfo).then(function (res) {
                if (res.CODE == '0') {
                    cacheService.set("USERID", $scope.userLoginInfo.USERID);
                    cacheService.set("PASSWORD", $scope.userLoginInfo.PASSWORD);
                    cacheService.set("AUTOLOGIN", $scope.userLoginInfo.autoLogin ? "true" : "false");
                    cacheService.set("USERTOKEN", res.DATA.USERTOKEN);
                    cacheService.setObject(constantService.USERINFO, res.DATA);
                    $rootScope.USERINFO = res.DATA;
                    $rootScope.USERTOKEN = res.DATA.USERTOKEN;
                    $rootScope.isLogin = true;

                    //$("#login_modal_page").modal("hide");
                    $scope.userLoginInfo.error = false;//登录结果状态
                    $scope.userLoginInfo.msg = "";//登录结果提示信息
                    $rootScope.loginErrorSeq == null;//登录失败次数
                    $rootScope.CAPTCHA = false;//验证码是否显示
                    if ($rootScope.USERINFO.ACCOUNTID) {
                        actService.infolist('VCACCOUNT', {
                            'ACCOUNTID': $rootScope.USERINFO.ACCOUNTID,
                            'LISTDETAIL': "[{'AID':'VCCERT'},{'AID':'CUSER'},{'AID':'CASSETS'},{'AID':'CUSERINTEREST'},{'AID':'CLOC'},{'AID':'CARTICLE'},{'AID':'VCPRODUCT'},{'AID':'CQUOTATIONBILL'}, {'AID':'CORDERDETAIL'},{'AID':'VCBANNER'},{'AID':'CINTEGRALDETAIL'},{'AID':'CFEEDBACK'},{'AID':'CUSERCOMMENT'},{'AID':'CMESSAGE'},{'AID':'VCPRODUCTGENERAL'},{'AID':'VCPRODUCTSUMACCOUNTID'}]"
                        }).then(function (res) {
                            if (res.CODE == '0') {
                                $rootScope.USERINFO.VCACCOUNT.DATA[0] = res.DATA;
                            }
                        });
                    }
                    $state.go("index.home");
                } else {
                    $scope.userLoginInfo.error = true;//登录结果状态
                    $scope.userLoginInfo.msg = res.MSG;//登录结果提示信息
                    //登录失败次数初始化为0
                    if ($rootScope.loginErrorSeq == undefined || $rootScope.loginErrorSeq == null) {
                        $rootScope.loginErrorSeq = 0;
                    }
                    //登录失败次数+1;
                    $rootScope.loginErrorSeq++;
                    //登录失败如果超过3次进行验证码校验
                    if ($rootScope.loginErrorSeq > 3) {
                        $rootScope.CAPTCHA = true;//验证码是否显示
                        $rootScope.CAPTCHATEXTs = commonService.Random(4);
                        $rootScope.CAPTCHATEXT = $rootScope.CAPTCHATEXTs[0] + " " + $rootScope.CAPTCHATEXTs[1] + " " + $rootScope.CAPTCHATEXTs[2] + " " + $rootScope.CAPTCHATEXTs[3];
                    }
                }
            });
        };
        /**
         * 退出系统
         */
        $scope.logout = function () {
            /**
             * @param 产品名称
             * @param 用户界面信息
             */
            userService.logout().then(function (res) {
                cacheService.remove("USERID");
                cacheService.remove("PASSWORD");
                cacheService.remove("autoLogin");
                cacheService.remove("USERINFO");
                $rootScope.USERINFO = {};
                $rootScope.isLogin = false;
                //调整到主页.
                $rootScope.$state.go("index.home");
            });
        };
        // 用户界面绑定数据
        $scope.userRegisterInfo = {
            // 用户名称
            MOBILEPHONE: '',
            // 用户名称
            USERID: '',
            // 随机数
            RANDOM: commonService.Random(6),
            // 用户密码
            PASSWORD: '',
            //验证码
            AUTHCODE: '',
            //只有点击获取验证码之后才能显示
            needcode: false,
            // 是否自动登录
            autoLogin: true,
            // 是否有错误
            error: false,
            // 错误消息
            msg: ""
        };
        $scope.getTelsms = function () {
            userService.getTelsms($scope.userRegisterInfo.MOBILEPHONE, $scope.userRegisterInfo.RANDOM).then(function (res) {
                if (res.CODE == '0') {
                    $scope.userRegisterInfo.needcode = true;
                    $scope.userRegisterInfo.error = false;
                    $scope.userRegisterInfo.error = "";
                } else {
                    $scope.userRegisterInfo.error = true;
                    $scope.userRegisterInfo.msg = res.MSG;
                }
            });
        };
        /**
         * 注册
         */
        $scope.register = function () {
            $scope.userRegisterInfo.USERID = $scope.userRegisterInfo.MOBILEPHONE;
            userService.register($scope.PID, $scope.userRegisterInfo).then(function (res) {
                if (res.CODE == '0') {
                    cacheService.set("USERID", $scope.userRegisterInfo.USERID);
                    cacheService.set("PASSWORD", $scope.userRegisterInfo.PASSWORD);
                    cacheService.set("autoLogin", $scope.userLoginInfo.autoLogin ? "true" : "false");
                    cacheService.setObject("USERINFO", res.DATA);
                    $("#login_modal_page").modal("hide");
                    $scope.userRegisterInfo.error = false;
                    $scope.userRegisterInfo.msg = "";
                    $rootScope.isLogin = true;
                } else {
                    $scope.userRegisterInfo.error = true;
                    $scope.userRegisterInfo.msg = res.MSG;
                }
            });
        };
        if ($rootScope.USERINFO) {
            //首页进行初始化加载界面
            $state.go("index.home");
        } else {
            //首页进行初始化加载界面
            $state.go("index.login");
        }

    }])
// 个人信息控制器
    .controller("profileCtrl", ["$rootScope", "$scope", "cacheService",
        "$state", function ($rootScope, $scope, cacheService, $state) {
        }])
// 控制器个人资料
    .controller("mainCtrl", [
        "$rootScope", "$scope", "$state", "actService", "cacheService", "appService",
        function ($rootScope, $scope, $state, actService, cacheService, appService) {
        }
    ])
// 控制器个人资料
    .controller("userinfoCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "userService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, userService) {
            $scope.userinfo = {
                'TEL': $rootScope.USERINFO.TEL,
                'REALNAME': $rootScope.USERINFO.REALNAME,
                'NICKNAME': $rootScope.USERINFO.NICKNAME,
                'PROVINCE': $rootScope.USERINFO.PROVINCE,
                'CITY': $rootScope.USERINFO.CITY,
                'COUNTY': $rootScope.USERINFO.COUNTY,
                'ADDRESS': $rootScope.USERINFO.ADDRESS,
                'USERID': $rootScope.USERINFO.USERID,
                'ID': $rootScope.USERINFO.ID
            };
            // 从数据字典中获取字段列表
            $scope.sexList = userService.getSexList();
            // 获取省
            $scope.getProvinces = function () {
                cacheService.getRemoteSessionCache("REGION",
                    "PROVINCE000000", {
                        PARENT: "000000", RGLEVEL: 1
                    }).then(function (data) {
                        $scope.provinces = data;
                    });
            };
            // 获取省
            $scope.getProvinces();
            $scope.$watch('userinfo.CITY', function (county) {
                if (county != undefined) {
                    $scope.countys = {};
                    // 获取城市
                    cacheService.getRemoteSessionCache(
                        "REGION", "COUNTY" + county, {
                            PARENT: county, RGLEVEL: 3
                        }).then(function (data) {
                            $scope.countys = data;
                        });
                }
            });
            // 更换省的时候获取城市
            $scope.$watch('userinfo.PROVINCE', function (province) {
                if (province != undefined) {
                    $scope.citys = {};
                    // 获取城市
                    cacheService.getRemoteSessionCache(
                        "REGION", "CITY" + province, {
                            PARENT: province, RGLEVEL: 2
                        }).then(function (data) {
                            $scope.citys = data;
                        });
                }
            });
            $scope.update = function () {
                actService.update("CUSER", $scope.userinfo).then(function (res) {
                    if (res.CODE == "0") {
                        console.log(res);
                        $rootScope.USERINFO.TEL = $scope.userinfo.TEL,
                            $rootScope.USERINFO.REALNAME = $scope.userinfo.REALNAME,
                            $rootScope.USERINFO.NICKNAME = $scope.userinfo.NICKNAME,
                            $rootScope.USERINFO.PROVINCE = $scope.userinfo.PROVINCE,
                            $rootScope.USERINFO.CITY = $scope.userinfo.CITY,
                            $rootScope.USERINFO.COUNTY = $scope.userinfo.COUNTY,
                            $rootScope.USERINFO.ADDRESS = $scope.userinfo.ADDRESS,
                            $state.go("index.profile");
                    } else {
                        console.error(res);
                    }
                });
            };
        }])
    .controller("homeCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService",
        function ($rootScope, $scope, $state, actService, cacheService, appService) {


        }
    ])
    .controller("placeorderCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "placeorderService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, placeorderService) {

        }
    ]).controller("orderCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "orderService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, orderService) {

        }
    ]).controller("accountCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService",
        "appService", "accountService", "locationService", "bannerService", "certService",
        function ($rootScope, $scope, $state, actService, cacheService,
                  appService, accountService, locationService, bannerService, certService) {
            $scope.account = $rootScope.USERINFO.VCACCOUNT.DATA[0];
            //获取经营种类
            $scope.PROSECUTIONS = [];
            $scope.selectProsecution = "";
            //获取经营分类
            accountService.getCatalogFromProsecution().then(function (res) {
                if (res.CODE == '0') {
                    $scope.PROSECUTIONS = res.DATA;
                    for (var i in res.DATA) {
                        if ($scope.account.PROSECUTION.indexOf($scope.PROSECUTIONS[i].CATALOGID) != -1) {
                            $scope.PROSECUTIONS[i].CHECK = true;
                            $scope.selectProsecution += $scope.PROSECUTIONS[i].CATALOGNAME + ",";
                        }
                    }
                    if ($scope.selectProsecution.length > 0) {
                        $scope.selectProsecution = $scope.selectProsecution.substr(0, $scope.selectProsecution.length - 1);
                    }
                }
            });
            //获取轮播图
            bannerService.getList($scope.account.ID, "CACCOUNT").then(function (res) {
                if (res.CODE == '0') {
                    $scope.bannerList = res.DATA;
                } else {
                    console.error(res.MSG);
                }
            });
            $scope.town = {};
            // 获取城市
            cacheService.getRemoteSessionCache(
                "REGION", "TOWN" + $scope.account.COUNTY, {
                    PARENTNAME: $scope.account.COUNTY, RGLEVEL: '4'
                }).then(function (data) {
                    if (data.length) {
                        $scope.towns = data;
                    }

                });
            //默认没有选中任何经营分类
            $scope.checkProsecutionsSelect = false;
            //监控判断是否有选择经验分类
            $scope.$watch('PROSECUTIONS', function (newValue, oldValue) {
                //初始化不进行校验
                if (oldValue.length != 0) {
                    //如果有变化，则设置为已选择。
                    if (newValue !== oldValue) {
                        $scope.checkProsecutionsSelect = true;
                    }
                }
            }, true);
            //获取网站模板种类
            $scope.SITETYPES = [];
            //选中的模板分类对象
            $scope.selectSitetype = [];
            //获取网站模板分类
            accountService.getCatalogFromSiteType().then(function (res) {
                if (res.CODE == '0') {
                    $scope.SITETYPES = res.DATA;
                    if ($scope.SITETYPES && $scope.SITETYPES.length > 0) {
                        $scope.selectSitetype = $scope.SITETYPES[0];//默认选中第一个
                    }
                }
            });
            //获取当前交易商认证信息
            certService.getList('CACCOUNT', $scope.account.ID, 0).then(function (res) {
                if (res.CODE == '0') {
                    $scope.certList = res.DATA;
                    for (var i in $scope.certList) {
                        var cert = $scope.certList[i];
                        switch (cert.CERTTYPE) {
                            case 'LICENSE':
                                $scope.licensePic = cert.PICPATH;
                                break;
                            case 'CARD':
                                if($scope.cardPic){
                                    $scope.cardBackPic = cert.PICPATH;
                                }else{
                                    $scope.cardPic = cert.PICPATH;
                                }
                                break;

                        }

                    }
                }
            });


            /**
             * 查看地址信息是否变化，如果变化则把变化的经纬度写入到对象中。
             */
            $scope.$watch("account.PROVINCE+account.CITY+account.COUNTY+account.TOWN+companyInfo.VILAGE+account.ADDRESS", function () {
                var companyInfo = $scope.account;
                locationService.doGet(companyInfo.PROVINCE, companyInfo.CITY, companyInfo.COUNTY, companyInfo.TOWN, companyInfo.VILAGE, companyInfo.ADDRESS)
                    .then(function (res) {
                        //获取省市县乡镇村地址经纬度，state=1为返回正确，state=0为错误。
                        if (res.status == '1') {
                            if (res.geocodes && res.geocodes.length) {
                                var location = res.geocodes[0].location.split(',');
                                if (location && location.length == 2) {
                                    $scope.account.LNG = location[0];//经度
                                    $scope.account.LAT = location[1];//纬度
                                }
                            }
                        }
                    });
            });
            /**
             * 创建banner图.
             * @param picPathId
             * @param tttle
             * @param order
             */
            var createBanner = function (picPathId, order) {
                var banner = bannerService.createObj();
                banner.SOURCEID = $scope.account.ID;
                banner.SOURCEAID = 'CACCOUNT';
                banner.IMGPATHID = picPathId;
                banner.TITLE = '农场首页轮播图片';
                banner.ORDER = order;
                bannerService.saveObj(banner).then(function (res) {
                    if (res.CODE == '0') {
                        console.log(res);
                    } else {
                        console.error(res);
                    }
                });
            };
            $scope.uploadFile0 = function (file) {
                accountService.upLoadFile(file, '农场首页轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.PICPATHID0 = res.data.RESIDS;
                        $scope.PICPATH0 = res.data.DATA;
                        createBanner($scope.PICPATHID0, 0);
                    }
                });
            };
            $scope.uploadFile1 = function (file) {
                accountService.upLoadFile(file, '农场首页轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.PICPATHID1 = res.data.RESIDS;
                        $scope.PICPATH1 = res.data.DATA;
                        createBanner($scope.PICPATHID1, 1);
                    }
                });
            };
            $scope.uploadFile2 = function (file) {
                accountService.upLoadFile(file, '农场首页轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.PICPATHID2 = res.data.RESIDS;
                        $scope.PICPATH2 = res.data.DATA;
                        createBanner($scope.PICPATHID2, 2);
                    }
                });
            };
            $scope.uploadFile3 = function (file) {
                accountService.upLoadFile(file, '农场首页轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.PICPATHID3 = res.data.RESIDS;
                        $scope.PICPATH3 = res.data.DATA;
                        createBanner($scope.PICPATHID3, 3);
                    }
                });
            };
            $scope.update = function () {
                if ($scope.PROSECUTIONS) {
                    for (var i = 0; i < $scope.PROSECUTIONS.length; i++) {
                        if ($scope.PROSECUTIONS[i].CHECK) {
                            this.account.PROSECUTION += $scope.PROSECUTIONS[i].CATALOGID + ",";
                        }
                    }
                }
                if ($scope.selectSitetype) {
                    this.account.SITETYPE = $scope.selectSitetype.CATALOGID;
                }
                accountService.updateObj($scope.account).then(function (res) {
                    if (res.CODE == '0') {
                        console.log(res);
                    } else {
                        console.error(res);
                    }
                });
            }
        }
    ]).controller("listlocCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "clocService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, clocService) {
            var account = $rootScope.USERINFO.VCACCOUNT.DATA[0];
            clocService.getList(account.ACCOUNTID, 0).then(function (res) {
                if (res.CODE == '0') {
                    $scope.locList = res.DATA;
                } else {
                    console.error(res);
                }
            });
        }
    ])
    .controller("publishlocCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "clocService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, clocService) {
            var account = $rootScope.USERINFO.VCACCOUNT.DATA[0];
            //编辑状态
            $scope.editType = true;
            $scope.editpage = true;//是编辑界面
            $scope.loc = clocService.createObj();
            $scope.loc.HASCHILD = 'N';//有子集?
            $scope.loc.LAT = account.LAT;//纬度
            $scope.loc.SOURCEAID = 'CACCOUNT';//关联元数据编码
            $scope.loc.SOURCEID = account.ID;//关联元数据ID
            $scope.loc.LNG = account.LNG;//经度
            $scope.loc.ACCOUNTID = account.ACCOUNTID;
            var resfile = {};
            $scope.uploadFile = function (file) {
                clocService.upLoadFile(file, '地块图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.loc.PICPATHID = res.data.RESIDS;
                        $scope.loc.PICPATH = res.data.DATA;
                        resfile = res.data.DATAS;
                    }
                });
            };
            $scope.save = function () {
                clocService.saveObj($scope.loc).then(function (res) {
                    if (res.CODE == '0') {
                        $state.go("index.listloc");
                    }
                });
            }
        }
    ]).controller("locdetailCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "clocService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, clocService) {
            var account = $rootScope.USERINFO.VCACCOUNT.DATA[0];
        }
    ]).controller("listassetsCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "cassetsService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, cassetsService) {
            var account = $rootScope.USERINFO.VCACCOUNT.DATA[0];
            cassetsService.getList(account.ID, 0).then(function (res) {
                if (res.CODE == '0') {
                    $scope.cassetsList = res.DATA;
                } else {
                    console.error(res);
                }
            });
        }
    ])
    .controller("publishassetsCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "cassetsService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, cassetsService) {

        }
    ]).controller("assetsdetailCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "cassetsService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, cassetsService) {

        }
    ]).controller("customerCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "customerService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, customerService) {

        }
    ]).controller("invitationCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "invitationService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, invitationService) {

        }
    ]).controller("attentionCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "attentionService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, attentionService) {
            var user = $rootScope.USERINFO;
            attentionService.getList(user.ID, 0).then(function (res) {
                if (res.CODE == '0') {
                    $scope.userinterestList = res.DATA;
                } else {
                    console.error(res);
                }
            });
        }
    ]).controller("collectCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "collectService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, collectService) {

        }
    ]).controller("listmessageCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "messageService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, messageService) {
            var user = $rootScope.USERINFO;
            messageService.getList(user.USERID, 0).then(function (res) {
                if (res.CODE == '0') {
                    $scope.messageList = res.DATA;
                } else {
                    console.error(res);
                }
            });
        }
    ]).controller("messagedetailCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "messageService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, messageService) {
            var message = $rootScope.USERINFO.VCACCOUNT.DATA[0];
            messageService.getList(account.ID, 0).then(function (res) {
                if (res.CODE == '0') {
                    $scope.messageList = res.DATA;
                } else {
                    console.error(res);
                }
            });
        }
    ]).controller("helpCtrl", ["$rootScope", "$scope", "$state", "actService", "cacheService", "appService", "helpService",
        function ($rootScope, $scope, $state, actService, cacheService, appService, helpService) {

        }
    ]).controller("sayCtrl",
    ["$rootScope", "$scope", "$state", "actService", "utilsService", "appService", "commonService", "sayService", "userService",
        function ($rootScope, $scope, $state, actService, utilsService, appService, commonService, sayService, userService) {
            //创建一个对象
            $scope.say = sayService.createObj();
            //为对象里面的属性赋值
            $scope.say.CREATEUSER = $rootScope.USERINFO.USERID;
            $scope.say.CONTACTWAY = $rootScope.USERINFO.TEL;
            $scope.say.CREATETIME = commonService.getTimestamp();
            $scope.say.PROBLEMTYPE = 'FEEDBACK';
            //执行提交的方法
            $scope.publishSay = function () {
                sayService.saveObj($scope.say).then(function (res) {
                    if (res.CODE == '0') {
                        $state.go('index.profile');//跳转到之前的那一页
                    }
                });
            };

        }
    ])


;