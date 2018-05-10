<template>
  <div class="courseDetail">
    <div class="course-content">
            <div class="having-booking">
                
                <div class="course-item" v-for="courseItem in courseParamListData">
                    <div class="time-block">
                        <div class="time">{{courseItem.startTimeFormat}}~{{courseItem.endTimeFormat}}</div>
                    </div>
                    <!-- 一对一 -->
                    <div class="content-block" v-if="courseItem.group=='onetoone'">
                        <div class="img-block coreExtra-img-block">
                            <div class="line"></div>
                            <div class="img">
                                <img :src="courseItem.coursePic" alt="">

                                <div class="tag">{{courseItem.courseTypeEnglishName}}
                                    <img class='sjx' src="@/page/courseCenter/images/teacher-sjx.png">
                                </div>

                                <div v-if="courseItem.courseDesc" class="desc">
                                    <div class="shadow"></div>
                                    <div class="content" v-bind="courseItem.courseDesc">
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="info-block" v-bind:class="{demoClass:courseItem.courseType=='course_type4'||courseItem.courseType=='course_type14'||courseItem.courseType=='course_type13'}">
                            <div class="info-detail">
                                <div> {{courseItem.courseTitle?courseItem.courseTitle:"A default course"}} 【{{courseItem.courseTypeEnglishName}}】</div>
                                <!-- <div>【{{courseItem.courseTypeEnglishName}}】{{courseItem.courseTitle}}</div> -->
                                <ul class="info-list" v-if="(courseItem.courseType!='course_type4')&&(courseItem.courseType!='course_type14')&&(courseItem.courseType!='course_type13')">
                                    <li>Name：<span>{{courseItem.userName}}</span></li>
                                    <li>Gender：<span>{{courseItem.userGender}}</span></li>
                                    <li>City：<span>{{courseItem.userProvince}}</span></li>
                                    <li>Level：<span>{{courseItem.userLevel}}</span></li>
                                    <li v-if="courseItem.lastSubscribeCourseTitle">
                                        The last class：<span>{{courseItem.lastSubscribeCourseTitle}}({{courseItem.lastSubscribeCourseType}})</span>
                                    </li>
                                </ul>
                                <div class="demo-remarks" v-if="courseItem.courseType=='course_type4'||courseItem.courseType=='course_type14'||courseItem.courseType=='course_type13'">
                                    {{courseItem.subscribeRemark}}
                                </div>
                                <!-- <div>Student:{{courseItem.englishName}} ({{courseItem.currentLevel}}),{{courseItem.province}},{{courseItem.gender}},{{courseItem.age}}years old,{{courseItem.userGrade}} </div>
                                    <div ng-if="courseItem.lastSubscribeCourseTitle">The last class:{{courseItem.lastSubscribeCourseTitle}}({{courseItem.lastSubscribeCourseType}})</div> -->
                            </div>
                            <div class="sure-booking" v-if="courseItem.courseType!='course_type13'" v-bind:class="{'active':courseItem.isConfirm}" v-on:click="
                                sureBooking($event,courseItem.teacherTimeId)" title="Tick to confirm that you will attend this class"></div>
                            <div class="not-attended-tag" v-if="courseItem.isShowAttend==1&&courseItem.courseType!='course_type13'">
                                <i class="iconfont">&#xe60a;</i>
                                <span>Absent</span>
                            </div>
                            <div class="attended-tag" v-if="courseItem.isShowAttend==2&&courseItem.courseType!='course_type13'">
                                <i class=" iconfont ">&#xe609;</i>
                                <span>Attended</span>
                            </div>
                            <div class="operation">
                                <div class="teacher-img ">
                                    <img :src="courseItem.userPhoto" alt=" ">
                                    <span>{{courseItem.userName}}</span>
                                    <span v-if="(courseItem.courseType=='course_type4'||courseItem.courseType=='course_type14'||courseItem.courseType=='course_type13')&&courseItem.createUserName">(<i>by</i> {{courseItem.createUserName}})</span>
                                </div>
                                <a href="javascript:; " class="operation-btn " v-if="courseItem.courseStatus==0&&courseItem.courseType!='course_type13' ">go to class</a>
                                <a href="javascript:; " class="operation-btn goto-btn " v-show="courseItem.courseStatus==1" v-if="courseItem.courseType!='course_type13' " v-on:click="gotoClass(courseItem.teacherTimeId)">go to class</a>
                                <a href="javascript:; " class="operation-btn comments-btn " v-bind:class="{ 'disabled':!courseItem.commentStatus||(nowTimeStamp>=courseItem.nextDayStartTimeStamp)} " v-on:click="commentPop(courseItem.keyId,courseItem.teacherId,courseItem.userId,courseItem.commentStatus,courseItem,nowTimeStamp)
                                    " v-if="courseItem.courseType!='course_type4' &&courseItem.courseType!='course_type14' &&courseItem.courseType!='course_type13'">comments</a>
                                <a href="javascript:; " class="operation-btn comments-btn " v-bind:class="{ 'disabled':!courseItem.commentStatus} " v-on:click=" demo1v1CommentPop(courseItem.keyId,courseItem.teacherId,courseItem.userId,courseItem.subscribeType,courseItem.commentStatus,courseItem)
                                    " v-if="courseItem.courseType=='course_type4' ||courseItem.courseType=='course_type14' ">comments</a>
                                <a v-on:click="previewCourseware(courseItem.teacherTimeId,courseItem.courseType)" target="_blank" v-if="courseItem.courseCourseware" class="operation-btn download-btn "><i class="iconfont ">&#xe75e;</i>ppt download</a>
                            </div>
                        </div>
                        
                    </div>
        
                    <!-- 一对多 -->
                    <div class="content-block " v-if="courseItem.group=='onetomore' ">
                        <!-- 青少 -->
                        <div class="img-block coreExtra-img-block " v-if="courseItem.courseType=='course_type102' ">
                            <div class="line "></div>
                            <div class="img ">
                                <img :src="courseItem.coursePic" alt=" ">
                                <div class="tag">{{courseItem.courseTypeEnglishName}}</div>
                            </div>
                            <a target="_blank " v-if="courseItem.courseCourseware" v-bind:href="courseItem.courseCourseware" class="img-download"></a>
                            <div v-if="courseItem.courseDesc " class="desc ">
                                <div class="shadow "></div>
                                <div class="content " v-bind="courseItem.courseDesc ">
                                </div>
                            </div>
                        </div>
                        <div class="img-block sbs-img-block " v-if="courseItem.courseType=='course_type104' ">
                            <div class="line "></div>
                            <div class="img ">
                                <img :src="courseItem.coursePic" alt=" ">
                                <div class="tag ">{{courseItem.courseTypeEnglishName}}
                                    <img class='sjx' src="@/page/courseCenter/images/teacher-sjx.png">
                                </div>
                            </div>
                            <a v-if="courseItem.courseCourseware " target="_blank " v-bind:href="courseItem.courseCourseware" class="img-download "></a>
                        </div>
                        <div class="img-block esp-img-block " v-if="courseItem.courseType=='course_type103' ">
                            <div class="line "></div>
                            <div class="img ">
                                <img :src="courseItem.coursePic" alt=" ">
                                <div class="tag ">{{courseItem.courseTypeEnglishName}}
                                    <img class='sjx' src="@/page/courseCenter/images/teacher-sjx.png">
                                </div>
                            </div>
                            <a v-if="courseItem.courseCourseware " target="_blank " v-bind:href="courseItem.courseCourseware" class="img-download "></a>
                        </div>
                        <div class="img-block demo-img-block " v-if="courseItem.courseType=='course_type105' ">
                            <div class="line "></div>
                            <div class="img ">
                                <img :src="courseItem.coursePic" alt=" ">
                                <div class="tag ">{{courseItem.courseTypeEnglishName}}
                                    <img class='sjx' src="@/page/courseCenter/images/teacher-sjx.png">
                                </div>
                            </div>
                            <a v-if="courseItem.courseCourseware " target="_blank " v-bind:href="courseItem.courseCourseware" class="img-download "></a>
                        </div>
                        <div class="img-block oe-img-block " v-if="courseItem.courseType=='course_type106' ">
                            <div class="line "></div>
                            <div class="img ">
                                <img :src="courseItem.coursePic" alt=" ">
                                <div class="tag ">{{courseItem.courseTypeEnglishName}}
                                    <img class='sjx' src="@/page/courseCenter/images/teacher-sjx.png">
                                </div>
                            </div>
                        </div>
                        <div class="img-block esp-img-block " v-if="courseItem.courseType=='course_type107' ">
                            <div class="line "></div>
                            <div class="img ">
                                <img :src="courseItem.coursePic" alt=" ">
                                <div class="tag ">{{courseItem.courseTypeEnglishName}}
                                    <img class='sjx' src="@/page/courseCenter/images/teacher-sjx.png">
                                </div>
                            </div>
                            <a v-if="courseItem.courseCourseware " target="_blank " v-bind:href="courseItem.courseCourseware" class="img-download "></a>
                        </div>

                        <!-- 成人 -->
                        <!-- <div class="img-block oe-img-block " ng-if="courseItem.courseType=='course_type106' ">
                                <div class="line "></div>
                                <div class="img ">
                                    <img ng-src="{{courseItem.coursePic}} " alt=" ">
                                    <div class="tag ">{{courseItem.courseTypeEnglishName}}</div>
                                </div>
                            </div> -->
                        <div class="img-block adult-img-block " v-if="courseItem.courseType=='course_type2' ">
                            <div class="line "></div>
                            <div class="img ">
                                <img :src="courseItem.coursePic" alt=" ">
                                <div class="tag ">{{courseItem.courseTypeEnglishName}}
                                    <img class='sjx' src="@/page/courseCenter/images/teacher-sjx.png">
                                </div>
                            </div>
                        </div>
                        <div class="img-block adult-img-block " v-if="courseItem.courseType=='course_type5' ">
                            <div class="line "></div>
                            <div class="img ">
                                <img :src="courseItem.coursePic" alt=" ">
                                <div class="tag ">{{courseItem.courseTypeEnglishName}}
                                    <img class='sjx' src="@/page/courseCenter/images/teacher-sjx.png">
                                </div>
                            </div>
                        </div>
                        <div class="img-block adult-img-block " v-if="courseItem.courseType=='course_type8' ">
                            <div class="line "></div>
                            <div class="img ">
                                <img :src="courseItem.coursePic" alt=" ">
                                <div class="tag">{{courseItem.courseTypeEnglishName}}
                                    <img class='sjx' src="@/page/courseCenter/images/teacher-sjx.png">
                                </div>
                            </div>
                        </div>
                        <!-- <div class="img-block adult-img-block " ng-if="courseItem.courseType=='course_type10' ">
                                <div class="line "></div>
                                <div class="img ">
                                    <img ng-src="{{courseItem.coursePic}} " alt=" ">
                                    <div class="tag ">{{courseItem.courseTypeEnglishName}}</div>
                                </div>
                            </div> -->
                        <div class="info-block ">
                            <div class="info-detail ">
                                <div>{{courseItem.courseTitle?courseItem.courseTitle:"A default course "}} 【{{courseItem.courseTypeEnglishName}}】</div>

                            </div>
                            <div class="sure-booking " v-bind:class="{ 'active':courseItem.isConfirm} " v-on:click=" sureBooking($event,courseItem.teacherTimeId) " title="Tick to confirm that you will attend this class ">
                            </div>
                            <div class="not-attended-tag " v-if="courseItem.isShowAttend==1 ">
                                <i class="iconfont ">&#xe60a;</i>
                                <span>Absent</span>
                            </div>
                            <div class="attended-tag " v-if="courseItem.isShowAttend==2 ">
                                <i class="iconfont ">&#xe609;</i>
                                <span>Attended</span>
                            </div>
                            <div class="operation ">
                                <!-- <div class="process ">
                                        <div>Attendees:</div>
                                        <div class="num ">{{courseItem.attendeeCount}}</div>
                                    </div> -->
                                <div class="booked ">
                                    <i class="iconfont ">
                                            &#xe75d;
                                        </i> Booked student(s): {{courseItem.attendCount?courseItem.attendCount:0}}
                                </div>
                                <!-- 公开课不需要预约 course_type8特殊处理 -->
                                <span v-show="courseItem.courseType!='course_type8' "> 
                                        <a href="javascript:; " class="operation-btn " v-if="(courseItem.courseStatus==0||!courseItem.attendCount) ">go to class</a>
                                        <a href="javascript:; " class="operation-btn goto-btn " v-if="(courseItem.courseStatus==1&&courseItem.attendCount) " v-on:click="gotoClass(courseItem.teacherTimeId) ">go to class</a>
                                    </span>
                                <span v-show="courseItem.courseType=='course_type8' "> 
                                        <a href="javascript:; " class="operation-btn " v-if="(courseItem.courseStatus==0) ">go to class</a>
                                        <a href="javascript:; " class="operation-btn goto-btn " v-if="(courseItem.courseStatus==1) " v-on:click="gotoClass(courseItem.teacherTimeId) ">go to class</a>
                                    </span>
                                <!-- 非公开课 -->
                                <a v-on:click="previewCourseware(courseItem.teacherTimeId,courseItem.courseType)" target="_blank " v-if="courseItem.courseCourseware&&courseItem.courseType!='course_type8'" class="operation-btn download-btn "><i class="iconfont ">&#xe75e;</i>ppt download</a>
                                <!-- 公开课 -->
                                <a v-on:click="previewCourseware(courseItem.teacherTimeId,courseItem.courseType)" target="_blank " v-if="courseItem.courseType=='course_type8'" class="operation-btn download-btn "><i class="iconfont ">&#xe75e;</i>ppt download</a>
                            </div>
                        </div>
                    </div>


                </div>
                
            </div>
            <div class="null-booking text-center " v-if="courseExtraListData.length==0 && courseCoreListData.length==0 " style="padding:0 30px; ">
                <img src="@/page/courseCenter/images/NoBooking.png" alt=" ">
                <div class='text'>No booking</div>
            </div>
        </div>
           
  </div>
