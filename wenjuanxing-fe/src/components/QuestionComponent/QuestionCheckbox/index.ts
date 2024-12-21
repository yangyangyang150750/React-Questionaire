import Component from './Component'
import { QuestionCheckboxDefaultProps } from './Interface'
import PropComponent from './PropsComponent'
import StatComponent from './StatComponent'

export * from './Interface'

export default {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
}
