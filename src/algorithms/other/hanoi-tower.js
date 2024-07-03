import Stack from '../../data-structures/stack'

function hanoiTowerRecursive({
  numberOfDiscs,
  fromPole,
  withPole,
  toPole,
  moveCallback,
}) {
  if (numberOfDiscs === 1) {
    moveCallback(fromPole.peek(), fromPole.toArray(), toPole.toArray())
    const disc = fromPole.pop()
    toPole.push(disc)
  } else {
    // Берем нижний диск из стека fromPole
    hanoiTowerRecursive({
      numberOfDiscs: numberOfDiscs - 1,
      fromPole,
      withPole: toPole,
      toPole: withPole,
      moveCallback,
    })

    // Перемещаем этот диск в конечный пункт назначения
    hanoiTowerRecursive({
      numberOfDiscs: 1,
      fromPole,
      withPole,
      toPole,
      moveCallback,
    })

    // Перемещаем временную башню с вспомогательного поля в конечный пункт назначения
    hanoiTowerRecursive({
      numberOfDiscs: numberOfDiscs - 1,
      fromPole: withPole,
      withPole: fromPole,
      toPole,
      moveCallback,
    })
  }
}

export default function hanoiTower({
  numberOfDiscs,
  moveCallback,
  fromPole = new Stack(),
  toPole = new Stack(),
  withPole = new Stack(),
}) {
  // Каждое из трех полей представляет стек, который может содержать диски.
  // Каждый диск представлен числом. БОльшие диски представлены бОльшими числами

  // Создаем диски и помещаем их в стек fromPole
  for (let i = numberOfDiscs; i > 0; i--) {
    fromPole.push(i)
  }

  hanoiTowerRecursive({
    numberOfDiscs,
    fromPole,
    withPole,
    toPole,
    moveCallback,
  })
}
