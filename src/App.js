import { Radio, Form, InputNumber } from 'antd';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import 'antd/dist/antd.css';

import Projective from './components/Projective';
import Transform from './components/Transform';
import Affine from './components/Affine';

export const Method = {
  Transform: 'transform',
  Projective: 'projective',
  Affine: 'affine',
}

function App() {
  const [externalRadius, setExternalRadius] = useState(75);
  const [internalRadius, setInternalRadius] = useState(50);
  const [methodKey, setMethodKey] = useState(Method.Transform);
  const [ctx, setCtx] = useState(null);

  useEffect(() => { 
    if(ctx){
      setCtx(null);
    }
  }, [methodKey])

  return (
    <div style={{ marginTop: '40px' }}>
      <main style={{ height: '90vh' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '50px', padding: '10px', border: '1px solid #d9d9d9' }}>
            <canvas 
              ref={canvas => {
                if (canvas){
                  const ctx = canvas.getContext('2d');
                  setCtx(ctx);
                }
              }} 
              id="canvas" 
              width={700} 
              height={700}
            />
          </div>
          <div style={{ width: '80%' }}>
            {methodKey === Method.Transform && <Form layout="vertical" >
              <Form.Item label="External Radius">
                <InputNumber min={70} max={100} value={externalRadius} onChange={radius => setExternalRadius(radius)} placeholder="75" style={{ width: '60%' }}/>
              </Form.Item>
              <Form.Item label="Internal Radius">
                <InputNumber min={25} max={65} value={internalRadius} onChange={radius => setInternalRadius(radius)} placeholder="50" style={{ width: '60%' }}/>
              </Form.Item>
            </Form>}
            <Radio.Group value={methodKey} onChange={e => setMethodKey(e.target.value)}>
              <Radio.Button value={Method.Transform}>Transform</Radio.Button>
              <Radio.Button value={Method.Projective}>Projective</Radio.Button>
              <Radio.Button value={Method.Affine}>Affine</Radio.Button>
            </Radio.Group>
              {methodKey === Method.Transform && <Transform ctx={ctx} externalRadius={externalRadius} internalRadius={internalRadius} />}
              {methodKey === Method.Projective && <Projective ctx={ctx} externalRadius={externalRadius} internalRadius={internalRadius}/>}
              {methodKey === Method.Affine && <Affine ctx={ctx} externalRadius={externalRadius} internalRadius={internalRadius}/>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
