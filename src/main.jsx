import React from 'react';
import ReactDOM from 'react-dom/client';
import LiquidEther from './LiquidEther';
import '../script.js';

const bg = document.getElementById('liquid-ether-bg');
if (bg) {
  ReactDOM.createRoot(bg).render(
    <React.StrictMode>
      <LiquidEther
        colors={['#222222', '#8c8c8c', '#afafaf']}
        mouseForce={5}
        cursorSize={120}
        resolution={0.5}
        autoDemo={true}
        autoSpeed={0.4}
        autoIntensity={2.5}
        takeoverDuration={0.3}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
    </React.StrictMode>
  );
}
