import React from 'react';
import { Redirect } from 'react-router-dom';

const ProblemConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/game/problem/courses/:courseId/:courseHandle?',
			component: React.lazy(() => import('./course/Course'))
		},
		{
			path: '/apps/game/problem/courses',
			component: React.lazy(() => import('./courses/Courses'))
		},
		{
			path: '/apps/game/problem',
			component: () => <Redirect to="/apps/game/problem/courses" />
		}
	]
};

export default ProblemConfig;
