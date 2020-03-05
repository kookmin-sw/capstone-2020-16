import React from 'react';
import { Redirect } from 'react-router-dom';

const AcademyAppConfig2 = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/game/battle/courses/:courseId/:courseHandle?',
			component: React.lazy(() => import('./course/Course'))
		},
		{
			path: '/apps/game/battle/courses',
			component: React.lazy(() => import('./courses/Courses'))
		},
		{
			path: '/apps/game/battle',
			component: () => <Redirect to="/apps/game/battle/courses" />
		}
	]
};

export default AcademyAppConfig2;
