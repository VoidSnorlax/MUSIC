import service from '..'
export function getItem(id) {
    return service({
        methods: 'GET',
        url: `/playlist/detail?id=${id}`//携带id参数

    })
}/* 获取歌单信息 */
export function getMusicList(id) {
    return service({
        methods: 'GET',
        url: `/playlist/track/all?id=${id}&limit=7&offset=0`

    })
}/* 获取歌曲列表 */
export function getMusicLyric(data) {
    return service({
        methods: 'GET',
        url: `/lyric?id=${data}`
    })
}
