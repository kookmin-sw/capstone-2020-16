import React from 'react';
import { Redirect } from 'react-router-dom';

const CodeListConfig = {
	settings: {
		layout: {}
	},
	routes: [
	
		{
			path: '/apps/codelist',
			component: React.lazy(() => import('./CodeList_Problem'))
		},
		{
			path: '/apps/codelist',
			component: () => <Redirect to="/apps/codelist" />
		}
	]
};
export default CodeListConfig;