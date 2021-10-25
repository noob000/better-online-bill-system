import axios from "axios";
const request = axios.create({
    baseURL: 'https://qca83o.fn.thelarkcloud.com/',
    timeout: 3000
})
const myPost = (url: string, data: any) => {
    return request({
        url: url,
        method: "post",
        data: data
    })
}
export {myPost}