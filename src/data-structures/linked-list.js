import Comparator from '../utils/comparator'

// Узел
export class Node {
  constructor(value, next = null) {
    // Значение
    this.value = value
    // Ссылка на следующий узел
    this.next = next
  }

  // Возвращает строковое представление узла.
  // Принимает кастомную функцию стрингификации
  toString(cb) {
    return cb ? cb(this.value) : `${this.value}`
  }
}

// Связный список
export default class LinkedList {
  constructor(fn) {
    // Головной (первый) узел
    this.head = null
    // Хвостовой (последний) узел
    this.tail = null
    // Функция сравнения узлов
    this.compare = new Comparator(fn)
  }

  // Добавляет значения в начало списка
  prepend(value) {
    // Создаем новый головной узел со ссылкой на предыдущий головной узел
    // (новый узел становится головным (первым))
    this.head = new Node(value, this.head)
    // Если хвостовой узел отсутствует, значит,
    if (!this.tail) {
      // головной узел также является хвостовым
      this.tail = this.head
    }
    // Это обеспечивает возможность вызова методов по цепочке
    return this
  }

  // Добавляет значение в конец списка
  append(value) {
    // Создаем новый узел
    const node = new Node(value)
    // Если головной узел отсутствует, то
    if (!this.head) {
      // добавляем значение в начало списка
      return this.prepend(value)
    }
    // Добавляем ссылку на новый узел в хвостовой узел
    this.tail.next = node
    // Обновляем хвостовой узел
    // (новый узел становится хвостовым (последним))
    this.tail = node

    return this
  }

  // Добавляет значение в список по указанному индексу
  insert(value, rawIndex) {
    // Нормализуем индекс
    const index = rawIndex < 0 ? 0 : rawIndex
    // Если индекс равен 0, то
    if (index === 0) {
      // Добавляем значение в начало списка
      return this.prepend(value)
    }
    // Создаем новый узел
    const node = new Node(value)
    // Текущий узел (начинаем с головного)
    let current = this.head
    // Счетчик
    let i = 1
    // Пока есть текущий узел
    while (current) {
      // Прерываем цикл при совпадении счетчика с индексом -
      // это означает, что мы нашли нужный узел
      if (i === index) {
        break
      }
      // Переходим к следующему узлу
      current = current.next
      // Увеличиваем значение счетчика
      i += 1
    }
    // Если узел найден
    if (current) {
      // Добавляем ссылку на следующий узел в новый
      node.next = current.next
      // Обновляем ссылку текущего узла на следующий
      // (новый узел помещается между текущий и следующим: current и current.next)
      current.next = node
    } else {
      // Если узел не найден,
      // добавляем значение в конец списка
      return this.append(value)
    }

    return this
  }

  // Удаляет головной узел
  removeHead() {
    // Если головной узел отсутствует, значит,
    if (!this.head) {
      // список пуст - удалять нечего
      return null
    }

    // Удаляемый узел - головной
    const removed = this.head

    // Если головной узел содержит ссылку на следующий
    if (this.head.next) {
      // Обновляем головной узел (заменяем на следующий)
      this.head = this.head.next
    } else {
      // Иначе, обнуляем головной и хвостовой узлы,
      // (делаем список пустым, поскольку он содержал только один узел)
      this.head = null
      this.tail = null
    }

    // Возвращаем удаленный узел
    return removed
  }

  // Удаляет хвостовой узел
  removeTail() {
    // Если головной узел отсутствует, значит,
    if (!this.head) {
      // список пуст - удалять нечего
      return null
    }

    // Удаляемый узел - хвостовой
    let removed = this.tail

    // Крайний случай: если список состоит из одного узла,
    if (this.head === this.tail) {
      // обнуляем головной и хвостовой узлы
      // (делаем список пустым)
      this.head = null
      this.tail = null

      // Возвращаем удаленный узел
      return removed
    }

    // Текущий узел (начинаем с головного)
    let current = this.head

    // Обнуляем ссылку на следующий узел.
    // Пока есть следующий узел
    while (current.next) {
      // Если следующий узел является последним
      // (не содержит ссылки на следующий),
      if (!current.next.next) {
        // обнуляем ссылку текущего узла на следующий
        current.next = null
      } else {
        // Иначе, переходим к следующему узлу
        current = current.next
      }
    }

    // Обновляем хвостовой узел (заменяем на текущий)
    this.tail = current

    // Возвращаем удаленный узел
    return removed
  }

