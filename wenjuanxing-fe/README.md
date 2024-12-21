使用CRA创建react项目（而不是vite
- 官网推荐
- 时间久、资源多
- 稳定性更好
JSX语法
概念：是JS的扩展，允许在JS中书写HTML代码
TypeScript 的泛型

REACT Hooks
内置hooks
useState
1. 概念：用于在函数组件中添加状态管理
2. 用法：useState 接受一个初始状态作为参数，并返回一个数组，数组的第一个元素是当前状态，第二个元素是更新状态的函数。
3. 特点
  - 局部性：适合管理组件内部状态，而非全局状态
  - 调用方式：不能在条件语句中调用，必须在组件顶层调用（确保react可以正确跟踪hook调用顺序
  - 返回值：返回值是一个数组，包含当前状态以及更新函数
  - 异步性：react会将对状态的更新放在下一个渲染周期中，从而批量处理，提升性能。(若想状态的更新后，立即得到状态最新值，可以使用函数式更新
useEffect
1. 概念：副作用函数
2. 参数：effect函数以及依赖数组（可选
  - effect函数
    - 可以设定返回值，作为清理函数
  - 依赖数组
    - 为空时，每次组件渲染都会执行
    - 无依赖时，组件挂载时执行
    - 有依赖时，依赖对象改变时执行
useRef
1. 概念：创建引用，常用于创建dom的引用以及存储变量，不会触发rerender
useMemo
1. 概念：用于缓存计算结果，而不必每次渲染都重新执行
2. 参数：
  1. 工厂函数
    1. 通常是有复杂计算的函数
  2. 依赖数组
    1. 记录依赖值
3. 使用场景
  1. 计算复杂，且依赖项不常变化
  2. 渲染列表以及复杂计算
useCallback
1. 概念：用于缓存函数，而不必每次渲染都重新执行
2. 参数：
  1. memorized回调函数
  2. 依赖数组
    1. 当依赖项改变时，useCallback会返回新的回调函数
Hooks使用注意事项：
1. 书写位置：不要写在条件、循环语句中，要写在组件顶层，注意书写顺序
2. 不可变数据：useState更新数据时，需要返回新的数据
3. useState设置状态的时候，只有第一次生效，后期需要更新状态，必须通过useEffect
4. 善用useCallback：父组件传递给子组件事件句柄时，如果我们没有任何参数变动可能会选用useCallback。但是每一次父组件渲染子组件即使没变化也会跟着渲染一次。 
5. 不要滥用useContext：可以使用基于 useContext 封装的状态管理工具。
CSS
尽量不要用内联style
1. 可维护性差
2. 重用性差
3. 优先级问题，可能存在覆盖问题
4. 文件冗余
5. 违反分离原则
CSS Modulesf
1. 概念：CSS预处理器，视CSS为模块，每个模块都有局部作用域，从而避免全局命名冲突
2. 特点：
  1. 局部作用域：默认将样式局部到组件中，每个样式转换成唯一字符串
  2. 避免命名冲突：由于局部性，避免命名冲突
  3. 易于维护：与组件放一起，易于维护
选择CSS Modules而非CSS-IN-JS
1. 简单，学习成本低
2. 性能更好，编译成本低
3. 无需灵活变换样式
路由
路由即网址，路由设计也就是确定网址和页面的关系
本项目核心：业务闭环
路由设计：
1. 首页
2. 登录
3. 注册
4. 404
5. 问卷管理
  1. 我的问卷
  2. 星标问卷
  3. 回收站
6. 问卷详情
  1. 编辑问卷（动态路由
  2. 问卷统计（动态路由
使用React-Router配置路由
createBroswerRouter
1. 概念：创建一个基于浏览器的路由器
2. 使用：
  1. 创建路由器：利用createBroswerRouter方法，传入配置项，创建路由器
  2. 传入路由器：App文件中创建Provider组件，传入创建的路由器
路由跳转使用—useNavigate OR Link组件
1. 概念：返回一个导航函数，实现编程式导航而无需Link组件或其他HTML元素
解析动态参数使用—useParams
1. 用途：用于获取url的动态参数
解析查询参数使用—useSearchParams
1. 用途：用于获取url查询参数
AJAX网络请求
mock服务
1. 概念：模拟真实服务的工具
2. 用途：在后端服务搭建尚未完成时，在前端进行服务模拟
3. 搭建工具：
  1. Mock.js: 但无法劫持fecth，只能劫持XMLHttprequest，axios
  2. Node.js+Mock.js:发挥Mock的Random能力
解决跨域
1. 使用craco扩展webpack配置
  1. 使用到的配置项：devServer、proxy
API设计
1. 使用RestfulAPI 规范
  1. 特点
    2. 资源表示：使用url表示资源
    3. 方法表示：使用标准的HTTP请求方法表示对资源的请求方式
    4. 无状态：每个请求都要包含所有信息
    5. 统一接口：简洁方便
  2. 优点
    1. 扩展性强，方便理解
2. 用户验证使用JWT
3. 统一数据返回格式{errno,data,msg}
4. API内容：
  1. 用户相关
    1. 用户登录
    2. 用户注册
    3. 获取用户信息
  2. 问卷相关
    1. 创建问卷
    2. 更新问卷
    3. 获取单个问卷
    4. 获取问卷列表数据
    5. 批量删除问卷
封装Axios
自定义hook抽离公共逻辑
使用useRequest重构Axios请求
1. 概念：useRequest是一个对异步操作的管理器，可以帮助使用者轻松发起请求，管理加载状态，获取响应结果以及错误处理
2. 参数
  1. 请求函数：
  2. 配置项
    1. manual
    2. onSuccess
    3. onError
    4. refreshOnWindowFocus
    5. refreshDeps
3. 状态管理
  1. data
  2. loading
  3. error
问卷列表分页实现
1. 使用场景：标星问卷、回收站
2. 实现逻辑：
  1. url和分页器的双向数据流动
    1. url=>分页器：
      1. 利用useParams获取searchParams
      2. 使用useEffect监听searchParams，更新分页器数据
    2. 分页器=>url:
      1. 当点击分页时，更新searchParams，并利用useNavigation更新url
问卷列表上滑加载更多实现
1. 场景：我的问卷
2. 实现逻辑：
  1. 触发加载的时机：
    1. 页面首次加载或搜索框搜索关键字
    2. 绑定页面滚动监听器（注意防抖）
      1. 加载更多div露出时，触发加载（getBoundingClientRect 获取元素位置信息；document.body.clientHeight获取视口高度
  2. 发送请求：
    1. 使用useRequest封装获取问卷列表数据请求，并更新数据  
JWT
1. 概念：是一种开放标准（RFC 7519），用于在网络应用环境间安全地传递信息。
2. 组成：头部（Header）、载荷（Payload）和签名（Signature）
3. 场景：用户登录成功后，服务器会返回token，之后请求时都会携带
数据存储使用redux
1. 原因：
  1. 默认支持跨组件通讯
  2. 调试方便
  3. 可拆分模块，适合大型项目
  4. 
开发问卷编辑器
#需求分析#
## 界面模块
1. 顶部栏
2. 左侧：组件库+图层
3. 中间：画布
4. 右侧：属性+设置
## 功能列表
1. 顶部栏
  1. 返回
  2. 修改问卷标题
  3. 工具栏
    1. 删除
    2. 隐藏
    3. 锁定
    4. 复制粘贴
    5. 移动
    6. 撤销重做
  4. 保存 自动保存 快捷键
  5. 发布
2. 左侧
  1. 组件库：
    1. 展示组件列表
    2. 点击添加至画布
  2. 图层
    1. 显示图层列表
    2. 拖拽排序
    3. 单击选中
    4. 双击编辑修改
    5. 隐藏锁定
3. 中间画布
  1. 显示组件列表
  2. Y滚动条
  3. 拖拽排序
  4. 单击选中
  5. 快捷键
        - delete backspace
        - up
        - down
        - ctrl + c , v
        - ctrl + z , ctrl + shift + z
        - ctrl + s ，保存
4. 右侧
  1. 属性
    1. 修改组件属性
  2. 设置
    1. 页面设置：标题，描述，css，js
    2. tab自动切换
## UI设计
设计 UI
拆分组件，拼出界面。
- flex 布局
- 居中对齐
- antd Tabs 组件
重点注意：
- 高度 100%
- 画布的尺寸、定位
  - Top：50% left：50% transform：translateX(-50%) translateY(-50%) 
- 画布的 Y 滚动
  - overflow:hidden overflow:auto
#显示问卷列表
在 EditCanvas 中显示
##新建两个组件
- QuestionTitle
- QuestionInput
## Ajax 获取数据
第一，设计组件的数据结构

```js
// components: [ ... ] ，每个组件有如下结构：
{
    id: 'xxx',
    type: 'questionInfo', // 组件类型，每个组件都固定
    title: '组件标题', // 图层修改标题
    props: {}, // 组件属性，如单选有多少个选项
    // isHidden: false,
    // isLocked: false,
}
```
第二，加载数据
- hooks/useLoadQuestionData.ts
- 数据要放在 Redux store 中，因为各个组件都要使用这个数据，共享 （先不要写 selectedId）
useLoadQuestionData方法逻辑：
1. 封装请求：利用useRequest封装请求问卷方法，设定为手动调用
2. 监听url：利用useEffect监听url动态参数id，改变时调用请求方法
  1. 监听data：利用useEffect监听返回的data数据，改变时利用useDispatch将数据中的列表组件存于Component的redux中；将数据中的页面信息存于PageInfo的redux中 
# 显示在 EditCanvas
把组件拼成 componentConfList 
统一组件配置
1. 每个组件的配置信息包括：
  1. title
  2. type（关键信息
  3. Component 
  4. defaultProps
  5. PropsComponent
  6. StatComponent
2. 创建所有组件配置的列表，同时定义根据type从组件配置列表中获取对应组件配置的方法
注意：CSS 屏蔽鼠标行为
// 画布上每个组件的样式
.component {
    // 屏蔽鼠标行为 使得组件无法被鼠标点击
    pointer-events: none;
}
#点击设置 selectedId
selectedId 要存储在 Redux store 中，各个组件都要使用，共享
// ComponentReducer中：
// 定义组件列表数据类型
export type ComponentsStateType = {
  // 记录已选组件id
  selectedId: string
  // 组件列表
  componentList: Array<ComponentInfoType>
  // 已复制的组件
  copiedComponent: ComponentInfoType | null
}
在 EditCanvas 增加 onClick ，增加 selected 样式
  // 给每个组件绑定点击回调
  // 组件点击时的回调
  function handleClick(event: MouseEvent, id: string) {
    // 阻止向上冒泡
    // 防止触发父组件的清除已选id方法
    event.stopPropagation()
    // 调用更新所选组件id方法
    dispatch(changeSelectedId(id))
  }
  
  // 使用类名拼接
  // 拼接classname
            // 默认样式
            const wrapperDefaultClassName = styles['component-wrapper']
            // 鼠标点击样式
            const selectedClassName = styles.selected
            // 组件锁定样式
            const Locked = styles.Locked

            // 拼接类名
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: selectedId === fe_id,
              [Locked]: isLocked,
            })
