import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

function renderReact() {
	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
}

if (window['cordova']) {
	document.addEventListener('deviceready', renderReact, false);
} else {
	renderReact();
}
