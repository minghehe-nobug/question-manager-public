<template>
    <div id="userLayout" :class="['user-layout-wrapper', device]">
        <div class="container">
            <div class="top">
                <div class="header">
                    <span class="title">登录</span>
                </div>
                <div class="desc">
                    Ant Design 风格的问卷系统
                </div>
            </div>

            <div class="main">

                <a-form :form="form" id='components-form-demo-normal-login' @submit="handleSubmit" class='login-form'>
                    <a-form-item>
                        <a-input
                                placeholder='账号'
                                v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入账号!' }] }
        ]"
                        >
                            <a-icon slot="prefix" type='user' style="color: rgba(0,0,0,.25)"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input
                                v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] }
        ]"
                                type='password'
                                placeholder='密码'
                        >
                            <a-icon slot="prefix" type='lock' style="color: rgba(0,0,0,.25)"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-checkbox
                                v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
                        >
                            记住我
                        </a-checkbox>
                        <a class='login-form-forgot' href='#'>忘记密码</a>
                        <a-button type='primary' htmlType='submit' class='login-form-button'>
                            登录
                        </a-button>
                        <router-link :to="{path: '/register'}">
                        注册账号！
                        </router-link>
                    </a-form-item>
                </a-form>
            </div>


            <div class="footer">
                <div class="links">
                    <a href="#">帮助</a>
                    <a href="#">隐私</a>
                    <a href="#">条款</a>
                </div>
                <div class="copyright">
                    Copyright &copy; 2019
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {loginApi} from '@/api/user';
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'UserLogin',
        data() {
            return {
                device: ''
            }
        },
        mounted() {
            document.body.classList.add('userLayout');
            console.log(this.currentUser);
        },
        beforeDestroy() {
            document.body.classList.remove('userLayout')
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let paramData = {
                            userName: values.userName,
                            userPw: values.password
                        };
                        console.log('post: ', paramData);

                      this.$store.dispatch('getUserInfo', paramData).then( (res) => {
                        if(!this.currentUser.isLogin){
                          this.$message.error(this.currentUser.userInfo);
                          return;
                        }
                        this.$router.push({path: '/test/page2'});
                      });
                    }
                });
            },
        },
      computed: {
        ...mapState([
          'userInfo', 'token'
        ]),
        ...mapGetters([
          'currentUser',
        ])
      }
    }
</script>

<style lang="scss" scoped>
    #userLayout.user-layout-wrapper {
        height: 100%;

        &.mobile {
            .container {
                .main {
                    max-width: 368px;
                    width: 98%;
                }
            }
        }

        .container {
            width: 100%;
            min-height: 100%;
            background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
            background-size: 100%;
            padding: 110px 0 144px;
            position: relative;

            a {
                text-decoration: none;
            }

            .top {
                text-align: center;

                .header {
                    height: 44px;
                    line-height: 44px;

                    .badge {
                        position: absolute;
                        display: inline-block;
                        line-height: 1;
                        vertical-align: middle;
                        margin-left: -12px;
                        margin-top: -10px;
                        opacity: 0.8;
                    }

                    .logo {
                        height: 44px;
                        vertical-align: top;
                        margin-right: 16px;
                        border-style: none;
                    }

                    .title {
                        font-size: 33px;
                        color: rgba(0, 0, 0, .85);
                        font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                        font-weight: 600;
                        position: relative;
                        top: 2px;
                    }
                }
                .desc {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.45);
                    margin-top: 12px;
                    margin-bottom: 40px;
                }
            }

            .main {
                min-width: 260px;
                width: 368px;
                margin: 0 auto;

                .login-form-forgot {
                    float: right;
                }
                .login-form-button {
                    width: 100%;
                }
            }

            .footer {
                position: absolute;
                width: 100%;
                bottom: 0;
                padding: 0 16px;
                margin: 48px 0 24px;
                text-align: center;

                .links {
                    margin-bottom: 8px;
                    font-size: 14px;
                    a {
                        color: rgba(0, 0, 0, 0.45);
                        transition: all 0.3s;
                        &:not(:last-child) {
                            margin-right: 40px;
                        }
                    }
                }
                .copyright {
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 14px;
                }
            }
        }
    }
</style>