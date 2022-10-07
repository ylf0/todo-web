import { ROUTES } from '@/constants'

const routes = [
  {
    path: ROUTES.root,
    name: 'home',
    component: () => import('@/pages/Home/index.vue'),
    redirect: ROUTES.todo,
    children: [
      {
        path: ROUTES.todo,
        component: () => import('@/pages/Home/views/Todo.vue')
      },
      {
        path: ROUTES.search,
        component: () => import('@/pages/Home/views/Search.vue')
      },
      {
        path: ROUTES.tag,
        component: () => import('@/pages/Home/views/Tag.vue')
      },
      {
        path: ROUTES.note,
        component: () => import('@/pages/Home/views/Note.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/NotFound/index.vue')
  }
]

export default routes
