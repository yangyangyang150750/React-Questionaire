/**
 * @description 生成问卷列表
 */

const Mock = require('mockjs')
const Random = Mock.Random

// 获取问卷列表数据方法
function getQuestionList(options={}) {
    // 解构options
    const {len,isDeleted=false,isStar=false}=options

    // 建立结果数组 
    const list = []
    for (let i = 0; i <len; i++) {
        list.push({
            _id: Random.id(),
            title: Random.ctitle(),
            isPublished: Random.boolean(),
            isStar,
            answerCount: Random.natural(50, 100),
            createdAt: Random.datetime(),
            isDeleted,  // 假删除
        })
    }
    return list
}

module.exports = getQuestionList
