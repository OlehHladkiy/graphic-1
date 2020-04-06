import { Form, InputNumber, Button } from 'antd';
import React, { useState, useEffect } from 'react';

import { drawUtils } from './util';

const Transform = ({ ctx, externalRadius, internalRadius, }) => {
  const [delX, setDelX] = useState(0);
  const [delY, setDelY] = useState(0);
  const [x0, setX0] = useState(350);
  const [y0, setY0] = useState(350);
  const [m, setM] = useState(-350);
  const [n, setN] = useState(-350);
  const [alf, setAlf] = useState(0);
  
  
  useEffect(() => {
    if (ctx) {
      const { drawDefault } = drawUtils(ctx, 700, 700, { delX, delY, x0, y0, m, n, alf, externalRadius, internalRadius });
      drawDefault();
    }
  }, [ctx])

  useEffect(() => {
    if(ctx) {
      const { transform } = drawUtils(ctx, 700, 700, { delX, delY, x0, y0, m, n, alf, externalRadius, internalRadius });
      transform(1);
    }
  }, [ctx, externalRadius, internalRadius]);

  const onReset = () => {
    setDelX(0);
    setDelY(0);
    setX0(350);
    setY0(350);
    setM(-350);
    setN(-350);
    setAlf(0);
    const { drawDefault } = drawUtils(ctx, 700, 700, { delX, delY, x0, y0, m, n, alf, externalRadius, internalRadius });
    drawDefault()
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <b>Transform Detail</b>
      <Form style={{ marginTop: '20px' }}>
        <Form.Item label="X">
          <InputNumber value={delX} onChange={value => { 
            setDelX(value)
            drawUtils(ctx, 700, 700, { delX: value, delY, x0, y0, m, n, alf, externalRadius, internalRadius }).transform(1);
          }} />
        </Form.Item>
        <Form.Item label="Y">
          <InputNumber value={delY} onChange={value => { 
            setDelY(value)
            drawUtils(ctx, 700, 700, { delX, delY: value, x0, y0, m, n, alf, externalRadius, internalRadius }).transform(1);
          }} />
        </Form.Item>
      </Form>
      <b>Rotation</b>
      <Form style={{ marginTop: '20px' }}>
        <p>Around its axis P(x0, y0)</p>
        <Form.Item label="X0">
          <InputNumber value={x0} onChange={value => { 
            setX0(value)
            drawUtils(ctx, 700, 700, { delX, delY, x0: value, y0, m, n, alf, externalRadius, internalRadius }).transform(1);
          }}/>
        </Form.Item>
        <Form.Item label="Y0">
          <InputNumber value={y0} onChange={value => {
            setY0(value)
            drawUtils(ctx, 700, 700, { delX, delY, x0, y0: value, m, n, alf, externalRadius, internalRadius }).transform(1);
          }}/>
        </Form.Item>
        <p>Around the point T(m, n)</p>
        <Form.Item label="m">
          <InputNumber value={m} onChange={value => { 
            setM(value)
            drawUtils(ctx, 700, 700, { delX, delY, x0, y0, m: value, n, alf, externalRadius, internalRadius }).transform(1);
          }}/>
        </Form.Item>
        <Form.Item label="n">
          <InputNumber value={n} onChange={value => { 
            setN(value)
            drawUtils(ctx, 700, 700, { delX, delY, x0, y0, m, n: value, alf, externalRadius, internalRadius }).transform(1);
          }}/>
        </Form.Item>
        <Form.Item label="Rotation angle">
          <InputNumber value={alf} onChange={value => { 
            setAlf(value)
            drawUtils(ctx, 700, 700, { delX, delY, x0, y0, m, n, alf: value, externalRadius, internalRadius }).transform(2);
          }}/>
        </Form.Item>
      </Form>
      <Button type="primary" onClick={() => onReset()}>Reset</Button>
    </div>
  );
};

export default Transform;