import React, { useState } from 'react';

import { UnControlled as CodeMirror } from 'react-codemirror2'
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/python/python.js');
require('codemirror/mode/javascript/javascript.js');

// const Transition = React.forwardRef(function Transition(props, ref) {
// 	return <Slide direction="up" ref={ref} {...props} />;
// });

// const useStyles = makeStyles(theme => ({
//     header: {
//         background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
//         color: theme.palette.primary.contrastText
//     }
// }));



function CodeEditor() {
    // const classes = useStyles();
    const [code, setCode] = useState(
        "var component = {\nname: \"react-codemirror\",\nauthor: \"Jed Watson\",\nrepo: \"https://github.com/JedWatson/react-codemirror\"}");


    const [option, setOption] = useState({
        mode: "javascript",
        theme: 'material',
        lineNumbers: true
    });

    // useEffect(() => {
    // 	axios.get('/api/knowledge-base').then(res => {
    // 		setData(res.data);
    // 	});
    // }, []);
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
      </div>
    );
}

export default CodeEditor;
