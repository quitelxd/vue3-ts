/**
 * @Description:table常用的变量及方法
 * @author Linxd
 * @date 2021/7/1
 */
interface Table {
    page: number,
    size: number,
    total: number
}
export const Table:Table = {
    page: 1,
    size: 10,
    total: 999
    // 组件的“其余部分”
}
