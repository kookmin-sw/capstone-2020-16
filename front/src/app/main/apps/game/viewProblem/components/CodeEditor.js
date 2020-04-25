import './CodeMirror.css'
import './material.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import Button from "@material-ui/core/Button";
import React, { useState} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as Actions from 'app/auth/store/actions';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

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
  const classes = useStyles();
    // useEffect (() => {
    //   return () =>{
    //     window.localStorage.removeItem('editor_type');
    //     window.localStorage.removeItem('language_id');
    //   }
    // })
    var problemid = window.localStorage.getItem('SelectedProblemId');
    if(!problemid){
      problemid = window.localStorage.getItem('SelectedProblemId');
    }
    // console.log(problemid);
    const [value, setValue] = React.useState('My_Code');

    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
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
        if(event.target.value === "select"){
          setCode("Select Programming language first!!!!");
          window.localStorage.setItem('language_id', 0); window.localStorage.setItem('editor_type', 'select');
        }
        else if(event.target.value === "python"){
          setCode("def solve(board): \n\tx = 0\n\ty = 0\n\t# solve!!\n\tprint(1, x, y)\n\nif __name__ == '__main__':\n\tboard = []\n\tfor i in range(8):\n\t\tline = input()\n\t\tboard.append(list(map(int, line.strip('\\n').split())))\n\tsolve(board)");
          window.localStorage.setItem('language_id', 1); window.localStorage.setItem('editor_type', 'python');
        }
        else if(event.target.value === "cpp"){
          setCode("#include <iostream>\n\nusing namespace std;\n\nint board[8][8];\n\nvoid solve()\n{\n\tint x = 0;\n\tint y = 0;\n\t// solve!\n\tcout << 1 << x << y;\n}\n\nint main(void)\n{\n\tint i, j;\n\tfor(i=0; i<8; i++)\n\t{\n\t\tfor(j=0; j<8; j++)\n\t\t{\n\t\t\tcin >> board[i][j];\n\t\t}\n\t}\n\tsolve();\n\treturn 0;\n}");
          window.localStorage.setItem('language_id', 3); window.localStorage.setItem('editor_type', 'clike');
        }
        else if(event.target.value === "c"){
          setCode("#include <stdio.h>\n\nint board[8][8];\n\nvoid solve()\n{\n\tint x = 0;\n\tint y = 0;\n\t// solve!\n\tprintf(\"%d %d\", x, y);\n}\n\nint main(void)\n{\n\tint i, j;\n\tfor(i=0; i<8; i++)\n\t{\n\t\tfor(j=0; j<8; j++)\n\t\t{\n\t\t\tscanf(\"%d\", &board[i][j]);\n\t\t}\n\t}\n\tsolve();\n\treturn 0;\n}");
          window.localStorage.setItem('language_id', 2); window.localStorage.setItem('editor_type', 'clike');
        }
        else{
          window.localStorage.setItem('language_id', 0); window.localStorage.setItem('editor_type', 'select');
        }
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
          <select onChange={(value) => {changeMode(value)}}>
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
            // console.log(value);
          }}
        />
　
        <div className="mx-auto sm:px-256">



        </div>
    <div className="mx-auto sm:px-256">
    <TextField
          id="outlined-multiline-flexible"
          label="Code Name"
          multiline
          rowsMax={4}
          value={value}
          onChange={handleChange}
          variant="outlined"
        />   
    <Link className="font-medium"												
        to={'/apps/game/battle'}>
     <Button 
       onClick={function(){
        //  console.log(code)
         codePost(parseInt(window.localStorage.getItem('pk')), problemid, code, parseInt(window.localStorage.getItem('language_id')), value)}
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
