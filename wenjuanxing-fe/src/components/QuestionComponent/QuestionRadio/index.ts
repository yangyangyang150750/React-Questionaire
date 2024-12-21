import { QuestionRadioPropsDefaultValue } from './interface'

import Component from './Component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'

export * from './interface'

export default {
  title: '单选',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioPropsDefaultValue,
  // 统计组件
  StatComponent,
}
