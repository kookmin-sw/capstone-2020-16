import React from 'react';



const ViewProblemConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: `/apps/game/viewProblem/ViewProblemPage/:id`,
			component: React.lazy(() => import(`./ViewProblemPage`)),
		}
	]
};

export default ViewProblemConfig;
