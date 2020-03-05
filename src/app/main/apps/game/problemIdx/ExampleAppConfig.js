import React from 'react';
import { Redirect } from 'react-router-dom';

const AcademyAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/game/problemIdx/courses/:courseId/:courseHandle?',
			component: React.lazy(() => import('./course/Course'))
		},
		{
			path: '/apps/game/problemIdx/courses',
			component: React.lazy(() => import('./courses/Courses'))
		},
		{
			path: '/apps/game/problemIdx',
			component: () => <Redirect to="/apps/game/problemIdx/courses" />
		}
	]
};

export default AcademyAppConfig;