Edit/index.ts 中，点击空白处 clearSelectedId
// 清除已选id方法
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
# 属性面板
为每个组件创建属性组件
属性面板
- 根据 selectedId 获取属性组件
- onChange 时同步到 Redux store
实现步骤：
1. tab栏切换：
  1. 利用useGetComponentInfo方法，获取当前已选组件id即selectedId 利用useEffect监听selectedId，实现tab栏切换
2. 属性组件展示：
  1. 利用useGetComponentInfo方法，获取当前已选组件selectedComponent，从中解构出type，再根据type获取对应组件配置，解构出对应属性组件；
  2. 同时给每个组件传入一个onChange方法，在父组件中统一处理，调用changeComponentProps方法，修改Redux Store
# 工具栏
先不管redo undo 之后再做
## 删除
实现逻辑：
1. 利用useDispatch创建分派器，调用移除组件方法
2. 移除组件方法内部逻辑：
  1. 删除已选组件：根据当前已选组件索引获取对应组件，从组件列表中删除此组件
  2. 重新计算新的已选组件id：根据已选组件索引与组件列表长度的大小关系计算
## 隐藏
实现逻辑：
1. 添加isHidden属性：给每个组件都添加一个isHidden属性，用于标识当前组件显示还是隐藏
2. 绑定事件：调用隐藏已选组件方法
3. 隐藏已选组件方法内部逻辑：
  1. 修改当前已选组件属性：修改当前已选组件isHidden属性为true
  2. 重新计算最新已选组件id：根据当前已选组件id与组件列表长度大小关系计算
