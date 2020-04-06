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

const getDetailArray = (canvasHeight, canvasWidth) => {
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
}

const affineTransformationGrid = (elements, data) => {
  const { x0, y0, xx, xy, yx,  yy } = data;
  const newArr = [];
  elements.forEach(element => newArr.push({x: x0 + xx * element.x + xy * element.y, y: y0 + yx * element.x + yy * element.y, c: x0 + xx * element.c + xy * element.d, d: y0 + yx * element.c + yy * element.d}));
  return newArr;
}

const buildGridByPoints = (ctx, points) => {
  ctx.clearRect(0, 0, 700, 700);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  points.forEach(function(element){
      ctx.moveTo(element.x, element.y);
      ctx.lineTo(element.c, element.d);
  });
  ctx.stroke();
  ctx.closePath(); 
}

const affineTransformationDetail = (elements, data) => {
  const { x0, y0, xx, xy, yx,  yy } = data;
  const newArr = [];
  elements.forEach(element => newArr.push({x: x0 + xx * element.x + xy * element.y, y: y0 + yx * element.x + yy * element.y}));
  return newArr;
}

const processAffineTransformationDetail = (elements, arr) => {
  const elementsPointsToMove = affineTransformationDetail(elements, arr);
  const points = elements.map(el => ({ x: el.x1, y: el.y1 }));
  const processedPoints = affineTransformationDetail(points, arr);
  
  return elementsPointsToMove.map((el, i) => ({
      ...el,
      x1: processedPoints[i].x,
      y1: processedPoints[i].y,
  }))
}

const buildDetail = (ctx, elements) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  const [firstPoint, ...restPoints] = elements;
  ctx.moveTo(firstPoint.x, firstPoint.y);
  restPoints.forEach(point => {
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x1, point.y1);
  });
  ctx.closePath();
  ctx.stroke();
}

export const drawUtils = (ctx, canvasWidth, canvasHeight, data) => {
  const drawDefault = () => {
    let gridAr = drawGrid(canvasHeight, canvasWidth);
    buildGridByPoints(ctx, gridAr);
      
    const internalCircleArray = drawCircle(50, 0, 360, canvasWidth / 2, canvasHeight / 2);
    buildDetail(ctx, internalCircleArray);

    const externalCircleArray = drawCircle(75, -180, 0, canvasWidth / 2, canvasHeight / 2);
    buildDetail(ctx, externalCircleArray);

    const leftCurvePoints = drawCircle(100, -31, 0, canvasWidth / 2 - 25, canvasHeight / 2 + 100);
    buildDetail(ctx, leftCurvePoints);

    const righCurvePoints = drawCircle(-100, 0, 31, canvasWidth / 2 + 25, canvasHeight / 2 + 98);
    buildDetail(ctx, righCurvePoints);

    const detailArray = getDetailArray(canvasHeight, canvasWidth);
    buildDetail(ctx, detailArray);
  }

  const draw = () => {
    let gridAr = drawGrid(canvasHeight, canvasWidth);

    let newGridAr = affineTransformationGrid(gridAr, data);
    buildGridByPoints(ctx, newGridAr);

    const internalCircleArray = drawCircle(50, 0, 360, canvasWidth / 2, canvasHeight / 2);
    const externalCircleArray = drawCircle(75, -180, 0, canvasWidth / 2, canvasHeight / 2);
    const leftCurvePoints = drawCircle(100, -31, 0, canvasWidth / 2 - 25, canvasHeight / 2 + 100);    
    const righCurvePoints = drawCircle(-100, 0, 31, canvasWidth / 2 + 25, canvasHeight / 2 + 98);
    const detailArray = getDetailArray(canvasHeight, canvasWidth);

    const newInternalCircleArray = processAffineTransformationDetail(internalCircleArray, data);
    buildDetail(ctx, newInternalCircleArray);

    const newExternalCircleArray = processAffineTransformationDetail(externalCircleArray, data);
    buildDetail(ctx, newExternalCircleArray);

    const newLeftCurvePoints = processAffineTransformationDetail(leftCurvePoints, data);
    buildDetail(ctx, newLeftCurvePoints);

    const newRighCurvePoints = processAffineTransformationDetail(righCurvePoints, data);
    buildDetail(ctx, newRighCurvePoints);

    const newDetailArray = processAffineTransformationDetail(detailArray, data);
    buildDetail(ctx, newDetailArray);
  }

  return { drawDefault, draw };
}