  // Удаляет узел по значению
  remove(value) {
    // Если головной узел отсутствует, значит,
    if (!this.head) {
      // список пуст - удалять нечего
      return null
    }

    // Последний удаленный узел
    let removed = null

    // Пока есть и удаляется головной узел
    while (this.head && this.compare.equal(this.head.value, value)) {
      // Обновляем удаляемый узел
      removed = this.head
      // Обновляем головной узел (заменяем на следующий)
      this.head = this.head.next
    }
    // Текущий узел (начинаем с головного)
    let current = this.head
    // Если узел имеется
    if (current) {
      // Пока есть следующий узел
      while (current.next) {
        // Если значения совпадают
        if (this.compare.equal(current.next.value, value)) {
          // Обновляем удаляемый узел
          removed = current.next
          // Обновляем ссылку текущего узла (заменяем на следующий,
          // чтобы закрыть образовавшуюся брешь)
          current.next = current.next.next
        } else {
          // Иначе, переходим к следующему узлу
          current = current.next
        }
      }
    }

    // Крайний случай: если удаляется хвостовой узел,
    if (this.compare.equal(this.tail.value, value)) {
      // обновляем его (заменяем на текущий)
      this.tail = current
    }

    // Возвращаем удаленный узел
    return removed
  }

  // Ищет узел по значению.
  // Принимает искомое значение и функцию поиска
  // в виде объекта
  find({ value, cb }) {
    // Если головной узел отсутствует, значит,
    if (!this.head) {
      // список пуст - искать нечего
      return null
    }

    // Текущий узел (начинаем с головного)
    let current = this.head

    // Пока есть текущий узел
    while (current) {
      // Если передана функция, и она удовлетворяется,
      if (cb && cb(current.value)) {
        // возвращаем текущий узел
        return current
      }

      // Если передано значение, и значения совпадают,
      if (value && this.compare.equal(current.value, value)) {
        // возвращаем текущий узел
        return current
      }

      // Переходим к следующему узлу
      current = current.next
    }

    // Ничего не найдено
    return null
  }

  // Инвертирует список
  reverse() {
    // Текущий узел (начинаем с головного)
    let current = this.head
    // Предыдущий узел
    let prev = null
    // Следующий узел
    let next = null

    // Пока есть текущий узел
    while (current) {
      // Обновляем переменную для следующего узла
      next = current.next
      // Обновляем ссылку текущего узла на предыдущий
      current.next = prev
      // Обновляем переменную для предыдущего узла
      prev = current
      // Переходим к следующему узлу
      current = next
    }

    // Меняем местами головной и хвостовой узлы
    this.tail = this.head
    // Обновляем головной узел
    // (заменяем последним предыдущим - хвостовым)
    this.head = prev

    return this
  }

  // Создает список из массива
  fromArray(arr) {
    // Перебираем элементы массива и добавляем каждый в конец списка
    arr.forEach((value) => this.append(value))

    return this
  }

  // Преобразует список в массив
  toArray() {
    // Массив узлов
    const arr = []
    // Текущий узел (начинаем с головного)
    let current = this.head
    // Пока есть текущий узел
    while (current) {
      // Добавляем узел в массив
      arr.push(current)
      // Переходим к следующему узлу
      current = current.next
    }
    // Возвращаем массив
    return arr
  }

  // Возвращает строковое представление списка.
  // Принимает кастомную функцию стрингификации
  toString(cb) {
    // Преобразуем список в массив
    return (
      this.toArray()
        // Перебираем узлы и преобразуем каждый в строку
        .map((node) => node.toString(cb))
        // Преобразуем массив в строку
        .toString()
    )
  }
}
