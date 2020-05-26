import React from 'react';
import { Redirect } from 'react-router-dom';

const AddGameConfig2 = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/apps/game/battle/courses/:courseId/:courseHandle?',
		// 	component: React.lazy(() => import('./course/Course'))
		// },
		{
			path: '/apps/game/addgame2',
			component: React.lazy(() => import('./Courses2'))
		},
		{
			path: '/apps/game/addgame2',
			component: () => <Redirect to="/apps/game/addgame2" />
		}
	]
};

export default AddGameConfig2;
