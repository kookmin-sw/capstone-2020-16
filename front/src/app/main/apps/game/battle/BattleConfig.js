import React from 'react';
import { Redirect } from 'react-router-dom';

const BattleConfig = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/apps/game/battle/courses/:courseId/:courseHandle?',
		// 	component: React.lazy(() => import('./course/Course'))
		// },
		{
			path: '/apps/game/battle',
			component: React.lazy(() => import('./Courses'))
		},
		{
			path: '/apps/game/battle',
			component: () => <Redirect to="/apps/game/battle" />
		}
	]
};

export default BattleConfig;
