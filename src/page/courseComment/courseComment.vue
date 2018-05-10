<template>
  <div class="courseComment-page">
  <HeaderBar></HeaderBar>
    <div class="g-main">
      <div class="course-title">
            <i></i>Comments Center
      </div>
      <div class="course-type">
            <div class="course-order-item" v-bind:class="{'selected': courseOrderItem.selected}" v-on:click="
                filterByCategory(courseOrderItem.courseType,$index,courseOrderItem.selected,timeDifference)" v-for="courseOrderItem in teacherCourseTypeList">
                <div class="option">
                    {{courseOrderItem.courseTypeEnglishName}}
                </div>
            </div>
        </div>
    </div>
  <FooterBar></FooterBar>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/headerBar'
import FooterBar from '@/components/footer/footerBar'
export default {
  name: 'CourseComment',
  data () {
    return {
      teacherCourseTypeList:[],
      teacherInfo:'',
      teacherCourseTypeList:'',
    }
  },
  components: {
            HeaderBar,
            FooterBar
        },
        created(){
          var utils = this.$utils;
          // this.teacherInfo = utils.getTeacherInfoCookies();
          // this.teacherCourseTypeList = this.teacherInfo.teacherCourseTypeList;
        },
        methods:{

        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.courseComment-page{
  .g-main{
    width: 1200px;
    margin: 20px auto 70px;
    background: #fff;
    font-family: Arial;
    box-sizing: border-box;
    border: none!important;
    padding: 0 0 20px!important;
  }
  .course-title{
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
}

</style>
