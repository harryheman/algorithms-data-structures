import Stack from '../stack'

describe('Stack', () => {
  it('должен создать пустой стек', () => {
    const stack = new Stack()
    expect(stack).not.toBeNull()
    expect(stack.linkedList).not.toBeNull()
  })

  it('должен добавить значения в стек', () => {
    const stack = new Stack()

    stack.push(1)
    stack.push(2)

    expect(stack.toString()).toBe('2,1')
  })

  it('должен проверить пустоту стека', () => {
    const stack = new Stack()

    expect(stack.isEmpty()).toBe(true)

    stack.push(1)

    expect(stack.isEmpty()).toBe(false)
  })

  it('должен извлечь значения из стека без удаления узлов', () => {
    const stack = new Stack()

    expect(stack.peek()).toBeNull()

    stack.push(1)
    stack.push(2)

    expect(stack.peek()).toBe(2)
    expect(stack.peek()).toBe(2)
  })

  it('должен извлечь значения из стека с удалением узлов', () => {
    const stack = new Stack()

    stack.push(1)
    stack.push(2)

    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
    expect(stack.pop()).toBeNull()
    expect(stack.isEmpty()).toBe(true)
  })

  it('должен добавить/удалить объекты в/из стека', () => {
    const stack = new Stack()

    stack.push({ value: 'test1', key: 'key1' })
    stack.push({ value: 'test2', key: 'key2' })

    const stringifier = (value) => `${value.key}:${value.value}`

    expect(stack.toString(stringifier)).toBe('key2:test2,key1:test1')
    expect(stack.pop().value).toBe('test2')
    expect(stack.pop().value).toBe('test1')
  })

  it('должен преобразовать стек в массив', () => {
    const stack = new Stack()

    expect(stack.peek()).toBeNull()

    stack.push(1)
    stack.push(2)
    stack.push(3)

    expect(stack.toArray()).toEqual([3, 2, 1])
  })
})
