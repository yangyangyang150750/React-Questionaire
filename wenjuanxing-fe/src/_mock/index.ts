
import Mock from 'mockjs'

// 
Mock.mock('/api/test','get',()=>{
    return{
        errno:0,
        data:{
            name:`yyy ${Date.now()}`
        }
    }
})