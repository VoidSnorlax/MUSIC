import service from '..'
export function getBanner() {
    return service({
        method: 'GET',//发送方式
        url:"/banner?type=2",//请求地址
    })

}/* 封装轮播图请求 */
export function getMusicList() {
    return service({
        method: 'GET',
        url:"/personalized?limit=10",
    })


}/* 封装音乐列表请求 */


export function getSearchMusic(value) {
    return service({
        method: 'GET',
        url:`/search?keywords=${value}`,
    })


}/* 搜索 */

export function login(data) {
    return service({
        method: 'GET',
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`,
    })


}
