import React from 'react';

const SelfBattleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/SelfBattle',
			component: React.lazy(() => import('./SelfBattle')),
		}
	]
};

export default SelfBattleConfig;