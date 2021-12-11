// 基础组件
export const components = {
  PieChart: () => import('./PieChart'),
  RingChart: () => import('./RingChart'),
  BarChart: () => import('./BarChart'),
  RadarChart: () => import('./RadarChart'),
  LineChart: () => import('./LineChart'),
  StackBarChart: () => import('./StackBarChart'),
  AreaChart: () => import('./AreaChart'),
  CircleChart: () => import('./CircleChart'),
}
