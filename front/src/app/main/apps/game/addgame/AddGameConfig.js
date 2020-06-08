import React from 'react';
import { Redirect } from 'react-router-dom';

const AddGameConfig = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/apps/game/battle/courses/:courseId/:courseHandle?',
		// 	component: React.lazy(() => import('./course/Course'))
		// },
		{
			path: '/apps/game/addgame',
			component: React.lazy(() => import('./Courses'))
		},
		{
			path: '/apps/game/addgame',
			component: () => <Redirect to="/apps/game/addgame" />
		}
	]
};

export default AddGameConfig;
