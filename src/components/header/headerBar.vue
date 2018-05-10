<template>
  <div class="header">
    <ul>
        <li><router-link to="/teacher/courseCenter">Course Center</router-link></li>
        <li><router-link to="/teacher/courseComment">Course Comment</router-link></li>
        <li><router-link to="/teacher/scheduling">Scheduling</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data () {
    return {
    //   msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
    
    ul{
        padding: 0px;
        margin: 0px;
        height: 65px;
        background: #006FBC;
        li{
            display: inline-block;
            width: 30%;
            list-style: none;
            color: #ffffff;
        }
    }
}
</style>
