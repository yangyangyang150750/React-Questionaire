
import Component from'./Component'
import { QuestionInfoPropsDefaultValue } from './interface'
import PropComponent from './PropsComponent'

export * from './interface'

export default{
    title:'问卷信息',
    type:'questionInfo',
    Component,
    PropComponent,
    defaultProps:QuestionInfoPropsDefaultValue
}