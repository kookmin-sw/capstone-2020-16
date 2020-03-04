import React from 'react';
import { Redirect } from 'react-router-dom';

const AcademyAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/game/singlemode/courses/:courseId/:courseHandle?',
			component: React.lazy(() => import('./course/Course'))
		},
		{
			path: '/apps/game/singlemode/courses',
			component: React.lazy(() => import('./courses/Courses'))
		},
		{
			path: '/apps/game/singlemode',
			component: () => <Redirect to="/apps/game/singlemode/courses" />
		}
	]
};

export default AcademyAppConfig;
