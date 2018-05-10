<template>
  <div class="courseCenter-page">
    <HeaderBar></HeaderBar>
      <div class="g-main">
        <div class="course-title">
            <i></i>Course Center
        </div>

        <div class="course-head">
            <div class="date-slide-wrap">
                <div id="date-slide">
                    <div class="date-slide-item" v-for="(dayItem,index) in dayData">

                        <div class="date-today"><span v-if="today==dayItem.currentDateString">(Today)</span></div>
                        <!--  -->
                        <div class="date-item" v-on:click="dateChoose($event,index)" v-bind:class="{'active':dayItem.select,'disabled':!dayItem.isCourse}" :data="dayItem.selectDateString">
                            <p v-text="dayItem.date" style="font-weight:bold;"></p>
                            <p v-text="dayItem.weekend"></p>
                        </div>
                        <!-- dayItem.isGreen && -->
                        <div v-show="dayItem.greenCount!=0 && dayItem.greenCount" class="class-tips-green">{{dayItem.greenCount}}</div>
                        <!-- dayItem.isRed && -->
                        <div v-show="dayItem.redCount!=0 && dayItem.redCount" class="class-tips-red">{{dayItem.redCount}}</div>
                    </div>
                </div>
                <div class="date-slide-line"></div>
                <a @click="changeTopDate('left',dayData)" href="javascript:;" class="date-left-arrow iconfont">
                    <!-- &#xe768; -->
                    <i class="left-icon"></i>
                </a>
                <a @click="changeTopDate('right',dayData)" href="javascript:;" class="date-right-arrow iconfont">
                    <!-- &#xe761; -->
                    <i class="right-icon"></i>
                </a>
            </div>
            <div class="dark-blue-line-h order-time-line"></div>
        </div>
        

        <CourseDetail :time-duration='{startTime:"1525363200000",endTime:"1525449600000"}' :chosen-day='{date:"1525363200000"}' :day-data='dayData' :course-core-list-data='courseCoreListData' :course-extra-list-data='courseExtraListData' :course-param-list-data='courseParamListData'>
        </CourseDetail>
      </div>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import HeaderBar from "@/components/header/headerBar";
