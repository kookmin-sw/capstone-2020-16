import './CodeMirror.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import Button from "@material-ui/core/Button";
import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as Actions from 'app/auth/store/actions';
import axios from 'axios';
import { useSelector } from 'react-redux';
// require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/python/python.js');
require('codemirror/mode/javascript/javascript.js');





function codePost(userid, problemid, code, languageid, codename){
  var header = {
    'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
  }
  
  var data = {
    author: userid,
    code : code,
    language : languageid,
    problem: problemid,
    name : codename
  }

  console.log(data)

  axios.post("/api/v1/code/", data, {
    headers: header
  })
  .then( response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })
}


function CodeEditor() {


    var problemid = useSelector(state => state.getProblemId.getProblem);
    console.log(problemid);
  
  
    const [code, setCode] = useState(
        "#Let's coding!");


    const [option, setOption] = useState({
        mode: "Python",
        theme: 'material',
        lineNumbers: true
    });


    function changeMode(event) {
        console.log(`beforeMode>>>>>>${option.mode}`);
        console.log(`event.target.value>>>>>>${event.target.value}`);
        console.log(typeof option.mode)
        if(event.target.value === "Python"){window.localStorage.setItem('language_id', 1);}
        if(event.target.value === "C"){window.localStorage.setItem('language_id', 2);}
        if(event.target.value === "C++"){window.localStorage.setItem('language_id', 3);}
        setOption({
            mode: event.target.value,
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
            <option value="python">Python</option>
            <option value="C++">C++</option>
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
         codePost(parseInt(window.localStorage.getItem('pk')), problemid.id, code, parseInt(window.localStorage.getItem('language_id')), "testCode")}
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