4. 画布条件渲染：画布渲染时，遍历组件列表，只渲染isHidden为false的组件
## 锁定
实现逻辑：
1. 添加isLocked属性：给每个组件都添加一个isLocked属性，用于标识当前组件是否锁定
2. 绑定事件：调用锁定已选组件方法
3. 锁定已选组件方法内部逻辑：
  1. 修改当前已选组件属性：修改当前已选组件的isLocked属性为false
4. 画布渲染：配置Lock属性，利用classNames进行拼接
## 复制/粘贴
复制实现逻辑：
1. 数据结构：给组件store添加copiedComponent属性
2. 绑定事件：调用复制组件方法
3. 复制组件方法实现逻辑：
  1. 调用lodash的深拷贝方法，拷贝当前已选组件
  2. 将结果赋值给组件store的copiedComponent属性上
粘贴实现逻辑：
1. 绑定事件：调用粘贴组件方法
2. 粘贴组件方法实现逻辑：
  1. 获取复制组件：从组件store身上获取复制组件
  2. 更新复制组件：利用nanoid更新复制组件的id
  3. 加入组件列表：根据当前已选组件id的情况，进行加入 
## 上移下移
和拖拽排序一起做，逻辑类似
## 快捷键
快捷键实现逻辑：
1. 定义使用快捷键方法：
2. 使用快捷键方法实现逻辑：
  1. 定义判断合法激活元素方法：利用document.activeElement属性
  2. 定义绑定快捷键及其回调：利用ahooks内的useKeyPress方法，若是组件，则调用对应操作方法
## 其他组件
根据 QuestionTitle QuestionInput 的规则，补充其他组件
- Paragraph - 文本换行
- Info - 文本换行
- Textarea
- Radio - 使用 `<Form.List>` 动态添加 item
- Checkbox - 使用 `<Form.List>` 动态添加 item
## 图层
1. 组件列表显示：和画布组件列表显示逻辑一致，过滤掉isHidden为false的组件
2. 点击设置 selectedId：
  1. 判断当前组件是否为隐藏组件
  2. 调用设置已选组件id方法
## 页面信息
1. tab栏切换：根据已选组件id动态切换
2. 数据结构：给pageInfo的store内添加js，css属性
3. 表单数据与Redux的联动：
  1. Redux=>表单：
    1. 调用获取页面信息方法，传递给表单
    2. 同时利用useEffect监听页面信息，一旦改变，实时更新
  2. 表单=>Redux：
    1. 给表单绑定onValuesChange方法，一旦值改变，调用设置页面信息方法，实时更新
左上角修改标题：和 pageInfo 是一起的
## 保存和发布
1. 保存功能实现逻辑：
  1. 封装请求：利用useRequest封装更新问卷请求，同时传入问卷id、组件列表、页面信息
  2. 设置快捷键：利用useKeyPress设置快捷键，实现手动保存（需要阻止默认行为
  3. 数据监听：利用带有防抖功能的useDebounceEffect监听组件列表和页面信息，实现自动保存
2. 发布功能实现逻辑：
  1. 封装请求：利用useRequest封装更新问卷请求
  2. 防止重复触发：根据loading状态设置按钮的禁用状态
  3. 路由跳转：创建导航，跳转至发布页面
## 拖拽排序
1. 
画布动态显示问卷列表流程
1. 从服务端获取问卷列表数据存于redux：
  1. 封装获取问卷列表数据方法
  2. 监听url动态参数id变化，手动发送请求
  3. 监听data数据，返回成功后将数据存于redux
