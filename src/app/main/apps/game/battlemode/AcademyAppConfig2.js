import React from 'react';
import { Redirect } from 'react-router-dom';

const AcademyAppConfig2 = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/game/battlemode/courses/:courseId/:courseHandle?',
			component: React.lazy(() => import('./course/Course'))
		},
		{
			path: '/apps/game/battlemode/courses',
			component: React.lazy(() => import('./courses/Courses'))
		},
		{
			path: '/apps/game/battlemode',
			component: () => <Redirect to="/apps/game/battlemode/courses" />
		}
	]
};

export default AcademyAppConfig2;
