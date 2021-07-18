import { request } from '@/utils/request'

// banner
export function getBanner () {
  return request.get('/music/banner')
}

// Login
export function login (name='', pass='') {
	return request.post('/login', {name, pass})
}

// 分页获取文章
export function getArticleByPage (currentPage = 1, pageSize = 10) {
  return request.get('/blog/article/page/' + currentPage + '?pageSize=' + pageSize)
}