2. 画布组件从redux中获取问卷列表数据
  1. 利用自定义hook获取问卷列表数据
  2. 解构出type，props，根据type获取对应组件，并将props传入
点击画布选择组件
1. 创建selectedId全局共享属性：redux的组件reducer中，添加selectedID属性以及修改selectedId方法
2. 画布上的组件绑定点击事件：点击时将对应组件fe_id作为selectedID（注意阻止冒泡
3. 拼接点击样式：利用classNames拼接点击样式
将组件分组显示在组件库中
1. 关键步骤：
  1. 在redux的组件reducer中将组件配置进行分组
  2. 根据分组的结果动态渲染
组件库中组件点击添加至画布
1. 关键步骤
  1. 配置添加组件方法：在redux的组件reducer中创建添加组件方法，需要判断selectedId状态
    1. 若selectedId<0:将所点组件加入到问卷列表数据末尾
    2. 若selectedId>0:将所点组件加入已选组件之后
  2. 给组件库中组件添加点击事件：调用添加组件方法
属性面板
根据selectedId显示属性组件
1. 关键步骤：
  1. 根据selectedId获取对应已选组件
  2. 根据已选组件的type获取组件的配置
  3. 根据组件配置获取属性组件
onChange同步到redux
1. 关键步骤：
  1. 给属性表单绑定onChange事件，获取表单最新值，将最新值赋值给当前已选组件的props
开发组件列表拖拽
1. 抽离组件：利用react-dndkit定义SortableContainer和SortableItem
2. 使用组件：
  1. 使用SortableContainer对画布进行包裹，同时用SortableItem包裹每一个组件
  2. 在redux的组件reducer中定义移动组件方法，根据新旧索引更新组件列表
  3. 给SortableContainer传入onDragEnd方法，获取组件拖拽的新旧索引，并调用移动组件方法
开发组件撤销重做功能
1. 基本原理：
  1. 维护两个栈：past,future
    1. 用户输入时，past入栈，future清空
    2. 用户撤销时，past出栈，future入栈，present赋值为past栈顶元素
    3. 用户重做时，future出栈，past入栈，present赋值为past栈顶元素
2. 关键步骤：
  1. 工具：redux-undo
  2. 改造store和useComponentInfo
    1. 使用undorable对组件reducer进行包裹，并且传入配置项
    2. 对组件使用StateWithHistory进行包裹
  3. 创建撤销重做按钮
    1. 调用UndoActionsCreator的undo，redo方法
开发统计页面
#需求分析#
界面的模块
[x] 顶部栏
[x] 左侧 组件列表
[x] 中间 答卷列表
[x] 右侧 图表统计
功能列表
顶部栏
[x] 返回
[x] 显示标题
[x] 显示 url
[x] 复制 url
[x] 显示二维码
[x] 编辑问卷
左侧 组件列表
[x] 显示组件列表
[x] 点击选中组件
中间 答卷列表
[x] 显示答卷数量
[x] 显示答卷表格，分页
[x] 点击 th 选中组件
右侧 图表统计
[x] 根据选中的组件，显示图表统计
获取问卷信息
1. 利用useLoadQuestionData方法，获取问卷信息=>存于redux
useLoadQuestionData内部逻辑：
1、利用useParam获取动态参数id
2、利用useRequest封装axios请求，获取data，loading，run，error
3、利用useEffect监听data变化，若有data，则将进行解构；将{title，desc，js，css，isPublished}存于Component的Reduce中；将{componentList}存于PageInfo的Reduce中
4、利用useEffect监听动态参数id的变化，若发生改变，则调用run，重新获取问卷信息
2. 利用useGetPageInfo方法，获取页面信息=>从redux中取出
useGetPageInfo内部逻辑：
1、利用useSelector方法从redux中获取pageInfo
#页面布局#
统计页面
useGetPageInfo 获取页面信息
- loading 效果
- 判断 isPublished （需要在 pageInfo 中增加 isPublished 属性）
- 修改标题 ( Edit 页面修改标题 )
利用useTitle，传入useGetPageInfo获取的页面标题
UI 组件设计
整体 flex 布局
- header
- content: 左中右
#头部#
左中右布局
1、利用flex布局实现：左中右设置为flex：1，实现三等分
flex:1是一个简写属性，其包含如下三个属性：
1、flex-grow:1 定义一个flex项相对于其余flex项的增长比例；flex项都设置flex：1时 各项会均等分配可用空间
2、flex-shrink:1 定义一个flex项相对于其余flex项的收缩比例 ；flex项都设置flex：1时 各项会均等搜索
3、flex-basis:0 定义了一个flex项分配空间前的初始大小；flex-basis 的默认值是 auto，但在 flex: 1; 的情况下，它被设置为 0，即项目在分配空间时，初始大小为 0。
flex: 1; 表示该元素可以在父容器中占据可用空间，并且在尺寸变化时可以增长或收缩。它非常适合用于需要灵活布局的场景，例如在一个水平或垂直的 flexbox 容器中，让多个子元素均匀分布。
左侧
返回按钮 + 显示标题
1、返回功能实现：利用useNavigation创建导航nav，点击按钮时调用nav(-1)
2、显示标题功能实现：利用usePageInfo获取页面信息，解构出title
右侧
编辑问卷按钮
1. 编辑问卷功能实现：
  1. 获取当前问卷id：利用useParam获取当前路由动态参数id，即当前问卷id
  2. 路由跳转：利用导航nav进行路由跳转 '/question/edit/{id}'
