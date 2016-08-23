/**
 * 注册服务类
 */
clesunClound.service("registerService", ["$rootScope", "userService", "actService", "commonService","constantService",
    function ($rootScope, userService, actService, commonService,constantService) {

        this.companyInfo = { // 用户界面绑定数据 农场简介
            ACCOUNTID: '',//交易商编号 //ID:'',//主键ID
            ACCOUNTNAME: '',//交易商名称
            ACCOUNTTYPE: 'COMPANY',//机构类型:政府机构,企业或农场(COMPANY),个人
            COMPANY: '',//公司名称
            SIMPLECOMPANY: '',//公司简称
            SUMMARY: '',//公司简介
            CORPORATION: '',//企业法人
            JOINTIME: commonService.getTimestamp(),//入市时间
            USERNAME: '',//账户名称
            PWD: '',//密码
            EMAIL: '',//邮箱
            SIGNINDATE: '',//签约时间
            SIGNOUTDATETIME: '',//解约时间
            CONTRACTID: '',//签约合同号
            ENABLE: 'N',//启用?Y:启用 N：未启用
            PROVINCE: '',//所属省
            CITY: '',//所属市
            COUNTY: '',//所属县
            TOWN: '',//乡
            VILAGE: '',//村
            ADDRESS: '',//交易商地址，不包含省市县
            REGISTERMONEY: '',//注册资金
            PROSECUTION: '',//经营范围
            STATUS: constantService.COMPANY_STATUS.TEMP,//当前状态
            COMPANYNET: '',//公司网址
            SITETYPE: '',//网站模板类型
            CONTACT: '',//交易商联系人
            PHONENUM: '',//交易商联系电话
            CONTECTERFAX: '',//传真
            //ENSUREMOUNT:'',//交易商保证金
            REGISTERTIME: commonService.getTimestamp(),//注册时间
            //TBUSER:'',//审核人
            //TBTIME:'',//审核日期
            MEMBERGRADETIMESTART: commonService.getTimestamp(),//交易商开始日期
            //MEMBERGRADETIMESEND:'',//交易商结束日期
            ISSIGN: 'N',//会员企业标志位 Y:是；N：否
            COSTID: '',//会费标准ID
            UKEY: '',//密钥
            MEMO: '',//备注
            TOTALAREA: '',//总面积
            LAT: '0',//经度
            LNG: '0',//维度
            BINDURL: '',//农场的对应的农用通URL地址
            BINDFARM: '',//农场绑定的农用通农场ID
            SUPERVISE:constantService.SUPERVISE//监管ID
        };
        //用户基本信息
        var userInfo = {
            'HEADIMGURL': '',//用户头像路径//ID:'',//主键ID
            'SUBSCRIBETIME': '',//关注时间
            'GROUPID': '',//所在机构ID
            'REALNAME': this.companyInfo.CONTACT,//用户名
            'CREATETIME': commonService.getTimestamp(),//创建时间
            'DEVICEID': '',//设备ID
            'UNIONID': '',//UNIONID
            'NICKNAME': this.companyInfo.CONTACT,//昵称
            'SEX': '2',//默认男性，0.男，1.女,2.保密
            'PARENTUSERID': '',//推荐人
            'USERTOKEN': $rootScope.USERTOKEN,//用户凭证
            'ACCOUNTID': this.companyInfo.ACCOUNTID,//交易商ID
            'SUBSCRIBE': 'N',//关注?
            'AUTHID': '',//授权码
            'PWD': this.companyInfo.PWD,//密码
            'TEL': this.companyInfo.PHONENUM,//手机号码
            'ENABLE': 'N',//启用?
            'USERID': this.companyInfo.PHONENUM,//用户唯一编码
            'PROVINCE': this.companyInfo.PROVINCE,//省份
            'CITY': this.companyInfo.CITY,//城市
            'COUNTY': this.companyInfo.COUNTY,//县
            'ADDRESS': this.companyInfo.ADDRESS//详细地址
        };
        /**
         * 获取短信验证码，根据手机号及随机数
         * @param userRegisterInfo
         * @returns {*}
         */
        this.getTelsms = function (rondom) {
            return userService.getTelsms(this.companyInfo.PHONENUM, rondom);
        };

        /**
         * 校验短信是否合法，根据手机号短信验证码及随机数 mobilephone：手机号，authcode:短信验证码，random:随机数
         * @param userRegisterInfo 对象内容 {MOBLIEPHONE:'',AUTHCODE:'',RANDOM:''}
         * @returns {*}
         * @author 18611140788@163.com
         */
        this.checkTelSms = function (authcode, random) {
            return userService.checkTelSms(this.companyInfo.PHONENUM, authcode, random);
        };
        /**
         * 判断是否存在此农场名称，如果存在则提示用户。
         * @returns {*}
         */
        this.checkCompanyIsExist = function () {
            return actService.queryCount("VCACCOUNT", "ACCOUNTNAME='" + this.companyInfo.ACCOUNTNAME + "'");
        };
        /**
         * 判断是否存在此手机号，如果存在则提示用户。
         * @returns {*}
         */
        this.checkTelIsExist = function () {
            return actService.queryCount("VCACCOUNT", "PHONENUM='" + this.companyInfo.PHONENUM + "'");
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
                WHERE: "CATALOGTYPE='BUSINESSTYPE' AND ENABLE='Y'", ORDER: 'SORT'
            });
        };
        
        /**
         * 保存或修改农场和用户信息
         * @author 18611140788@163.com
         * @returns {*}
         */
        this.saveCompanyUser = function (prosecutions, selectSiteType) {
            if (prosecutions) {
                for (var i = 0; i < prosecutions.length; i++) {
                    if (prosecutions[i].CHECK) {
                        this.companyInfo.PROSECUTION += prosecutions[i].CATALOGID+",";
                    }
                }
            }
            if (selectSiteType) {
                this.companyInfo.SITETYPE = selectSiteType.CATALOGID;
            }
            this.companyInfo.COMPANY = this.companyInfo.ACCOUNTNAME;
            this.companyInfo.SIMPLECOMPANY = this.companyInfo.ACCOUNTNAME;
            this.companyInfo.UKEY = commonService.enCode64(commonService.Random(5) + '' + this.companyInfo.PHONENUM);
            this.companyInfo.USERNAME = this.companyInfo.ACCOUNTNAME;
            if (this.companyInfo.ID && this.companyInfo.ID.length > 0) {
                //默认农场的编码与农用通的农场编码一致。
                this.companyInfo.BINDFARM = this.companyInfo.ACCOUNTID;
                return actService.update("VCACCOUNT", this.companyInfo);
            } else {
                return actService.save("VCACCOUNT", this.companyInfo);
            }
        };
        /**
         * 保存或修改用户内容
         * @returns {*}
         */
        this.saveUserInfo = function () {
            userInfo = {
                'HEADIMGURL': '',//用户头像路径//ID:'',//主键ID
                'SUBSCRIBETIME': '',//关注时间
                'GROUPID': '',//所在机构ID
                'REALNAME': this.companyInfo.CONTACT,//用户名
                'CREATETIME': commonService.getTimestamp(),//创建时间
                'DEVICEID': '',//设备ID
                'UNIONID': '',//UNIONID
                'NICKNAME': this.companyInfo.CONTACT,//昵称
                'SEX': '2',//默认男性，0.男，1.女,2.保密
                'PARENTUSERID': '',//推荐人
                'USERTOKEN': $rootScope.USERTOKEN,//用户凭证
                'ACCOUNTID': this.companyInfo.ACCOUNTID,//交易商ID
                'SUBSCRIBE': 'N',//关注?
                'AUTHID': '',//授权码
                'PWD': this.companyInfo.PWD,//密码
                'TEL': this.companyInfo.PHONENUM,//手机号码
                'ENABLE': 'N',//启用?
                'USERID': this.companyInfo.PHONENUM,//用户唯一编码
                'PROVINCE': this.companyInfo.PROVINCE,//省份
                'CITY': this.companyInfo.CITY,//城市
                'COUNTY': this.companyInfo.COUNTY,//县
                'ADDRESS': this.companyInfo.ADDRESS//详细地址
            };
            userInfo.ACCOUNTID = this.companyInfo.ACCOUNTID;
            if (userInfo.ID && userInfo.ID.length > 0) {
                return actService.update("CUSER", userInfo);
            } else {
                return actService.save("CUSER", userInfo);
            }
        }
        /**
         * 保存认证信息，并整理数据
         * @param certType
         * @param title
         * @author 18611140788@163.com
         */
        this.saveCert = function (certType, title) {
            var cert = {
                CCERTID: '',//审核ID ID:'',//主键ID
                SOURCEAID: 'CACCOUNT',//关联主表元数据编码
                SOURCEID: this.companyInfo.ACCOUNTID,//关联元数据编号
                TITLE: title,//标题
                CERTTYPE: certType,//交易商证件类型
                PICPATHID: '',//资源路径ID
                CERTNO: '',//交易商证件号
                STATUS: '',//审核状态
                SIGNINTIME: commonService.getTimestamp(),//认证时间
                SIGNOUTTIME: '',//失效时间
                ENABLE: 'Y',//启用?
                UPLOADTIME: commonService.getTimestamp(),//注册时间
                TBUSER: '',//审核人
                TBTIME: '',//审核日期
                MEMO: ''//备注
            };
            //保存认证资料信息
            return actService.save("CCERT", cert);
        };
        /**
         * 上传文件
         * @param file
         * @param cert
         * @author 18611140788@163.com
         */
        this.upLoadFile = function (file, cert) {
            //文件上传的必须信息，
            var resJson = {
                //图片类型
                FILETYPE: "PIC",
                //标题
                RESTITLE: cert.TITLE,
                //关联元数据
                SOURCEAID: 'CCERT',
                //关联元数据的id
                SOURCEID: cert.ID,
                //关联字段
                SOURCEFIELD: 'PICPATHID'
            };
            //文件上传
            return actService.upLoadFile(file, resJson);
        };
    }
]);