import FooterBar from "@/components/footer/footerBar";
import CourseDetail from "./children/courseDetail";
var moment = require('moment');
// import Utils from "../../utils/utils";
export default {
  name: "CourseCenter",
  data() {
    return {
      loading: true,
      today:"",
      dayData:[],
      courseCoreListData:[],
      courseExtraListData:[],
      courseParamListData:[],
      thirdSelect:false,
      thirdIsCourse:false,
    }
  },
  components: {
    HeaderBar,
    FooterBar,
    CourseDetail
  },
  created() {
    const utils = this.$utils;
    const api = this.$api;
    console.log("this.aasss",this.aasss)
    this.initData();
      
  },
  beforeMount() {
    
  },
  mounted(){
		// this.setDay();
    
	},
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    // dayData: function (newQuestion, oldQuestion) {
    //   this.answer = 'Waiting for you to stop typing...'
    //   this.getAnswer()
    // }
  },
  methods: {

    /**
     * @method 设置头部日期
     * @param  {selTimeZoneObj:selTimeZoneController控制器传值,firstDay:头部日期的第一天,selOffset:默认时间偏移量}
     * @author  
     */
    setDay: function(firstDay, direction) {
        // 查询日期前两天的第一天
        const utils = this.$utils;
        const that = this;
        utils.getServeTime().then(function(serverTime){
          console.log("serverTime",serverTime)
          var serverTimeObj = utils.changeTimeZone(serverTime);
          that.today = serverTimeObj.year + "-" + serverTimeObj.month + "-" + serverTimeObj.date;
          console.log("that.today",that.today);
          
          if (firstDay) {
                  console.log(direction);
                  var myDate = new Date(firstDay);
                  console.log("myDate", myDate);
                  if (direction == "left") {
                      var myDate2 = new Date(myDate.getTime() - 60 * 60 * 24 * 1000 * 9)
                      var myDateMonth = parseInt(moment(myDate2).utcOffset(8).get('month') + 1);
                      var myDateDay = parseInt(moment(myDate2).utcOffset(8).get('date'));
                      var myDateYear = parseInt(moment(myDate2).utcOffset(8).get('year'));
                      console.log("myDate2", myDate2)
                      console.log(myDateMonth, myDateDay, myDateYear);
                  } else {
                      var myDate2 = new Date(myDate.getTime() + 60 * 60 * 24 * 1000 * 9)
                      var myDateMonth = parseInt(moment(myDate2).utcOffset(8).get('month') + 1);
                      var myDateDay = parseInt(moment(myDate2).utcOffset(8).get('date'));
                      var myDateYear = parseInt(moment(myDate2).utcOffset(8).get('year'));
                      console.log("myDate2", myDate2)
                  }

              }else {
                  // if (selTimeZoneObj) {
                  //     myDate = selTimeZoneObj.curTimeZoneDate;
                  //     var myDateMonth = parseInt(moment(myDate).get('month') + 1);
                  //     var myDateDay = parseInt(moment(myDate).get('date') - 2);
                  //     var myDateYear = parseInt(moment(myDate).get('year'));
                  //     console.log(myDateYear + "-" + myDateMonth + "-" + myDateDay);
                  // } 
                  // else {
                      myDate = new Date(serverTime);
                      var myDateMonth = parseInt(moment(myDate).utcOffset(8).get('month') + 1);
                      var myDateDay = parseInt(moment(myDate).utcOffset(8).get('date') - 2);
                      var myDateYear = parseInt(moment(myDate).utcOffset(8).get('year'));
                  // }

              }
              if (myDateDay <= 0) {
                  if (myDateMonth != 1) {
                      myDateMonth = myDateMonth - 1;
                  } else {
                      myDateMonth = 12;
                      myDateYear = myDateYear - 1;
                  }
                  myDateDay = utils.getUTCDate(utils.getUTCDate(myDate).setDate(utils.getUTCDate(myDate).getDate() - 2)).getDate();
              }
              myDateMonth < 10 ? myDateMonth = "0" + myDateMonth : myDateMonth = myDateMonth;
              myDateDay < 10 ? myDateDay = "0" + myDateDay : myDateDay = myDateDay;
              myDateYear < 10 ? myDateYear = "0" + myDateYear : myDateYear = myDateYear;
              var myDateDateString = myDateYear + "-" + myDateMonth + "-" + myDateDay;
              console.log(myDateDateString)
              var myDateDateString = myDateDateString.replace(/-/g, '/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
              var startTime = new Date(myDateDateString);
              console.log("startTime", startTime);
              var startTimeStamp = startTime.getTime() - 60 * 60 * 24 * 1000; //当前日期前1天0点的时间戳
              var endTimeStamp = startTime.getTime() + 60 * 60 * 24 * 1000 * 10; //当前日期后10天0点的时间戳

              var timeDifference;
              // timeDifference = selTimeZoneObj ? selTimeZoneObj.selOffset - 8 : selOffset - 8; //北京时间的偏移量
              timeDifference = 0; //默认为北京时间
              var queryDateObj = {
                  "startTime": startTimeStamp,
                  "endTime": endTimeStamp,
                  "timeDifference": timeDifference
              };
              var dayMillisecond = [];
              var nowDayMillisecond;
              nowDayMillisecond = myDate.getTime();
              //JavaScript 日期处理类库 http://momentjs.cn/
              for (var i = 0; i < 9; i++) {
                  if (firstDay) {
                      if (direction == "left") {
                          var minusDayNum;
                          minusDayNum = 9 - i;
                          var addDayMillisecond = new Date(moment(nowDayMillisecond).subtract(minusDayNum, 'days')).getTime();
                      } else {
                          //当天日期之后
                          var addDayNum = i + 9;
                          console.log(i)
                          var addDayMillisecond = new Date(moment(nowDayMillisecond).add(addDayNum, 'days')).getTime();
                      }

                  } else {
                      if (i < 2) {
                          //当天日期前
                          var minusDayNum;
                          minusDayNum = 2 - i;
                          var addDayMillisecond = new Date(moment(nowDayMillisecond).subtract(minusDayNum, 'days')).getTime();
                      } else {
                          //当天日期之后
                          var addDayNum = i - 2;
                          var addDayMillisecond = new Date(moment(nowDayMillisecond).add(addDayNum, 'days')).getTime();
                      }
                  }


                  var addWeekend = moment(addDayMillisecond).utcOffset(8).get('day');
                  var addMonth = moment(addDayMillisecond).utcOffset(8).get('month') + 1;
                  var addDay = moment(addDayMillisecond).utcOffset(8).get('date');
                  var addYear = moment(addDayMillisecond).utcOffset(8).get('year');

                  dayMillisecond.push(addDayMillisecond);

                  switch (addWeekend) {
                      case 0:
                          addWeekend = "Sun.";
                          break;
                      case 1:
                          addWeekend = "Mon.";
                          break;
                      case 2:
                          addWeekend = "Tues.";
                          break;
                      case 3:
                          addWeekend = "Wed.";
                          break;
                      case 4:
                          addWeekend = "Thur.";
                          break;
                      case 5:
                          addWeekend = "Fri.";
                          break;
                      case 6:
                          addWeekend = "Sat.";
                          break;
                  }

                  if (addMonth < 10) {
                      addMonth = "0" + addMonth;
                  }
                  if (addDay < 10) {
                      addDay = "0" + addDay;
                  }
                  
                  that.dayData.push({
                      weekend: addWeekend,
                      date: addMonth + "/" + addDay,
                      isCourse: false,
                      select: false,
                      isRed: false,
                      isGreen: false,
                      millisecond: addDayMillisecond,
                      month: addMonth,
                      day: addDay,
                      year: addYear,
                      timeDifference: timeDifference
                  });

              }
              that.getSelectDate(queryDateObj);
        })

    },

    /**
     * @method 获取可以预约课程的日期http
     * @param  {}
     * @author  eva(2018-5-3)
     */
    // getSelectDateHttp:async function(queryDateObj){
              
    //           const api = this.$api;
    //           const that = this;
    //           let params = {
    //             url: "/api/teacherCenter/tcenter/teacherCourseCenterTopDates",
    //             sendObj: queryDateObj
    //           };
    //           api
    //             .get(params)
    //             .then(function(res) {
    //                 // that.tableData = JSON.parse(res.data).data;
    //                 // var data = JSON.parse(res.data).data;
    //                 console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",res.data)
    //                 return res.data
    //             })
    //             .catch(function(err) {
    //                 console.log(66,"登录接口错误日志",err);
    //                 // that.loading2 = false;
    //                 api.reqFail(that, "获取列表失败请刷新");
    //                 // return err
    //             });
                   
    // },
    /**
     * @method 获取可以预约课程的日期
     * @param  {}
     * @author  eva(2018-5-3)
     */
            getSelectDate: function(queryDateObj) {
              const that = this;
              const api = this.$api;
              //假数据
              // var queryDateObj = {
              //   endTime:1526486400000,
              //   startTime:1525536000000,
              //   timeDifference:0
              // }
              const params = {
                url: "/api/teacherCenter/tcenter/teacherCourseCenterTopDates",
                sendObj: queryDateObj
              };
              api
                .get(params).then(function(res){
                const data = res.data;
                   //假数据
                    // var data = {"code":200,"data":[{"curDate":"2018-05-08","teacherId":null,"startTime":null,"ct":null,"redCount":2,"greenCount":null,"isConfirm":null},{"curDate":"2018-05-07","teacherId":null,"startTime":null,"ct":null,"redCount":1,"greenCount":1,"isConfirm":null}],"msg":null};
                    console.log("getSelectDateHttp",data)
                    if (data.code == 200) {
                            if (data.data) {
                                var subscribeDateList = data.data;
                                console.log("11111 dayData", that.dayData);
                                for (var j = 0; j < that.dayData.length; j++) {
                                    that.dayData[j].currentDateString = that.dayData[j].year + "-" + that.dayData[j].month + "-" + that.dayData[j].day;
                                    for (var i = 0; i < subscribeDateList.length; i++) {
                                        if (subscribeDateList[i].greenCount) {
                                            var greenCount = subscribeDateList[i].greenCount;
                                        } else {
                                            var greenCount = 0;
                                        }
                                        if (subscribeDateList[i].redCount) {
                                            var redCount = subscribeDateList[i].redCount;
                                        } else {
                                            var redCount = 0;
                                        }
                                        that.dayData[j].selectDateString = that.dayData[j].currentDateString.replace(/-/g, "/");
                                        if (subscribeDateList[i].curDate == that.dayData[j].currentDateString) {
                                            greenCount == 0 ? that.dayData[j].isGreen = false : that.dayData[j].isGreen = true;
                                            redCount == 0 ? that.dayData[j].isRed = false : that.dayData[j].isRed = true;
                                            that.dayData[j].greenCount = greenCount;
                                            that.dayData[j].redCount = redCount;
                                            that.dayData[j].isCourse = true;
                                            // dayData[j].millisecond = new Date(selectDate).getTime();
                                            break;
                                        }


                                    }
                                }
                                console.log("22222 dayData", that.dayData);
                                //存储第三天数据 eva 2018-3-6
                                that.thirdSelect = that.dayData[2].select;
                                that.thirdIsCourse = that.dayData[2].isCourse;

                                console.log("$scope.thirdSelect", that.thirdSelect);
                                console.log("$scope.thirdIsCourse", that.thirdIsCourse)
                                that.dayData[2].select = true;
                                that.dayData[2].isCourse = true;
                                // dayData[2].isRed = true;
                                // dayData[2].isGreen = true;
                                var startTime = that.dayData[2].year + '/' + that.dayData[2].month + '/' + that.dayData[2].day;
                                //timeDifference为0
                                that.setDayData(startTime);
                            } else {
                                var selectDate = new Date(myDate).getTime();
                                var selectMonth = parseInt(moment(selectDate).get('month') + 1);
                                var selectDay = parseInt(moment(selectDate).get('date'));
                                var selectYear = parseInt(moment(selectDate).get('year'));
                                selectMonth < 10 ? selectMonth = "0" + selectMonth : selectMonth = selectMonth;
                                selectDay < 10 ? selectDay = "0" + selectDay : selectDay = selectDay;
                                selectYear < 10 ? selectYear = "0" + selectYear : selectYear = selectYear;
                                that.dayData[2].currentDateString = that.dayData[2].year + "-" + that.dayData[2].month + "-" + that.dayData[2].day;
                                // var selectDateString = selectYear + "-" + selectMonth + "-" + selectDay;
                                that.dayData[2].selectDateString = that.dayData[2].year + '/' + that.dayData[2].month + '/' + that.dayData[2].day;
                                that.dayData[2].select = true;
                                that.dayData[2].isCourse = true;
                                // dayData[2].isRed = false;
                                // dayData[2].isGreen = false;
                                // var startTime = 
                                that.setDayData(that.dayData[2].selectDateString);
                                // setDayData($scope.dayData[2].selectDateString.replace(/-/g, '/'), timeDifference);

                            }
                        }
              })
              .catch(function(err) {
                    console.log(66,"登录接口错误日志",err);
                    // that.loading2 = false;
                    api.reqFail(that, "获取列表失败请刷新");
                    // return err
                });
              ;

            },

            //返回课程列表
            //  getCourseListHttp:async function(sendObj){
            //     const api = this.$api;
            //     const that = this;
            //     const params ={
            //         url:"/api/teacherCenter/tcenter/teacherCourseCenterCourses",
            //         sendObj:sendObj
            //     }
            //     api
            //     .get(params)
            //     .then(function(res) {
            //         var data = JSON.parse(res.data).data;
            //         console.log("getCourseListHttpdata",data)
            //     })
            //     .catch(function(err) {
            //         console.log(66,"登录接口错误日志",err);
            //         api.reqFail(that, "获取列表失败请刷新");
            //     });

            //     //假数据
            //     // var data = {"code":200,"data":{"teacherCourseCenterCourseParamList":[{"keyId":null,"userId":null,"userName":null,"userLevel":null,"userGrade":null,"userBirthday":null,"userGender":null,"userProvince":null,"userPhoto":null,"teacherTimeId":"f1b1739f33b14528becc51740215e085","teacherName":"eva","courseId":null,"courseType":"course_type8","courseTitle":null,"courseDesc":null,"subscribeStatus":null,"courseCourseware":null,"coursePic":null,"startTime":1525784700000,"endTime":1525785300000,"inviteUrl":null,"subscribeFrom":null,"subscribeType":null,"subscribeRemark":null,"isConfirm":false,"isAttend":false,"age":null,"courseTypeEnglishName":"English-Studio","attendCount":null,"teacherId":null,"lastSubscribeCourseTitle":null,"lastSubscribeCourseType":null,"createUserName":null,"currentDate":null,"startDate":null,"endDate":null}],"beforeGoclassTimeCt1":5,"beforeGoclassTimeCt2":1,"beforeGoclassTimeCt4":5,"beforeGoclassTimeCt5":10,"beforeGoclassTimeCt8":10,"beforeGoclassTimeCt9":5,"beforeGoclassTimeCt10":0,"beforeGoclassTimeCt101":5,"beforeGoclassTimeCt102":5,"beforeGoclassTimeCt103":10,"beforeGoclassTimeCt104":10,"beforeGoclassTimeCt105":5,"beforeGoclassTimeCt106":5,"beforeGoclassTimeCt107":5,"beforeGoclassTimeCt108":5},"msg":null};

            //     // return data

            // },

            //毫秒数转换00:00格式
            formatTime:function(timems, utcOffset) {
                if (!utcOffset) {
                    utcOffset = 8;
                }
                var hour = moment(timems).utcOffset(utcOffset).get('hour');
                var minute = moment(timems).utcOffset(utcOffset).get('minute');
                if (hour < 10) {
                    hour = "0" + hour;
                }
                if (minute < 10) {
                    minute = "0" + minute;
                }
                return hour + ":" + minute;
            },

            //倒计时
            GetGoInToClassRTime:function(obj, beforeGoclassTime, i, callback1, callback2, callback3) {
                var utils = this.$utils;
                var NowTime;
                utils.getServeTime().then(function(serverTime){
                    // publicFn.closeLayerLoading();
                    // console.log(serverTime);
                    var startTime = obj.startTime;
                    var courseEndTime = obj.endTime;
                    NowTime = serverTime;
                    // 解决setInterval延时1s的问题
                    if (NowTime > (startTime - beforeGoclassTime)) {
                        callback1(obj, i);
                    }
                    if (NowTime > startTime) {
                        
                        if (callback3) {
                            callback3(obj, i);
                        }
                    }
                    if (NowTime > courseEndTime) {
                        clearInterval(timer);
                        callback2(obj, i);
                    }

                    var timer = setInterval(function() {
                        NowTime = serverTime;
                        if (NowTime > (startTime - beforeGoclassTime)) {
                            callback1(obj, i);
                        }
                        if (NowTime > startTime) {
                           if (callback3) {
                                callback3(obj, i);
                            }
                        }
                        if (NowTime > courseEndTime) {
                            clearInterval(timer);
                            callback2(obj, i);
                        }

                        serverTime += 1000;
                    }, 1000);
                })
            },

    //获取课程列表
            getCourseList:function(sendObj){
              console.log("getCourseList-sendObj",sendObj)
                const utils = this.$utils;
                const api = this.$api;
                const that = this;
                const serverTime = utils.getServeTimeStamp();
                
                const params ={
                    url:"/api/teacherCenter/tcenter/teacherCourseCenterCourses",
                    sendObj:sendObj
                }
                api
                .get(params)
                    .then(function(res){
                      const data = res.data;
                        if (data.code == 200) {
                            //成人(接口参数以分钟为单位)
                        var beforeGoclassTimeCt1 = data.data.beforeGoclassTimeCt1 * 60 * 1000; //core1v1
                        var beforeGoclassTimeCt2 = data.data.beforeGoclassTimeCt2 * 60 * 1000; //Extension1v6
                        var beforeGoclassTimeCt4 = data.data.beforeGoclassTimeCt4 * 60 * 1000; //demo1v1
                        var beforeGoclassTimeCt5 = data.data.beforeGoclassTimeCt5 * 60 * 1000; //OC
                        var beforeGoclassTimeCt8 = data.data.beforeGoclassTimeCt8 * 60 * 1000; //English-Studio
                        var beforeGoclassTimeCt9 = data.data.beforeGoclassTimeCt9 * 60 * 1000; //Extension1v1
                        var beforeGoclassTimeCt10 = data.data.beforeGoclassTimeCt10 * 60 * 1000; //口语训练营
                        //青少+开心豆
                        var beforeGoclassTimeCt101 = data.data.beforeGoclassTimeCt101 * 60 * 1000; //core
                        var beforeGoclassTimeCt102 = data.data.beforeGoclassTimeCt102 * 60 * 1000; //Extra
                        var beforeGoclassTimeCt103 = data.data.beforeGoclassTimeCt103 * 60 * 1000; //new concept
                        var beforeGoclassTimeCt104 = data.data.beforeGoclassTimeCt104 * 60 * 1000; //SBS
                        var beforeGoclassTimeCt105 = data.data.beforeGoclassTimeCt105 * 60 * 1000; //菁英体验课
                        var beforeGoclassTimeCt106 = data.data.beforeGoclassTimeCt106 * 60 * 1000; //OE
                        var beforeGoclassTimeCt107 = data.data.beforeGoclassTimeCt107 * 60 * 1000; //speech
                        var beforeGoclassTimeCt108 = data.data.beforeGoclassTimeCt108 * 60 * 1000; //English-Studio
                        this.courseParamListData = data.data.teacherCourseCenterCourseParamList;
                        console.log("courseParamListData",this.courseParamListData);
                        for (let n = 0; n < this.courseParamListData.length; n++) {
                            if (this.courseParamListData[n].courseType == "course_type1" || this.courseParamListData[n].courseType == "course_type4" || this.courseParamListData[n].courseType == "course_type14" || this.courseParamListData[n].courseType == "course_type13" || this.courseParamListData[n].courseType == "course_type9" || this.courseParamListData[n].courseType == "course_type101") {
                                this.courseCoreListData.push(this.courseParamListData[n]);
                            } else {
                                this.courseExtraListData.push(this.courseParamListData[n]);
                            }
                            // 取第二天6点的时间戳和服务器时间 次日北京时间6点不能评论
                            this.courseParamListData[n].nextDayStartTime = this.courseParamListData[n].startTime + 24 * 60 * 60 * 1000;
                            this.courseParamListData[n].nextDayStartTimeDate = utils.getYearMonthDayHourMinuteSecond(this.courseParamListData[n].nextDayStartTime).year + "-" + utils.getYearMonthDayHourMinuteSecond(this.courseParamListData[n].nextDayStartTime).month + "-" + utils.getYearMonthDayHourMinuteSecond(this.courseParamListData[n].nextDayStartTime).date;
                            console.log("次日时间6点", this.courseParamListData[n].nextDayStartTimeDate + ' 06:00');
                            this.courseParamListData[n].nextDayStartTimeStamp = new Date((this.courseParamListData[n].nextDayStartTimeDate).replace(/-/g, "/") + ' 06:00').getTime();

                        }
                        //core list 
                        for (let i = 0; i < this.courseCoreListData.length; i++) {

                            var num = i;
                            var endTime = this.courseCoreListData[i].endTime;
                            var GoclassTime;
                            this.courseCoreListData[i].group = "onetoone";
                            this.courseCoreListData[i].startTimeFormat = this.formatTime(this.courseCoreListData[i].startTime,  8);
                            this.courseCoreListData[i].endTimeFormat = this.formatTime(this.courseCoreListData[i].endTime,  8);
                            if (this.courseCoreListData[i].userGender == 1) {
                                this.courseCoreListData[i].userGender = "boy";
                            } else {
                                this.courseCoreListData[i].userGender = "girl";
                            }

                            this.courseCoreListData[i].courseStatus = 0;
                            this.courseCoreListData[i]['commentStatus'] = 0;

                            if (serverTime < endTime) {
                                //courseStatus  0未上课  1上课  
                                console.log(this.courseCoreListData, j, i);
                                if (this.courseCoreListData[i].courseType == "course_type101") {
                                    GoclassTime = beforeGoclassTimeCt101;
                                } else if (this.courseCoreListData[i].courseType == "course_type1") {
                                    GoclassTime = beforeGoclassTimeCt1;
                                } else if (this.courseCoreListData[i].courseType == "course_type4") {
                                    GoclassTime = beforeGoclassTimeCt4;
                                } else if (this.courseCoreListData[i].courseType == "course_type14") {
                                    GoclassTime = beforeGoclassTimeCt4;
                                } else if (this.courseCoreListData[i].courseType == "course_type9") {
                                    GoclassTime = beforeGoclassTimeCt9;
                                }
                                this.GetGoInToClassRTime(this.courseCoreListData[num], GoclassTime, num, function(obj, i) {
                                    obj['courseStatus'] = 1;
                                    this.courseCoreListData[i]['commentStatus'] = 0;
                                    // $scope.$apply();
                                }, function(obj, i) {
                                    obj['courseStatus'] = 0;
                                    obj.isComment = 1;
                                    this.courseCoreListData[i]['commentStatus'] = 1;
                                    // $scope.$apply();
                                }, function(obj, i) {
                                    obj['courseStatus'] = 1;
                                    console.log(1, serverTime, endTime);
                                    // 2018年4月25日 tom让把demo课程改成课前结束可以评价
                                    this.courseCoreListData[i]['commentStatus'] = 1;
                                    // $scope.$apply();
                                });
                            } else {
                                this.courseCoreListData[i]['commentStatus'] = 1;
                            }
                            //未出席判断（如果现在时间大于课程结束时间，并且subscribeStatus为0，则显示）
                            console.log("未出席判断", serverTime, this.courseCoreListData[i].isAttend);
                            if (serverTime > this.courseCoreListData[i].endTime) {
                                // $scope.courseCoreListData[i].isComment = 1;
                                if (!this.courseCoreListData[i].isAttend) {
                                    this.courseCoreListData[i].isShowAttend = 1; //未出席
                                } else {
                                    this.courseCoreListData[i].isShowAttend = 2; //已出席
                                }
                            } else {
                                // $scope.courseCoreListData[num]['commentStatus'] = 1;
                            }

                        }

                        //extra list 
                        for (let j = 0; j < this.courseExtraListData.length; j++) {
                            //console.log(666, $scope.courseExtraListData)
                            let num = j;
                            let endTime = this.courseExtraListData[j].endTime;
                            let GoclassTime;

                            this.courseExtraListData[j].group = "onetomore";
                            this.courseExtraListData[j].startTimeFormat = this.formatTime(this.courseExtraListData[j].startTime,  8);
                            this.courseExtraListData[j].endTimeFormat = this.formatTime(this.courseExtraListData[j].endTime,  8);
                            if (this.courseExtraListData[j].userGender == 1) {
                                this.courseExtraListData[j].userGender = "boy";
                            } else {
                                this.courseExtraListData[j].userGender = "girl";
                            }

                            this.courseExtraListData[j].courseStatus = 0;
                            // $scope.courseExtraListData[i]['commentStatus'] = 0;
                            if (serverTime < endTime) {
                                //courseStatus  0未上课  1上课
                                if (this.courseExtraListData[j].courseType == "course_type102") {
                                    GoclassTime = beforeGoclassTimeCt102;
                                } else if (this.courseExtraListData[j].courseType == "course_type103") {
                                    GoclassTime = beforeGoclassTimeCt103;
                                } else if (this.courseExtraListData[j].courseType == "course_type104") {
                                    GoclassTime = beforeGoclassTimeCt104;
                                } else if (this.courseExtraListData[j].courseType == "course_type105") {
                                    GoclassTime = beforeGoclassTimeCt105;
                                } else if (this.courseExtraListData[j].courseType == "course_type106") {
                                    GoclassTime = beforeGoclassTimeCt106;
                                } else if (this.courseExtraListData[j].courseType == "course_type107") {
                                    GoclassTime = beforeGoclassTimeCt107;
                                } else if (this.courseExtraListData[j].courseType == "course_type108") {
                                    GoclassTime = beforeGoclassTimeCt108;
                                } else if (this.courseExtraListData[j].courseType == "course_type2") {
                                    GoclassTime = beforeGoclassTimeCt2;
                                } else if (this.courseExtraListData[j].courseType == "course_type5") {
                                    GoclassTime = beforeGoclassTimeCt5;
                                } else if (this.courseExtraListData[j].courseType == "course_type8") {
                                    GoclassTime = beforeGoclassTimeCt8;
                                } else if (this.courseExtraListData[j].courseType == "course_type10") {
                                    GoclassTime = beforeGoclassTimeCt10;
                                }
                                this.GetGoInToClassRTime(this.courseExtraListData[num], GoclassTime, num, function(obj, i) {
                                    obj['courseStatus'] = 1;
                                    // $scope.$apply();
                                }, function(obj, i) {
                                    obj['courseStatus'] = 0;
                                    // $scope.$apply();
                                });
                            } else {
                                // $scope.courseExtraListData[i]['commentStatus'] = 1;
                            }
                            if (serverTime > this.courseExtraListData[j].endTime) {
                                if (!this.courseExtraListData[j].isAttend) {
                                    this.courseExtraListData[j].isShowAttend = 1; //未出席
                                } else {
                                    this.courseExtraListData[j].isShowAttend = 2
                                }
                            }
                        }

                        //不同课程类型组合按时间排序
                        console.log("this.courseParamListData", this.courseParamListData);
                        for (var k = 0; k < this.courseParamListData.length - 1; k++) {
                            for (var z = 0; z < this.courseParamListData.length - k - 1; z++) {
                                if (this.courseParamListData[z].startTime > this.courseParamListData[z + 1].startTime) {
                                    var tem = this.courseParamListData[z];
                                    this.courseParamListData[z] = this.courseParamListData[z + 1];
                                    this.courseParamListData[z + 1] = tem;
                                }
                            }
                        }
                        console.log("courseParamListData",this.courseParamListData)

                        }else if (data.code == 70004) {
                            // publicFn.timeoutOperationTeacher();
                            alert("bbbbbb");
                        }
                    }.bind(this))
                    .catch(function(err) {
                    console.log(66,"登录接口错误日志",err);
                    api.reqFail(this, "获取列表失败请刷新");
                });
                
                
            },

    //获取对应日期的数据
            setDayData:function(startTime) {
              console.log("setDayData-startTime",startTime)
                var utils = this.$utils;
                var startTimeStamp;
                // console.log("//获取对应日期的数据", timeDifference, new Date(startTime))
                var localTime = new Date();
                // var selOffset = -localTime.getTimezoneOffset() / 60; //方法可返回格林威治时间和本地时间之间的时差，以分钟为单位。
                var selOffset = 8;
                console.log(selOffset);
                startTimeStamp = new Date(startTime).getTime();
                // startTimeStamp = startTimeStamp - timeDifference * 60 * 60 * 1000 + ((selOffset - 8) * 60 * 60 * 1000);
                console.log("%cstartTime", "color:red", startTime, startTimeStamp, (startTimeStamp - 1508169600000) / 3600000);
                // this.teacherTimeId = "";
                var sendObj = {
                    startTime: startTimeStamp,
                    endTime: startTimeStamp + 60 * 60 * 24 * 1000
                };
                this.getCourseList(sendObj);
                
            },

            /**
     * @method 左右切换顶部日期
     * @param 
     * @author 
     */
    changeTopDate: function(direction, dayData) {
        console.log("changeTopDate-direction",dayData)
        this.dayData = [];
        var firstDay = dayData[0].millisecond;
        // if (direction == "left") {
        //     console.log("firstDay", firstDay);
        //     this.setDay('', firstDay, direction);
        // } else {
        //     console.log("firstDayRight", firstDay);
        //     this.setDay('', firstDay, direction)
        // }
        this.setDay( firstDay, direction)
    },

    //获取当前dom元素的所有类名
    getAllClass:function(domList){
      var classList = domList.className.split(" ");
      for (let i = 0; i < domList.length; i++) {
            dateItemDom[i].className = "date-item"
        }
    },

    /**
     * @method 日期选择
     * @param {evt 对象, index 下标} 
     * @author eva 2018-5-8
     */
    dateChoose: function(evt, index) {
        var elem = (evt||event).currentTarget;
        if(elem.className.indexOf("disabled")==-1){
          var dateItemDom = document.getElementsByClassName("date-item");
          for (let i = 0; i < dateItemDom.length; i++) {
              if(dateItemDom[i].className.indexOf("disabled")==-1){
                console.log(dateItemDom[i].className)
                  dateItemDom[i].className = "date-item";
                  elem.className = "date-item active";  
                  console.log('elem.getAttribute("data")',elem.getAttribute("data"))
                  this.setDayData(elem.getAttribute("data"));
                  if(dateItemDom[i].className.indexOf("active")==-1){
                    this.dayData[2].select = this.thirdSelect;
                    this.dayData[2].isCourse = this.thirdIsCourse;
                  }
                

                  var elemIndex = index;

                  for (var j = 0; j < this.dayData.length; j++) {
                      if (j == elemIndex) {
                          this.dayData[j].isRed = false;
                          this.dayData[j].isGreen = false;
                          this.dayData[j].select = true;
                      } else {
                          this.dayData[j].isRed = true;
                          this.dayData[j].isGreen = true;
                          this.dayData[j].select = false;
                      }
                  }

              }
          }
        }
        

        

        // if (!elem.parent().find('.date-item').hasClass('disabled')) {
        //     // $scope.courseCoreListData = "";
        //     // $scope.courseExtraListData = "";
        //     if (!elem.parent().find('.date-item').hasClass('active')) {
        //         this.dayData[2].select = this.thirdSelect;
        //         this.dayData[2].isCourse = this.thirdIsCourse;
        //     }

        //     var elemIndex = elem.parents('.date-slide-item').index();

        //     for (var i = 0; i < dayData.length; i++) {
        //         if (i == elemIndex) {
        //             dayData[i].isRed = false;
        //             dayData[i].isGreen = false;
        //             dayData[i].select = true;
        //         } else {
        //             dayData[i].isRed = true;
        //             dayData[i].isGreen = true;
        //             dayData[i].select = false;
        //         }
        //     }

        //     elem.parents('.date-slide-item').siblings().find('.date-item').removeClass('active');
        //     elem.addClass('active');
        //     this.setDayData($(elem).parent().find('.date-item').attr('data'), timeDifference)
        // }
    },      

      
    initData:function(){
      const utils = this.$utils;
      
            if (utils.getRequest().third) {
                // QuickLogin(data);
            } else {
                this.setDay( "", "");
            }
      console.log("dayData",this.dayData)
      //假数据
      // var teenagerTeacherInfo = {"token":"799a5a9bb1a545c1a43620df1b12ca67"};
      // utils.saveTeacherInfoCookies(teenagerTeacherInfo)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/public/sass/_mixin.scss';

.courseCenter-page{
  .g-main{
    width: 1200px;
    margin: 20px auto 70px;
    background: #fff;
    font-family: Arial;
    box-sizing: border-box;
    border: none!important;
    padding: 0 0 20px!important;
  }
  
  .course-title {
    width: 97%;
    margin: 0 auto;
    position: relative;
    padding: 20px 0;
    font-size: 18px;
    color: #006FBC;
    letter-spacing: 0;
    line-height: 14px;
    font-weight: 700;
    border-bottom: 1px solid #ECECEC;
    i {
      width: 4px;
      height: 16px;
      display: inline-block;
      position: absolute;
      background: #006fbc;
      vertical-align: middle;
      left: -18px;
      top: 17px;
    }
  }
  .course-head{
    .date-slide-wrap {
        width: 95%;
        margin: 0 auto;
        margin-top: 10px;
        position: relative;
        z-index: 2;
        #date-slide {
            width: 90%;
            height: 106px;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
            z-index: 9;
            .slick-list {
                overflow: visible;
            }
            .date-slide-item {
                width: 114px;
                float: left;
                text-align: center;
                position: relative;
                
            }
            .date-today {
                font-size: 12px;
                color: #006FBC;
                margin-bottom: 5px;
                height: 13px;
            }
            .date-item {
                display: inline-block;
                padding: 5px 0;
                margin-bottom: 14px;
                background: #EDF7FF;
                border-radius: 2px;
                cursor: pointer;
                width: 69px;
                @include radiusSet(4px);
                p {
                    margin: 5px 0;
                    text-align: center;
                    font-size: 14px;
                    color: #959595;
                }
            }
            .date-item.active {
                position: relative;
                background: #006FBC;
                border-radius: 2px;
                &:after {
                    content: "";
                    width: 0;
                    height: 0;
                    position: absolute;
                    top: 55px;
                    left: 50%;
                    margin-left: -8px;
                    border-top: 12px solid #006FBC;
                    border-bottom: 0 solid transparent;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                }
                &:before {
                    content: "";
                    width: 9px;
                    height: 9px;
                    position: absolute;
                    top: 79px;
                    left: 50%;
                    margin-left: -4px;
                    box-shadow: 0 0 0 2px #fff;
                    background-color: #005bac;
                    @include radiusSet(50%);
                }
                p {
                    color: #fff;
                }
            }
            .date-item.disabled {
                background: #fff;
                cursor: default;
            }
            .slick-slide {
                text-align: center;
            }
        }
        .date-slide-line {
            position: relative;
            top: -4px;
            height: 2px;
            background: #006FBC;
        }
        .date-left-arrow,
        .date-right-arrow {
            width: 46px;
            height: 82px;
            line-height: 57px;
            padding: 0 3px;
            position: absolute;
            top: 20px;
            color: #bfbfbf;
            transition: all 0.3s;
            -webkit-transition: all 0.3s;
            font-size: 34px;
            // border-bottom: 2px solid #006fbc;
        }
        .date-left-arrow {
            left: -4px;
            // color: #006FBC;
            // &:hover {
            //     color: #0083DF;
            // }
            .left-icon {
                width: 38px;
                height: 38px;
                display: block;
                margin: 10px 0px;
                // background: url("@/page/courseCenter/images/N_left@2x.png");
                background: url("./images/N_left@2x.png");
                background-size: cover;
                -webkit-transition: all .3s;
                -moz-transition: all .3s;
                -ms-transition: all .3s;
                -o-transition: all .3s;
                transition: all .3s;
                &:hover {
                    background: url("./images/H_left@2x.png");
                    background-size: cover;
                }
            }
        }
        .date-right-arrow {
            right: -15px;
            // color: #006FBC;
            // &:hover {
            //     color: #0083DF;
            // }
            .right-icon {
                width: 38px;
                height: 38px;
                display: block;
                margin: 10px 0px;
                background: url("./images/N_right@2x.png");
                background-size: cover;
                -webkit-transition: all .3s;
                -moz-transition: all .3s;
                -ms-transition: all .3s;
                -o-transition: all .3s;
                transition: all .3s;
                &:hover {
                    background: url("./images/H_right@2x.png");
                    background-size: cover;
                }
            }
        }
        .date-line {
            width: 100%;
            height: 2px;
            margin-top: 10px;
            margin-bottom: 10px;
            // border-bottom: 2px solid #006fbc; 
        }
    }
  }
  .class-tips-green {
                  position: absolute;
                  top: 25px;
                  left: 91px;
                  width: 17px;
                  height: 20px;
                  line-height: 20px;
                  color: #ffffff;
                  font-size: 12px;
                  text-align: center;
                  z-index: 5;
                  background: #40A9F6;
                  border-top-right-radius: 2px;
                  border-bottom-right-radius: 2px;
                  cursor: pointer;
              }
              .class-tips-red {
    position: absolute;
    top: 50px;
    left: 91px;
    width: 17px;
    height: 20px;
    line-height: 20px;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
    z-index: 5;
    background: #F6AB00;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    cursor: pointer;
  }
  
  
}
</style>
