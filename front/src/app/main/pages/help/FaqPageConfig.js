import React from 'react';

const FaqPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/pages/help',
			component: React.lazy(() => import('./FaqPage'))
		}
	]
};

export default FaqPageConfig;
