function start() {
  // ширина и высота одного квадрата
  const SIDE = 40;
  const FIELD_WIDTH = 10;
  const FIELD_HEIGHT = 10;

  const canvas = document.getElementById("game");
  const fieldWidthVisual = SIDE * FIELD_WIDTH;
  const fieldHeightVisual = SIDE * FIELD_HEIGHT;
  canvas.width = fieldWidthVisual;
  canvas.height = fieldHeightVisual;

  // фигура с начальными координатами ее квадратов, без учета ширины стороны
  const figure_1 = [[5, -1], [5, -2]]

  // координаты занятых квадратов на поле
  let occupiedSquares = [];

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'green'
  ctx.fillRect(0, 0, fieldWidthVisual, fieldHeightVisual)


  let activeFigure = figure_1;

  const gameOver = () => {
    alert("Ты пидор")
  }

  const check = (block) => {
    let checkFailed = false;

    for (let i = 0; i < occupiedSquares.length; i++) {
      const occupiedBlock = occupiedSquares[i];


      // TODO придумать, как завершать игру. Надо выйти из цикла, чтобы не пополнялся массив занятых квадратов
      // activeFigure.forEach(block => {
      //   console.log(activeFigure, occupiedBlock)

      //   if (occupiedBlock[0] == block[0] && occupiedBlock[1] == block[1]) {
      //     gameOver(); break
      //   }
      // })

      if (block[0] == occupiedBlock[0] && block[1] == occupiedBlock[1]) {
        checkFailed = true; break
      }


      if (block[1] === FIELD_HEIGHT || block[1] > FIELD_HEIGHT) {
        checkFailed = true
      }
    }

    if (block[1] === FIELD_HEIGHT) {
      checkFailed = true
    }

    return checkFailed;
  }

  const colorField = () => {
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, fieldWidthVisual, fieldHeightVisual)

    occupiedSquares.forEach(block => {
      ctx.fillStyle = 'red';
      ctx.fillRect(block[0] * SIDE, block[1] * SIDE, SIDE, SIDE);
    });

    activeFigure = figure_1;
  }


  const colorFigure = (prevFigure, newFigure) => {
    prevFigure.forEach(function (block) {
      ctx.fillStyle = 'green';
      ctx.fillRect(block[0] * SIDE, block[1] * SIDE, SIDE, SIDE);
    });

    newFigure.forEach(function (block) {
      ctx.fillStyle = 'red';
      ctx.fillRect(block[0] * SIDE, block[1] * SIDE, SIDE, SIDE);
    });

    activeFigure = newFigure;
  }

  const tick = (figure, vectorX = 0) => {
    const newFigure = [];
    let checkFailed = false;

    // берем каждый квадрат в фигуре по отдельности
    for (let i = 0; i < figure.length; i++) {

      // блок - это один из квадратов фигуры
      const block = figure[i];

      // новый блок - это квадрат фигуры, который подвинули
      newBlock = [block[0] + vectorX, block[1] + 1];

      // проверяем, не уперся ли новый блок в один из массива занятых
      const checkToContinueFailed = check(newBlock);

      if (checkToContinueFailed) {
        checkFailed = true;
        occupiedSquares = occupiedSquares.concat(figure)
        colorField()
        break
      } else {
        newFigure.push(newBlock)
      }
    }

    if (!checkFailed) colorFigure(figure, newFigure)

  };
  // ctx.fillStyle = 'green';
  // ctx.fillRect(block.x, block.y, SIDE, SIDE);

  const test = () => {
    tick(activeFigure)
  }

  setInterval(test, 500)


  window.addEventListener('keydown', function (event) {
    if (event.keyCode == 39) {
      tick(activeFigure, 1)
    }
    else if (event.keyCode == 37) {
      tick(activeFigure, -1)
    }
  });

}


document.addEventListener("DOMContentLoaded", start)