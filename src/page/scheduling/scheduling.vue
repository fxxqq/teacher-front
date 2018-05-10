<template>
  <div class="scheduling">
    <el-container>
      <el-header>
        <HeaderBar></HeaderBar>
      </el-header>
      <el-main>
        <div class="scheduling-page teacher-center">
          <div class="page-title">
            <div class="name">scheduling</div>
          </div>
          <div class="scheduling-content">
            <div class='scheduling-date-picker'>
              <div class="label"> Date:</div>
              <el-date-picker v-model="startDate" type="date" placeholder="date: yyyy-mm-dd">
              </el-date-picker>
              <el-date-picker v-model="endDate" type="date" placeholder="date: yyyy-mm-dd">
              </el-date-picker>
            </div>
            <div class='scheduling-startTime-picker picker-line'>
              <div class="label"> startTime:</div>
              <el-select v-model="startTime" multiple placeholder="请选择">
                <el-option v-for="itemStart in optionsStart" :key="itemStart.value" :label="itemStart.label" :value="itemStart.value">
                </el-option>
              </el-select>
            </div>
            <div class='scheduling-endTime-picker picker-line'>
              <div class="label"> endTime:</div>

            </div>

          </div>
        </div>
      </el-main>
      <el-footer>
        <FooterBar></FooterBar>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import Vue from "vue";
import HeaderBar from "@/components/header/headerBar";
import FooterBar from "@/components/footer/footerBar";
import { DatePicker } from "element-ui";
Vue.use(DatePicker);
export default {
    name: "Scheduling",
    data() {
        return {
            startDate: "",
            endDate: "",
            startTime:"",
            optionsStart:{}
        };
    },
    components: {
        HeaderBar,
        FooterBar,
        DatePicker
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "./scheduling.scss";
</style>
