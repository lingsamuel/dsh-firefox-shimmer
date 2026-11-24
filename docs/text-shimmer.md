# Firefox 文字扫光重影

DSH 的 `TextShimmer` 通过两层方向相反的 `transform` 动画移动渐变遮罩，同时抵消高光文字的位移。Firefox 在窗口遮挡或恢复时可能让两层动画落在不同的帧，导致高光文字偏离原文。反馈视频中，「正在调用工具 · job_output」和「深度求索中，用时……」都出现了重影。 [DSH Discussion #12573](https://github.com/deepseek-ai/deepseek-harness/discussions/12573)

插件沿用原组件的渐变、颜色和时间参数，将两层文字固定在同一位置，只对 `mask-position` 做动画。遮罩从装饰层左侧一整行宽处开始，在右侧一整行宽处结束。CSS 用组件的 `data-shimmer` 属性和装饰层结构定位，适用于工具行、会话计时行和其他复用该组件的状态。 [DSH 原生组件](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.3-alpha.2/packages/client/ui-primitives/src/TextShimmer.tsx)
