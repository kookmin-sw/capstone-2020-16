(this.webpackJsonponepanman=this.webpackJsonponepanman||[]).push([[39],{1310:function(e,n,t){"use strict";t.r(n);var a=t(452);t.d(n,"default",(function(){return a.a}))},1375:function(e,n,t){"use strict";var a=t(674);Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,n){var t=r.default.memo(r.default.forwardRef((function(n,t){return r.default.createElement(l.default,(0,o.default)({ref:t},n),e)})));0;return t.muiName=l.default.muiName,t};var o=a(t(173)),r=a(t(0)),l=a(t(1310))},1376:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.FrameContextConsumer=n.FrameContextProvider=n.FrameContext=void 0;var a,o=t(0),r=(a=o)&&a.__esModule?a:{default:a};var l=void 0,c=void 0;"undefined"!==typeof document&&(l=document),"undefined"!==typeof window&&(c=window);var i=n.FrameContext=r.default.createContext({document:l,window:c}),s=i.Provider,u=i.Consumer;n.FrameContextProvider=s,n.FrameContextConsumer=u},1377:function(e,n,t){"use strict";t.d(n,"a",(function(){return _}));var a=t(20),o=t(144),r=t(1364),l=t(1368),c=t(1338),i=t(1370),s=t(1371),u=t(0),m=t.n(u),d=t(13),h=t(11),f=t(64),b=t(65),p=t(94),k=t(95),v=t(1295),C=t(672),g=t(1330),E=t(1365),x=t(10),y=t(450),F=t(451),w=t(1378),j=t.n(w),O=Object(v.a)({productionPrefix:"iframe-"}),P=function(e){Object(k.a)(t,e);var n=Object(p.a)(t);function t(){var e;Object(f.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=n.call.apply(n,[this].concat(o))).state={ready:!1},e.handleRef=function(n){e.contentDocument=n?n.node.contentDocument:null},e.onContentDidMount=function(){e.setState({ready:!0,jss:Object(y.a)(Object(h.a)({},Object(C.a)(),{plugins:[].concat(Object(d.a)(Object(C.a)().plugins),[Object(F.a)()]),insertionPoint:e.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:e.contentDocument.body})},e.onContentDidUpdate=function(){e.contentDocument.body.dir=e.props.theme.direction},e.renderHead=function(){return m.a.createElement(m.a.Fragment,null,m.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),m.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},e}return Object(b.a)(t,[{key:"render",value:function(){var e=this.props,n=e.children,t=e.classes,a=e.theme;return m.a.createElement(j.a,{head:this.renderHead(),ref:this.handleRef,className:t.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?m.a.createElement(g.b,{jss:this.state.jss,generateClassName:O,sheetsManager:this.state.sheetsManager},m.a.createElement(E.a,{theme:a},m.a.cloneElement(n,{container:this.state.container}))):null)}}]),t}(m.a.Component),N=Object(x.a)((function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}}),{withTheme:!0})(P);function L(e){var n=Object(u.useState)(e.currentTabIndex),t=Object(a.a)(n,2),d=t[0],h=t[1],f=e.component,b=e.raw,p=e.iframe,k=e.className;return m.a.createElement(l.a,{className:k},m.a.createElement(r.a,{position:"static",color:"default",elevation:0},m.a.createElement(s.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:d,onChange:function(e,n){h(n)}},f&&m.a.createElement(i.a,{classes:{root:"min-w-64"},icon:m.a.createElement(c.a,null,"remove_red_eye")}),b&&m.a.createElement(i.a,{classes:{root:"min-w-64"},icon:m.a.createElement(c.a,null,"code")}))),m.a.createElement("div",{className:"flex justify-center"},m.a.createElement("div",{className:0===d?"flex flex-1":"hidden"},f&&(p?m.a.createElement(N,null,m.a.createElement(f,null)):m.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},m.a.createElement(f,null)))),m.a.createElement("div",{className:1===d?"flex flex-1":"hidden"},b&&m.a.createElement("div",{className:"flex flex-1"},m.a.createElement(o.a,{component:"pre",className:"language-javascript w-full"},b.default)))))}L.defaultProps={currentTabIndex:0};var _=L},1378:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.FrameContextConsumer=n.FrameContext=void 0;var a=t(1376);Object.defineProperty(n,"FrameContext",{enumerable:!0,get:function(){return a.FrameContext}}),Object.defineProperty(n,"FrameContextConsumer",{enumerable:!0,get:function(){return a.FrameContextConsumer}});var o,r=t(1379),l=(o=r)&&o.__esModule?o:{default:o};n.default=l.default},1379:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},o=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),r=t(0),l=m(r),c=m(t(22)),i=m(t(2)),s=t(1376),u=m(t(1380));function m(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function n(e,t){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);var a=function(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e,t));return a.handleLoad=function(){a.forceUpdate()},a._isMounted=!1,a}return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,e),o(n,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var n=this.props.contentDidMount,t=this.props.contentDidUpdate,a=e.defaultView||e.parentView,o=!this._setInitialContent,r=l.default.createElement(u.default,{contentDidMount:n,contentDidUpdate:t},l.default.createElement(s.FrameContextProvider,{value:{document:e,window:a}},l.default.createElement("div",{className:"frame-content"},this.props.children)));o&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close(),this._setInitialContent=!0);var i=this.getMountTarget();return[c.default.createPortal(this.props.head,this.getDoc().head),c.default.createPortal(r,i)]}},{key:"render",value:function(){var e=this,n=a({},this.props,{children:void 0});return delete n.head,delete n.initialContent,delete n.mountTarget,delete n.contentDidMount,delete n.contentDidUpdate,l.default.createElement("iframe",a({},n,{ref:function(n){e.node=n}}),this.renderFrameContents())}}]),n}(r.Component);d.propTypes={style:i.default.object,head:i.default.node,initialContent:i.default.string,mountTarget:i.default.string,contentDidMount:i.default.func,contentDidUpdate:i.default.func,children:i.default.oneOfType([i.default.element,i.default.arrayOf(i.default.element)])},d.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},n.default=d},1380:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),o=t(0),r=(l(o),l(t(2)));function l(e){return e&&e.__esModule?e:{default:e}}function c(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}var s=function(e){function n(){return c(this,n),i(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,e),a(n,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return o.Children.only(this.props.children)}}]),n}(o.Component);s.propTypes={children:r.default.element.isRequired,contentDidMount:r.default.func.isRequired,contentDidUpdate:r.default.func.isRequired},n.default=s},1452:function(e,n,t){"use strict";var a=t(674);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t(0)),r=(0,a(t(1375)).default)(o.default.createElement("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}),"Favorite");n.default=r},1846:function(e,n,t){"use strict";var a=t(674);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t(0)),r=(0,a(t(1375)).default)(o.default.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank");n.default=r},1847:function(e,n,t){"use strict";var a=t(674);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t(0)),r=(0,a(t(1375)).default)(o.default.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox");n.default=r},3457:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return c}));var a=t(20),o=t(0),r=t.n(o),l=t(1350);function c(){var e=r.a.useState(!0),n=Object(a.a)(e,2),t=n[0],o=n[1];return r.a.createElement("div",null,r.a.createElement(l.a,{checked:t,onChange:function(e){o(e.target.checked)},value:"primary",inputProps:{"aria-label":"primary checkbox"}}),r.a.createElement(l.a,{defaultChecked:!0,value:"secondary",color:"primary",inputProps:{"aria-label":"secondary checkbox"}}),r.a.createElement(l.a,{value:"uncontrolled",inputProps:{"aria-label":"uncontrolled-checkbox"}}),r.a.createElement(l.a,{disabled:!0,value:"disabled",inputProps:{"aria-label":"disabled checkbox"}}),r.a.createElement(l.a,{disabled:!0,checked:!0,value:"disabled checked",inputProps:{"aria-label":"disabled checked checkbox"}}),r.a.createElement(l.a,{defaultChecked:!0,value:"indeterminate",indeterminate:!0,inputProps:{"aria-label":"indeterminate checkbox"}}),r.a.createElement(l.a,{defaultChecked:!0,color:"default",value:"default",inputProps:{"aria-label":"checkbox with default color"}}),r.a.createElement(l.a,{defaultChecked:!0,size:"small",value:"small",inputProps:{"aria-label":"checkbox with small size"}}))}},3458:function(e,n,t){"use strict";t.r(n),n.default="import React from 'react';\nimport Checkbox from '@material-ui/core/Checkbox';\n\nexport default function Checkboxes() {\n  const [checked, setChecked] = React.useState(true);\n\n  const handleChange = event => {\n    setChecked(event.target.checked);\n  };\n\n  return (\n    <div>\n      <Checkbox\n        checked={checked}\n        onChange={handleChange}\n        value=\"primary\"\n        inputProps={{ 'aria-label': 'primary checkbox' }}\n      />\n      <Checkbox\n        defaultChecked\n        value=\"secondary\"\n        color=\"primary\"\n        inputProps={{ 'aria-label': 'secondary checkbox' }}\n      />\n      <Checkbox value=\"uncontrolled\" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />\n      <Checkbox disabled value=\"disabled\" inputProps={{ 'aria-label': 'disabled checkbox' }} />\n      <Checkbox\n        disabled\n        checked\n        value=\"disabled checked\"\n        inputProps={{ 'aria-label': 'disabled checked checkbox' }}\n      />\n      <Checkbox\n        defaultChecked\n        value=\"indeterminate\"\n        indeterminate\n        inputProps={{ 'aria-label': 'indeterminate checkbox' }}\n      />\n      <Checkbox\n        defaultChecked\n        color=\"default\"\n        value=\"default\"\n        inputProps={{ 'aria-label': 'checkbox with default color' }}\n      />\n      <Checkbox\n        defaultChecked\n        size=\"small\"\n        value=\"small\"\n        inputProps={{ 'aria-label': 'checkbox with small size' }}\n      />\n    </div>\n  );\n}\n"},3459:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return x}));var a=t(42),o=t(11),r=t(20),l=t(0),c=t.n(l),i=t(10),s=t(221),u=t(1306),m=t(1343),d=t(1350),h=t(1846),f=t.n(h),b=t(1847),p=t.n(b),k=t(1452),v=t.n(k),C=t(3460),g=t.n(C),E=Object(i.a)({root:{color:s.a[400],"&$checked":{color:s.a[600]}},checked:{}})((function(e){return c.a.createElement(d.a,Object.assign({color:"default"},e))}));function x(){var e=c.a.useState({checkedA:!0,checkedB:!0,checkedF:!0,checkedG:!0}),n=Object(r.a)(e,2),t=n[0],l=n[1],i=function(e){return function(n){l(Object(o.a)({},t,Object(a.a)({},e,n.target.checked)))}};return c.a.createElement(u.a,{row:!0},c.a.createElement(m.a,{control:c.a.createElement(d.a,{checked:t.checkedA,onChange:i("checkedA"),value:"checkedA"}),label:"Secondary"}),c.a.createElement(m.a,{control:c.a.createElement(d.a,{checked:t.checkedB,onChange:i("checkedB"),value:"checkedB",color:"primary"}),label:"Primary"}),c.a.createElement(m.a,{control:c.a.createElement(d.a,{value:"checkedC"}),label:"Uncontrolled"}),c.a.createElement(m.a,{disabled:!0,control:c.a.createElement(d.a,{value:"checkedD"}),label:"Disabled"}),c.a.createElement(m.a,{disabled:!0,control:c.a.createElement(d.a,{checked:!0,value:"checkedE"}),label:"Disabled"}),c.a.createElement(m.a,{control:c.a.createElement(d.a,{checked:t.checkedF,onChange:i("checkedF"),value:"checkedF",indeterminate:!0}),label:"Indeterminate"}),c.a.createElement(m.a,{control:c.a.createElement(E,{checked:t.checkedG,onChange:i("checkedG"),value:"checkedG"}),label:"Custom color"}),c.a.createElement(m.a,{control:c.a.createElement(d.a,{icon:c.a.createElement(g.a,null),checkedIcon:c.a.createElement(v.a,null),value:"checkedH"}),label:"Custom icon"}),c.a.createElement(m.a,{control:c.a.createElement(d.a,{icon:c.a.createElement(f.a,{fontSize:"small"}),checkedIcon:c.a.createElement(p.a,{fontSize:"small"}),value:"checkedI"}),label:"Custom size"}))}},3460:function(e,n,t){"use strict";var a=t(674);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t(0)),r=(0,a(t(1375)).default)(o.default.createElement("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}),"FavoriteBorder");n.default=r},3461:function(e,n,t){"use strict";t.r(n),n.default='import React from \'react\';\nimport { withStyles } from \'@material-ui/core/styles\';\nimport { green } from \'@material-ui/core/colors\';\nimport FormGroup from \'@material-ui/core/FormGroup\';\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\nimport Checkbox from \'@material-ui/core/Checkbox\';\nimport CheckBoxOutlineBlankIcon from \'@material-ui/icons/CheckBoxOutlineBlank\';\nimport CheckBoxIcon from \'@material-ui/icons/CheckBox\';\nimport Favorite from \'@material-ui/icons/Favorite\';\nimport FavoriteBorder from \'@material-ui/icons/FavoriteBorder\';\n\nconst GreenCheckbox = withStyles({\n  root: {\n    color: green[400],\n    \'&$checked\': {\n      color: green[600],\n    },\n  },\n  checked: {},\n})(props => <Checkbox color="default" {...props} />);\n\nexport default function CheckboxLabels() {\n  const [state, setState] = React.useState({\n    checkedA: true,\n    checkedB: true,\n    checkedF: true,\n    checkedG: true,\n  });\n\n  const handleChange = name => event => {\n    setState({ ...state, [name]: event.target.checked });\n  };\n\n  return (\n    <FormGroup row>\n      <FormControlLabel\n        control={\n          <Checkbox checked={state.checkedA} onChange={handleChange(\'checkedA\')} value="checkedA" />\n        }\n        label="Secondary"\n      />\n      <FormControlLabel\n        control={\n          <Checkbox\n            checked={state.checkedB}\n            onChange={handleChange(\'checkedB\')}\n            value="checkedB"\n            color="primary"\n          />\n        }\n        label="Primary"\n      />\n      <FormControlLabel control={<Checkbox value="checkedC" />} label="Uncontrolled" />\n      <FormControlLabel disabled control={<Checkbox value="checkedD" />} label="Disabled" />\n      <FormControlLabel disabled control={<Checkbox checked value="checkedE" />} label="Disabled" />\n      <FormControlLabel\n        control={\n          <Checkbox\n            checked={state.checkedF}\n            onChange={handleChange(\'checkedF\')}\n            value="checkedF"\n            indeterminate\n          />\n        }\n        label="Indeterminate"\n      />\n      <FormControlLabel\n        control={\n          <GreenCheckbox\n            checked={state.checkedG}\n            onChange={handleChange(\'checkedG\')}\n            value="checkedG"\n          />\n        }\n        label="Custom color"\n      />\n      <FormControlLabel\n        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />}\n        label="Custom icon"\n      />\n      <FormControlLabel\n        control={\n          <Checkbox\n            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}\n            checkedIcon={<CheckBoxIcon fontSize="small" />}\n            value="checkedI"\n          />\n        }\n        label="Custom size"\n      />\n    </FormGroup>\n  );\n}\n'},3462:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return p}));var a=t(42),o=t(11),r=t(20),l=t(0),c=t.n(l),i=t(1319),s=t(1305),u=t(704),m=t(1306),d=t(1343),h=t(1302),f=t(1350),b=Object(i.a)((function(e){return{root:{display:"flex"},formControl:{margin:e.spacing(3)}}}));function p(){var e=b(),n=c.a.useState({gilad:!0,jason:!1,antoine:!1}),t=Object(r.a)(n,2),l=t[0],i=t[1],p=function(e){return function(n){i(Object(o.a)({},l,Object(a.a)({},e,n.target.checked)))}},k=l.gilad,v=l.jason,C=l.antoine,g=2!==[k,v,C].filter((function(e){return e})).length;return c.a.createElement("div",{className:e.root},c.a.createElement(u.a,{component:"fieldset",className:e.formControl},c.a.createElement(s.a,{component:"legend"},"Assign responsibility"),c.a.createElement(m.a,null,c.a.createElement(d.a,{control:c.a.createElement(f.a,{checked:k,onChange:p("gilad"),value:"gilad"}),label:"Gilad Gray"}),c.a.createElement(d.a,{control:c.a.createElement(f.a,{checked:v,onChange:p("jason"),value:"jason"}),label:"Jason Killian"}),c.a.createElement(d.a,{control:c.a.createElement(f.a,{checked:C,onChange:p("antoine"),value:"antoine"}),label:"Antoine Llorca"})),c.a.createElement(h.a,null,"Be careful")),c.a.createElement(u.a,{required:!0,error:g,component:"fieldset",className:e.formControl},c.a.createElement(s.a,{component:"legend"},"Pick two"),c.a.createElement(m.a,null,c.a.createElement(d.a,{control:c.a.createElement(f.a,{checked:k,onChange:p("gilad"),value:"gilad"}),label:"Gilad Gray"}),c.a.createElement(d.a,{control:c.a.createElement(f.a,{checked:v,onChange:p("jason"),value:"jason"}),label:"Jason Killian"}),c.a.createElement(d.a,{control:c.a.createElement(f.a,{checked:C,onChange:p("antoine"),value:"antoine"}),label:"Antoine Llorca"})),c.a.createElement(h.a,null,"You can display an error")))}},3463:function(e,n,t){"use strict";t.r(n),n.default='import React from \'react\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport FormLabel from \'@material-ui/core/FormLabel\';\nimport FormControl from \'@material-ui/core/FormControl\';\nimport FormGroup from \'@material-ui/core/FormGroup\';\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\nimport FormHelperText from \'@material-ui/core/FormHelperText\';\nimport Checkbox from \'@material-ui/core/Checkbox\';\n\nconst useStyles = makeStyles(theme => ({\n  root: {\n    display: \'flex\',\n  },\n  formControl: {\n    margin: theme.spacing(3),\n  },\n}));\n\nexport default function CheckboxesGroup() {\n  const classes = useStyles();\n  const [state, setState] = React.useState({\n    gilad: true,\n    jason: false,\n    antoine: false,\n  });\n\n  const handleChange = name => event => {\n    setState({ ...state, [name]: event.target.checked });\n  };\n\n  const { gilad, jason, antoine } = state;\n  const error = [gilad, jason, antoine].filter(v => v).length !== 2;\n\n  return (\n    <div className={classes.root}>\n      <FormControl component="fieldset" className={classes.formControl}>\n        <FormLabel component="legend">Assign responsibility</FormLabel>\n        <FormGroup>\n          <FormControlLabel\n            control={<Checkbox checked={gilad} onChange={handleChange(\'gilad\')} value="gilad" />}\n            label="Gilad Gray"\n          />\n          <FormControlLabel\n            control={<Checkbox checked={jason} onChange={handleChange(\'jason\')} value="jason" />}\n            label="Jason Killian"\n          />\n          <FormControlLabel\n            control={\n              <Checkbox checked={antoine} onChange={handleChange(\'antoine\')} value="antoine" />\n            }\n            label="Antoine Llorca"\n          />\n        </FormGroup>\n        <FormHelperText>Be careful</FormHelperText>\n      </FormControl>\n      <FormControl required error={error} component="fieldset" className={classes.formControl}>\n        <FormLabel component="legend">Pick two</FormLabel>\n        <FormGroup>\n          <FormControlLabel\n            control={<Checkbox checked={gilad} onChange={handleChange(\'gilad\')} value="gilad" />}\n            label="Gilad Gray"\n          />\n          <FormControlLabel\n            control={<Checkbox checked={jason} onChange={handleChange(\'jason\')} value="jason" />}\n            label="Jason Killian"\n          />\n          <FormControlLabel\n            control={\n              <Checkbox checked={antoine} onChange={handleChange(\'antoine\')} value="antoine" />\n            }\n            label="Antoine Llorca"\n          />\n        </FormGroup>\n        <FormHelperText>You can display an error</FormHelperText>\n      </FormControl>\n    </div>\n  );\n}\n'},3464:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return u}));var a=t(0),o=t.n(a),r=t(1350),l=t(1306),c=t(1343),i=t(704),s=t(1305);function u(){return o.a.createElement(i.a,{component:"fieldset"},o.a.createElement(s.a,{component:"legend"},"Label Placement"),o.a.createElement(l.a,{"aria-label":"position",row:!0},o.a.createElement(c.a,{value:"top",control:o.a.createElement(r.a,{color:"primary"}),label:"Top",labelPlacement:"top"}),o.a.createElement(c.a,{value:"start",control:o.a.createElement(r.a,{color:"primary"}),label:"Start",labelPlacement:"start"}),o.a.createElement(c.a,{value:"bottom",control:o.a.createElement(r.a,{color:"primary"}),label:"Bottom",labelPlacement:"bottom"}),o.a.createElement(c.a,{value:"end",control:o.a.createElement(r.a,{color:"primary"}),label:"End",labelPlacement:"end"})))}},3465:function(e,n,t){"use strict";t.r(n),n.default='import React from \'react\';\nimport Checkbox from \'@material-ui/core/Checkbox\';\nimport FormGroup from \'@material-ui/core/FormGroup\';\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\nimport FormControl from \'@material-ui/core/FormControl\';\nimport FormLabel from \'@material-ui/core/FormLabel\';\n\nexport default function FormControlLabelPosition() {\n  return (\n    <FormControl component="fieldset">\n      <FormLabel component="legend">Label Placement</FormLabel>\n      <FormGroup aria-label="position" row>\n        <FormControlLabel\n          value="top"\n          control={<Checkbox color="primary" />}\n          label="Top"\n          labelPlacement="top"\n        />\n        <FormControlLabel\n          value="start"\n          control={<Checkbox color="primary" />}\n          label="Start"\n          labelPlacement="start"\n        />\n        <FormControlLabel\n          value="bottom"\n          control={<Checkbox color="primary" />}\n          label="Bottom"\n          labelPlacement="bottom"\n        />\n        <FormControlLabel\n          value="end"\n          control={<Checkbox color="primary" />}\n          label="End"\n          labelPlacement="end"\n        />\n      </FormGroup>\n    </FormControl>\n  );\n}\n'},3466:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return u}));var a=t(0),o=t.n(a),r=t(3),l=t(1319),c=t(1350),i=Object(l.a)({root:{"&:hover":{backgroundColor:"transparent"}},icon:{borderRadius:3,width:16,height:16,boxShadow:"inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",backgroundColor:"#f5f8fa",backgroundImage:"linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))","$root.Mui-focusVisible &":{outline:"2px auto rgba(19,124,189,.6)",outlineOffset:2},"input:hover ~ &":{backgroundColor:"#ebf1f5"},"input:disabled ~ &":{boxShadow:"none",background:"rgba(206,217,224,.5)"}},checkedIcon:{backgroundColor:"#137cbd",backgroundImage:"linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))","&:before":{display:"block",width:16,height:16,backgroundImage:"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",content:'""'},"input:hover ~ &":{backgroundColor:"#106ba3"}}});function s(e){var n=i();return o.a.createElement(c.a,Object.assign({className:n.root,disableRipple:!0,color:"default",checkedIcon:o.a.createElement("span",{className:Object(r.a)(n.icon,n.checkedIcon)}),icon:o.a.createElement("span",{className:n.icon}),inputProps:{"aria-label":"decorative checkbox"}},e))}function u(){return o.a.createElement("div",null,o.a.createElement(s,null),o.a.createElement(s,{defaultChecked:!0}),o.a.createElement(s,{disabled:!0}))}},3467:function(e,n,t){"use strict";t.r(n),n.default="import React from 'react';\nimport clsx from 'clsx';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Checkbox from '@material-ui/core/Checkbox';\n\nconst useStyles = makeStyles({\n  root: {\n    '&:hover': {\n      backgroundColor: 'transparent',\n    },\n  },\n  icon: {\n    borderRadius: 3,\n    width: 16,\n    height: 16,\n    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',\n    backgroundColor: '#f5f8fa',\n    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',\n    '$root.Mui-focusVisible &': {\n      outline: '2px auto rgba(19,124,189,.6)',\n      outlineOffset: 2,\n    },\n    'input:hover ~ &': {\n      backgroundColor: '#ebf1f5',\n    },\n    'input:disabled ~ &': {\n      boxShadow: 'none',\n      background: 'rgba(206,217,224,.5)',\n    },\n  },\n  checkedIcon: {\n    backgroundColor: '#137cbd',\n    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',\n    '&:before': {\n      display: 'block',\n      width: 16,\n      height: 16,\n      backgroundImage:\n        \"url(\\\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath\" +\n        \" fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 \" +\n        \"1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\\\")\",\n      content: '\"\"',\n    },\n    'input:hover ~ &': {\n      backgroundColor: '#106ba3',\n    },\n  },\n});\n\n// Inspired by blueprintjs\nfunction StyledCheckbox(props) {\n  const classes = useStyles();\n\n  return (\n    <Checkbox\n      className={classes.root}\n      disableRipple\n      color=\"default\"\n      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}\n      icon={<span className={classes.icon} />}\n      inputProps={{ 'aria-label': 'decorative checkbox' }}\n      {...props}\n    />\n  );\n}\n\nexport default function CustomizedCheckbox() {\n  return (\n    <div>\n      <StyledCheckbox />\n      <StyledCheckbox defaultChecked />\n      <StyledCheckbox disabled />\n    </div>\n  );\n}\n"},4192:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(1377),l=t(144),c=t(191),i=t(1344),s=t(1338),u=t(226),m=t(1319),d=Object(m.a)((function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}}));n.default=function(e){var n=d();return o.a.createElement(c.a,{classes:{root:n.layoutRoot},header:o.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},o.a.createElement("div",{className:"flex flex-col"},o.a.createElement("div",{className:"flex items-center mb-16"},o.a.createElement(s.a,{className:"text-18",color:"action"},"home"),o.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),o.a.createElement(u.a,{color:"textSecondary"},"Documentation"),o.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),o.a.createElement(u.a,{color:"textSecondary"},"Material UI Components")),o.a.createElement(u.a,{variant:"h6"},"Checkbox")),o.a.createElement(i.a,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/checkboxes",target:"_blank",role:"button"},o.a.createElement(s.a,null,"link"),o.a.createElement("span",{className:"mx-4"},"Reference"))),content:o.a.createElement("div",{className:"p-24 max-w-2xl"},o.a.createElement(u.a,{className:"text-44 mt-32 mb-8",component:"h1"},"Checkbox"),o.a.createElement(u.a,{className:"description"},"Checkboxes allow the user to select one or more items from a set."),o.a.createElement(u.a,{className:"mb-16",component:"div"},o.a.createElement("a",{href:"https://material.io/design/components/selection-controls.html#checkboxes"},"Checkboxes")," can be used to turn an option on or off."),o.a.createElement(u.a,{className:"mb-16",component:"div"},"If you have multiple options appearing in a list, you can preserve space by using checkboxes instead of on/off switches. If you have a single option, avoid using a checkbox and use an on/off switch instead."),o.a.createElement(u.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:t(3457).default,raw:t(3458)})),o.a.createElement(u.a,{className:"mb-16",component:"div"},o.a.createElement("code",null,"Checkbox")," can also be used with a label description thanks to the ",o.a.createElement("code",null,"FormControlLabel")," component."),o.a.createElement(u.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:t(3459).default,raw:t(3461)})),o.a.createElement(u.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Checkboxes with FormGroup"),o.a.createElement(u.a,{className:"mb-16",component:"div"},o.a.createElement("code",null,"FormGroup")," is a helpful wrapper used to group selection controls components that provides an easier API."),o.a.createElement(u.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:t(3462).default,raw:t(3463)})),o.a.createElement(u.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Label placement"),o.a.createElement(u.a,{className:"mb-16",component:"div"},"You can change the placement of the label:"),o.a.createElement(u.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:t(3464).default,raw:t(3465)})),o.a.createElement(u.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Customized checkbox"),o.a.createElement(u.a,{className:"mb-16",component:"div"},"Here is an example of customizing the component. You can learn more about this in the",o.a.createElement("a",{href:"/customization/components/"},"overrides documentation page"),"."),o.a.createElement(u.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:t(3466).default,raw:t(3467)})),o.a.createElement(u.a,{className:"text-32 mt-32 mb-8",component:"h2"},"When to use"),o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{href:"https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/"},"Checkboxes vs. Radio Buttons")),o.a.createElement("li",null,o.a.createElement("a",{href:"https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8"},"Checkboxes vs. Switches"))),o.a.createElement(u.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Accessibility"),o.a.createElement(u.a,{className:"mb-16",component:"div"},"(WAI-ARIA: ",o.a.createElement("a",{href:"https://www.w3.org/TR/wai-aria-practices/#checkbox"},"https://www.w3.org/TR/wai-aria-practices/#checkbox"),")"),o.a.createElement("ul",null,o.a.createElement("li",null,"All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the ",o.a.createElement("code",null,"<label>")," element (",o.a.createElement("a",{href:"/api/form-control-label/"},"FormControlLabel"),")."),o.a.createElement("li",null,"When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. ",o.a.createElement("code",null,"aria-label"),", ",o.a.createElement("code",null,"aria-labelledby"),", ",o.a.createElement("code",null,"title"),") via the ",o.a.createElement("code",null,"inputProps")," property.")),o.a.createElement(l.a,{component:"pre",className:"language-jsx"}," \n<Checkbox\n  value=\"checkedA\"\n  inputProps={{ 'aria-label': 'Checkbox A' \n/>\n"))})}}}]);