中间
拷贝 url+生成二维码
1. 拷贝url功能实现：
  1. 创建input引用：利用useRef创建input的引用urlInputRef
  2. 绑定click事件：调用urlInputRef.current获取当前dom元素，调用select方法选中input框内内容，调用document.execCommand('copy')拷贝选中内容
2. 生成二维码功能实现：
  1. 利用QRCode插件：传入url，生成二维码
#组件列表#
显示组件列表+点击设置 selectedId 和 selectedType
1. 显示组件列表功能实现：
  1. 利用useComponentInfo方法，获取当前问卷的组件列表
  2. 遍历组件数组，解构出组件的fe_id，type，props
  3. 根据type 获取组件配置信息 从中解构出对应组件
  4. 渲染组件，fe_id作为key属性，同时传入props
2. 点击设置 selectedId 和 selectedType功能实现：
不需要再把 selectedId 存储到 redux store ，使用状态提升即可<br>
因为没有复杂的编辑功能，selectedId 仅仅用于同级组件的传递
#答卷数据#
数据结构设计
一个问卷发布了，用户提交的一份答卷，数据结构如下：
{
    questionId: '63a51dd42ef26594341e2aff',
    answerList: [
        { componentId: 'c1', value: undefined }, // 标题 info
        { componentId: 'c2', value: '张三' }, // input
        { componentId: 'c3', value: '13987650099' }, // input
        { componentId: 'c4', value: '1-3年' }, // 单选
        { componentId: 'c5', value: 'Vue2,Vue3' }, // 多选
        { componentId: 'c6', value: '大于20k' }, // 单选
        { componentId: 'c7', value: '备注xx' } // textarea
    ]
}
一个问卷对应多个答卷，所以一个问卷的所有答卷列表如下：
[
    // 用户A
    {
        _id: 'xx',
        c2: '张三',
        c3: '13987650099',
        c4: '1-3年', // 单选
        c5: 'Vue2,Vue3', // 多选
        c6: '大于20k',
        c7: '备注xx'
    },
    // 用户B
    {
        _id: 'y',
        c2: '李四',
        c3: 'lisi@163.com',
        c4: '3-5年',
        c5: 'Vue2,React',
        c6: '10-20k',
        c7: '备注yy'
    },
    // 更多用户...
]
#显示问卷列表#
获取答卷统计数据
获取答卷数量以及答卷列表数据
1. 获取答卷统计数据功能实现：
  1. 利用useRequest封装getQuestionStatListService方法（传入id，page，pageSize），获取答卷数量和答卷列表数据
  2. useRequest配置对象中添加刷新依赖refreshDeps：[id,page,pageSize]
根据 componentList 定义 table column
1. 定义table column功能实现：
  1. 利用useGetComponentInfo方法，获取问卷的组件列表
  2. 遍历组件列表，定义columns数组
2. 根据 selectedId 切换样式功能实现：
  1. 从传入的props中解构出selectedId，定义column遍历组件列表时，判断是否当前id是否为selectedId
3. 点击 th 时，设置 selectedId功能实现：
  1. 调用传入的setSelectedId方法
#显示表格#
dataSource 加 key
渲染表格
#分页#
1. 分页功能实现：
  1. 绑定依赖：由于useRequest方法配置对象内配置了刷新依赖属性，依赖了id，page，pageSize属性
  2. 触发回调：当点击页码时，重新执行getQuestionStatListServe方法，传入最新的id page pageSize
（不用 url 参数）
#图表#
使用recharts
1. stars多，更新及时
2. 下载量大
3. 有中文文档，易懂
#图表统计#
1. 统计范围
  1. 单选：饼图 PieChart
  2. 多选：条形图 BarChart
2. 数据结构设计
stat: [
    { name: '选项1', count: 20 },
    { name: '选项2', count: 10 },
    { name: '选项3', count: 30 },
]
获取组件统计信息的流程：
1、调用useRequest方法封装getComponentStatServe方法（传入当前问卷id以及已选组件id，解构返回值中的stat数组，用于图表渲染
2、同时利用useEffect，监听问卷id以及已选组件id，变幻时，调用run方法，获取最新组件统计信息
3. 为组件扩展StatComponent
  每个组件的图表不一样，还可能会有变化，所以交给组件内部去显示图标。
  和 PropComponent 的逻辑类似
  - 扩展 StatComponent 和 StatPropsType
  - 组件配置，扩展 StatComponent
4. 显示图表
把组件的 StatComponent 引入到右侧 ChartStat 组件，并传入数据
显示图表功能实现流程：
  - 获取组件配置：根据传入的已选组件类型selectedComponentType，调用genComponentConfigByType方法，获取对应组件配置
  - 解构出统计组件：从组件配置中解构出统计组件，同时传入stat
#拖拽排序#
1. 技术选型：看Github的start；npm下载量以及更新频率；文档易读性
  1. React-dnd
    1. start多；npm下载量大；但是文档不易读
  2. React-beautiful-dnd
    1. star多；下载量大，文档易读；但更新频率不高且不支持严格模式
  3. Sortablejs
    1. 下载量大；但不推荐用于生产模式
  4. dnd-kit
    1. start；npm下载量都较高，且文档易懂
