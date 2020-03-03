import React from 'react';
import { Redirect } from 'react-router-dom';

const AcademyAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/singlemode/courses/:courseId/:courseHandle?',
			component: React.lazy(() => import('./course/Course'))
		},
		{
			path: '/apps/singlemode/courses',
			component: React.lazy(() => import('./courses/Courses'))
		},
		{
			path: '/apps/singlemode',
			component: () => <Redirect to="/apps/singlemode/courses" />
		}
	]
};

export default AcademyAppConfig;
