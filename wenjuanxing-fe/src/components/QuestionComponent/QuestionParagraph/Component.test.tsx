import { render, screen } from '@testing-library/react'
import React from 'react'
import Component from './Component'
import '@testing-library/jest-dom'

// 测试用例
test('默认属性', () => {
  // 渲染组件
  render(<Component />)
  // 根据文本内容 获取对应dom
  const span = screen.getByText('一行段落')
  // 断言
  expect(span).toBeInTheDocument()
})

// 测试用例
test('传入属性', () => {
  render(<Component title="hello" isCenter={true} />)
  const span = screen.getByText('hello')
  expect(span).toBeInTheDocument()
  // 获取父元素
  const p = span.parentElement
  expect(p).not.toBeNull()

  const style = p?.style
  expect(style?.textAlign).toBe('center')
})

// 测试用例
test('多行文字', () => {
  render(<Component title={'a\nb\n'}></Component>)
  const span = screen.getByText('a')
  expect(span).toBeInTheDocument()

  expect(span).not.toHaveTextContent('ab')
})
