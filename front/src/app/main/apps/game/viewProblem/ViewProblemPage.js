import CodeEditor from './components/CodeEditor';
import ProblemViewer from './components/ProblemViewer';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import * as Actions from 'app/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText
  },
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    // paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
}));


function KnowledgeBasePage() {
	const classes = useStyles();

  // const dispatch = useDispatch();
	// // const add = '/apps/game/viewReplay/ViewReplayPage';
	
	// const id = useSelector(({getProblemId}) => getProblemId.getId.count);
	// const getId = function() {

	// 	dispatch(Actions.getProblemId())
		
  //   }
  
  //   useEffect(() => {
    
  //     const fetchCount = () => {
	// 			const countData = getId
	// 			countData();
	// 		}
	// 		fetchCount()
    
  //   });


	return (
    
    <div className="flex flex-col flex-auto flex-shrink-0 w-full">
      <div
        className={clsx(
          classes.header,
          "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288"
        )}
      >
        <FuseAnimate
          animation="transition.slideUpIn"
          duration={400}
          delay={100}
        >
          <Typography color="inherit" className="text-24 sm:text-40 font-light">
            Code Editor
          </Typography>
        </FuseAnimate>
        <FuseAnimate duration={400} delay={600}>
          <Typography
            variant="subtitle1"
            color="inherit"
            className="mt-8 sm:mt-16 mx-auto max-w-512"
          >
            <span className="opacity-75">codemirror editor</span>
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex flex-row flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
        <Card elevation={1} className="flex flex-col h-640">
          <div className="flex:1 flex-shrink-0 items-center justify-between px-24 h-64">
            <ProblemViewer></ProblemViewer>
          </div>
        </Card>
        <Divider orientation="vertical" flexItem />
        <Card elevation={1} className="flex flex-col h-640">
          <div className="flex:1 flex-shrink-0 items-center justify-between px-24 h-64">
            <CodeEditor className="flex:1"></CodeEditor>
          </div>
        </Card>
      </div>

      {/* <div className="flex flexDirection:row">
        <div className="flex:1">
          <ProblemViewer></ProblemViewer>
        </div>
        <CodeEditor className="flex:1"></CodeEditor>
      </div> */}
    </div>
  );
}

export default KnowledgeBasePage;
