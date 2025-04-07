import request from "@/utils/request"

export function getTest(params) {
    return request({
        params: params,
        url: 'https://jsonplaceholder.typicode.com/comments',
        method: 'get',
    })
} 