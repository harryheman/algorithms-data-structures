import PriorityQueue from '../priority-queue'

describe('PriorityQueue', () => {
  it('должен создать дефолтную очередь с приоритетом', () => {
    const priorityQueue = new PriorityQueue()

    expect(priorityQueue).toBeDefined()
  })

  it('должен добавить элементы с приоритетом в очередь', () => {
    const priorityQueue = new PriorityQueue()

    priorityQueue.add(10, 1)
    expect(priorityQueue.peek()).toBe(10)

    priorityQueue.add(5, 2)
    expect(priorityQueue.peek()).toBe(10)

    priorityQueue.add(100, 0)
    expect(priorityQueue.peek()).toBe(100)
  })

  it('должен добавить в очередь объекты', () => {
    const priorityQueue = new PriorityQueue()

    const user1 = { name: 'Mike' }
    const user2 = { name: 'Bill' }
    const user3 = { name: 'Jane' }

    priorityQueue.add(user1, 1)
    expect(priorityQueue.peek()).toBe(user1)

    priorityQueue.add(user2, 2)
    expect(priorityQueue.peek()).toBe(user1)

    priorityQueue.add(user3, 0)
    expect(priorityQueue.peek()).toBe(user3)
  })

  it('должен извлечь элементы из очереди согласно приоритету', () => {
    const priorityQueue = new PriorityQueue()

    priorityQueue.add(10, 1)
    priorityQueue.add(5, 2)
    priorityQueue.add(100, 0)
    priorityQueue.add(200, 0)

    expect(priorityQueue.poll()).toBe(100)
    expect(priorityQueue.poll()).toBe(200)
    expect(priorityQueue.poll()).toBe(10)
    expect(priorityQueue.poll()).toBe(5)
  })

  it('должен обновить приоритеты головных узлов', () => {
    const priorityQueue = new PriorityQueue()

    priorityQueue.add(10, 1)
    priorityQueue.add(5, 2)
    priorityQueue.add(100, 0)
    priorityQueue.add(200, 0)

    expect(priorityQueue.peek()).toBe(100)

    priorityQueue.changePriority(100, 10)
    priorityQueue.changePriority(10, 20)

    expect(priorityQueue.poll()).toBe(200)
    expect(priorityQueue.poll()).toBe(5)
    expect(priorityQueue.poll()).toBe(100)
    expect(priorityQueue.poll()).toBe(10)
  })

  it('должен обновить приоритеты внутренних узлов', () => {
    const priorityQueue = new PriorityQueue()

    priorityQueue.add(10, 1)
    priorityQueue.add(5, 2)
    priorityQueue.add(100, 0)
    priorityQueue.add(200, 0)

    expect(priorityQueue.peek()).toBe(100)

    priorityQueue.changePriority(200, 10)
    priorityQueue.changePriority(10, 20)

    expect(priorityQueue.poll()).toBe(100)
    expect(priorityQueue.poll()).toBe(5)
    expect(priorityQueue.poll()).toBe(200)
    expect(priorityQueue.poll()).toBe(10)
  })

  it('должен обновить приоритеты и добавить элемент', () => {
    const priorityQueue = new PriorityQueue()

    priorityQueue.add(10, 1)
    priorityQueue.add(5, 2)
    priorityQueue.add(100, 0)
    priorityQueue.add(200, 0)

    priorityQueue.changePriority(200, 10)
    priorityQueue.changePriority(10, 20)

    priorityQueue.add(15, 15)

    expect(priorityQueue.poll()).toBe(100)
    expect(priorityQueue.poll()).toBe(5)
    expect(priorityQueue.poll()).toBe(200)
    expect(priorityQueue.poll()).toBe(15)
    expect(priorityQueue.poll()).toBe(10)
  })

  it('должен определить наличие значений элементов', () => {
    const priorityQueue = new PriorityQueue()

    priorityQueue.add(10, 1)
    priorityQueue.add(5, 2)
    priorityQueue.add(100, 0)
    priorityQueue.add(200, 0)
    priorityQueue.add(15, 15)

    expect(priorityQueue.hasValue(70)).toBe(false)
    expect(priorityQueue.hasValue(15)).toBe(true)
  })
})
