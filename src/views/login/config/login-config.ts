export interface AccountRuleForm {
  name: string
  password: string
}

export interface PhoneRuleForm {
  num: string
  code: string
}

export const rules = {
  name: [
    {
      required: true,
      message: '账号是必填项~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字~',
      trigger: 'blur'
    }
  ]
}
