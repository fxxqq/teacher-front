<template>
    <div class="login-page">
        <div class="homepage-hero-module">
            <div class="video-container">
                <div :style="fixStyle" class="filter"></div>
                <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
                    <source src="https://teenagercdn.speakhi.com/front/teacher/video/login.mp4" type="video/mp4" /> 浏览器不支持 video 标签，建议升级浏览器。
                    <!-- <source src="PATH_TO_WEBM" type="video/webm" /> 浏览器不支持 video 标签，建议升级浏览器。 -->
                </video>
                <div class="poster hidden" v-if="!vedioCanPlay">
                    <img :style="fixStyle" src="https://teenagercdn.speakhi.com/front/teacher/video/login.jpg" alt="">
                </div>
            </div>
            <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="login-ruleForm">
                <div class="login-box">
                    <div class="logo">
                        <img src="@/page/login/img/logo.png">
                    </div>
                    <el-form-item label="" prop="account" :rules="loginRules.account">
                        <input type="account" autocomplete="off" placeholder="USERNAME" class="none">
                        <el-input type="account" v-model="loginForm.account" auto-complete="off" placeholder="USERNAME"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="PASSWORD"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="loginLoading" @click="submitLogin('loginForm')">Login</el-button>
                    </el-form-item>
                </div>
                <div class="copyright">
                    <p>
                        Copyright 2018 © Web International English, All Right Reserved 
                    </p>
                    <p>
                        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402000617" target="_blank">
                            <em class="record-icon"></em>
                            <span>
                                沪公网安备 31010402000617号
                            </span>
                        </a>
                    </p>
                </div>
            </el-form>
        </div>

    </div>
</template>

<script>
import Vue from "vue";
import sha512 from "js-sha512";

import { Form, FormItem } from "element-ui";

Vue.use(Form);
Vue.use(FormItem);

export default {
    name: "Login",
    data() {
        return {
            basePath: this.basePath,
            account: "",
            password: "",
            loginForm: {
                account: "",
                password: ""
            },
            loginRules: {
                account: [
                    {
                        required: true,
                        message: "Please enter a teacher account",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "Please enter a password",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 20,
                        message: "Password length of 6 to 20",
                        trigger: "blur"
                    }
                ]
            },
            loginLoading: false,
            vedioCanPlay: false,
            fixStyle: ""
        };
    },
    mounted: function() {
        window.onresize = () => {
            const windowWidth = document.body.clientWidth;
            const windowHeight = document.body.clientHeight;
            const windowAspectRatio = windowHeight / windowWidth;
            let videoWidth;
            let videoHeight;
            if (windowAspectRatio < 0.5625) {
                videoWidth = windowWidth;
                videoHeight = videoWidth * 0.5625;
                this.fixStyle = {
                    height: windowWidth * 0.5625 + "px",
                    width: windowWidth + "px",
                    "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
                    "margin-left": "initial"
                };
            } else {
                videoHeight = windowHeight;
                videoWidth = videoHeight / 0.5625;
                this.fixStyle = {
                    height: windowHeight + "px",
                    width: windowHeight / 0.5625 + "px",
                    "margin-left": (windowWidth - videoWidth) / 2 + "px",
                    "margin-bottom": "initial"
                };
            }
        };
        window.onresize();
    },
    // 在 `methods` 对象中定义方法
    methods: {
        submitLogin(formName) {
            // `this` 在方法里指向当前 Vue 实例
            const that = this;
            const api = that.$api;
            const utils = that.$utils;
            const pop = that.$pop;
            // console.log(this);
            // console.log(that.loginForm);

            that.$refs[formName].validate(valid => {
                if (valid) {
                    let loginPasswordSha512, loginPasswordSha512AddDate;
                    loginPasswordSha512 = sha512(that.loginForm.password);
                    console.log(66, "服务器时间戳", utils.getServeTimeStamp());
                    let serverTime = utils.getServeTimeStamp();

                    // console.log(utils.changeTimeZone(utils.getServeTimeStamp()));
                    let todayDate =
                        utils.changeTimeZone(serverTime).year +
                        "-" +
                        utils.changeTimeZone(serverTime).month +
                        "-" +
                        utils.changeTimeZone(serverTime).date;
                    console.log(66, "北京时间yyyy-MM-dd", todayDate);
                    loginPasswordSha512AddDate = sha512(
                        loginPasswordSha512 + todayDate
                    );
                    that.loginLoading = true;
                    let params = {
                        url: "/api/teacherCenter/login",
                        sendObj: {
                            account: that.loginForm.account,
                            pwd: loginPasswordSha512AddDate
                        }
                    };
                    api
                        .post(params)
                        .then(function(res) {
                            that.loginLoading = false;
                            //   JSON.parse(res.data).data;
                            // if(Da)
                            console.log(66, "登录接口返回数据", res);
                            let data = res.data;

                            if (data.code == 200) {
                                utils.saveTeacherInfoCookies(
                                    data.data,
                                    function() {
                                        that.$router.push(
                                            "/teacher/courseCenter"
                                        );
                                    }
                                );
                            } else if (data.code == 404) {
                                pop.surePopup(
                                    "The user name or password error!"
                                );
                            } else {
                                api.reqSuccess(pop, data.code);
                            }
                        })
                        .catch(function(err) {
                            console.log(66, "登录接口错误日志", err);
                            pop.surePopup(
                                "The system is abnormal!",
                                function() {
                                    that.loginLoading = false;
                                }
                            );
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        canplay() {
            this.vedioCanPlay = true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "./login.scss";
</style>
