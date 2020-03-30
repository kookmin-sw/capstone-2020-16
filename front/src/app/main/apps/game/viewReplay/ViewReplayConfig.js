import React from 'react';

const ViewReplayConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/game/viewReplay/ViewReplayPage',
			component: React.lazy(() => import('./ViewReplayPage'))
		}
	]
};

export default ViewReplayConfig;
