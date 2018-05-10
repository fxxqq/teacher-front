import Api from "../api/API"
var moment = require('moment');
class Utils {
    /**
     * 教师端请假功能 
     * @param {Array}  
     * @returns  
     * @author frank
     * @description  
     *   frank sprint66 创建，
     *   author 分支 修改原因
     */

    /**
     * @method 获取服务器时间的时间戳
     * @param {} 
     * @author eva
     */
    async getServeTime() {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else { // ie
            xhr = new ActiveObject("Microsoft")
        }

        xhr.open("GET", "/", false) //false同步
        xhr.send(null);
        var date = xhr.getResponseHeader("Date");
        return new Date(date).getTime();
    };
    /**
     * @method 不使用异步请求拿网站头部时间戳
     * @param {} 
     * @author frank
     */
    getServeTimeStamp() {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else { // ie
            xhr = new ActiveObject("Microsoft")
        }

        xhr.open("GET", "/teacher/", false) //false同步
        xhr.send(null);
        var date = xhr.getResponseHeader("Date");
        return new Date(date).getTime();
    };
    //根据本地时间获得GMT时间和任意时区的时间 (获取东八区时间)
    getUTCDate(ms, offsetVal) {
        var offset;

        if (ms) {
            d = new Date(ms);
        } else {
            d = new Date(); //创建一个Date对象 
        }

        if (offsetVal) {
            offset = offsetVal;
        } else {
            offset = 8;
        }

        localTime = d.getTime();
        localOffset = d.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数 
        utc = localTime + localOffset; //utc即GMT时间 
        areaTime = utc + (3600000 * offset);
        nd = new Date(areaTime);
        return nd;
    };

    // 保存教师cookies信息
    saveTeacherInfoCookies(teacherInfo, callback) {
        if (teacherInfo) {
            var dataObj = JSON.stringify(teacherInfo);
            // alert(dataObj)
            localStorage.setItem("teenagerTeacherInfo", dataObj);
            if (callback) {
                callback();
            }
        }
    };

    //获取用户cookies信息
    getTeacherInfoCookies() {
        var teacherInfo;

        if (localStorage.getItem('teenagerTeacherInfo')) {
            teacherInfo = JSON.parse(localStorage.getItem('teenagerTeacherInfo'));
        } else {
            teacherInfo = "";
        }
        return teacherInfo;
    };

    //教师登录超时处理
    timeoutOperationTeacher() {
        // console.log(repeat);
        var repeat;
        if (!repeat) {
            repeat = true;
            this.clearTeacherInfoCookies();
            // pop.surePopEnglish("Login timeout, please login again~", function() {
            //     repeat = false;
            //     window.location.href = "/t";
            // });
            alert("Login timeout, please login again~");
            window.location.href = "/t";
        }
    };
    //清除用户cookies信息
    clearTeacherInfoCookies() {
        localStorage.removeItem("teenagerTeacherInfo");
    };

    // 把当前date对象或者毫秒数转换成东八区,并且月份和日期 一个数自动补0 
    changeTimeZone(time) {
        var timeObj = {};
        timeObj.year = moment(time).utcOffset(8).get('year');
        timeObj.month = moment(time).utcOffset(8).get('month') + 1;
        timeObj.date = moment(time).utcOffset(8).get('date');
        timeObj.week = moment(time).utcOffset(8).get('day');
        if (timeObj.month < 10) {
            timeObj.month = "0" + timeObj.month
        }
        if (timeObj.date < 10) {
            timeObj.date = "0" + timeObj.date
        }
        return timeObj;
    };
    //毫秒数转年月日时分秒
    getYearMonthDayHourMinuteSecond(ms) {
        var year = moment(ms).get('year');
        var month = moment(ms).get('month') + 1;
        var date = moment(ms).get('date');
        var hour = moment(ms).get('hour');
        var minute = moment(ms).get('minute');
        var second = moment(ms).get('second');
        var week = new Date(ms).getDay();

        if (month < 10) { month = "0" + month; }
        if (date < 10) { date = "0" + date; }
        if (hour < 10) { hour = "0" + hour; }
        if (minute < 10) { minute = "0" + minute; }
        if (second < 10) { second = "0" + second; }

        switch (week) {
            case 0:
                week = "周日";
                break;
            case 1:
                week = "周一";
                break;
            case 2:
                week = "周二";
                break;
            case 3:
                week = "周三";
                break;
            case 4:
                week = "周四";
                break;
            case 5:
                week = "周五";
                break;
            case 6:
                week = "周六";
                break;
        }
        return {
            year: year,
            month: month,
            date: date,
            hour: hour,
            minute: minute,
            second: second,
            week: week
        }
    };

    //取url参数
    getRequest() {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
}
export default new Utils;