import Typography from '@material-ui/core/Typography';
import React from 'react';

function MainSidebarHeader() {
	return (
		<div className="flex items-center h-full p-12">

			<Typography variant="h6" className="mx-12">
				File Manager
			</Typography>
		</div>
	);
}

export default MainSidebarHeader;
