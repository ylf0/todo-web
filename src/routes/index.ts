import { ROUTES } from '../constants'

import Home from '../pages/Home/index.vue'
import Todo from '../pages/Home/views/Todo.vue'
import Search from '../pages/Home/views/Search.vue'
import NotFound from '../pages/NotFound/index.vue'

const routes = [
  {
    path: ROUTES.root,
    name: 'home',
    component: Home,
    redirect: ROUTES.todo,
    children: [
      { path: ROUTES.todo, component: Todo },
      { path: ROUTES.search, component: Search }
    ]
  },
  { path: '/:pathMatch(.*)', component: NotFound }
]

export default routes
