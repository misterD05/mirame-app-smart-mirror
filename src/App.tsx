import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import './global.css';
import {OpenmeteoStats, SmallDigitalClock} from './components'


function App() {

  return (
    <div className="p-10 font-sans select-none">
      <div>
        <SmallDigitalClock></SmallDigitalClock>
        <br />
        <OpenmeteoStats></OpenmeteoStats>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
