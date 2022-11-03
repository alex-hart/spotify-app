import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './fonts/CircularStd-Medium.otf';
import './fonts/CircularStd-Bold.otf';
import './fonts/CircularStd-Black.otf';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
