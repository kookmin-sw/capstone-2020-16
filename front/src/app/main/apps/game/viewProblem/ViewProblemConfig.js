import React from 'react';



const ViewProblemConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: `/ViewProblemPage/:id`,
			component: React.lazy(() => import(`./ViewProblemPage`)),
		}
	]
};

export default ViewProblemConfig;
