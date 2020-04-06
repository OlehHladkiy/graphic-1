import { Form, InputNumber, Button } from 'antd';
import React, { useState, useEffect } from 'react';

import { drawUtils } from './util';

const Affine = ({ ctx }) => {
  const [x0, setX0] = useState(100);
  const [y0, setY0] = useState(100);
  const [xx, setXx] = useState(0.1);
  const [xy, setXy] = useState(0.4);
  const [yx, setYx] = useState(0.4);
  const [yy, setYy] = useState(0.1);

  useEffect(() => {
    if(ctx) {
      const { drawDefault } = drawUtils(ctx, 700, 700, { x0, y0, xx, xy, yx, yy });
      drawDefault();
    }
  }, [ctx])

  const onReset = () => {
    const { drawDefault } = drawUtils(ctx, 700, 700, { x0, y0, xx, xy, yx, yy });
    drawDefault();
  }

  const onDraw = () => {
    const { draw } = drawUtils(ctx, 700, 700, { x0, y0, xx, xy, yx, yy });
    draw();
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <b>Affine transformations</b>
      <p>Start of the new coordinate system - O(x0, y0)</p>
      <Form style={{ marginTop: '20px' }}>
        <Form.Item label="X0">
          <InputNumber value={x0} onChange={(value) => setX0(value)} />
        </Form.Item>
        <Form.Item label="Y0">
          <InputNumber value={y0} onChange={(value) => setY0(value)} />
        </Form.Item>
      </Form>
      <Form style={{ marginTop: '20px' }}>
        <p>Guide vector point is the x-coordinate axis - M1(x, y)</p>
        <Form.Item label="X">
          <InputNumber value={xx} onChange={(value) => setXx(value)} />
        </Form.Item>
        <Form.Item label="Y">
          <InputNumber value={xy} onChange={(value) => setXy(value)} />
        </Form.Item>
        <p>Guide vector point is the y-coordinate axis - M2(x, y)</p>
        <Form.Item label="X">
          <InputNumber value={yx} onChange={(value) => setYx(value)}/>
        </Form.Item>
        <Form.Item label="Y">
          <InputNumber value={yy} onChange={(value) => setYy(value)} />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={() => onReset()}>Reset</Button>
      <Button style={{marginLeft: '10px'}} type="primary" onClick={() => onDraw()}>Draw</Button>
    </div>
  );
};

export default Affine;