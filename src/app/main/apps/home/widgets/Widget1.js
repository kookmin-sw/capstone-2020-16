import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '@material-ui/core/Link';


	const images = [
		{
		  url: 'assets/images/games/1.jpg',
		  title: 'Daily Best Game',
		  width: '35%',
		},
		{
		  url: 'assets/images/games/2.jpg',
		  title: 'Weekly Best Game',
		  width: '35%',
		},
		{
		  url: 'assets/images/games/3.jpg',
		  title: 'Montly Best Game',
		  width: '30%',
		},
	  ];
	  
	  const useStyles = makeStyles(theme => ({
		root: {
		  display: 'flex',
		  flexWrap: 'wrap',
		  minWidth: 300,
		  width: '100%',
		},
		image: {
		  position: 'relative',
		  height: 300,
		  [theme.breakpoints.down('xs')]: {
			width: '100% !important', // Overrides inline-style
			height: 300,
		  },
		  '&:hover, &$focusVisible': {
			zIndex: 1,
			'& $imageBackdrop': {
			  opacity: 0.15,
			},
			'& $imageMarked': {
			  opacity: 0,
			},
			'& $imageTitle': {
			  border: '4px solid currentColor',
			},
		  },
		},
		focusVisible: {},
		imageButton: {
		  position: 'absolute',
		  left: 0,
		  right: 0,
		  top: 0,
		  bottom: 0,
		  display: 'flex',
		  alignItems: 'center',
		  justifyContent: 'center',
		  color: theme.palette.common.white,
		},
		imageSrc: {
		  position: 'absolute',
		  left: 0,
		  right: 0,
		  top: 0,
		  bottom: 0,
		  backgroundSize: 'cover',
		  backgroundPosition: 'center 40%',
		},
		imageBackdrop: {
		  position: 'absolute',
		  left: 0,
		  right: 0,
		  top: 0,
		  bottom: 0,
		  backgroundColor: theme.palette.common.black,
		  opacity: 0.4,
		  transition: theme.transitions.create('opacity'),
		},
		imageTitle: {
		  position: 'relative',
		  padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
		},
		imageMarked: {
		  height: 6,
		  width: 18,
		  backgroundColor: theme.palette.common.white,
		  position: 'absolute',
		  bottom: -2,
		  left: 'calc(50% - 9px)',
		  transition: theme.transitions.create('opacity'),
		},
	  }));
	  
	  export default function Widget1(props) {
		const classes = useStyles();
	  
		return (
		  <div className={classes.root}>
			{images.map(image => (

			<ButtonBase
			href="/apps/game/problemIdx"
			focusRipple
			key={image.title}
			className={classes.image}
			focusVisibleClassName={classes.focusVisible}
			style={{
				width: image.width,
			}}
			>
			<span
				className={classes.imageSrc}
				style={{
				backgroundImage: `url(${image.url})`,
				}}
			/>
			<span className={classes.imageBackdrop} />
			
			<span className={classes.imageButton}>
			{/* <Router>
				<Link component={RouterLink} to={images.url}> */}
				<Typography
				component="span"
				variant="subtitle1"
				color="white"
				className={classes.imageTitle}
				>
				{image.title}
				<span className={classes.imageMarked} />
				
				</Typography>
				{/* </Link>
			</Router> */}
			</span>


			</ButtonBase>
			))}
		  </div>
		);
	  }
//}

//export default React.memo(Widget1);



// import FuseAnimate from '@fuse/core/FuseAnimate';
// import Button from '@material-ui/core/Button';
// import { Line } from 'react-chartjs-2';
// import { useSelector } from 'react-redux';
//import _ from '@lodash';


// const useStyles = makeStyles(theme => ({
// 	root: {
// 		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
// 	}
// }));

//function Widget1(props) {
	// const mainThemeDark = useSelector(({ fuse }) => fuse.settings.mainThemeDark);

	// const classes = useStyles(props);
	// const theme = useTheme();
	// const [dataset, setDataset] = useState('2017');

	// const data = _.merge({}, props.data);

	// return (
	// 	<ThemeProvider theme={mainThemeDark}>
	// 		<div className={classes.root}>
	// 			<div className="container relative p-16 sm:p-24 flex flex-row justify-between items-center">
	// 				<FuseAnimate delay={100}>
	// 					<div className="flex-col">
	// 						<Typography className="h1" color="textPrimary">
	// 							SSibal
	// 						</Typography>
	// 						<Typography className="h2" color="textPrimary">
	// 							Visitors
	// 						</Typography>
	// 						<Typography className="h5" color="textSecondary">
	// 							Unique visitors by month
	// 						</Typography>
	// 					</div>
	// 				</FuseAnimate>

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
	// 			<div className="container relative h-200 sm:h-256 pb-16">
	// 				<Line
	// 					data={{
	// 						labels: data.labels,
	// 						datasets: data.datasets[dataset].map(obj => ({
	// 							...obj,
	// 							borderColor: theme.palette.secondary.main,
	// 							backgroundColor: theme.palette.secondary.main,
	// 							pointBackgroundColor: theme.palette.secondary.dark,
	// 							pointHoverBackgroundColor: theme.palette.secondary.main,
	// 							pointBorderColor: theme.palette.secondary.contrastText,
	// 							pointHoverBorderColor: theme.palette.secondary.contrastText
	// 						}))
	// 					}}
	// 					options={data.options}
	// 				/>
	// 			</div>
	// 		</div>
	// 	</ThemeProvider>
	// );