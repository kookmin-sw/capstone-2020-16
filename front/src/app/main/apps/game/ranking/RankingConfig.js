import React from 'react';

const RankingConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/ranking',
			component: React.lazy(() => import('./RankingPage')),
		}
	]
};

export default RankingConfig;