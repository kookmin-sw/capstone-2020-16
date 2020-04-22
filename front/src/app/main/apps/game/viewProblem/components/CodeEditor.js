import './CodeMirror.css'
import './material.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as Actions from 'app/auth/store/actions';
import axios from 'axios';
// import { useSelector } from 'react-redux';
// require('codemirror/lib/codemirror.css');
// require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/python/python.js');
require('codemirror/mode/clike/clike.js');
// require('codemirror/mode/go/go.js');





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

  // console.log(data)

  axios.post("https://cors-anywhere.herokuapp.com/http://203.246.112.32:8000/api/v1/code/", data, {
    headers: header
  })
  .then( response => {
    // console.log(response);
  })
  .catch(error => {
    // console.log(error);
  })
}


function CodeEditor() {

    useEffect (() => {
      return () =>{
        window.localStorage.removeItem('editor_type');
        window.localStorage.removeItem('language_id');
      }
    })
    var problemid = window.localStorage.getItem('SelectedProblemId');
    if(!problemid){
      problemid = window.localStorage.getItem('SelectedProblemId');
    }
    // console.log(problemid);
   
  
    const [code, setCode] = useState(
        "Select Programming language first!!!!");


    const [option, setOption] = useState({
        mode: "python",
        theme: 'material',
        lineNumbers: true
    });
    // if(option.mode === "python"){window.localStorage.setItem('language_id', 1);}
    // if(option.mode === "cpp"){window.localStorage.setItem('language_id', 3);}
    // if(option.mode === "go"){window.localStorage.setItem('language_id', 2);}

    function changeMode(event) {
        // console.log(`beforeMode>>>>>>${option.mode}`);
        // console.log(`event.target.value>>>>>>${event.target.value}`);
        // console.log(typeof option.mode)
        //if(event.target.value === "select"){window.localStorage.setItem('language_id', 0);}
        if(event.target.value === "select"){window.localStorage.setItem('language_id', 0); window.localStorage.setItem('editor_type', 'select');}
        if(event.target.value === "python"){window.localStorage.setItem('language_id', 1); window.localStorage.setItem('editor_type', 'python');}
        if(event.target.value === "cpp"){window.localStorage.setItem('language_id', 3); window.localStorage.setItem('editor_type', 'clike');}
        if(event.target.value === "c"){window.localStorage.setItem('language_id', 2); window.localStorage.setItem('editor_type', 'clike');}
        console.log(window.localStorage.getItem('language_id'))
        setOption({
            mode: event.target.value,
        });
        
       
    };


    function changeCode(event) {
        // console.log(`event.target.value>>>>>>${event}`);
        setCode(event);

    };

    return (
      <div className="w-full">
        <div style={{ marginTop: 10 }}>
          <select onChange={changeMode}>
            {/* <option value="select">Select Language</option> */}
            <option value="select">Select Language</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>
        </div>
        <CodeMirror
          autoCursor={false}
          value={code}
          options={{
            mode: window.localStorage.getItem('editor_type'),
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
        //  console.log(code)
         codePost(parseInt(window.localStorage.getItem('pk')), problemid, code, parseInt(window.localStorage.getItem('language_id')), "testCode")}
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