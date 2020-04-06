const cellsCountX = 30;
const cellsCountY = 30;

const getLines = (height, width) => ({ cellWith: width / cellsCountX, cellHeight: height / cellsCountY });

export const drawGrid = (ctx, canvasHeight, canvasWidth) => {
  const { cellWith, cellHeight } = getLines(canvasHeight, canvasWidth);

  ctx.clearRect(0, 0, 700, 700);
  var buf = 0;
  for (let i = 0; i <= cellsCountX; i++) {
      if( i === cellsCountX / 2){
          ctx.beginPath();
          ctx.strokeStyle = "#000000";
          ctx.moveTo(buf, 0);
          ctx.lineTo(buf, canvasHeight);
          
          ctx.moveTo(buf, canvasHeight);
          ctx.lineTo(buf + cellWith / 3, canvasHeight - cellHeight/2);
          ctx.moveTo(buf, canvasHeight);
          ctx.lineTo(buf - cellWith / 3, canvasHeight - cellHeight/2);
          ctx.font = "italic 8pt Arial";
          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          ctx.fillText("Y", buf - 13, canvasHeight - cellHeight/2);

          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText("0", buf + cellWith/3, canvasHeight/2 + cellHeight/4);

          ctx.stroke();
          buf +=cellWith;
          ctx.closePath();
      }
      else{
          ctx.beginPath();
          ctx.strokeStyle = '#c0c0c0';
          ctx.moveTo(buf, 0); 
          ctx.lineTo(buf, canvasHeight); 
          ctx.stroke(); 
          buf +=cellWith;
          ctx.closePath();
      }
  }  

  buf = 0;
  for (let j = 0; j <= cellsCountY; j++) {
      if(j === cellsCountY/2 ){
          ctx.beginPath();
          ctx.strokeStyle = "#000000";
          ctx.moveTo(0, buf);
          ctx.lineTo(canvasWidth, buf);

          ctx.moveTo(canvasWidth, buf);
          ctx.lineTo(canvasWidth - cellWith/2, buf + cellHeight/3);
          ctx.moveTo(canvasWidth, buf);
          ctx.lineTo(canvasWidth - cellWith/2, buf - cellHeight/3);

          ctx.textAlign = "right";
          ctx.textBaseline = "top";
          ctx.fillText("X", canvasWidth - 4, buf + 10);

          ctx.stroke();
          buf +=cellHeight;
          ctx.closePath();
      }
      else{
          ctx.beginPath();
          ctx.strokeStyle = '#c0c0c0';
          ctx.moveTo(0, buf);
          ctx.lineTo(canvasWidth, buf);
          ctx.stroke();
          buf +=cellHeight;
          ctx.closePath();
      }   
  }
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

const getDetailPoints = (canvasHeight, canvasWidth, externalRadius, internalRadius) => {
  return [
    {x: canvasWidth / 2 - externalRadius, y: canvasHeight / 2, x1: canvasWidth / 2 - externalRadius, y1: canvasHeight / 2 + externalRadius + 25, w: 1 },
    {x: canvasWidth / 2 - externalRadius, y: canvasHeight / 2, x1: canvasWidth / 2 - externalRadius, y1: canvasHeight / 2 + externalRadius + 25, w: 1 },
    {x: canvasWidth / 2 - externalRadius, y: canvasHeight / 2 + externalRadius + 25, x1: canvasWidth / 2 - (externalRadius - 25), y1: canvasHeight / 2 + externalRadius + 25, w: 1 },
    {x: canvasWidth / 2 - (externalRadius - 25), y: canvasHeight / 2 + externalRadius + 25, x1: canvasWidth / 2 - (externalRadius - 25), y1: canvasHeight / 2 + externalRadius + 75, w: 1 },
    {x: canvasWidth / 2 - (externalRadius - 25), y: canvasHeight / 2 + externalRadius + 75, x1: canvasWidth / 2 - externalRadius - 50 + 13, y1: canvasHeight / 2 + externalRadius + 75, w: 1 }, 

    {x: canvasWidth / 2 + externalRadius, y: canvasHeight / 2, x1: canvasWidth / 2 + externalRadius, y1: canvasHeight / 2 + externalRadius + 25, w: 1 },
    {x: canvasWidth / 2 + externalRadius, y: canvasHeight / 2 + externalRadius + 25, x1: canvasWidth / 2 + (externalRadius - 25), y1: canvasHeight / 2 + externalRadius + 25, w: 1 },
    {x: canvasWidth / 2 + (externalRadius - 25), y: canvasHeight / 2 + externalRadius + 25, x1: canvasWidth / 2 + (externalRadius - 25), y1: canvasHeight / 2 + externalRadius + 75, w: 1 },    
    {x: canvasWidth / 2 + (externalRadius - 25), y: canvasHeight / 2 + externalRadius + 75, x1: canvasWidth / 2 + externalRadius + 50 - 13, y1: canvasHeight / 2 + externalRadius + 75, w: 1 },
    
    {x: canvasWidth / 2 - (externalRadius + 50), y: canvasHeight / 2 + externalRadius + 25, x1: canvasWidth / 2 - (externalRadius + 50), y1: canvasHeight / 2 + (externalRadius - 25), w: 1 },
    {x: canvasWidth / 2 + externalRadius + 50, y: canvasHeight / 2 + externalRadius + 25, x1: canvasWidth / 2 + (externalRadius + 50), y1: canvasHeight / 2 + externalRadius - 50, w: 1 },
    {x: canvasWidth / 2 - (externalRadius + 50), y: canvasHeight / 2 + (externalRadius - 25) , x1: canvasWidth / 2 - (externalRadius - 12.5), y1: canvasHeight / 2 - (externalRadius + 50), w: 1 },
    {x: canvasWidth / 2 + externalRadius + 50, y: canvasHeight / 2 + (externalRadius - 50), x1: canvasWidth / 2 + (externalRadius - 12.5), y1: canvasHeight / 2 - (externalRadius + 50), w: 1 },
    {x: canvasWidth / 2 - (externalRadius - 12.5), y: canvasHeight / 2 - (externalRadius + 50), x1: canvasWidth / 2 + (externalRadius - 12.5), y1: canvasHeight / 2 - (externalRadius + 50), w: 1 },
  ];
}

// Calculate function.
const processMatrixMul = (elements, delX, delY, alf, m, n, x0, y0, ver) => {
  var k = 3, l = elements.length;
  var A = [];
  let C = [];
  for (let i = 0; i < l; i++){
      A[i] = [];
      C[i] = [];
  for (let j = 0; j < k; j++){
      A[i][j] = 0;
      C[i][j] = 0;
  }}

  const [...allElements] = elements;
  let d = 0;
  allElements.forEach(function(element){
      for(let i = 0; i < 3; i++){
          
          if(i === 0){
              A[d][i] = element.x;
          }
          else{
              if(i === 1){
                  A[d][i] = element.y;
              }
              else{
                  A[d][i] = element.w;
              }
          }
          
      }
      d++;
  });


 if(ver === 1){
      let m = delX;
      let n = delY;
      let B = [[1,0,0],[0,1,0],[m,n,1]];
      let rowsB = B.length,
      colsB = B[0].length;
      var t = 0;

      for(let  k = 0; k < A.length; k++){
          for(let i = 0; i < rowsB; i++){
              for(let j = 0; j < colsB; j++){
                  t += A[k][j] * B[j][i];
              }
              C[k][i] = t;
              t = 0; 
          }
      }
  }
  else{
      let D = [[1,0,0],[0,1,0],[m,n,1]];
      let B = [[Math.cos(alf),Math.sin(alf),0],[-Math.sin(alf),Math.cos(alf),0],[x0,y0,1]];

      let rowsD = D.length, colsD = D[0].length,
          rowsB = B.length, colsB = B[0].length;
      let E = [];
      for (let i = 0; i < rowsD; i++){
          E[i] = [];
      }
      for (let k = 0; k < colsB; k++){ 
          for (let i = 0; i < rowsD; i++){ 
              let t = 0;
              for (let j = 0; j < rowsB; j++){
                  t += D[i][j] * B[j][k];
              }
              E[i][k] = t;
          }
      }

      for(let k = 0; k < A.length; k++){
          for(let i = 0; i < rowsB; i++){
              t = 0;
              for(let j = 0; j < colsB; j++){
                  t += A[k][j] * E[j][i];
              }
              C[k][i] = t;   
          }
      }


  }
          
  const newArr = [];
  for(let i = 0; i < C.length; i++){
      newArr.push({x: C[i][0], y: C[i][1], w: C[i][2]});
  }

  return newArr;
}

const matrixMultiplication = (elements, { delX, delY, alf, m, n, x0, y0 }, w) => {
  const transformMovePointsToMul = elements.map(el => ({ x: el.x1, y: el.y1, w: el.w }))
  const newPointsToMove = processMatrixMul(transformMovePointsToMul, delX, delY, alf, m, n, x0, y0, w);
  
  return processMatrixMul(elements, delX, delY, alf, m, n, x0, y0, w).map((el, i) => ({ ...el, x1: newPointsToMove[i].x, y1: newPointsToMove[i].y }));
}

export const drawTextTooltip = (ctx, canvasHeight, canvasWidth, externalRadius, internalRadius) => {
  ctx.beginPath();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("R int", canvasWidth/2 + internalRadius, canvasHeight/2 - 40);
  ctx.fillText("R ext", canvasWidth/2 + externalRadius - 35, canvasHeight / 2 + externalRadius + 5);
  ctx.closePath();
}

export const drawUtils = (ctx, canvasHeight, canvasWidth, pointsData) => {
  const { externalRadius, internalRadius, ...data } = pointsData;

  const drawByPoints = (elements) => {
    ctx.lineWidth = 2;
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

  const drawDefault = () => {
    drawGrid(ctx, canvasHeight, canvasWidth);

    const internalCircleArray = drawCircle(internalRadius, 0, 360, canvasWidth / 2, canvasHeight / 2);
    drawByPoints(internalCircleArray);

    const externalCircleArray = drawCircle(externalRadius, -180, 0, canvasWidth / 2, canvasHeight / 2);
    drawByPoints(externalCircleArray);

    const leftCurvePoints = drawCircle(100, -30, 0, canvasWidth / 2 - 25, canvasHeight / 2 + 100);
    drawByPoints(leftCurvePoints);

    const righCurvePoints = drawCircle(-100, 0, 30, canvasWidth / 2 + 25, canvasHeight / 2 + 98);
    drawByPoints(righCurvePoints);

    const detailArray = getDetailPoints(canvasHeight, canvasWidth, externalRadius, internalRadius);
    drawByPoints(detailArray);

    drawTextTooltip(ctx, canvasHeight, canvasWidth, externalRadius, internalRadius);
  }

  const transform = (w) => {
    ctx.clearRect(0, 0, 700, 700);
    drawGrid(ctx, canvasHeight, canvasWidth);

    const internalCircleArray = drawCircle(internalRadius, 0, 360, canvasWidth / 2, canvasHeight / 2);
    const externalCircleArray = drawCircle(externalRadius, -180, 0, canvasWidth / 2, canvasHeight / 2);

    const leftCurvePoints = drawCircle(100, -31, 0, canvasWidth / 2 - (externalRadius - 50), canvasHeight / 2 + externalRadius + 25);    
    const righCurvePoints = drawCircle(-100, 0, 31, canvasWidth / 2 + (externalRadius - 50), canvasHeight / 2 + externalRadius + 23);
    
    const detailArray = getDetailPoints(canvasHeight, canvasWidth, externalRadius, internalRadius);

    const newInternalCircleArray = matrixMultiplication(internalCircleArray, data, w);
    drawByPoints(newInternalCircleArray);

    const newExternalCircleArray = matrixMultiplication(externalCircleArray, data, w);
    drawByPoints(newExternalCircleArray);

    const newLeftCurvePoints = matrixMultiplication(leftCurvePoints, data, w);
    drawByPoints(newLeftCurvePoints);

    const newRightCurvePoints = matrixMultiplication(righCurvePoints, data, w);
    drawByPoints(newRightCurvePoints);

    const newDetailArray = matrixMultiplication(detailArray, data, w)
    drawByPoints(newDetailArray);
  }

  return { drawDefault, transform }
}