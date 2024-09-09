import { render,screen } from "@testing-library/react";
import React from "react";
import Component from './Component'
import '@testing-library/jest-dom'

// 测试用例
test('默认属性',()=>{
    // 渲染组件
    render(<Component/>)
    // 根据文本内容 获取对应dom
    const h = screen.getByText('问卷标题')
    // 断言 
    expect(h).toBeInTheDocument()
})

// 测试用例
test('传入属性',()=>{
    render(<Component title="hello" desc="world"/>)
    const h1 = screen.getByText("hello")
    const h2 = screen.getByText("world")

    expect(h1).toBeInTheDocument()
    expect(h2).toBeInTheDocument()
})

// 测试用例
test('多行文字',()=>{
    render(<Component desc={'a\nb\n'}></Component>)
    const span = screen.getByText('a')
    expect(span).toBeInTheDocument()

    expect(span).not.toHaveTextContent('ab')
})