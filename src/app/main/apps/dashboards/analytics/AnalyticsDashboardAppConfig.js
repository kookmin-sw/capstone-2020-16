import React from 'react';

const AnalyticsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/dashboards/analy',
			component: React.lazy(() => import('./AnalyticsDashboardApp'))
		}
	]
};

export default AnalyticsDashboardAppConfig;
