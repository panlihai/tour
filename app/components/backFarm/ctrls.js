/**
 * 注册登录控制器
 */
clesunClound
    //发布播种记录
    .controller("publishsowingCtrl",
    ["$rootScope", "$scope", "cacheService",
        "userService", "commonService", "constantService", "productService", "commonService", "accountService",
        function ($rootScope, $scope, cacheService, userService, commonService, constantService, productService, commonService, accountService) {
            //编辑状态
            $scope.publishEdit = true;
            $scope.editpage = true;//是编辑界面
            //获取产品对象
            $scope.sowing = productService.createSowing();
            //产品默认值设置
            $scope.sowing.ACCOUNTID = $rootScope.USERINFO.ACCOUNTID;
            $scope.sowing.SOURCEID = $rootScope.USERINFO.VCACCOUNT.DATA[0].ID;
            $scope.sowing.CREATEUSER = $rootScope.USERINFO.USERID;
            $scope.sowing.PRODUCTUSER = $rootScope.USERINFO.USERID;
            $scope.sowing.PRODUCTID = $rootScope.USERINFO.ACCOUNTID;
            productService.getBusinesssCatalogList("parent=''").then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA.length > 0) {
                        $scope.parentTypeList = res.DATA;
                    }
                }
            });
            //获取二级分类
            $scope.$watch('sowing.PARENTTYPE', function (val) {
                if (val) {
                    productService.getBusinesssCatalogList("parent='" + $scope.sowing.PARENTTYPE + "'").then(function (res) {
                        if (res.CODE == '0') {
                            if (res.DATA.length > 0) {
                                $scope.itemTypeList = res.DATA;
                                $scope.sowing.ITEMCODE = '';
                                $scope.itemCodeList = [];
                                $scope.sowing.ITEMTYPE = '';
                            }
                        }
                    })
                }
            });
            //获取具体名称
            $scope.$watch('sowing.ITEMTYPE', function (val) {
                if (val) {
                    productService.getBusinesssCatalogList("parent='" + $scope.sowing.ITEMTYPE + "'").then(function (res) {
                        if (res.CODE == '0') {
                            if (res.DATA.length > 0) {
                                $scope.itemCodeList = res.DATA;
                                $scope.sowing.ITEMCODE = '';
                            }
                        }
                    })
                }
            });
            $scope.$watch('sowing.ITEMCODE+sowing.PARENTTYPE+sowing.ITEMTYPE', function (val) {
                if (val) {
                    if ($scope.sowing.ITEMCODE) {
                        $scope.sowing.PRODUCTID = $rootScope.USERINFO.ACCOUNTID +
                        $scope.sowing.ITEMCODE + commonService.getTimestamp();
                        return;
                    }
                    if ($scope.sowing.ITEMTYPE) {
                        $scope.sowing.PRODUCTID = $rootScope.USERINFO.ACCOUNTID +
                        $scope.sowing.ITEMTYPE + commonService.getTimestamp();
                        return;
                    }
                    if ($scope.sowing.PARENTTYPE) {
                        $scope.sowing.PRODUCTID = $rootScope.USERINFO.ACCOUNTID +
                        $scope.sowing.PARENTTYPE + commonService.getTimestamp();
                        return;
                    }

                }
            });
            //获取位置信息
            accountService.getLocList($scope.sowing.ACCOUNTID).then(function (res) {
                if (res.CODE == '0') {
                    $scope.locList = res.DATA;
                }
            });
            $scope.$watch('sowing.LOCID', function (res) {
                if (res) {
                    for (var i = 0; i < $scope.locList.length; i++) {
                        if ($scope.locList[i].LOCID == $scope.sowing.LOCID) {
                            $scope.sowing.LOCNAME = $scope.locList[i].LOCNAME;
                            break;
                        }
                    }
                }
            });
            $scope.$watch('sowing.ITEMCODE', function (res) {
                if (res) {
                    for (var i = 0; i < $scope.itemCodeList.length; i++) {
                        if ($scope.itemCodeList[i].CATALOGID == $scope.sowing.ITEMCODE) {
                            $scope.sowing.ITEMDESC = $scope.itemCodeList[i].CATALOGNAME;
                            break;
                        }
                    }
                }
            });
            //发布
            $scope.publishsowing = function () {
                productService.saveSowing($scope.sowing).then(function (res) {
                    if (res.CODE == '0') {
                        $scope.listsowing();
                    }
                });
            };

            //跳转至列表
            $scope.listsowing = function () {
                $rootScope.$state.go("index.listsowing");
            };
        }
    ])
    //发布播种记录的农事活动
    .controller("publishproduceCtrl",
    ["$rootScope", "$scope", "cacheService",
        "userService", "commonService", "constantService", "productService", "produceService", "commonService", "accountService",
        function ($rootScope, $scope, cacheService, userService, commonService, constantService, productService, produceService, commonService, accountService) {
            //编辑状态
            $scope.publishEdit = true;
            $scope.editpage = true;//是编辑界面
            $scope.produce = produceService.createProduce();
            //获取农事内容
            $scope.contentList = produceService.getProductContentList();
            //获取产品对象
            productService.getProductByProductId($rootScope.$stateParams.productid).then(function (res) {
                if (res.CODE == 0) {
                    if (res.DATA) {
                        $scope.sowing = res.DATA;
                        $scope.produce.PRODUCTID = $scope.sowing.PRODUCTID;
                        $scope.produce.SOURCEID = $scope.sowing.ID;
                        $scope.produce.LOCID = $scope.sowing.LOCID;
                        $scope.produce.ACCOUNTID = $scope.sowing.ACCOUNTID;
                    }
                }
            });
            $scope.isOther = true;
            produceService.getProduceIntypeCatalogList("parent=''").then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA.length > 0) {
                        $scope.inpTypeList = res.DATA;
                    }
                }
            });

            //获取二级分类
            $scope.$watch('produce.INPTYPE', function (val) {
                if (val) {
                    if (val != '03') {
                        $scope.isOther = false;
                    } else {
                        $scope.isOther = true;
                    }
                    produceService.getProduceIntypeCatalogList("parent='" + $scope.produce.INPTYPE + "'").then(function (res) {
                        if (res.CODE == '0') {
                            if (res.DATA.length > 0) {
                                $scope.incTypeList = res.DATA;
                            }
                        }
                    })
                }
            });

            //获取具体名称
            $scope.$watch('produce.INCTYPE', function (val) {
                if (val) {
                    produceService.getProduceIntypeCatalogList("parent='" + $scope.produce.INCTYPE + "'").then(function (res) {
                        if (res.CODE == '0') {
                            if (res.DATA.length > 0) {
                                $scope.inTypeList = res.DATA;
                            }
                        }
                    })
                }
            });
            //设置名称
            $scope.$watch('produce.INTYPE', function (val) {
                if (val) {
                    for (var i = 0; i < $scope.inTypeList; i++) {
                        if (val == $scope.inTypeList[i].CATALOGID) {
                            $scope.produce.INTYPENAME = $scope.inTypeList[i].CATALOGNAME;
                            break;
                        }
                    }
                }
            });
            //获取农事内容
            $scope.instoreTypeList = produceService.getInstoreTypeList();
            //获取生长周期
            $scope.growthCycleList = produceService.getGrowthCycleList();
            //如果是采收期需要填写产品等级
            $scope.productLevelList = productService.getProductLevelList();
            //计量单位
            $scope.inUnitList = produceService.getInUtilList();
            //如果是采收期才出现的
            $scope.isProduct = false;
            //监控是否是采收期
            $scope.$watch('produce.GROWTHCYCLE', function (newValue) {
                if (newValue && newValue == '收获期') {
                    $scope.isProduct = true;
                } else {
                    $scope.isProduct = false;
                }
            });
            $scope.productWorkTimeList = produceService.getProduceWorktimeList();
            //获取位置信息
            accountService.getLocList().then(function (res) {
                if (res.CODE == '0') {
                    $scope.locList = res.DATA;
                }
            });
            $scope.$watch('produce.ITEMCODE', function (res) {
                if (res) {
                    for (var i = 0; i < $scope.itemCodeList.length; i++) {
                        if ($scope.itemCodeList[i].ITEMCODE == $scope.product.ITEMCODE) {
                            $scope.product.ITEMDESC = $scope.itemCodeList[i].CATALOGNAME;
                            break;
                        }
                    }
                }
            });
            //上传
            $scope.uploadFile = function (file) {
                produceService.upLoadFile(file, '农事活动').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.produce.PICPATHID = res.data.RESIDS;
                        $scope.produce.PICPATH = res.data.DATA;
                    }
                });
            };
            //出厂日期
            $scope.$watch('INTRANSLATEDATE', function (val) {
                if (val) {
                    if (val instanceof Date) {
                        var timestamp = Date.parse(val);
                        $scope.produce.INTRANSLATEDATE = timestamp / 1000;
                    }
                }
            });
            //发布
            $scope.publishproduce = function () {
                productService.updateProduct($scope.sowing).then(function (res) {
                    if (res.CODE == '0') {

                    }
                });
                produceService.saveProduce($scope.produce).then(function (res) {
                    if (res.CODE == '0') {
                        $scope.listsowing();
                    }
                });
            };
            //跳转至列表
            $scope.listsowing = function () {
                $rootScope.$state.go("index.listsowing");
            };
        }
    ])
    //播种记录明细
    .controller("sowingdetailCtrl",
    ["$rootScope", "$scope", "cacheService",
        "userService", "commonService", "constantService", "productService", "produceService", "commonService", "accountService",
        function ($rootScope, $scope, cacheService, userService, commonService, constantService, productService, produceService, commonService, accountService) {
            //获取产品对象
            productService.getProductByProductId($rootScope.$stateParams.productid).then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA) {
                        $scope.sowing = res.DATA;
                    }
                }
            });
            produceService.getProduceList($rootScope.USERINFO.ACCOUNTID, $rootScope.$stateParams.productid, 0).then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA) {
                        $scope.produceList = res.DATA;
                    }
                }
            });
            //跳转至列表
            $scope.listsowing = function () {
                $rootScope.$state.go("index.listsowing");
            };
        }
    ])
    //农事播种记录列表
    .controller("listsowingCtrl",
    ["$rootScope", "$scope", "$state", "cacheService",
        "userService", "commonService", "constantService", "productService",
        function ($rootScope, $scope, $state, cacheService, userService, commonService, constantService, productService) {
            $scope.publishsowing = function () {
                $state.go("index.publishsowing");
            };
            $scope.publishproduce = function () {
                $state.go("index.publishproduce");
            };
            var pageNum = 0;
            productService.getSowingList(pageNum).then(function (res) {
                if (res.CODE == '0') {
                    $scope.sowingList = res.DATA;
                }
            });
        }])
    //产品明细
    .controller("productdetailCtrl",
    ["$rootScope", "$scope", "cacheService",
        "userService", "commonService", "constantService", "productService",
        "produceService", "bannerService", "carticleService",
        function ($rootScope, $scope, cacheService, userService, commonService, constantService, productService,
                  produceService, bannerService, carticleService) {
            //获取产品对象
            productService.getProductByProductId($rootScope.$stateParams.productid).then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA) {
                        $scope.product = res.DATA;
                        //获取产品对应的轮播图
                        bannerService.getList($scope.product.ID, "CPRODUCT").then(function (bannerRes) {
                            if (bannerRes.CODE == '0') {
                                $scope.bannerList = bannerRes.DATA;
                            }
                        });
                        //获取产品对应的图文详情
                        carticleService.getList($scope.product.ID, "CPRODUCT").then(function (articleRes) {
                            if (articleRes.CODE == '0') {
                                $scope.articleList = articleRes.DATA;
                            }
                        });
                    }
                }
            });
            /**
             * 农事活动
             */
            /*produceService.getProduceList($rootScope.USERINFO.ACCOUNTID, $rootScope.$stateParams.productid, 0).then(function (res) {
             if (res.CODE == '0') {
             if (res.DATA) {
             $scope.produceList = res.DATA;
             }
             }
             });*/
            //跳转至列表
            $scope.listproduct = function () {
                $rootScope.$state.go("index.listproduct");
            };
        }
    ])
    //发布批次产品
    .controller("publishproductCtrl",
    ["$rootScope", "$scope", "cacheService",
        "userService", "commonService", "constantService", "productService", "bannerService", "carticleService", "accountService",
        function ($rootScope, $scope, cacheService, userService, commonService, constantService, productService, bannerService,
                  carticleService, accountService) {
            //编辑状态
            $scope.publishEdit = true;
            $scope.editpage = true;//是编辑界面
            //获取产品对象
            productService.getProductByProductId($rootScope.$stateParams.productid).then(function (res) {
                if (res.CODE == '0') {
                    $scope.product = res.DATA;
                    $scope.addFile();
                } else {
                    console.error(res.MSG);
                }
            });
            //产品默认值设置
            //定义计数器
            var timer;
            //点击获取验证码事件,并激活计数
            var setMessage = function (message) {
                $scope.times = 2;//修改计数
                $scope.message = message;
                if (timer) {
                    $interval.cancel(timer);//如果存在则销毁
                }
                timer = $interval(function () {//定时器，每执行一次自动减一；
                    if ($scope.times != 0) {
                        $scope.times -= 1;
                    } else {
                        $interval.cancel(timer);
                    }
                }, 1000);
                timer.then(function () {
                });//开始计数
                $scope.$on("$destroy", function (event) {//当此页面从dom中移除时销毁timer对象。
                    $interval.cancel(timer);
                });
            };


            /**
             * 创建banner图.
             * @param picPathId
             * @param tttle
             * @param order
             */
            var createBanner = function (picPathId, title, order) {
                var banner = bannerService.createObj();
                banner.SOURCEID = $scope.product.ID;
                banner.SOURCEAID = 'CPRODUCT';
                banner.IMGPATHID = picPathId;
                banner.TITLE = title;
                banner.ORDER = order;
                bannerService.saveObj(banner);
            };
            //
            $scope.uploadFile0 = function (file) {
                productService.upLoadFile(file, '产品图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.product.PICPATHID0 = res.data.RESIDS;
                        $scope.product.PICPATH0 = res.data.DATA;
                        createBanner($scope.product.PICPATHID0, '产品图片');
                    }
                });
            };
            $scope.uploadFile1 = function (file) {
                productService.upLoadFile(file, '产品图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.product.PICPATHID1 = res.data.RESIDS;
                        $scope.product.PICPATH1 = res.data.DATA;
                        createBanner($scope.product.PICPATHID1, '产品图片');
                    }
                });
            };
            $scope.uploadFile2 = function (file) {
                productService.upLoadFile(file, '产品图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.product.PICPATHID2 = res.data.RESIDS;
                        $scope.product.PICPATH2 = res.data.DATA;
                        createBanner($scope.product.PICPATHID2, '产品图片');
                    }
                });
            };
            $scope.uploadFile3 = function (file) {
                productService.upLoadFile(file, '产品图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.product.PICPATHID3 = res.data.RESIDS;
                        $scope.product.PICPATH3 = res.data.DATA;
                        createBanner($scope.product.PICPATHID3, '产品图片');
                    }
                });
            };
            /**
             * 创建banner图.
             * @param picPathId
             * @param tttle
             * @param order
             */
            var createArticle = function (picPathId, title, content) {
                var article = carticleService.createObj();
                article.SOURCEID = $scope.product.ID;
                article.SOURCEAID = 'CPRODUCT';
                article.PICPATHID = picPathId;
                article.THUMBNAILID = picPathId;
                article.TITLE = title;
                article.CONTENT = commonService.enCode64(content);//文章内容
                article.PUBLISHUSER = $rootScope.USERINFO.REALNAME;//发布人
                article.AUTHOR = $rootScope.USERINFO.REALNAME;//作者
                carticleService.saveObj(article);
            };
            $scope.fileList = [];
            $scope.addFile = function () {
                $scope.fileList.push({
                    REMARK: '',
                    SOURCEAID: 'CPRODUCT',
                    SOURCEID: $scope.product.ID,
                    RESTYPE: 'PIC',
                    RESTITLE: '图片标题',
                    SORT: 0,
                    FILEID: commonService.getTimestamp()
                });
            };

            $scope.uploadFileAll = function (file, fileid) {
                for (var i = 0; i < $scope.fileList.length; i++) {
                    if ($scope.fileList[i].FILEID == fileid) {
                        productService.upLoadFile(file, $scope.fileList[i].RESTITLE, "CPRODUCT", $scope.product.ID).then(function (res) {
                                if (res.data.CODE == '0') {
                                    $scope.fileList[i].PICPATHID = res.data.RESIDS;
                                    $scope.fileList[i].PICPATH = res.data.DATA;
                                    createArticle($scope.fileList[i].PICPATHID, '产品详情图片', $scope.fileList[i].REMARK);
                                }
                            }
                        );
                        break;
                    }
                }
            };

            //跳转至列表
            $scope.listproduct = function () {
                $rootScope.$state.go("index.listproduct");
            };
            //发布
            $scope.publishproduct = function () {
                if (!$scope.product.PICPATHID0) {
                    //$scope.$parent.setMessage('图片不能为空,请上传图片吧.');
                    alert('图片不能为空,请上传图片吧');
                    return;
                }
                $scope.product.ENABLE = 'Y';
                $scope.product.PICPATHID = $scope.product.PICPATHID0;
                productService.updateProduct($scope.product).then(function (res) {
                    if (res.CODE == '0') {
                        $scope.listproduct();
                    }
                });
            };
        }
    ])
    //批次产品列表
    .controller("listproductCtrl",
    ["$rootScope", "$scope", "$state", "cacheService",
        "userService", "commonService", "constantService",
        "produceService", "productService",
        function ($rootScope, $scope, $state, cacheService, userService, commonService, constantService,
                  produceService, productService) {
            productService.getProductList(0).then(function (res) {
                if (res.CODE == '0' && res.DATA) {
                    $scope.productList = res.DATA;
                } else {
                    console.error(res.MSG);
                }
            });
            $scope.publishproduct = function () {
                $state.go("index.publishproduct");
            };
            var pageNum = 0;
            productService.getProductList(pageNum).then(function (res) {
                if (res.CODE == '0') {
                    $scope.productList = res.DATA;
                }
            });

            $scope.publishproduct = function (productid) {
                for (var i = 0; i < $scope.productList.length; i++) {
                    if (productid == $scope.productList[i].PRODUCTID) {
                        $scope.productList[i].STATUS = 'Y';
                        productService.updateProduct($scope.productList[i]);
                        break;
                    }
                }
            }
        }])
    //发布活动报单
    .controller("publishcquotationbillCtrl",
    ["$rootScope", "$scope", "$state", "cacheService",
        "userService", "commonService", "constantService",
        "cquotationbillService", "accountService", "productService", "bannerService", "carticleService",
        function ($rootScope, $scope, $state, cacheService, userService,
                  commonService, constantService, cquotationbillService,
                  accountService, productService, bannerService, carticleService) {
            //编辑状态
            $scope.publishEdit = true;
            $scope.editpage = true;//是编辑界面
            //获取活动对象
            $scope.cbill = cquotationbillService.createObj();
            var account = $rootScope.USERINFO.VCACCOUNT.DATA[0];
            //产品默认值设置
            $scope.cbill.ACCOUNTID = $rootScope.USERINFO.ACCOUNTID;
            $scope.cbill.REALNAME = account.ACCOUNTNAME;
            $scope.cbill.USERID = $rootScope.USERINFO.USERID;
            $scope.cbill.TELEPHONE = account.PHONENUM;
            $scope.cbill.CONTACT = account.CONTACT;
            $scope.cbill.PRODUCING = account.PROVINCE + account.CITY + account.COUNTY + account.TOWN + account.ADDRESS;
            $scope.cbill.FROMPLACE = $scope.cbill.PRODUCING;
            $scope.LEASESTARTTIME = new Date();
            $scope.FROMDATESTART = new Date();
            /* cquotationbillService.saveObj($scope.cbill).then(function (res) {
             if (res.CODE == '0') {
             $scope.cbill = res.DATA[0];
             }
             });*/
            cquotationbillService.getBussTypeCatalogList("parent=''").then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA.length > 0) {
                        $scope.bussTypeList = res.DATA;
                    }
                }
            });
            $scope.$watch('cbill.BUSSTYPE', function (val) {
                if (val) {
                    if (val == '家庭农场') {//为家庭农场 需要出现农场地块租赁。
                        $scope.ishomefarm = true;
                    }
                }
            });
            //获取位置信息
            accountService.getLocList($scope.cbill.ACCOUNTID).then(function (res) {
                if (res.CODE == '0') {
                    $scope.locList = res.DATA;
                }
            });
            //监控LOCID 设置农场地块名称
            $scope.$watch('cbill.LOCID', function (locid) {
                if (locid) {
                    for (var i = 0; i < $scope.locList.length; i++) {
                        if ($scope.locList[i].LOCID == locid) {
                            $scope.cbill.LOCNAME = $scope.locList[i].LOCNAME;
                            break;
                        }
                    }
                }
            });
            productService.getBusinesssCatalogList("parent=''").then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA.length > 0) {
                        $scope.parentTypeList = res.DATA;
                    }
                }
            });
            //获取二级分类
            $scope.$watch('cbill.PARENTCATALOGID', function (val) {
                if (val) {
                    productService.getBusinesssCatalogList("parent='" + $scope.cbill.PARENTCATALOGID + "'").then(function (res) {
                        if (res.CODE == '0') {
                            if (res.DATA.length > 0) {
                                $scope.itemTypeList = res.DATA;
                            }
                        }
                    })
                }
            });
            //获取具体名称
            $scope.$watch('cbill.CATALOGID', function (val) {
                if (val) {
                    for (var i = 0; i < $scope.itemTypeList.length; i++) {
                        if ($scope.itemTypeList[i].CATALOGID = $scope.cbill.CATALOGID) {
                            $scope.cbill.CATALOGNAME = $scope.itemTypeList[i].CATALOGNAME;
                            break;
                        }
                    }
                    productService.getBusinesssCatalogList("parent='" + $scope.cbill.CATALOGID + "'").then(function (res) {
                        if (res.CODE == '0') {
                            if (res.DATA.length > 0) {
                                $scope.itemCodeList = res.DATA;
                            }
                        }
                    });
                }
            });
            $scope.$watch('cbill.ITEMCODE', function (val) {
                if (val) {
                    for (var i = 0; i < $scope.itemCodeList.length; i++) {
                        if ($scope.itemCodeList[i].CATALOGID = $scope.cbill.CATALOGID) {
                            $scope.cbill.GOODSNAME = $scope.itemCodeList[i].CATALOGNAME;
                            break;
                        }
                    }
                }
            });
            //需要后续保存的内容
            var bannerList = [];
            /**
             * 创建banner图.
             * @param picPathId
             * @param tttle
             * @param order
             */
            var createBanner = function (picPathId, title, order) {
                var banner = bannerService.createObj();
                banner.SOURCEID = '';
                banner.SOURCEAID = 'CQUOTATIONBILL';
                banner.IMGPATHID = picPathId;
                banner.TITLE = title;
                banner.ORDER = order;
                bannerService.saveObj(banner).then(function (res) {
                    if (res.CODE == '0') {
                        bannerList.push(res.DATA[0]);
                        console.log(res);
                    } else {
                        console.error(res);
                    }
                });
            };
            //
            $scope.uploadFile0 = function (file) {
                cquotationbillService.upLoadFile(file, '活动轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.cbill.PICPATHID0 = res.data.RESIDS;
                        $scope.cbill.PICPATH0 = res.data.DATA;
                        createBanner($scope.cbill.PICPATHID0, '活动轮播图片', 0);
                    }
                });
            };
            $scope.uploadFile1 = function (file) {
                cquotationbillService.upLoadFile(file, '活动轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.cbill.PICPATHID1 = res.data.RESIDS;
                        $scope.cbill.PICPATH1 = res.data.DATA;
                        createBanner($scope.cbill.PICPATHID1, '活动轮播图片', 1);
                    }
                });
            };
            $scope.uploadFile2 = function (file) {
                cquotationbillService.upLoadFile(file, '活动轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.cbill.PICPATHID2 = res.data.RESIDS;
                        $scope.cbill.PICPATH2 = res.data.DATA;
                        createBanner($scope.cbill.PICPATHID2, '活动轮播图片', 2);
                    }
                });
            };
            $scope.uploadFile3 = function (file) {
                cquotationbillService.upLoadFile(file, '活动轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.cbill.PICPATHID3 = res.data.RESIDS;
                        $scope.cbill.PICPATH3 = res.data.DATA;
                        createBanner($scope.cbill.PICPATHID3, '活动轮播图片', 3);
                    }
                });
            };
            //需要后续保存的内容
            var articleList = [];
            /**
             * 创建文章.
             * @param picPathId
             * @param tttle
             * @param order
             */
            var createArticle = function (picPathId, title, content) {
                var article = carticleService.createObj();
                article.SOURCEID = '';
                article.SOURCEAID = 'CQUOTATIONBILL';
                article.PICPATHID = picPathId;
                article.THUMBNAILID = picPathId;
                article.TITLE = title;
                article.CONTENT = commonService.enCode64(content);//文章内容
                article.PUBLISHUSER = $rootScope.USERINFO.REALNAME;//发布人
                article.AUTHOR = $rootScope.USERINFO.REALNAME;//作者
                carticleService.saveObj(article).then(function (res) {
                    if (res.CODE == '0') {
                        console.log(res);
                        articleList.push(res.DATA[0]);
                    } else {
                        console.error(res);
                    }
                });
            };
            $scope.fileList = [];
            $scope.addFile = function () {
                $scope.fileList.push({
                    REMARK: '',
                    SOURCEAID: 'CQUOTATIONBILL',
                    SOURCEID: '',
                    RESTYPE: 'PIC',
                    RESTITLE: '图片标题',
                    SORT: 0,
                    FILEID: commonService.getTimestamp()
                });
            };
            $scope.addFile();
            $scope.uploadFileAll = function (file, fileid) {
                for (var i = 0; i < $scope.fileList.length; i++) {
                    if ($scope.fileList[i].FILEID == fileid) {
                        cquotationbillService.upLoadFile(file, $scope.fileList[i].RESTITLE).then(function (res) {
                                if (res.data.CODE == '0') {
                                    $scope.fileList[i].PICPATHID = res.data.RESIDS;
                                    $scope.fileList[i].PICPATH = res.data.DATA;
                                    createArticle($scope.fileList[i].PICPATHID, '活动详情图片', $scope.fileList[i].REMARK);
                                }
                            }
                        );
                        break;
                    }
                }
            };
            //修改记录并至列表
            $scope.publishcquotationbill = function () {
                $scope.cbill.ENABLE = 'Y';
                $scope.cbill.STATUS = 'Y';
                $scope.cbill.SUPPLYORDEMAND = 'SUPPLY';//默认为供应报单
                if ($scope.LEASESTARTTIME) {
                    if ($scope.LEASESTARTTIME instanceof Date) {
                        var time = Date.parse($scope.LEASESTARTTIME);
                        $scope.cbill.LEASESTARTTIME = time / 1000;
                    }
                }
                if ($scope.LEASEENDTIME) {
                    if ($scope.LEASEENDTIME instanceof Date) {
                        var time = Date.parse($scope.LEASEENDTIME);
                        $scope.cbill.LEASEENDTIME = time / 1000;
                    }
                }
                if ($scope.FROMDATESTOP) {

                    if ($scope.FROMDATESTOP instanceof Date) {
                        var time = Date.parse($scope.FROMDATESTOP);
                        $scope.cbill.FROMDATESTOP = time / 1000;
                    }
                }
                if ($scope.FROMDATESTART) {
                    if ($scope.FROMDATESTART instanceof Date) {
                        var time = Date.parse($scope.FROMDATESTART);
                        $scope.cbill.FROMDATESTART = time / 1000;
                    }
                }
                cquotationbillService.saveObj($scope.cbill).then(function (res) {
                    if (res.CODE == '0') {
                        for (var i = 0; i < bannerList.length; i++) {
                            bannerList[i].SOURCEID = res.DATA[0].ID;
                        }
                        for (var i = 0; i < articleList.length; i++) {
                            articleList[i].SOURCEID = res.DATA[0].ID;
                        }
                        carticleService.updateList(articleList);
                        bannerService.updateList(bannerList);
                        $scope.listcquotationbill();
                    }
                });
            };
            $scope.listcquotationbill = function () {
                $state.go("index.listcquotationbill");
            };
        }])
    .controller("modifycbillCtrl",
    ["$rootScope", "$scope", "$state", "cacheService",
        "userService", "commonService", "constantService",
        "cquotationbillService", "accountService", "productService", "bannerService", "carticleService",
        function ($rootScope, $scope, $state, cacheService, userService,
                  commonService, constantService, cquotationbillService,
                  accountService, productService, bannerService, carticleService) {
            //编辑状态
            $scope.publishEdit = true;
            $scope.editpage = true;//是编辑界面
            //获取活动对象
            cquotationbillService.getCquotationbillByQbillId($rootScope.$stateParams.qbillid, $scope.PAGENUM).then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA) {
                        $scope.cbill = res.DATA;
                        if ($scope.cbill.LEASESTARTTIME && $scope.cbill.LEASESTARTTIME != 0) {
                            $scope.LEASESTARTTIME = new Date($scope.cbill.LEASESTARTTIME * 1000);
                        }
                        if ($scope.cbill.LEASEENDTIME && $scope.cbill.LEASEENDTIME != 0) {
                            $scope.LEASEENDTIME = new Date($scope.cbill.LEASEENDTIME * 1000);
                        }
                        if ($scope.cbill.FROMDATESTART && $scope.cbill.FROMDATESTART != 0) {
                            $scope.FROMDATESTART = new Date($scope.cbill.FROMDATESTART * 1000);
                        }
                        if ($scope.cbill.FROMDATESTOP && $scope.cbill.FROMDATESTOP != 0) {
                            $scope.FROMDATESTOP = new Date($scope.cbill.FROMDATESTOP * 1000);
                        }
                        //获取产品对应的轮播图
                        bannerService.getList($scope.cbill.ID, "CQUOTATIONBILL").then(function (bannerRes) {
                            if (bannerRes.CODE == '0') {
                                $scope.cbillbannerList = bannerRes.DATA;
                                for (var i = 0; i < $scope.cbillbannerList.length; i++) {
                                    var cB = $scope.cbillbannerList[i];
                                    $scope.bannerList.push({
                                        REMARK: cB.REMARK,
                                        SOURCEAID: 'CQUOTATIONBILL',
                                        SOURCEID: cB.SOURCEID,
                                        RESTYPE: 'PIC',
                                        RESTITLE: '图片标题',
                                        SORT: cB.SORT,
                                        FILEID: commonService.getTimestamp() + i
                                    });
                                    $scope.cbill["PICPATHID" + i] = cB.IMAPATHID;
                                    $scope.cbill["PICPATH" + i] = cB.IMAPATH;
                                }
                            }
                        });
                        //获取产品对应的图文详情
                        carticleService.getList($scope.cbill.ID, "CQUOTATIONBILL").then(function (articleRes) {
                            if (articleRes.CODE == '0') {
                                $scope.cbillarticleList = articleRes.DATA;
                                for (var i = 0; i < $scope.cbillarticleList.length; i++) {
                                    var cB = $scope.cbillarticleList[i];
                                    $scope.fileList.push({
                                        REMARK: commonService.deCode64(cB.CONTENT),
                                        SOURCEAID: 'CQUOTATIONBILL',
                                        SOURCEID: $scope.cbill.ID,
                                        RESTYPE: 'PIC',
                                        RESTITLE: '图片标题',
                                        SORT: 0,
                                        FILEID: commonService.getTimestamp() + i,
                                        ID: cB.ID
                                    });
                                }
                            }
                        });
                        getLocList();
                    }
                }
            });

            var account = $rootScope.USERINFO.VCACCOUNT.DATA[0];
            //产品默认值设置
            cquotationbillService.getBussTypeCatalogList("parent=''").then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA.length > 0) {
                        $scope.bussTypeList = res.DATA;
                    }
                }
            });
            $scope.$watch('cbill.BUSSTYPE', function (val) {
                if (val) {
                    if (val == '家庭农场') {//为家庭农场 需要出现农场地块租赁。
                        $scope.ishomefarm = true;
                    }
                }
            });
            var getLocList = function () {
                //获取位置信息
                accountService.getLocList($scope.cbill.ACCOUNTID).then(function (res) {
                    if (res.CODE == '0') {
                        $scope.locList = res.DATA;
                    }
                });
            };
            //监控LOCID 设置农场地块名称
            $scope.$watch('cbill.LOCID', function (locid) {
                if (locid) {
                    for (var i = 0; i < $scope.locList.length; i++) {
                        if ($scope.locList[i].LOCID == locid) {
                            $scope.cbill.LOCNAME = $scope.locList[i].LOCNAME;
                            break;
                        }
                    }
                }
            });
            productService.getBusinesssCatalogList("parent=''").then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA.length > 0) {
                        $scope.parentTypeList = res.DATA;
                    }
                }
            });
            //获取二级分类
            $scope.$watch('cbill.PARENTCATALOGID', function (val) {
                if (val) {
                    productService.getBusinesssCatalogList("parent='" + $scope.cbill.PARENTCATALOGID + "'").then(function (res) {
                        if (res.CODE == '0') {
                            if (res.DATA.length > 0) {
                                $scope.itemTypeList = res.DATA;
                            }
                        }
                    })
                }
            });
            //获取具体名称
            $scope.$watch('cbill.CATALOGID', function (val) {
                if (val) {
                    for (var i = 0; i < $scope.itemTypeList.length; i++) {
                        if ($scope.itemTypeList[i].CATALOGID = $scope.cbill.CATALOGID) {
                            $scope.cbill.CATALOGNAME = $scope.itemTypeList[i].CATALOGNAME;
                            break;
                        }
                    }
                    productService.getBusinesssCatalogList("parent='" + $scope.cbill.CATALOGID + "'").then(function (res) {
                        if (res.CODE == '0') {
                            if (res.DATA.length > 0) {
                                $scope.itemCodeList = res.DATA;
                            }
                        }
                    });
                }
            });
            $scope.$watch('cbill.ITEMCODE', function (val) {
                if (val) {
                    for (var i = 0; i < $scope.itemCodeList.length; i++) {
                        if ($scope.itemCodeList[i].CATALOGID = $scope.cbill.CATALOGID) {
                            $scope.cbill.GOODSNAME = $scope.itemCodeList[i].CATALOGNAME;
                            break;
                        }
                    }
                }
            });
            /**
             * 创建banner图.
             * @param picPathId
             * @param tttle
             * @param order
             */
            var createBanner = function (picPathId, title, order) {
                var banner = bannerService.createObj();
                banner.SOURCEID = $scope.cbill.ID;
                banner.SOURCEAID = 'CQUOTATIONBILL';
                banner.IMGPATHID = picPathId;
                banner.TITLE = title;
                banner.ORDER = order;
                bannerService.saveObj(banner).then(function (res) {
                    if (res.CODE == '0') {
                        console.log(res);
                    } else {
                        console.error(res);
                    }
                });
            };
            $scope.bannerList = [];
            //
            $scope.uploadFile0 = function (file) {
                cquotationbillService.upLoadFile(file, '活动轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.cbill.PICPATHID0 = res.data.RESIDS;
                        $scope.cbill.PICPATH0 = res.data.DATA;
                        createBanner($scope.cbill.PICPATHID0, '活动轮播图片', 0);
                    }
                });
            };
            $scope.uploadFile1 = function (file) {
                cquotationbillService.upLoadFile(file, '活动轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.cbill.PICPATHID1 = res.data.RESIDS;
                        $scope.cbill.PICPATH1 = res.data.DATA;
                        createBanner($scope.cbill.PICPATHID1, '活动轮播图片', 1);
                    }
                });
            };
            $scope.uploadFile2 = function (file) {
                cquotationbillService.upLoadFile(file, '活动轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.cbill.PICPATHID2 = res.data.RESIDS;
                        $scope.cbill.PICPATH2 = res.data.DATA;
                        createBanner($scope.cbill.PICPATHID2, '活动轮播图片', 2);
                    }
                });
            };
            $scope.uploadFile3 = function (file) {
                cquotationbillService.upLoadFile(file, '活动轮播图片').then(function (res) {
                    if (res.data.CODE == '0') {
                        $scope.cbill.PICPATHID3 = res.data.RESIDS;
                        $scope.cbill.PICPATH3 = res.data.DATA;
                        createBanner($scope.cbill.PICPATHID3, '活动轮播图片', 3);
                    }
                });
            };
            //需要后续保存的内容
            /**
             * 创建文章.
             * @param picPathId
             * @param tttle
             * @param order
             */
            var createArticle = function (picPathId, title, content) {
                var article = carticleService.createObj();
                article.SOURCEID = $scope.cbill.ID;
                article.SOURCEAID = 'CQUOTATIONBILL';
                article.PICPATHID = picPathId;
                article.THUMBNAILID = picPathId;
                article.TITLE = title;
                article.CONTENT = commonService.enCode64(content);//文章内容
                article.PUBLISHUSER = $rootScope.USERINFO.REALNAME;//发布人
                article.AUTHOR = $rootScope.USERINFO.REALNAME;//作者
                carticleService.saveObj(article).then(function (res) {
                    if (res.CODE == '0') {
                        console.log(res);
                    } else {
                        console.error(res);
                    }
                });
            };
            $scope.fileList = [];
            $scope.addFile = function () {
                $scope.fileList.push({
                    REMARK: '',
                    SOURCEAID: 'CQUOTATIONBILL',
                    SOURCEID: '',
                    RESTYPE: 'PIC',
                    RESTITLE: '图片标题',
                    SORT: 0,
                    FILEID: commonService.getTimestamp()
                });
            };
            $scope.uploadFileAll = function (file, fileid) {
                for (var i = 0; i < $scope.fileList.length; i++) {
                    if ($scope.fileList[i].FILEID == fileid) {
                        cquotationbillService.upLoadFile(file, $scope.fileList[i].RESTITLE).then(function (res) {
                                if (res.data.CODE == '0') {
                                    $scope.fileList[i].PICPATHID = res.data.RESIDS;
                                    $scope.fileList[i].PICPATH = res.data.DATA;
                                    if ($scope.fileList[i].ID) {
                                        carticleService.updateObj($scope.fileList[i]).then(function (result) {
                                        });
                                    } else {
                                        createArticle($scope.fileList[i].PICPATHID, '活动详情图片', $scope.fileList[i].REMARK);
                                    }
                                }
                            }
                        );
                        break;
                    }
                }
            };
            //修改记录并至列表
            $scope.publishcquotationbill = function () {
                $scope.cbill.ENABLE = 'Y';
                $scope.cbill.STATUS = 'Y';
                $scope.cbill.SUPPLYORDEMAND = 'SUPPLY';//默认为供应报单
                if ($scope.LEASESTARTTIME) {
                    if ($scope.LEASESTARTTIME instanceof Date) {
                        var time = Date.parse($scope.LEASESTARTTIME);
                        $scope.cbill.LEASESTARTTIME = time / 1000;
                    }
                }
                if ($scope.LEASEENDTIME) {
                    if ($scope.LEASEENDTIME instanceof Date) {
                        var time = Date.parse($scope.LEASEENDTIME);
                        $scope.cbill.LEASEENDTIME = time / 1000;
                    }
                }
                if ($scope.FROMDATESTOP) {
                    if ($scope.FROMDATESTOP instanceof Date) {
                        var time = Date.parse($scope.FROMDATESTOP);
                        $scope.cbill.FROMDATESTOP = time / 1000;
                    }
                }
                if ($scope.FROMDATESTART) {
                    if ($scope.FROMDATESTART instanceof Date) {
                        var time = Date.parse($scope.FROMDATESTART);
                        $scope.cbill.FROMDATESTART = time / 1000;
                    }
                }
                cquotationbillService.updateObj($scope.cbill).then(function (res) {
                    if (res.CODE == '0') {
                        $scope.listcquotationbill();
                    }
                });
            };
            $scope.listcquotationbill = function () {
                $state.go("index.listcquotationbill");
            };
        }])
    //活动报单列表
    .controller("listcquotationbillCtrl",
    ["$rootScope", "$scope", "$state", "cacheService",
        "userService", "commonService", "constantService", "cquotationbillService",
        function ($rootScope, $scope, $state, cacheService, userService, commonService, constantService, cquotationbillService) {
            cquotationbillService.getList().then(function (res) {
                if (res.CODE == '0') {
                    $scope.cbillList = res.DATA;
                }
            });
            $scope.publishactivity = function () {
                $state.go("index.publishcquotationbill");
            }
        }])
    //活动明细
    .controller("cbilldetailCtrl",
    ["$rootScope", "$scope", "cacheService",
        "userService", "commonService", "constantService", "cquotationbillService", "bannerService", "carticleService",
        function ($rootScope, $scope, cacheService, userService, commonService, constantService, cquotationbillService, bannerService, carticleService) {
            //编辑状态
            $scope.publishEdit = false;
            $scope.editpage = true;//是编辑界面
            $scope.PAGENUM = 0;
            //获取活动对象
            cquotationbillService.getCquotationbillByQbillId($rootScope.$stateParams.qbillid, $scope.PAGENUM).then(function (res) {
                if (res.CODE == '0') {
                    if (res.DATA) {
                        $scope.cbill = res.DATA;
                        //获取产品对应的轮播图
                        bannerService.getList($scope.cbill.ID, "CQUOTATIONBILL").then(function (bannerRes) {
                            if (bannerRes.CODE == '0') {
                                $scope.bannerList = bannerRes.DATA;
                            }
                        });
                        //获取产品对应的图文详情
                        carticleService.getList($scope.cbill.ID, "CQUOTATIONBILL").then(function (articleRes) {
                            if (articleRes.CODE == '0') {
                                $scope.articleList = articleRes.DATA;
                            }
                        });
                    }
                }
            });
            //跳转至列表
            $scope.listcquotationbill = function () {
                $rootScope.$state.go("index.listcquotationbill");
            };
        }
    ])

;