import { useState, useRef } from "react";
import { Form, Input, Button, message } from 'antd'
import '../style/css/login.css';
import { myPost } from "./request";
import React from "react";
export default function Login(props: any) {
    const [loginState, setLoginState] = useState<string>('login');
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [registEmail, setRegistEmail] = useState<any>('');
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)
    const [registPassword, setRegistPassword] = useState<string>('');
    const loginform: any = useRef(null);
    const registform: any = useRef(null);

    let toId = (str: string) => {
        let result = '';
        for (let i = 0, l = str.length / 2; i < l; i++) {
            result += str[i].charCodeAt(0);
        }
        return result;
    }
    const loginFinish = () => {
        if (!buttonLoading) {
            const data = {
                type: 'login',
                email: loginEmail,
                password: loginPassword,

            }
            setButtonLoading(true)
            myPost("loginValidate", data).then((res:any) => {
                setButtonLoading(false)
                const text = res.data.text;
                if (text === 'success to login') {
                    props.setLog(loginEmail);
                    loginform.current?.resetFields()
                }
                else message.error('密码错误')
            })

        }

    }
    const registFinish = () => {
        if (!buttonLoading) {
            setButtonLoading(true)
            myPost("loginValidate", {
                type: 'regist',
                email: registEmail,
                password: registPassword,
                id: toId(registEmail)
            })
                .then((res:any) => {
                    setButtonLoading(false)
                    const text = res.data.text;
                    if (text === 'success to regist') {
                        message.success('注册成功');
                        setLoginState('login')
                    }
                    else if (text === 'fail to regist:this email has been registed') message.warning('该账号已被注册，请回到登陆界面登录')

                })
        }
    }

    const validateMessage = {
        required: '${label}is required',
        types: {
            email: '${label} is not a valid email!',
        },
    }
    const login = () => <div className='loginContainer'>
        <Form
            ref={loginform}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={loginFinish}
            onFinishFailed={() => console.log('fail')}
            validateMessages={validateMessage}
            validateTrigger={'onFinsh'}
        >
            <Form.Item
                label="邮箱"
                name="username"
                rules={[{ required: true, type: 'email', message: '请正确填写邮箱格式!' }]}
                className='formItem'
            >
                <Input onChange={(event: any) => setLoginEmail(event.target.value)} />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请填写您的密码!' }]}
                className='formItem'
            >
                <Input.Password onChange={(event: any) => setLoginPassword(event.target.value)} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" loading={buttonLoading} htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
    </div>

    const regist = () => <div className='registContainer'>
        <Form
            ref={registform}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={registFinish}
            validateMessages={validateMessage}
            validateTrigger={'onFinsh'}
        >
            <Form.Item
                label="邮箱"
                name="username"
                rules={[{ required: true, type: 'email', message: '请正确填写邮箱格式!' }]}
            >
                <Input onChange={(event: any) => setRegistEmail(event.target.value)} />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请填写您的密码!' }]}
            >
                <Input.Password onChange={(event: any) => setRegistPassword(event.target.value)} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" loading={buttonLoading} htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    </div>

    return (
        <div className='loginPart'>
            <div className='titleContainer'>
                <h2>{loginState === 'login' ? '请输入邮箱密码进行登录' : '请输入邮箱密码完成注册'}</h2>
                <p onClick={() => setLoginState(loginState === 'login' ? 'regist' : 'login')}>{loginState === 'login' ? '注册帐号' : '登录'}</p>
            </div>
            {loginState === 'login' ? login() : regist()}
        </div>
    )
}