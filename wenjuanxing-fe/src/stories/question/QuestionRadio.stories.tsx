import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from '../../components/QuestionComponent/QuestionRadio/Component';

const meta = {
  title: 'Question/QuestionRadio',
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
    options:[
      {value:'v1',text:'t1'},
      {value:'v2',text:'t2'},
      {value:'v3',text:'t3'},
    ],
    value:'v1',
    isVertical:true 
  },
};

