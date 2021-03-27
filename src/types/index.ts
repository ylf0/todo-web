export interface IStatus {
  key: string
  name: string
}

export interface ITodo {
  id: string
  title: string
  done: boolean
  desc?: string
  endDate?: string
  priorityType?: [0, 1, 2, 3],
  subTaskIds?: string[]
}
