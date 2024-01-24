import {ElMessage} from 'element-plus'

// 点击复制
export const copy = (val: any) => {
    if (!val) return ElMessage.error('复制内容为空！')
    navigator.clipboard
        .writeText(val)
        .then(() => {
            ElMessage.success('复制成功')
        })
        .catch(() => {
            ElMessage.error('复制失败！')
        })
}
