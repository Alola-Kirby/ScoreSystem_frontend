<template>
  <div>
    <NavBar></NavBar>
    <div class="body">
      <h2>您当前的全部课程</h2>
      <Table stripe border :columns="columns" :data="rows" width="1000"></Table>
    </div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
  name: "SS_teacherIndex",
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
          key: 'name',
          width: 520
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/SS_teacherPerCourse',
                      query: {
                        classId: this.rows[params.index].class_id
                      }
                    })
                  }
                }
              }, '查看成绩详情')
            ]);
          }
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
      this.$http.get(this.$baseURL + '/teacher/get_class', {params: {
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
        this.$Message.error('获取课程列表失败')
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
