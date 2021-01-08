<template>
    <div>
        <NavBar></NavBar>
        <div class="body">
            <h3>请修改您的基础信息</h3>
            <div style="margin: 45px 0 0 0; width: 40%">
              <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="109">
                <FormItem prop="usrName" label="用户名：">
                  <Input type="text" v-model="formInline.usrName" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="oldPassword" v-if="modifyPsw" label="原密码：">
                  <Input type="password" v-model="formInline.oldPassword" placeholder="原密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="newPassword" v-if="modifyPsw" label="新密码：">
                  <Input type="password" v-model="formInline.newPassword" placeholder="新密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="newPasswordConfirm" v-if="modifyPsw" label="新密码确认：">
                  <Input type="password" v-model="formInline.newPasswordConfirm" placeholder="新密码确认">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem style="margin-top: 35px">
                  <Button type="primary" style="margin-right: 25px" @click="changeIfModifyPsw">修改密码</Button>
                  <Button type="success"  @click="handleSubmit('formInline')">完成</Button>
                </FormItem>
              </Form>
            </div>
        </div>
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
    import NavBar from '../components/NavBar'
    import LInput from '../components/InputWithLabel'
    export default {
      components:{
          NavBar,
          LInput
      },
      inject: ['reload'],
      data () {
        return {
          modifyPsw: false,
          isRouterAlive: true,
          inject: ['reload'],
          formInline: {
            usrName: '',
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: ''
          },
          ruleInline: {
            usrName: [
              { required: true, message: '请输入您想要修改为的用户名', trigger: 'blur' }
            ],
            oldPassword: [
              { required: true, message: '请输入原密码', trigger: 'blur' }
            ],
            newPassword: [
              { required: true, message: '请输入新密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码长度不得小于6位', trigger: 'blur' }
            ],
            newPasswordConfirm: [
              { required: true, message: '请重新输入新密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码长度不得小于6位', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              var that = this
              this.$http.get(this.$baseURL + '/modifyInfo', {params: {
                  oriUsrNo: this.$cookie.get('usrNo'),
                  usrName: this.formInline.usrName,
                  oldPassword: this.formInline.oldPassword,
                  newPassword: this.formInline.newPassword,
                  newPasswordConfirm: this.formInline.newPasswordConfirm
                }}).then(function (res) {
                var detail = res.body
                if (detail.code === 200) {
                  this.rows = detail.data
                  this.$cookie.set('username', that.formInline.usrName)
                  this.reload()
                  this.$Message.success(detail.message)
                }
                else {
                  this.$Message.error(detail.message)
                }
              }, function (res) {
                this.$Message.error('信息修改失败')
              })
            } else {
              this.$Message.error('信息填写不符合规范！');
            }
          })
        },
        changeIfModifyPsw() {
          this.modifyPsw = !this.modifyPsw
        }
      }
    }
</script>

<style scoped>
    .body{
        left: 280px;
        bottom: 50px;
        /*position: relative;*/
        top: 100px;
        border: 1px black;
        border-radius: 20px;
        margin: 100px 0px 50px 30%;
        padding: 20px;
        width: 75%;
        /*text-align: center;*/
        min-height: 470px;
        min-width: 600px;
        color: black;
    }
    h3{
        border-left: 5px solid purple;
        padding: 0 0 0 15px!important;
        font-size: 26px!important;
        margin: 24px 0!important;
    }
    >>>.ivu-checkbox-large{
        margin-bottom: 10px;
        text-align: center;
        font-weight: 400;
    }

    .box-login{
        width: 20%;
        height: 53%;
        min-height: 400px;
        min-width: 320px;
        position: absolute;
        left: 40%;
        top: 23%;
        text-align: center;
        font-weight: lighter;
    }
    .box-body{
        width: 100%;
        height: 100%;
        padding: 10px;
        border-radius: 8px;
        background-color: #FFFFFF;
        box-shadow: 2px 2px 20px #9ea7b4;
    }
    .box-body-head{
        font-size: x-large;
        margin: 15px;
        padding: 10px;
    }
    .box-body-main{
        margin: 10px;
    }
    .box-body-foot{
        color: #9ea7b4;
        padding: 5px;
        font-size: small;
    }
    .box-body-main >>>.ivu-input-wrapper{
        margin: 10px 0 10px 0;
        width:95%;
    }
    .box-body-main>>>.ivu-input{
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: #9ea7b4 1px solid;
        border-radius: 0;
    }
    .box-body-main>>>.ivu-input:focus{
        box-shadow: 0 0 0 ;
        border-bottom:#9137F3 1px solid;
    }
    .btn{
        color: #FFFFFF;
        width:90%;
        padding: 10px;
        margin-top: 30px;
    }
    .register-input{
        width: 300px;
    }
    .ivu-row-flex{
        margin-bottom: 7px;
    }
</style>
