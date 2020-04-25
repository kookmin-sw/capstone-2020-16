import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

// import RankingTable from './components/RankingTable'
import RankingGrid from './components/RankingGrid'

const useStyles = makeStyles(theme => ({
    header: {
       background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
       color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
       position: 'absolute',
       top: -64,
       left: 0,
       opacity: 0.04,
       fontSize: 512,
       width: 512,
       height: 512,
       pointerEvents: 'none'
    }
 }));

function RankingPage(props) {
    const classes = useStyles(props);
	
	return (
        <div className="flex flex-col flex-auto flex-shrink-0 w-full">
           <div
              className={clsx(
                 classes.header,
                 'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-208'
              )}
           >
              <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                 <Typography color="inherit" className="text-24 sm:text-40 font-light">
                 Ranking Page
                 </Typography>
              </FuseAnimate>
              <FuseAnimate duration={400} delay={600}>
                 <Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
                    <span className="opacity-75">
                    You can see ranking
                    </span>
                 </Typography>
              </FuseAnimate>
           </div>
           <RankingGrid/>
        </div>
     );
}

export default RankingPage;