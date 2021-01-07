<template>
    <div style="background: #4d5669; position: fixed; height:100%;width: 100%;">
        <div class="box-login">
            <div class="box-body">
                <div class="box-body-head">登 录</div>
                <div class="box-body-main">
                    <Tabs value="student" v-model="role">
                        <TabPane label="学 生" name="student"></TabPane>
                        <TabPane label="教 师" name="teacher"></TabPane>
<!--                        <TabPane label="管 理 员" name="administrator"></TabPane>-->
                    </Tabs>
                    <Input v-model="usrNo" prefix="md-person" placeholder="请输入账号" clearable size="large"></Input>
                    <Input v-model="password" type="password" @keyup.enter.native="login" prefix="md-lock"
                           placeholder="请输入密码" clearable size="large"></Input>
                    <Button type="primary" class="btn" size="large" shape="circle" @click="login">登录</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LInput from '../components/InputWithLabel.vue'

    export default {
        components: {
            LInput
        },
        name: "login",
        data() {
            return {
                role: 'student',
                usrNo: '',
                password: '',
                username: '',
            }
        },
        methods: {
            login() {
                this.$http.get(this.$baseURL + "/user/login", {params:{
                    'usrNo': this.usrNo,
                    'password': this.password,
                    'role': this.role,
                  }})
                  .then(function (res) {
                    console.log(res)
                    if (res.body.code === 200) {
                        this.$cookie.set('usrNo', this.usrNo);
                        this.$cookie.set('role', this.role);
                        this.$cookie.set('username', res.body.data);
                        if (this.role === 'student') {
                          this.$router.push({
                            path: '/SS_studentIndex',
                          });
                        } else {
                          this.$router.push({
                            path: '/SS_teacherIndex',
                          });
                        }
                    } else {
                        this.$Message.error(res.body.message)
                    }
                }, function (res) {
                    console.log(res)
                })
            },
        }
    }
</script>

<style scoped>
    .box-login {
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

    .box-body {
        width: 100%;
        height: 100%;
        padding: 10px;
        border-radius: 8px;
        background-color: #FFFFFF;
        box-shadow: 2px 2px 20px #9ea7b4;
    }

    .box-body-head {
        font-size: x-large;
        margin: 15px;
        padding: 10px;
    }

    .box-body-main {
        margin: 10px;
    }

    .box-body-foot {
        color: #9ea7b4;
        padding: 5px;
        font-size: small;
    }

    .box-body-main >>> .ivu-input-wrapper {
        margin: 10px 0 10px 0;
        width: 95%;
    }

    .box-body-main >>> .ivu-input {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: #9ea7b4 1px solid;
        border-radius: 0;
    }

    .box-body-main >>> .ivu-input:focus {
        box-shadow: 0 0 0;
        border-bottom: #9137F3 1px solid;
    }

    .btn {
        color: #FFFFFF;
        width: 90%;
        padding: 10px;
        margin-top: 30px;
    }

    .register-input {
        width: 300px;
    }

    .ivu-row-flex {
        margin-bottom: 7px;
    }
</style>
