import './CodeMirror.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from 'app/store/actions';
import axios from 'axios';
// require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/python/python.js');
require('codemirror/mode/javascript/javascript.js');





function codePost(content, userid){
  var data = {
    author: userid,
    code : content,
    language : 1,
    problem: 1,
    name : "codePostTest"
  }

  axios.post("http://203.246.112.32:8000/api/v1/code/", data)
  .then( response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })
}




function CodeEditor() {

  const dispatch = useDispatch();
	
	
  const id = useSelector(({getProblemId}) => getProblemId.getId.count);
	const getId = function() {

		dispatch(Actions.getProblemId())
    }
  
     useEffect(() => {

      return getId();
    
     });



    // const classes = useStyles();
    const [code, setCode] = useState(
        "var component = {\nname: \"react-codemirror\",\nauthor: \"Jed Watson\",\nrepo: \"https://github.com/JedWatson/react-codemirror\"}");


    const [option, setOption] = useState({
        mode: "javascript",
        theme: 'material',
        lineNumbers: true
    });

    function changeMode(event) {
        console.log(`beforeMode>>>>>>${option.mode}`);
        console.log(`event.target.value>>>>>>${event.target.value}`);
        setOption({
            mode: event.target.value
        });
    };

    function changeCode(event) {
        console.log(`event.target.value>>>>>>${event}`);
        setCode(event);
    };

    return (
      <div className="w-full">
        <div style={{ marginTop: 10 }}>
          <select onChange={changeMode}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>
        <CodeMirror
          value={code}
          options={{
            mode: option.mode,
            theme: "material",
            lineNumbers: true
          }}
          onChange={(editor, data, value) => {
            changeCode(value);
          }}
        />
    <div className="mx-auto sm:px-16">
     <Button 
       onClick={function(){
         codePost(code, id)}}
       style={{
         textAlign: 'center',
         justifyContent: 'center',
         alignItems: 'center',
         paddingLeft: 40,
         paddingRight: 40,
         marginBottom:24,
         height: 40
       }}
     variant="contained" 
     color="primary">
       SUBMIT
     </Button>
     </div>  
  </div> 
    );

    
}

export default CodeEditor;
