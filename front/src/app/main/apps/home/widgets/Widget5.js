import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { green } from '@material-ui/core/colors';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
//import Typography from '@material-ui/core/Typography';
//import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  table: {
    minWidth: 650,
  },

}));

function createData(name, link) {
	return { name, link };
  }
  
  const rows = [
	createData('Notice1', 'https://naver.com'),
	createData('Notice2', 'https://naver.com'),
	createData('Notice3', 'https://naver.com'),
	createData('Notice4', 'https://naver.com'),
	createData('Notice5', 'https://naver.com'),
  ];
  const row1 = [
	createData('Comm1', 'https://naver.com'),
	createData('Comm2', 'https://naver.com'),
	createData('Comm3', 'https://naver.com'),
	createData('Comm4', 'https://naver.com'),
	createData('Comm5', 'https://naver.com'),
  ];
  const row2 = [
	createData('Q&A1', 'https://naver.com'),
	createData('Q&A2', 'https://naver.com'),
	createData('Q&A3', 'https://naver.com'),
	createData('Q&A4', 'https://naver.com'),
	createData('Q&A5', 'https://naver.com'),
  ];


export default function Widget5(props) {
	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

  return (

	<div>
		<Tabs
			value={tabValue}
			onChange={handleChangeTab}
			indicatorColor="primary"
			textColor="primary"
			variant="scrollable"
			scrollButtons="off"
			className="w-full border-b-1 px-24"
		>
			<Tab className="text-14 font-600 normal-case" label="Notice" />
			<Tab className="text-14 font-600 normal-case" label="User Community" />
			<Tab className="text-14 font-600 normal-case" label="Help" />
		</Tabs>

			
				<div className="p-12">
					{tabValue === 0 && (
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
					 <TableContainer component={Paper}>
      					<Table className={classes.table} size="small" aria-label="a dense table">
       					 <TableHead>
   					       <TableRow>
   					       </TableRow>
  					      </TableHead>
   					     <TableBody>
    					      {rows.map(row => (		
  					          <TableRow key={row.name}>
  					            <TableCell component="th" scope="row">
								  <ButtonBase
											  href={row.link}
											  focusRipple
											  key={row.name}
											  className={classes.image}
											  focusVisibleClassName={classes.focusVisible}
											  > 
    								{<h2>{row.name}</h2>}
									  </ButtonBase>
     					         </TableCell>
  					          </TableRow>	
 					         ))}
 					       </TableBody>
 					     </Table>
  					  </TableContainer>
						</FuseAnimateGroup>
					)}
					{tabValue === 1 && (
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
					 <TableContainer component={Paper}>
      					<Table className={classes.table} size="small" aria-label="a dense table">
       					 <TableHead>
   					       <TableRow>
   					       </TableRow>
  					      </TableHead>
   					     <TableBody>
    					      {row1.map(row => (		
  					          <TableRow key={row.name}>
  					            <TableCell component="th" scope="row">
								  <ButtonBase
											  href={row.link}
											  focusRipple
											  key={row.name}
											  className={classes.image}
											  focusVisibleClassName={classes.focusVisible}
											  > 
    								{<h2>{row.name}</h2>}
									  </ButtonBase>
     					         </TableCell>
  					          </TableRow>	
 					         ))}
 					       </TableBody>
 					     </Table>
  					  </TableContainer>
						</FuseAnimateGroup>
					)}
					{tabValue === 2 && (
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
					 <TableContainer component={Paper}>
      					<Table className={classes.table} size="small" aria-label="a dense table">
       					 <TableHead>
   					       <TableRow>
   					       </TableRow>
  					      </TableHead>
   					     <TableBody>
    					      {row2.map(row => (		
  					          <TableRow key={row.name}>
  					            <TableCell component="th" scope="row">
								  <ButtonBase
											  href={row.link}
											  focusRipple
											  key={row.name}
											  className={classes.image}
											  focusVisibleClassName={classes.focusVisible}
											  > 
    								{<h2>{row.name}</h2>}
									  </ButtonBase>
     					         </TableCell>
  					          </TableRow>	
 					         ))}
 					       </TableBody>
 					     </Table>
  					  </TableContainer>	
						</FuseAnimateGroup>
					)}
				</div>

			</div>
  );
}



// import _ from '@lodash';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import { useTheme } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';

// function Widget5(props) {
// 	const theme = useTheme();
// 	const [dataset, setDataset] = useState('today');
// 	const data = _.merge({}, props.data);

// 	return (
// 		<Card className="w-full rounded-8 shadow-none border-1">
// 			<div className="relative p-24 flex flex-row items-center justify-between">
// 				<div className="flex flex-col">
// 					<Typography className="h3 sm:h2">Visitors & Page views</Typography>
// 				</div>

// 				<div className="flex flex-row items-center">
// 					{Object.keys(data.datasets).map(key => (
// 						<Button
// 							key={key}
// 							className="py-8 px-12"
// 							size="small"
// 							onClick={() => setDataset(key)}
// 							disabled={key === dataset}
// 						>
// 							{key}
// 						</Button>
// 					))}
// 				</div>
// 			</div>

// 			<Typography className="relative h-200 sm:h-320 sm:pb-16">
// 				<Line
// 					data={{
// 						labels: data.labels,
// 						datasets: data.datasets[dataset].map((obj, index) => {
// 							const palette = theme.palette[index === 0 ? 'primary' : 'secondary'];
// 							return {
// 								...obj,
// 								borderColor: palette.main,
// 								backgroundColor: palette.main,
// 								pointBackgroundColor: palette.dark,
// 								pointHoverBackgroundColor: palette.main,
// 								pointBorderColor: palette.contrastText,
// 								pointHoverBorderColor: palette.contrastText
// 							};
// 						})
// 					}}
// 					options={data.options}
// 				/>
// 			</Typography>
// 		</Card>
// 	);
// }

// export default React.memo(Widget5);
