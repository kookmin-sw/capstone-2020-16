import React from 'react';
import { Redirect } from 'react-router-dom';

const ReplayConfig = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/apps/game/Replay/courses/:courseId/:courseHandle?',
		// 	component: React.lazy(() => import('./course/Course'))
		// },
		{
			path: '/apps/game/Replay',
			component: React.lazy(() => import('./Courses'))
		},
		{
			path: '/apps/game/Replay',
			component: () => <Redirect to="/apps/game/Replay" />
		}
	]
};

export default ReplayConfig;