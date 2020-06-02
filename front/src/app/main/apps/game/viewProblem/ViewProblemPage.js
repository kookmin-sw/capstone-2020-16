import CodeEditor from './components/CodeEditor';
import ProblemViewer from './components/ProblemViewer';
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import * as Actions from 'app/store/actions';


function KnowledgeBasePage() {
  
  const dispatch = useDispatch();

  var id = document.location.href.split("ViewProblemPage/");
  var id2 = id[1];


  var problemId = useSelector(state => state.getProblemId.getId.results[id2-1]);
  var problemIdLocal = window.localStorage.getItem('SelectedProblemId');
  
  if(!problemId){
    problemId = problemIdLocal;
  }

  useEffect( () => {
    dispatch(Actions.getProblem(problemId))
  },[dispatch])

	return (
      <div className="flex flex-row flex-1 max-w-2xl w-full px-8 sm:px-16 py-24">
        <Paper variant="outlined">
          <div className="flex:1 flex-shrink-0 items-center justify-between px-24 h-64">
            <ProblemViewer tmp={id2}></ProblemViewer>
          </div>
        </Paper>
        <Divider orientation="vertical" flexItem />
        <Paper variant="outlined">
          <div className="flex:1 flex-shrink-0 items-center justify-between px-24 ">
            <CodeEditor></CodeEditor>
          </div>
        </Paper>
      </div>
  );
}

export default KnowledgeBasePage;