</template>

<script>
// import HeaderBar from '@/components/header/headerBar'
// import FooterBar from '@/components/footer/footerBar'
var moment = require('moment');
export default {
  name: 'CourseDetail',
  props:['timeDuration','chosenDay','dayData','courseCoreListData','courseExtraListData','courseParamListData'],
  data () {
    return {
        // courseParamListData:[],
        // courseCoreListData:[],
        // courseExtraListData:[]
    }
  },
  created(){
    // this.getCourseList(this.timeDuration);
    console.log("courseExtraListData",this.courseExtraListData)
  },
  components: {
            // HeaderBar,
            // FooterBar
        },
        methods:{
            

            

            //进入教室 
            gotoClass: function(teacherTimeId) {
                var sendObj = {
                    teacherTimeId: teacherTimeId + ""
                };

                const api = this.$api;
                const that = this;
                var params ={
                    url:'/api/teacherCenter/tcenter/goToClassByTeacher',
                    sendObj:sendObj
                };
                api
                .get(params)
                .then(function(res) {
                    const data = res.data;
                    // var data = JSON.parse(res.data).data;
                    // console.log("getSureCourseHttpdata",data)
                    if (data.code == 200) {
                            var newTab = window.open('about:blank');
                            // window.open(data.msg, '_blank');
                            // window.location.href=data.msg;
                            // $scope.OpenWindow(data.msg);
                            newTab.location.href = data.msg;

                        } else if (data.code == 70004) {
                            publicFn.timeoutOperationTeacher();
                        } else {
                            pop.surePopEnglish(ErrorCode[data.code]);
                        }
                })
                .catch(function(err) {
                    console.log(66,"登录接口错误日志",err);
                    api.reqFail(that, "获取列表失败请刷新");
                });
            },

            //预览
            previewCourseware: function(teacherTimeId, courseType) {
                const api = this.$api;
                const that = this;
                var params ={
                    url:'/api/teacherCenter/v1/CourseCourseware?teacherTimeId=' + teacherTimeId + '&courseType=' + courseType,
                };
                api
                .get(params,"headerJSON")
                .then(function(res) {
                    var data = JSON.parse(res.data).data;
                    console.log("previewCoursewareHttp",data);
                    if (data.code == 200) {
                            if (data.data) {
                                var Courseware = data.data;
                                for (var i = 0; i < Courseware.length; i++) {
                                    // window.location.href = Courseware[i].courseCoursewareUrl;
                                    window.open(Courseware[i].courseCoursewareUrl, '_blank')
                                }
                            } else {
                                pop.surePop('该课程没有课件');
                            }
                        }
                })
                .catch(function(err) {
                    console.log(66,"登录接口错误日志",err);
                    api.reqFail(that, "获取列表失败请刷新");
                });

                // teacherCourseCenterService.getCourseware(teacherTimeId, courseType)
                //     .then(function(data) {
                //         if (data.code == 200) {
                //             if (data.data) {
                //                 var Courseware = data.data;
                //                 console.log("1111111111", data)
                //                 console.log("Courseware", Courseware)
                //                 for (var i = 0; i < Courseware.length; i++) {
                //                     // window.location.href = Courseware[i].courseCoursewareUrl;
                //                     window.open(Courseware[i].courseCoursewareUrl, '_blank')
                //                 }
                //             } else {
                //                 pop.surePop('该课程没有课件');
                //             }
                //         }
                //     })
            },

            

            

            

            //确认预约图标
            sureBooking: function(evt, teacherTimeId) {
                var utils = this.$utils;
                var target = (evt||event).target;
                var that = this;
                if(target.className.indexOf("active")==-1) {
                    target.className += "active";
                    // publicFn.layerLoading();
                    var serverTime = utils.getServeTimeStamp()
                        // var serverTime = new Date(this.dayData[2].currentDateString);
                        // serverTime = new Date(new Date);
                    var serverTimeObj = utils.changeTimeZone(serverTime)
                        var myDate;

                        // myDate = selTimeZoneObj ? selTimeZoneObj.curTimeZoneDate : new Date(serverTime);
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
                        var myDateDateString = myDateDateString.replace(/-/g, '/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
                        var startTime = new Date(myDateDateString);
                        console.log("确认预约图标确认预约图标startTime", startTime);
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
                        const api = this.$api;
                        const that = this;
                        var params ={
                            url:'/api/teacherCenter/tcenter/teacherConfirmation/' + teacherTimeId,
                        };
                        // api
                        // .put(params)
                        //     .then(function(res){
                        //         console.log(res.data);
                        //     })
                        api
                        .put(params)
                            .then(function(res) {
                                const data = res.data;
                                // publicFn.closeLayerLoading();
                                if (data.code == 200) {
                                        const paramsInside ={
                                            url:'/api/teacherCenter/tcenter/teacherCourseCenterTopDates',
                                            sendObj:queryDateObj
                                        };
                                        api
                                        .get(paramsInside)
                                        .then(function(res) {
                                            const data = res.data;
                                            if (data.code == 200) {
                                                var subscribeDateList = data.data;
                                                for (var j = 0; j < that.dayData.length; j++) {
                                                    that.dayData[j].currentDateString = that.dayData[j].year + "-" + that.dayData[j].month + "-" + that.dayData[j].day;
                                                    for (var i = 0; i < subscribeDateList.length; i++) {
                                                        var selectDate = subscribeDateList[i].startTime;
                                                        var selectMonth = parseInt(moment(selectDate).get('month') + 1);
                                                        var selectDay = parseInt(moment(selectDate).get('date'));
                                                        var selectYear = parseInt(moment(selectDate).get('year'));
                                                        selectMonth < 10 ? selectMonth = "0" + selectMonth : selectMonth = selectMonth;
                                                        selectDay < 10 ? selectDay = "0" + selectDay : selectDay = selectDay;
                                                        selectYear < 10 ? selectYear = "0" + selectYear : selectYear = selectYear;
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


                                            } else if (data.code == 70004) {
                                                utils.timeoutOperationTeacher();
                                            }
                                        })
                                        .catch(function(err) {
                                            console.log(66,"登录接口错误日志",err);
                                            api.reqFail(that, "获取列表失败请刷新");
                                        })
                                } 
                            })
                            .catch(function(err) {
                                console.log(66,"登录接口错误日志",err);
                                api.reqFail(that, "获取列表失败请刷新");
                            })
                    


                }
            },

            

            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.courseDetail{
    .course-content {
        min-height: 406px;
        overflow: hidden;
        .course-item {
            margin-bottom: 30px;
            @include clearfix;
            .time-block {
                float: left;
                //   width: 210px;
                width: 145px;
                margin-right: 10px;
                margin-left: 2px;
                color: #626262;
                position: relative;
                left: 3px;
                z-index: 9;
                background: url('../images/round.png') no-repeat 100% 50%;
                .time {
                    text-align: center;
                }
            }
            .content-block {
                float: left;
                padding-bottom: 30px;
                margin-left: 13px;
                border-bottom: 1px dashed #e0e0e0;
                @include clearfix;
                .desc {
                    opacity: 0;
                    position: absolute;
                    z-index: 2;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transform: translateY(100%);
                    -webkit-transform: translateY(100%);
                    transition: all .3s;
                    -webkit-transition: all .3s;
                }
                .shadow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: .7;
                    background: #000;
                }
                .img-block:hover .desc {
                    opacity: 1;
                    transform: translateY(0);
                    -webkit-transform: translateY(0);
                }
                .content {
                    height: 88%;
                    line-height: 20px;
                    position: relative;
                    z-index: 4;
                    box-sizing: border-box;
                    color: #fff;
                    font-size: 14px;
                    padding: 40px 15px 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 6;
                    -webkit-box-orient: vertical;
                }
            }
            .line {
                width: 2px;
                height: 135%;
                background: #ddd;
                position: absolute;
                top: -25px;
                left: -31px;
            }
            .img-block {
                float: left;
                width: 320px;
                height: 180px;
                position: relative;
                background-size: cover;
                .img {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    position: absolute;
                    .tag {
                        padding: 0 10px;
                        margin: 0 10px;
                        height: 30px;
                        line-height: 30px;
                        background: #F6AB00;
                        position: relative;
                        white-space: nowrap;
                        color: #fff;
                        display: inline-block;
                        font-size: 14px;
                        position: relative;
                        img.sjx {
                            position: absolute;
                            top: 0px;
                            left: 0;
                            width: 100%;
                            top: 30px;
                            height: 7px;
                        }
                    }
                }
                img {
                    display: block;
                    width: 100%;
                }
                .img-download {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0.7) url('../images/courseware_download.png') no-repeat 97% 50%;
                    opacity: 0.8;
                }
            }
            .coreExtra-img-block {
                background: url('../images/CoreExtra.jpg') no-repeat 50% 50%;
                background-size: cover;
            }
            .sbs-img-block {
                background: url('../images/SBS.jpg') no-repeat 50% 50%;
                background-size: cover;
            }
            .esp-img-block {
                background: url('../images/ESP.jpg') no-repeat 50% 50%;
                background-size: cover;
            }
            .demo-img-block {
                background: url('../images/demo.jpg') no-repeat 50% 50%;
                background-size: cover;
            }
            .info-block {
                width: 655px;
                min-height: 180px;
                float: left;
                margin-left: 20px;
                position: relative;
                .not-attended {
                    position: absolute;
                    right: 0;
                    bottom: 50px;
                    font-family: Arial;
                    font-size: 14px;
                    color: red;
                    font-weight: bold;
                }
                .info-detail {
                    width: 470px;
                    height: 130px;
                    overflow: hidden;
                    div {
                        text-align: left;
                        overflow: hidden;
                        font-size: 20px;
                        color: #474747;
                        letter-spacing: 0;
                        line-height: 23px;
                        font-weight: bold;
                    }
                    .info-list {
                        overflow: hidden;
                        clear: both;
                        margin-top: 10px;
                        li {
                            float: left;
                            margin-right: 47px;
                            color: #999999;
                            font-size: 14px;
                            line-height: 22px;
                            span {
                                color: #474747;
                            }
                        }
                        li:last-child {
                            margin-right: 30px;
                        }
                    }
                    .demo-remarks {
                        width: 568px;
                        height: 88px;
                        font-size: 14px;
                        color: #999999;
                        line-height: 22px;
                        font-weight: 500!important;
                        margin: 0;
                        position: relative;
                        top: 10px;
                        padding-right: 7px;
                    }
                }
                .sure-booking {
                    position: absolute;
                    top: 0;
                    right: 8px;
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    background: url('../images/checkbox.png') no-repeat 50% 50%;
                    background-size: 100%;
                }
                .sure-booking.active {
                    background: url('../images/checkbox_active.png') no-repeat 50% 50%;
                    background-size: 100%;
                }
                .operation {
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 36px;
                    line-height: 36px;
                    @include clearfix;
                    .booked {
                        font-size: 16px;
                        color: #333333;
                        font-weight: bold;
                        display: inline-block;
                        line-height: 36px;
                        i {
                            color: #BCBCBC;
                            font-size: 24px;
                            position: relative;
                            top: 3px;
                        }
                    }
                    .teacher-img {
                        float: left;
                        overflow: hidden;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        img,
                        span {
                            display: inline-block;
                            vertical-align: middle;
                            font-weight: bold;
                        }
                        span {
                            margin-top: 1px;
                            margin-left: 5px;
                            i {
                                font-style: normal;
                                font-weight: normal;
                                color: #999;
                            }
                        }
                        img {
                            width: 36px;
                            height: 36px;
                            background: url('../images/md_default_photo.png') no-repeat 50% 50%;
                            background-size: 100%;
                            border-radius: 100px;
                            border: 1px #ddd solid;
                        }
                    }
                    .operation-btn {
                        width: 110px;
                        height: 36px;
                        line-height: 36px;
                        // margin-top: 20px;
                        float: right;
                        font-family: Arial;
                        font-size: 14px;
                        text-align: center;
                        background: #bfbfbf;
                        color: #fff;
                        border-radius: 4px;
                        margin-left: 15px;
                        border-radius: 2px;
                        overflow: hidden;
                        box-sizing: border-box;
                    }
                    .operation-btn.active {
                        background: #006FBC;
                    }
                    .comments-btn {
                        background: #006FBC;
                        cursor: pointer;
                        &:hover {
                            background: darken(#0086e6, 5%);
                        }
                    }
                    .goto-btn {
                        background: #005bac;
                        &:hover {
                            background: darken(#0086e6, 5%);
                        }
                    }
                    .download-btn {
                        background: #fff;
                        color: #006FBC;
                        border: 1px solid #006FBC;
                        &:hover {
                            background: #006FBC;
                            color: #fff;
                        }
                        i {
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 3px;
                        }
                    }
                    .disabled {
                        background: #bfbfbf!important;
                        cursor: default!important;
                    }
                    .process {
                        margin-top: 25px;
                        float: left;
                        @include clearfix;
                        div {
                            float: left;
                            font-size: 12px;
                        }
                        div.bar {
                            width: 180px;
                            height: 6px;
                            margin: 0 10px;
                            margin-top: 4px;
                            background: #e0e0e0;
                            .cur {
                                width: 0%;
                                height: 100%;
                                background: #f6ab00;
                            }
                        }
                    }
                }
            }
        }
        .course-item .img-block img {
            position: absolute;
        }
        // 新增demoClass样式
        .course-item .info-block.demoClass .info-detail {
            width: auto;
        }
    }
    //有预约内容
    .having-booking {
        margin-top: 60px;
    }
    .oe-img-block {
        background: url('../images/t3-course.jpg') no-repeat 50% 50%;
        background-size: cover;
    }

    .adult-img-block {
        background: url('../images/lazycourse_gray.jpg') no-repeat 50% 50%;
        background-size: cover;
    }
    .attended-tag,
    .not-attended-tag {
        width: 80px;
        height: 24px;
        line-height: 25px;
        text-align: center;
        position: absolute;
        top: 0;
        right: 0;

        i,
        span {
            display: inline-block;
            vertical-align: middle;
            margin-left: -3px;
        }
        i {
            font-weight: bold;
        }
    }
    .not-attended-tag {
        background: #FFEBED;
        border-radius: 100px;
        font-size: 12px;
        color: #FF4B59;
        letter-spacing: 0;
    }

    .attended-tag {
        font-size: 12px;
        color: #006FBC;
        letter-spacing: 0;
        background: #EEF8FE;
        border-radius: 100px;
    }
    //无预约内容
    .null-booking {
        margin-top: 60px;
        img {
            display: block;
            width: 150px;
            height: 122px;
            margin: 0 auto;
            position: relative;
            left: 9px;
        }
        div.text {
            margin-top: 20px;
            font-size: 18px;
            color: #BCBCBC;
            line-height: 20px;
            text-align: center;
        }
    }
}


</style>
