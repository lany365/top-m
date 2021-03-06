
/****文章相关请求模块****/

import request from '@/utils/request'

/****获取文章列表****/

export const getArticles = (params) => {
  return request({
    method: "GET",
    url: '/app/v1_1/articles',
    params
  })
}



/****获取文章详情****/

export const getArticlesById = articleId => {
  return request({
    method: "GET",
    url: `/app/v1_0/articles/${articleId}`
  })
}


/****获取收藏****/

export const addCollect = articleId => {
  return request({
    method: "POST",
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}

/****取消收藏文章****/

export const deleteCollect = articleId => {
  return request({
    method: "DELETE",
    url: `/app/v1_0/article/collections/${articleId}`
  })
}


/****获取点赞****/

export const addLike = articleId => {
  return request({
    method: "POST",
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/****取消点赞****/

export const deleteLike = articleId => {
  return request({
    method: "DELETE",
    url: `/app/v1_0/article/likings/${articleId}`
  })
}


/**
 * 获取当前用户收藏文章列表
 */
export function getUserCollectArticles (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/article/collections',
    params
  })
}

/**
 * 获取当前用户阅读历史文章列表
 */
export function getUserHistoryArticles (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/histories',
    params
  })
}

