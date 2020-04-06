const drawGrid = (canvasHeight, canvasWidth) => { 
  let buf = 0;
  const gridArr = [];
  for (let i = 0; i <= 13; i++) {
      gridArr.push({x: buf, y: 0, c: buf, d: canvasHeight});
      buf += canvasWidth / 13;        
  }  
  buf = 0;
  for (let i = 0; i <= 13; i++) {
      gridArr.push({x: 0, y: buf, c: canvasWidth, d: buf});
      buf += canvasHeight / 13;        
  } 
  return gridArr;
}

const drawCircle = (
  R = 10,
  start = 0,
  end = 360,
  startX = 0,
  startY = 0,
) => {
  let angle = start;
  const coef = Math.PI / 180;
  const points = [];

  if (end > 360 || end < start)
      throw new Error("end > 360 || end < start");

  R = start <= 0 ? -R : R;
  while (angle < end) {
      points.push({
          x: startX + R * Math.cos(angle * coef),
          y: startY + R * Math.sin(angle * coef),
          x1: startX + R * Math.cos((angle + 1) * coef),
          y1: startY + R * Math.sin((angle + 1) * coef),
          w: 1,
      });
      angle++;
  }
  return points;
};

const getDetailPoints = (canvasHeight, canvasWidth) => {
  return [
      {x: canvasWidth / 2 - 75, y: canvasHeight / 2, x1: canvasWidth / 2 - 75, y1: canvasHeight / 2 + 100, w: 1 },
      {x: canvasWidth / 2 - 75, y: canvasHeight / 2, x1: canvasWidth / 2 - 75, y1: canvasHeight / 2 + 100, w: 1 },
      {x: canvasWidth / 2 - 75, y: canvasHeight / 2 + 100, x1: canvasWidth / 2 - 50, y1: canvasHeight / 2 + 100, w: 1 },
      {x: canvasWidth / 2 - 50, y: canvasHeight / 2 + 100, x1: canvasWidth / 2 - 50, y1: canvasHeight / 2 + 150, w: 1 },
      {x: canvasWidth / 2 - 50, y: canvasHeight / 2 + 150, x1: canvasWidth / 2 - 75 - 37, y1: canvasHeight / 2 + 150, w: 1 },

      {x: canvasWidth / 2 + 75, y: canvasHeight / 2, x1: canvasWidth / 2 + 75, y1: canvasHeight / 2 + 100, w: 1 },
      {x: canvasWidth / 2 + 75, y: canvasHeight / 2 + 100, x1: canvasWidth / 2 + 50, y1: canvasHeight / 2 + 100, w: 1 },
      {x: canvasWidth / 2 + 50, y: canvasHeight / 2 + 100, x1: canvasWidth / 2 + 50, y1: canvasHeight / 2 + 150, w: 1 },
      {x: canvasWidth / 2 + 50, y: canvasHeight / 2 + 150, x1: canvasWidth / 2 + 75 + 37, y1: canvasHeight / 2 + 150, w: 1 },

      {x: canvasWidth / 2 - 125, y: canvasHeight / 2 + 100, x1: canvasWidth / 2 - 125, y1: canvasHeight / 2 + 25, w: 1 },
      {x: canvasWidth / 2 + 125, y: canvasHeight / 2 + 100, x1: canvasWidth / 2 + 125, y1: canvasHeight / 2 + 25, w: 1 },
      {x: canvasWidth / 2 - 75 - 50, y: canvasHeight / 2 + 25, x1: canvasWidth / 2-62.5, y1: canvasHeight / 2 - 125, w: 1 },
      {x: canvasWidth / 2 + 125, y: canvasHeight / 2 + 25, x1: canvasWidth / 2 + 62.5, y1: canvasHeight / 2 - 125, w: 1 },
      {x: canvasWidth / 2 - 62.5, y: canvasHeight / 2 - 125, x1: canvasWidth / 2 + 62.5, y1: canvasHeight / 2 - 125, w: 1 },
  ];
};

const projectiveTransformationGrid = (elements, data) => {
  const { x0, y0, xx, xy, yx, yy, w0, wx, wy } = data;
  const newArr = [];
  elements.forEach(elem => newArr.push({x: ((x0 * w0 + xx * wx * elem.x + xy * wy * elem.y)/(w0 + wx * elem.x + wy * elem.y)), y: ((y0 * w0 + yx * wx * elem.x + yy * wy * elem.y)/(w0 + wx * elem.x + wy * elem.y)), c: ((x0 * w0 + xx * wx * elem.c + xy * wy * elem.d)/(w0 + wx * elem.c + wy * elem.d)), d: ((y0 * w0 + yx * wx * elem.c + yy * wy * elem.d)/(w0 + wx * elem.c + wy * elem.d))}));
  return newArr;
}