2. 拖拽排序实现逻辑：
  1. 抽离组件：由于画布与图层都要用到拖拽排序功能，所以对SortableContainer和SortableItem进行抽离
  2. SortableContainer内部逻辑：
    1. 解构出传入的组件列表，拖拽回调，以及子组件
    2. 创建探查器useSensor，鼠标移动8px才触发，防止意外点击
    3. 绑定拖拽回调，获取拖拽组件的新旧索引，调用传入的回调函数，更新组件redux中组件位置
  3. SortableItem内部逻辑：
# 上移下移#
1. 功能实现：
  1. 都是调用移动组件方法
  2. 移动组件方法内部逻辑：
    1. 将新旧索引元素交换即可
## 撤销重做
1. 基本原理：维护两个栈，past栈和future栈
  1. 输入时：past入栈；future栈清空
  2. 撤销时：past出栈；future栈入栈
  3. 重做时：future栈出栈；past栈入栈
2. 撤销重做逻辑实现：
  1. 处理数据：
    1. 重新定义组件列表类型为StateWithHistory
    2. 将redux中组件的Reducer用undorable包裹，传入配置项，限制undo的步数和过滤的操作
  2. 修改获取组件信息方法：返回当前组件列表的present
  3. 绑定方法：调用ActionCreators的undo和redo方法
C端问卷填写
# SSR
1. 优点：
  1. 性能好
  2. SEO优化
2. 场景：
  1. 对性能要求高：移动端、弱网环境
  2. 操作交互简单的系统
3. 与csr的区别
  1. 渲染位置：
    1. SSR:网页内容在服务器生成
    2. CSR:网页内容在浏览器生成
  2. 加载时间
    1. SSR:加载快，直接返回页面
    2. CSR：加载慢，可能出现空白页面
  3. SEO
    1. SSR:更好
    2. CSR：不佳
  4. 场景
    1. SSR:性能要求高，
    2. CSR：用户交互频繁，且需要快速响应
# Next.js
注意区分Next、Nust、Nest
1. Nest.js：
  1. 概念：用于构建服务端渲染的React的框架
  2. 特点：
    1. 服务端渲染：在服务器上渲染页面，提升SEO和首屏加载速度
    2. 静态生成：支持在构建时生成静态页面，适合页面不常变化的场景
    3. API路由：支持创建API路由，方便后端处理
    4. 文件系统路由：基于文件结构自动生成路由
    5. 支持ts
2. Nuxt.js
- 简介：Nuxt.js 是一个基于 Vue.js 的框架，旨在简化服务端渲染和单页面应用的开发。
- 特点：
  - 服务器端渲染：与 Next.js 类似，支持服务器端渲染，提高 SEO 和性能。
  - 静态生成：支持静态网站生成，适合需要高性能和 SEO 的场景。
  - 模块化：Nuxt.js 提供了丰富的插件和模块，可以轻松扩展应用功能。
  - 页面和路由管理：基于文件结构自动管理路由，简化开发流程。
  - 支持 Vuex：集成 Vuex 状态管理，方便管理应用状态。
3. Nest.js
  1. 概念：用于构建Node.js服务器端应用的框架，基于ts，灵感来源于Angular
  2. 特点：
    1. 模块化：模块化设计，可将应用拆分为多个模块
    2. 依赖注入：内置依赖注入容器，提升代码可维护性
    3. 支持微服务架构：方便搭建微服务架构的应用，支持多种传输层（如 HTTP、WebSocket、gRPC 等）。
    4. TypeScript 支持

---
## 两种形式 pre-render
1. 概念：Pre-render预渲染，是web中提升性能和SEO的技术，包括两种方法：静态生成和服务端渲染
2. 静态生成：
  1. 定义：项目构建时生成HTML文件，后续访问不会再重复生成；构建阶段，所有页面的HTML会被预先渲染并保存为静态文件，用户访问时直接获取静态文件
  2. 优点：
    1. 性能好：静态页面可以被缓存，加载速度快
    2. SEO好：搜索引擎能够轻松抓取静态文件
    3. 部署简单：静态文件可以部署到支持静态文件的服务器或CDN，无需复杂后端逻辑
    4. 降低服务器压力：不用每次请求都生成页面
  3. 缺点：
    1. 不适合动态内容：若内容更新频繁，需要频繁手动重新构建
    2. 构建时间：大型网站构建时间较长
  4. 场景：
    1. 博客、文档网站等内容相对静态的网站
3. 服务端渲染：
  1. 定义：每次用户请求时，服务器都会生成最新的HTML给用户
  2. 优点：
    1. 动态内容：适合需要实时更新内容的网站
    2. SEO好
  3. 缺点：
    1. 服务器压力大：每次用户请求都要生成最新的HTML，服务器压力大
    2. 性能低：每次请求都要生成HTML，可能导致加载变慢，特别是高并发场景
    3. 部署复杂
  4. 场景：
    1. 需要频繁更新内容的网站：如电商网站、社媒网站
## 动态路由
想访问 /blog/1 这种动态路由，还需要继续调整。
新建 pages/question/[id].tsx
在 getServerSideProps 获取动态参数 id

export async  function getServerSideProps(context:any) {
    // 从路由中提取出id
    const {id=''}=context.params

    // 利用id 异步获取数据...
    const data = await getQuestionById(id)
    // {errno,data,msg}

    return {
        props:data,
    }
}
# Form提交
## H5的提交逻辑
1. 获取问卷组件信息
2. 显示页面表单
3. 用户填写表单、提交数据
## 数据提交方式
1. Ajax提交：利用antd form中的getFieldsValue()获取数据，然后提交 ——参考登录注册页
2. Form提交：利用HTML功能，无需js
  1. 优点：更简洁、兼容性更好（老年机）、代码体积更小，性能更好
