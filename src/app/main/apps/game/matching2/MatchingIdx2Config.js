import React from 'react';

const MatchingIdx2Config = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/game/matching2',
			component: React.lazy(() => import('./MatchingIdx2Page'))
		}
	]
};

export default MatchingIdx2Config;
