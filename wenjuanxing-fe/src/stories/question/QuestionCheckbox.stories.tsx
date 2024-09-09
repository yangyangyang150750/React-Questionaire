import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from '../../components/QuestionComponent/QuestionCheckbox/Component';

const meta = {
  title: 'Question/QuestionCheckbox',
  component:Component,
} satisfies Meta<typeof Component>;
// ts中 typeof 返回的是类型
// js中 typeof 返回的是字符串

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// 默认属性
export const Default: Story = {
  args: {
    
  },
};

// 设置属性
export const SetProps: Story = {
  args: {
    title:'hello',
    list:[
      {value:'v1',text:'t1',checked:false},
      {value:'v2',text:'t2',checked:true},
      {value:'v3',text:'t3',checked:false},
    ],
    isVertical:true 
  },
};