// form提交：
<PageWrapper title={title} desc={desc}>
            <form method="post" action="/api/answer">
                <input type="hidden" name="questionId" value={_id}/>
                    {componentListElemt}                
                <div className={styles.submitBtnContainer}>
                    {/* <input type="submit" value="提交"/> */}
                    <button type="submit">提交</button>
                </div>
            </form>
</PageWrapper>
## name 就是组件的 fe_id —— 重要！！！
# 流程
## 新建组件
- QuestionInput
- QuestionRadio
## 渲染 form
在 question 页面新建 form 组件
- 增加 questionId
- 临时静态引入 QuestionInput QuestionRadio
- 提交按钮
## 提交form
1. 新建API：新建'/api/answer'，写入from的action
2. 新建 service ：新建servepostAnswer，将数据提交至后端
3. 新建 Mock ：接受提交的答卷
## 抽离 PageWrapper
考虑到各个页面 question success fail ，抽离 <PageWrapper> 组件
注意 js css
# 完善其他组件
## 获取组件列表
- 新建 service getQuestionById
- 获取组件列表数据，做各种判断 errno isDeleted isPublished
- 新建 genComponent ，统计获取组件，并传入属性
## 扩展其他组件
## checkbox组件特殊性
这种 name-value 的形式（ name 即 fe_id ）对于其他组件（input textarea radio），因为它们只有 value
但对于 checkbox 不合适，因为它可以选中多个。所以需要一些变化
- 使用 <input type="hidden" name={fe_id} values={selectedValues}>
- checkbox 切换选择时，及时修改 selectedValues
#性能优化
## 缓存数据 减少计算
#useState传入函数
1. useState可以传入普通变量
  1. 但每次组件渲染都会执行
2. useState还可以传入函数
  1. 只在组件初次渲染时执行
  2. 使用场景：
    1. 适合数据结构复杂，计算成本高的场景
#useMemo缓存问卷url链接和二维码
1. useMemo说明
  1. 概念：缓存数据
  2. 参数说明：
    1. 计算函数，会返回计算结果
    2. 依赖数组
  3. 使用场景：
    1. 计算成本高
    2. 依赖性不常变化
  4. 项目运用：
    1. 使用useMemo缓存二维码的生成（使用了QRcode插件
#useCallback缓存点击添加组件方法
1. useCallBack说明：
  1. 概念：缓存函数
  2. 参数说明：
    1. 需要缓存的函数
    2. 依赖数组
  3. 项目运用：
    1. 使用useCallBack缓存点击添加组件方法
##代码体积和拆分
# 代码体积分析
利用Source map explore 
发现 main.js 体积有 `1.61M` —— 首页加载就需要 `1.61M` ，有点大，需要拆分。
分析内部发现比较大的体积来自于 antd recharts react-dom dnd-kit 等。
首先想到的：拆分页面，路由懒加载，把编辑页、统计页拆分开
#路由懒加载
使用lazy对问卷编辑，问卷统计页面进行懒加载
再进行代码体积分析，发现 main.js 减小到 1.0M 还是很大。
分析结果中，发现一个不符合预期的现象：**@dnd-kit 是拖拽排序的，应该在编辑页，不应该在 main.js*
查代码发现，在 src/store/componentsReducer/index.ts 中用到了 @dnd-kit/sortable ，而后者用依赖于 @dnd-kit/core
这个是否要优化掉？（把相关代码移动到编辑页面的引用） —— 不值得！！！
- 这部分代码只占用 50kb ，最后GZip 压缩以后大约 16kb ，体积不算大
- 如果移动代码，将导致代码修改较多，而且可能破坏语义、可读性
- 综合考虑成本和收益，这里保持不变
继续：分析结果中，占比最大的是 antd 和 react-dom ，可以抽离公共代码。
#使用webpack抽离公共代码，合理使用缓存
实现逻辑：调用optimazation.splitChunks方法
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        // 抽离公共代码，只在生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        }
      }
      return webpackConfig
    },
  },
注意：
1. 必须是生产环境。开发环境不需要抽离，否则影响打包速度。
2. 设置 chunks: 'all'
重新 build 以后，发现 main.js 只有 27.02kb ，react-dom antd vendors 都被拆分出去了。
## 合理使用缓存
运行 build 结果，发现首页依然要加载好几个 JS 文件： main.js react-dom antd vendors
它们体积的总和依然是 1M 左右，那和优化之前一样吗？ —— 不一样
- 优化之前是一个文件，一旦有代码改动，文件变化，缓存失效
- 优化之后拆分多个文件，代码改动只会导致 main.js 变化，其他文件都会缓存
- 如果不频繁升级 npm 插件，其他 js 文件不会频繁变动
## CSS
不用做优化，css 已经被分离为 main.css antd-chunk.css edit-page.css stat-page.css
PS：浏览器和服务端一般都默认支持 Gzip 压缩，体积能压缩 1/3 左右
# 单元测试
1. 组件单元测试
  1. 注意，不是所有前端代码都适合单元测试，一般只对一些核心的、功能封装独立的组件进行单元测试。
2. 自动化测试
  1. 操作：
- `npm run test` 加入到 husky `.husky/pre-commit`
- 为 package.json `scripts` `test` **增加 `--watchAll=false`** —— 重要！否则无法正常执行 commit
- 每次 commit 会执行测试
  2. 意义：
