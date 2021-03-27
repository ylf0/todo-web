export const ROUTES = {
  root: '/',
  todo: '/todo',
  search: '/search',
  tag: '/tag'
}

export const STATUS_OPTIONS = [
  { key: 'undone', name: '未完成' },
  { key: 'done', name: '已完成' },
  { key: 'endDate', name: '按截止时间排序' },
  { key: 'priority', name: '按优先级排序' },
]

export const PRIORITY_OPTIONS = [
  { key: 0, name: '较低', type: 'info' },
  { key: 1, name: '普通' },
  { key: 2, name: '紧急', type: 'warning' },
  { key: 3, name: '非常紧急', type: 'danger' },
]
