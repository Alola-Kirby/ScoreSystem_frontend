<template>
  <div>
    <NavBar></NavBar>
    <div class="body">
      <h2>您的全部课程成绩</h2>
      <Table stripe border :columns="columns" :data="rows" width="1000"></Table>
    </div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  export default {
    name: "SS_studentIndex",
    components: {NavBar},
    inject: ['reload'],
    data() {
      return {
        columns: [
          {
            title: '课程号',
            key: 'class_id',
            width: 250
          },
          {
            title: '课程名称',
            key: 'class_name',
            width: 520
          },
          {
            title: '成绩',
            key: 'score'
          }
        ],
        rows: [],
        isRouterAlive: true,
      }
    },
    created() {
      this.role = this.$cookie.get('role');
      this.getAllScore()
    },
    methods: {
      getAllScore() {
        this.$http.get(this.$baseURL + '/student/get_score', {params: {
            usrNo: this.$cookie.get('usrNo')
          }}).then(function (res) {
          var detail = res.body
          if (detail.code === 200) {
            this.rows = detail.data
          }
          else {
            this.$Message.error(detail.message)
          }
        }, function (res) {
          this.$Message.error('获取列表失败')
        })
      }
    }
  }
</script>

<style scoped>
  .body {
    left: 280px;
    bottom: 50px;
    /*position: relative;*/
    top: 100px;
    border: 1px black;
    border-radius: 20px;
    margin: 90px 0px 50px 15%;
    padding: 20px;
    width: 75%;
    /*text-align: center;*/
    min-height: 470px;
    min-width: 600px;
    color: black;
  }

  h2 {
    border-left: 5px solid dodgerblue;
    padding: 0 0 0 15px !important;
    font-size: 28px !important;
    margin: 24px 0 !important;
  }
</style>