自动测试的价值
- 每次 commit 都自动执行，测试失败，无法提交代码（不污染现有的代码）
- 避免各种“不小心” “忘了” 的问题 —— 自动化，电脑忘不了
- 要及时完善组件单元测试，新组件也要添加单元测试
#storybook
1. 概念：用于组件可视化测试，或者可以理解为一种组件的使用介绍。通过storybookke'y组的UI结构、属性配置

Nest开发服务端
TS装饰器
1. 概念：是一个特殊类型的声明，它可以附加到类、方法、属性或参数上，用于修改它们的行为。装饰器是 TypeScript 的一个实验性特性，主要用于元编程。
2. 基本类型：
  1. 类装饰器：用于类的定义上
  2. 方法装饰器：用于类的方法上
  3. 属性装饰器：用于类的属性上
  4. 参数装饰器：用于方法参数上
创建Nest.js项目
理解Nest.js的三大概念
1. Module：每个模块都是一个类，使用@Module装饰器来定义。模块通常用于将相关的功能组合在一起。一个模块可以导入其他模块，提供服务，并包含控制器。
2. Controller：负责处理传入的请求，并返回响应。它们定义了应用程序的路由，并通常与服务层进行交互以处理业务逻辑。控制器使用@Controller装饰器定义，并且可以使用各种装饰器（如@Get、@Post等）来定义路由。
3. Service：服务是处理业务逻辑的地方。服务通常包含应用程序的核心功能，例如数据访问、数据处理等。服务使用@Injectable装饰器定义，并且可以被控制器或其他服务注入。
创建question模块和路由
1. 创建Module、Controller、Service
2. 创建第一个路由
3. 路由常见功能：
  1. Query：获取查询参数
  2. Param：获取动态参数
  3. Body：获取数据体（如更新问卷时传递的数据 
统一路由返回格式
1. 创建拦截器和过滤器：利用interceptor和filter统一路由返回格式：{error:0,data}or{error:-1,message}
2. 全局拦截器：调用app的useGlobalInterceptors方法，设置为全局拦截器
3. 全局过滤器：调用app的useGlobalFilters方法，设置为全局过滤器
创建schema数据模型并且同步至mongodb数据库
在NestJS中，Schema数据模型是应用程序与MongoDB数据库之间的桥梁。它定义了数据的结构、约束和验证规则，并与服务层结合使用以实现数据的CRUD操作。通过使用DTO和模块化设计，NestJS提供了一种清晰、可维护的方式来管理数据模型。 
1. 创建schema文件，创建问卷数据模型
  1. title、desc、author、js、css、isPublished、isStar、isDeleted、componentList{fe_id title type isHidden isLocked props}[]
2. 在question.module模块中，调用MongooseModule的forFeature方法，将问卷的数据模型同步至数据库
利用service操作数据库
1. 实现问卷增删改查
2. 实现mongodb分页和搜索
创建用户模块
1. 创建Module Controller Service
2. 创建用户schema，并且同步至mongodb
3. 开发注册功能
创建auth模块
1. 背景：用户登录逻辑稍微复杂，需要进行拆分
2. 内部功能：
  1. 增加JWT校验：
    1. 用户登录后返回token
      1. auth.module模块：引入jwt模块，并且传入配置项{global，secret，signOption}
      2. auth.service模块：登录方法中调用jwtService.sign方法传入用户信息 返回token
  2. 增加Guard校验
    1. 用户后续请求时需要携带token 服务器需要进行校验
      1. 定义校验逻辑 创建auth.guard文件
        1. 内部逻辑：
          1. 获取token：获取request请求对象，取出headers中的token
          2. 验证token：
            1. 若无token 抛出错误
            2. 若有token 调用jwtService.verifyAsync方法将token转换为用户信息 加入request请求对象的user属性中 
      2. 添加校验
        1. 最后在路由前添加UseGuards 使用定义的校验逻辑
  3. 设置JWT全局校验
    1. 背景：路由多，一个个添加校验太复杂
    2. 操作
      1. 创建装饰器：自定义Public装饰器
      2. 使用装饰器：在不需要验证的路由前加入自定义Public装饰器
      3. 添加逻辑：在auth.guard.ts文件中，判断当前路由是否为Public，若为Pubilc直接返回，无需后续逻辑
利用Redirect进行路由重定向
1. 背景：用于拆分了用户模块和用户校验auth模块，对于用户路由中的登录、获取用户信息路由，需要将其重定向至auth路由中，从而实现用户校验功能。
2. 操作：
  1. 用户登录重定向：利用Redirect重定向，第一个参数为'\api\auth\login'，第二个参数为307
  2. 获取用户信息重定向：利用Redirect重定向，第一个参数为'\api\auth\profile'，第二个参数为302
Get请求中，301表示永久重定向；302表示临时重定向
Post请求中，308表示永久重定向；307表示临时重定向

创建答卷模块
1. 创建答卷数据模型Schema
  1. 定义答卷schema：
    1. questionId => 对于问卷的id
    2. answerList：{componentFeId,value:[]}[]
2. 创建答卷路由
3. 创建答卷方法

创建统计Stat模块
1. 创建Stat的Module，Controller，Service
2. 引入Answer和Question模块：由于统计需要依赖这两个模块，所以需要引入
3. Answer模块添加方法：Answer.Service中添加count和findAll方法，由于返回答卷总数和答卷列表(分页 skip
