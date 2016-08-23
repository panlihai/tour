/**
 * 注册登录控制器
 */
clesunClound.controller("loginCtrl",
    ["$rootScope", "$scope", "$state", "cacheService",
        "userService", "commonService", "constantService",
        function ($rootScope, $scope, $state, cacheService,
                  userService, commonService, constantService) {


            /**
             * 重置
             */
            $scope.reset = function () {
                $scope.userLoginInfo.USERID = cacheService.get("USERID", "");
                $scope.userLoginInfo.PASSWORD = cacheService.get("PASSWORD", "");
                $scope.userLoginInfo.autoLogin = cacheService.get("autoLogin", "fasle") == "false" ? false : true;
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
                userService.getTelsms($scope.userRegisterInfo).then(function (res) {
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

        }])
/**
 * 注册用户
 */
    .controller("registerCtrl", ["$scope", "$state", "$interval", "commonService", "registerService", "locationService", "cacheService",
        function ($scope, $state, $interval, commonService, registerService, locationService, cacheService) {
            //默认的产品区域
            registerService.companyInfo.PROVINCE = "黑龙江省";
            registerService.companyInfo.CITY = "遂宁市";
            registerService.companyInfo.COUNTY = "绥棱县";
            //获取service中的数据对象
            $scope.companyInfo = registerService.companyInfo;
            $scope.town = {};
            // 更换省的时候获取城市
            // 获取城市
            cacheService.getRemoteSessionCache(
                "REGION", "TOWN" + $scope.companyInfo.COUNTY, {
                    PARENTNAME: $scope.companyInfo.COUNTY, RGLEVEL: '4'
                }).then(function (data) {
                    $scope.towns = data;
                });
            //判断是否存在此农场名称
            $scope.isExistCompany = false;
            //监视是否存在此农场名称
            $scope.changeCompany = function () {
                //根据农场名称判断
                registerService.checkCompanyIsExist().then(function (res) {
                    //如果不为0则提示，并且不能提交。
                    if (res.CODE == '0' && res.DATA != '0') {
                        $scope.isExistCompany = true;
                    } else {
                        $scope.isExistCompany = false;
                    }
                });
            };
            //判断是否存在此手机号
            $scope.isExistTelnum = false;
            //监视是否存在此手机号
            $scope.changeTelnum = function () {
                //根据手机号判断
                registerService.checkTelIsExist().then(function (res) {
                    //如果不为0则提示，并且不能提交。
                    if (res.CODE == '0' && res.DATA != '0') {
                        $scope.isExistTelnum = true;
                    } else {
                        $scope.isExistTelnum = false;
                    }
                });
            };
            //默认显示第一步
            $scope.oneShow = true;
            //默认隐藏第二步
            $scope.twoShow = false;
            //显示更多，默认隐藏
            $scope.moreInfoShow = false;
            //默认隐藏第三步
            $scope.threeShow = false;
            //默认隐藏第四步
            $scope.fourShow = false;
            //是否点击获取验证码 true为没有点击，false为点击后，默认倒计时60秒
            $scope.beforeGetTelSms = true;
            //倒计时60秒后可以再次点击获取验证码
            $scope.timeDoGetTelSms = 60;
            //获取随机数
            var rondom = commonService.Random(6);
            $scope.AUTHCODE = '';
            //定义计数器
            var timer;
            //点击获取验证码事件,并激活计数
            $scope.getTelsms = function () {
                registerService.getTelsms(rondom).then(function (res) {//短信验证码
                    if (res.CODE == '0') {
                        $scope.beforeGetTelSms = false;//点击后改变
                        $scope.timeDoGetTelSms = 60;//修改计数
                        if (timer) {
                            $interval.cancel(timer);//如果存在则销毁
                        }
                        timer = $interval(function () {//定时器，每执行一次自动减一；
                            if ($scope.timeDoGetTelSms != 0) {
                                $scope.timeDoGetTelSms -= 1;
                            } else {
                                $interval.cancel(timer);
                            }
                        }, 1000);
                        timer.then(function () {

                        });//开始计数
                        $scope.$on("$destroy", function (event) {//当此页面从dom中移除时销毁timer对象。
                            $interval.cancel(timer);
                        });
                    }
                });
            };
            //当计数为0是切换状态，点击按钮激活
            $scope.$watch("timeDoGetTelSms", function (res) {
                if (res == 0) {
                    $scope.beforeGetTelSms = true;
                }
            });
            /**
             * 查看地址信息是否变化，如果变化则把变化的经纬度写入到对象中。
             */
            $scope.$watch("companyInfo.PROVINCE+companyInfo.CITY+companyInfo.COUNTY+companyInfo.TOWN+companyInfo.VILAGE+companyInfo.ADDRESS", function () {
                var companyInfo = $scope.companyInfo;
                locationService.doGet($scope.companyInfo.PROVINCE, $scope.companyInfo.CITY, $scope.companyInfo.COUNTY, $scope.companyInfo.TOWN, $scope.companyInfo.VILAGE, $scope.companyInfo.ADDRESS).then(function (res) {
                    //获取省市县乡镇村地址经纬度，state=1为返回正确，state=0为错误。
                    if (res.state == '1') {
                        if (res.geocodes && res.geocodes[0]) {
                            var location = res.getcodes[0].toString().split(',');
                            if (location && location.length == 2) {
                                $scope.companyInfo.LNG = location[0];//经度
                                $scope.companyInfo.LAT = location[1];//纬度
                            }
                        }
                    }
                });
            });
            //默认是不正确的
            $scope.checkTelSmsRight = false;
            //短息验证码核对，如果短信验证码核对成功则界面按钮不可点
            $scope.telSmsChange = function () {
                if ($scope.AUTHCODE) {
                    //进行校验
                    registerService.checkTelSms($scope.AUTHCODE, rondom).then(function (res) {
                        //正常返回
                        if (res.CODE == '0' && res.DATA == '1') {
                            //点击验证码按钮不可点
                            $scope.checkTelSmsRight = true;
                        } else {
                            //设置不可点击下一步按钮
                            $scope.checkTelSmsRight = false;
                            //显示错误消息
                            $scope.error = true;
                            $scope.msg = "验证码不正确";
                        }
                    });
                }
            };
            //获取经营种类
            $scope.PROSECUTIONS = [];
            //获取经营分类
            registerService.getCatalogFromProsecution().then(function (res) {
                if (res.CODE == '0') {
                    $scope.PROSECUTIONS = res.DATA;
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
            //是否有官网
            var vm = $scope.vm = {};
            vm.values = [
                {name: '是'}, {name: '否'}
            ];
            vm.companyNet = vm.values[1];
            //获取网站模板种类
            $scope.SITETYPES = [];
            //选中的模板分类对象
            $scope.selectSitetype = [];
            //获取网站模板分类
            registerService.getCatalogFromSiteType().then(function (res) {
                if (res.CODE == '0') {
                    $scope.SITETYPES = res.DATA;
                    if ($scope.SITETYPES && $scope.SITETYPES.length > 0) {
                        $scope.selectSitetype = $scope.SITETYPES[0];//默认选中第一个
                    }
                }
            });
            //默认不显示
            $scope.moreInfoShow = false;
            //默认显示
            $scope.moreInfo = "显示";
            //显示或隐藏更多内容
            $scope.showMoreInfo = function () {
                if ($scope.moreInfoShow) {
                    //点击隐藏（false）
                    $scope.moreInfoShow = false;
                    //隐藏的时候需要显示
                    $scope.moreInfo = '显示';
                } else {
                    //或点击显示（true)
                    $scope.moreInfoShow = true;
                    //显示的时候需要收起
                    $scope.moreInfo = '收起';
                }
            };
            //是否提交成功
            $scope.isCompanyInfoSubmit = false;
            //保存农场及用户默认信息。
            $scope.saveCompay = function () {
                $scope.twoShow = false;//第二页隐藏
                $scope.threeShow = true;//第三页显示
                registerService.saveCompanyUser($scope.PROSECUTIONS, $scope.selectSitetype).then(function (res) {
                    if (res.CODE == '0') {
                        //更新农场信息
                        registerService.companyInfo = res.DATA[0];
                        $scope.isCompanyInfoSubmit = true;
                        //保存用户信息
                        registerService.saveUserInfo().then(function (data) {
                            if (data.CODE == '0') {
                                console.log(data);
                            }
                        });
                    } else {
                        $scope.isCompanyInfoSubmit = false;
                    }
                });
            };
            //农场头像
            $scope.headPic = {NAME: 'PIC', PICPATH: '', ISSELECTED: false};
            //农场营业执照
            $scope.licensePic = {NAME: 'PIC', PICPATH: '', ISSELECTED: false};
            //农场法人代表身份证
            $scope.cardPic = {NAME: 'PIC', PICPATH: '', ISSELECTED: false};
            //农场法人代码身份证复印件
            $scope.cardBackPic = {NAME: 'PIC', PICPATH: '', ISSELECTED: false};
            //上传头像
            $scope.uploadHeadPic = function (file) {
                upLoadFile(file, 'COMPANYHEAD', '农场头像', $scope.headPic);
            };
            //上传头像
            $scope.uploadLicensePic = function (file) {
                upLoadFile(file, 'LICENSE', '营业执照', $scope.licensePic);
            };
            //上传头像
            $scope.uploadCardic = function (file) {
                upLoadFile(file, 'CARD', '法人代表身份证正面', $scope.cardPic);
            };
            //上传头像
            $scope.uploadCardBackPic = function (file) {
                upLoadFile(file, 'CARD', '法人代表身份证背面', $scope.cardBackPic);
            };

            //认证文件的上传。并最终提交。
            var upLoadFile = function (file, certType, title, pic) {
                if (file) {
                    console.log(file);
                    //var reader = new FileReader();
                    //reader.readDataAsUrl(file);
                    //reader.onload = function (event) {
                    //    var base64 = event.target.result.substring(event.target.result.indexOf(',') + 1, event.target.result.length);
                    //    $scope.val = base64;
                    //};
                    //保存认证信息
                    registerService.saveCert(certType, title).then(function (res) {
                        if (res.CODE == '0' && res.DATA.length) {
                            //上传认证资料
                            registerService.upLoadFile(file, res.DATA[0]).then(
                                function (evr) {
                                    console.log(evr);
                                }, function (res1) {
                                    console.log(res1);
                                    pic.PICPATH = res1.DATA;
                                    pic.ISSELECTED = true;
                                }
                            );
                        }
                    });
                }
            };
//默认为没有全部上传图片
            $scope.isSelectPic = false;
            $scope.$watch('headPic+licensePic+cardPic+cardBackPic', function (v) {
                //当所有图片都已经上传的时候
                if ($scope.headPic.ISSELECTED && $scope.licensePic.ISSELECTED && $scope.cardPic.ISSELECTED && $scope.cardBackPic.ISSELECTED) {
                    $scope.isSelectPic = true;
                }
            });
//z最终提交
            $scope.registerSubmit = function () {

            };
        }
    ])
;