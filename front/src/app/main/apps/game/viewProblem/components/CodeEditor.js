import './CodeMirror.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import Button from "@material-ui/core/Button";
import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as Actions from 'app/auth/store/actions';
import axios from 'axios';
// require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/python/python.js');
require('codemirror/mode/javascript/javascript.js');





function codePost(content, userid, tmp){
  var data = {
    author: userid,
    code : content,
    language : tmp,
    problem: 1,
    name : "codePostTest"
  }

  axios.post("/api/v1/code/", data)
  .then( response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })
}


function CodeEditor() {

  // const dispatch = useDispatch();
	
	
  // const id = useSelector(({getProblemId}) => getProblemId.getId.count);
  // const getto = useSelector(({user}) => user.user.data);
  // console.log(getto)



    // const classes = useStyles();
    const [code, setCode] = useState(
        "var component = {\nname: \"react-codemirror\",\nauthor: \"Jed Watson\",\nrepo: \"https://github.com/JedWatson/react-codemirror\"}");


    const [option, setOption] = useState({
        mode: "javascript",
        idx: 0,
        theme: 'material',
        lineNumbers: true
    });

    option.idx = 1

    function changeMode(event) {
        console.log(`beforeMode>>>>>>${option.mode}`);
        console.log(`event.target.value>>>>>>${event.target.value}`);
        console.log(typeof option.mode)
        if(event.target.value === "C++"){option.idx = 0;console.log(option.idx)}
        if(event.target.value === "python"){option.idx = 1;console.log(option.idx)}
        if(event.target.value === "C"){option.idx = 2;console.log(option.idx)}
        setOption({
            mode: event.target.value,
        });
        
       
    };

    // function changeIdx(event) {
    //   console.log(`beforeMode>>>>>>${option.idx}`);
    //   console.log(`event.target.value>>>>>>${event.target.idx}`);
    //   console.log(option.idx)
    //   setOption({
    //       idx: event.target.value,
    //   });
    //};
    
    // console.log(option.idx)
    // console.log(typeof data.language)

    function changeCode(event) {
        console.log(`event.target.value>>>>>>${event}`);
        setCode(event);

    };

    return (
      <div className="w-full">
        <div style={{ marginTop: 10 }}>
          <select onChange={changeMode}>
            <option value="javascript">JavaScript</option>
            <option value="C++">C++</option>
            <option value="python">Python</option>
            <option value="C">C</option>
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
    <Link className="font-medium"												
        to={'/apps/game/battle'}>
     <Button 
       onClick={function(){
         codePost(code, 1, option.idx)}
        }									 
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
     </Link>
     </div>  
  </div> 
    );

    
}

export default CodeEditor;
