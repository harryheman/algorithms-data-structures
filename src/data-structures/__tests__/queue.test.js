import Queue from '../queue'

describe('Queue', () => {
  it('должен создать пустую очередь', () => {
    const queue = new Queue()
    expect(queue).not.toBeNull()
    expect(queue.linkedList).not.toBeNull()
  })

  it('должен добавить значения в очередь', () => {
    const queue = new Queue()

    queue.enqueue(1)
    queue.enqueue(2)

    expect(queue.toString()).toBe('1,2')
  })

  it('должен добавить/удалить объекты в/из очереди', () => {
    const queue = new Queue()

    queue.enqueue({ value: 'test1', key: 'key1' })
    queue.enqueue({ value: 'test2', key: 'key2' })

    const stringifier = (value) => `${value.key}:${value.value}`

    expect(queue.toString(stringifier)).toBe('key1:test1,key2:test2')
    expect(queue.dequeue().value).toBe('test1')
    expect(queue.dequeue().value).toBe('test2')
  })

  it('должен извлечь значения из очереди без удаления и с удалением соответствующих узлов', () => {
    const queue = new Queue()

    expect(queue.peek()).toBeNull()

    queue.enqueue(1)
    queue.enqueue(2)

    expect(queue.peek()).toBe(1)
    expect(queue.peek()).toBe(1)
  })

  it('должен проверить пустоту очереди', () => {
    const queue = new Queue()

    expect(queue.isEmpty()).toBe(true)

    queue.enqueue(1)

    expect(queue.isEmpty()).toBe(false)
  })

  it('должен удалять элементы из очереди в порядке FIFO', () => {
    const queue = new Queue()

    queue.enqueue(1)
    queue.enqueue(2)

    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBeNull()
    expect(queue.isEmpty()).toBe(true)
  })
})
