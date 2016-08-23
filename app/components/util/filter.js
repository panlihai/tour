clesunClound
    .filter('orderClass', function () {
        return function (direction) {
            if (direction === -1)
                return "glyphicon-chevron-down";
            else
                return "glyphicon-chevron-up";
        }
    })
    .filter('size', function () {
        return function (items) {
            if (!items)
                return 0;

            return items.length || 0
        }
    })
    .filter('paging', function () {
        return function (items, index, pageSize) {
            if (!items)
                return [];

            var offset = (index - 1) * pageSize;
            return items.slice(offset, offset + pageSize);
        }
    })
    .filter('subString', function () {
        return function (value, startIndex, length, lastAdd) {
            if (!value) return '';//字符串不能为空
            //字符串截取起始位必须为数字，起始位为0
            if (isNaN(startIndex))startIndex = 0;
            //字符串要截取的长度不能为非数字
            if (isNaN(length)) return value;
            //字符串的长度必须大于起始位+截取长度
            if (value.length <= (parseInt(startIndex) + parseInt(length))) return value;
            //字符串截取
            value = value.replace(/<[^>]+>/g).substr(startIndex, length);
            //字符串是否需要追加自定义文字
            if (lastAdd) {
                value += lastAdd;
            }
            return value;
        };
    })
    .filter('timeSec2Mis', function () {
        return function (value) {
            if (!value) return '';//字符串不能为空
            return value * 1000;
        };
    })
    .filter('produceintype', function () {//农产品投入品类型
        return function (value) {
            if (!value)
                return '';//字符串不能为空
            switch (value) {
                case "01":
                    value = '农药';
                    break;
                case  "02":
                    value = '肥料';
                    break;
                case  "03":
                    value = '其它';
                    break;
            }
            return value;
        };
    })
    //根据{code:value,code1:value1}配置获取code对应的value值.
    .filter('toStrFrom', function () {
        return function (val, jsonVal) {
            if(!jsonVal){
                return val==undefined?'':val;
            }
            var jsons = JSON.parse(jsonVal);
            return jsons[val];
        }
    })
    .filter('deCode64', ["commonService", function (commonService) {
        return function (val) {
            return commonService.deCode64(val);
        }
    }]);