const buildGridByPoints = (ctx, elements) => {
  ctx.clearRect(0, 0, 700, 700);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  elements.forEach(function(element){
      ctx.moveTo(element.x, element.y);
      ctx.lineTo(element.c, element.d);
  });
  ctx.stroke();
  ctx.closePath(); 
}

const projectiveTransformationDetail = (elements, data) => {
  const { x0, y0, xx, xy, yx, yy, w0, wx, wy } = data;
  const newArr = [];
  elements.forEach(element => newArr.push({x: ((x0 * w0 + xx * wx * element.x + xy * wy * element.y)/(w0 + wx * element.x + wy * element.y)), y: ((y0 * w0 + yx * wx * element.x + yy * wy * element.y)/(w0 + wx * element.x + wy * element.y))}));
  return newArr;
}

const processProjectiveTransformationDetail = (elements, arr) => {
  const elementsPointsToMove = projectiveTransformationDetail(elements, arr);
  const points = elements.map(el => ({ x: el.x1, y: el.y1 }));
  const processedPoints = projectiveTransformationDetail(points, arr);
  
  return elementsPointsToMove.map((el, i) => ({
      ...el,
      x1: processedPoints[i].x,
      y1: processedPoints[i].y,
  }))
}

const drawDetailByPoint = (ctx, elements) => {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  const [firstElement, ...restPoints] = elements;
  ctx.moveTo(firstElement.x, firstElement.y);
  restPoints.forEach(point => {
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x1, point.y1);
  });
  ctx.closePath();
  ctx.stroke();
}

export const drawUtils = (ctx, canvasHeight, canvasWidth, data) => {
  const drawDefault = () => {
    let gridAr = drawGrid(canvasHeight, canvasWidth);
    buildGridByPoints(ctx, gridAr);
        
    const internalCircleArray = drawCircle(50, 0, 360, canvasWidth / 2, canvasHeight / 2);
    drawDetailByPoint(ctx, internalCircleArray);

    const externalCircleArray = drawCircle(75, -180, 0, canvasWidth / 2, canvasHeight / 2);
    drawDetailByPoint(ctx, externalCircleArray);

    const leftCurvePoints = drawCircle(100, -31, 0, canvasWidth / 2 - 25, canvasHeight / 2 + 100);
    drawDetailByPoint(ctx, leftCurvePoints);

    const righCurvePoints = drawCircle(-100, 0, 31, canvasWidth / 2 + 25, canvasHeight / 2 + 98);
    drawDetailByPoint(ctx, righCurvePoints);

    const detailArray = getDetailPoints(canvasHeight, canvasWidth);
    drawDetailByPoint(ctx, detailArray);
  }

  const draw = () => {
    let gridAr = drawGrid(canvasHeight, canvasWidth);

    let newGridAr = projectiveTransformationGrid(gridAr, data);
    buildGridByPoints(ctx, newGridAr);

    const internalCircleArray = drawCircle(50, 0, 360, canvasWidth / 2, canvasHeight / 2);
    const externalCircleArray = drawCircle(75, -180, 0, canvasWidth / 2, canvasHeight / 2);
    const leftCurvePoints = drawCircle(100, -31, 0, canvasWidth / 2 - 25, canvasHeight / 2 + 100);    
    const righCurvePoints = drawCircle(-100, 0, 31, canvasWidth / 2 + 25, canvasHeight / 2 + 98);
    const detailArray = getDetailPoints(canvasHeight, canvasWidth);

    let points = []

    points = processProjectiveTransformationDetail(internalCircleArray, data);
    drawDetailByPoint(ctx, points);

    points = processProjectiveTransformationDetail(externalCircleArray, data);
    drawDetailByPoint(ctx, points);

    points = processProjectiveTransformationDetail(leftCurvePoints, data);
    drawDetailByPoint(ctx, points);

    points = processProjectiveTransformationDetail(righCurvePoints, data);
    drawDetailByPoint(ctx, points);

    points = processProjectiveTransformationDetail(detailArray, data);
    drawDetailByPoint(ctx, points);
  }

  return { drawDefault, draw };
}