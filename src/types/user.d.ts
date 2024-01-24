// 登录
export interface loginRes {
    username: string
    password: string
    type: 0 | 1
}

export interface wxLoginReq {
    code: string
    ticket: string
    url: string
}

export interface wxLogin1Req {
    access_token: string
}

export interface registerApi {
    access_token: string
    expires_in: number
}

export interface wxLoginRes {
    code: string
    state: string
}

// 注册
export interface registerRes {
    pid?: number | null
    code: string
    username?: string | undefined
    email?: string | undefined
    password: string
    confirmPassword: string
    type: 0 | 1
}

// 获取用户信息
export interface UserInfoApi {
    userId: string
    userName: string
    nickName: string
    userType: string
    email: string
    phonenumber: string
    openId: string
    sex: string
    avatar: null
    password: string
    status: string
    delFlag: string
    loginIp: string
    loginDate: 0
    createBy: string
    createTime: 0
    updateBy: string
    updateTime: 0
    remark: string
}
