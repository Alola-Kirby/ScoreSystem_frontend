<template>
  <div>
    <NavBar></NavBar>
    <div class="body">
      <h2>{{class_name}}</h2>
<!--      通过文本框的形式修改or添加成绩-->
      <div>
      </div>
      <Table stripe border :columns="columns" :data="rows" width="900"></Table>
    </div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
  name: "SS_teacherPerCourse",
  components: {NavBar},
  inject: ['reload'],
  data() {
    return {
      class_id: 1,
      class_name: '不存在的课程',
      modified_score: 1,
      isRouterAlive: true,
      inject: ['reload'],
      columns: [
        {
          title: '学生学号',
          key: 'stu_id',
          width: 250
        },
        {
          title: '学生姓名',
          key: 'stu_name',
          width: 250
        },
        {
          title: '学生成绩',
          key: 'score',
          width: 200
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('button', {
                props: {
                  type: 'text',
                  size: 'small',
                },
                on: {
                  click: () => {
                    var that = this
                    this.$Modal.confirm({
                      render: (h) => {
                        return h('div', [
                          h('h4', {
                            props: {

                            }
                          }, '修改成绩'),
                          h('Input', {
                            props: {
                              autofocus: true,
                              placeholder: '请输入修改后的成绩'
                            },
                            on: {
                              input: (filled_score) => {
                                this.$data.modified_score = filled_score
                              }
                            }
                          })
                        ])
                      },
                      onOk: () => {
                        this.$http.get(this.$baseURL + '/teacher/update_score', {params: {
                            stu_id: params.row.stu_id,
                            class_id: that.$data.class_id,
                            score: that.$data.modified_score
                          }}).then(function (res) {
                          if (res.body.code === 200) {
                            that.modifyScore(params.index)
                            this.$Message.success('修改成功')
                          }
                          else {
                            this.$Message.error('修改失败')
                          }
                        }, function (res) {
                          this.$Message.error('网络错误，请稍后再试')
                        })
                      },
                      draggable: true
                    })
                  }
                }
              }, '修改成绩')
            ])
          }
        },
      ],
      rows: [],
    }
  },
  created() {
    this.$data.class_id = this.$route.query.classId ? this.$route.query.classId : 'unknown'
    this.getClassScoreDetail()
  },
  methods: {
    getClassScoreDetail() {
      this.$http.get(this.$baseURL + '/getClassName', {params: {
          class_id: this.$data.class_id
        }}).then(function (res) {
        var detail = res.body
        if (detail.code === 200) {
          this.class_name = detail.data
        }
      }, function (res) {
        this.$Message.error('获取课程名称失败')
      })
      this.$http.get(this.$baseURL + '/teacher/get_score', {params: {
          class_id: this.$data.class_id
        }}).then(function (res) {
        var detail = res.body
        if (detail.code === 200) {
          this.rows = detail.data
        }
        else {
          this.$Message.error(detail.message)
        }
      }, function (res) {
        this.$Message.error('获取成绩列表失败')
      })
    },
    modifyScore(index) {
      this.rows[index] = this.modified_score
      this.reload()
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
