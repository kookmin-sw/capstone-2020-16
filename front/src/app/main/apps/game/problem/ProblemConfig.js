import React from 'react';
import { Redirect } from 'react-router-dom';

const ProblemConfig = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/apps/game/problem/courses/:courseId/:courseHandle?',
		// 	component: React.lazy(() => import('./course/Course'))
		// },
		{
			path: '/apps/game/problem',
			component: React.lazy(() => import('./Courses'))
		},
		{
			path: '/apps/game/problem',
			component: () => <Redirect to="/apps/game/problem" />
		}
	]
};

export default ProblemConfig;
