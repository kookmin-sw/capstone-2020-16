(this.webpackJsonponepanman=this.webpackJsonponepanman||[]).push([[75],{2290:function(e,t,a){},2313:function(e,t){},2314:function(e,t){},2315:function(e,t){},2316:function(e,t){},2317:function(e,t){},4291:function(e,t,a){"use strict";a.r(t);var n=a(20),o=(a(2290),a(2291)),r=a(1344),c=a(0),l=a.n(c),i=a(30),s=a(57),m=a.n(s);a(2292),a(2293),a(2294),a(2295);var u=function(){var e=Object(c.useState)('var component = {\nname: "react-codemirror",\nauthor: "Jed Watson",\nrepo: "https://github.com/JedWatson/react-codemirror"}'),t=Object(n.a)(e,2),a=t[0],s=t[1],u=Object(c.useState)({mode:"javascript",idx:0,theme:"material",lineNumbers:!0}),d=Object(n.a)(u,2),p=d[0],f=d[1];return p.idx=1,l.a.createElement("div",{className:"w-full"},l.a.createElement("div",{style:{marginTop:10}},l.a.createElement("select",{onChange:function(e){console.log("beforeMode>>>>>>".concat(p.mode)),console.log("event.target.value>>>>>>".concat(e.target.value)),console.log(typeof p.mode),"C++"===e.target.value&&(p.idx=0,console.log(p.idx)),"python"===e.target.value&&(p.idx=1,console.log(p.idx)),"C"===e.target.value&&(p.idx=2,console.log(p.idx)),f({mode:e.target.value})}},l.a.createElement("option",{value:"javascript"},"JavaScript"),l.a.createElement("option",{value:"C++"},"C++"),l.a.createElement("option",{value:"python"},"Python"),l.a.createElement("option",{value:"C"},"C"))),l.a.createElement(o.UnControlled,{value:a,options:{mode:p.mode,theme:"material",lineNumbers:!0},onChange:function(e,t,a){var n;n=a,console.log("event.target.value>>>>>>".concat(n)),s(n)}}),l.a.createElement("div",{className:"mx-auto sm:px-16"},l.a.createElement(i.a,{className:"font-medium",to:"/apps/game/battle"},l.a.createElement(r.a,{onClick:function(){!function(e,t,a){var n={author:t,code:e,language:a,problem:1,name:"codePostTest"};m.a.post("/api/v1/code/",n).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}(a,1,p.idx)},style:{textAlign:"center",justifyContent:"center",alignItems:"center",paddingLeft:40,paddingRight:40,marginBottom:24,height:40},variant:"contained",color:"primary"},"SUBMIT"))))},d=a(64),p=a(65),f=a(94),g=a(95),v=a(1734),h=a(2296);h.pdfjs.GlobalWorkerOptions.workerSrc="//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(h.pdfjs.version,"/pdf.worker.js");var x=function(e){Object(g.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={numPages:null,pageNumber:1},e.onDocumentLoadSuccess=function(t){var a=t.numPages;e.setState({numPages:a,pageNumber:1})},e.changePage=function(t){return e.setState((function(e){return{pageNumber:e.pageNumber+t}}))},e.previousPage=function(){return e.changePage(-1)},e.nextPage=function(){return e.changePage(1)},e}return Object(p.a)(a,[{key:"render",value:function(){var e=this.state,t=e.numPages,a=e.pageNumber,n=this.props.tmp;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"flex"},l.a.createElement("p",null,"Page ",a||(t?1:"--")," of ",t||"--"),l.a.createElement(v.a,{variant:"contained",color:"primary","aria-label":"contained primary button group"},l.a.createElement(r.a,{disabled:a<=1,onClick:this.previousPage},"PREVIOUS"),l.a.createElement(r.a,{disabled:a>=t,onClick:this.nextPage},"NEXT"))),l.a.createElement(h.Document,{file:"/assets/PDF/".concat(n,".pdf"),onLoadSuccess:this.onDocumentLoadSuccess},l.a.createElement(h.Page,{pageNumber:a})))}}]),a}(c.Component),b=a(133),E=a(226),j=a(3),y=a(1319),P=a(227),N=a(1363),k=a(7),w=Object(y.a)((function(e){return{header:{background:"linear-gradient(to right, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),color:e.palette.primary.contrastText},root:{maxWidth:345},media:{height:0},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"}}}));t.default=function(){var e=w(),t=document.location.href.split("ViewProblemPage/");console.log(t);var a=t[1],n=Object(k.c)((function(e){return e.getProblemId.getId.results}));return n&&console.log(n),l.a.createElement("div",{className:"flex flex-col flex-auto flex-shrink-0 w-full"},l.a.createElement("div",{className:Object(j.a)(e.header,"relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288")},l.a.createElement(b.a,{animation:"transition.slideUpIn",duration:400,delay:100},l.a.createElement(E.a,{color:"inherit",className:"text-24 sm:text-40 font-light"},"Problem")),l.a.createElement(b.a,{duration:400,delay:600},l.a.createElement(E.a,{variant:"subtitle1",color:"inherit",className:"mt-8 sm:mt-16 mx-auto max-w-512"},l.a.createElement("span",{className:"opacity-75"},"Let's Coding! Solve these Problems and Submit! ")))),l.a.createElement("div",{className:"flex flex-row flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24"},l.a.createElement("div",{className:"flex:1 flex-shrink-0 items-center justify-between px-24 h-64"},l.a.createElement(x,{tmp:a})),l.a.createElement(N.a,{orientation:"vertical",flexItem:!0}),l.a.createElement(P.a,{variant:"outlined"},l.a.createElement("div",{className:"flex:1 flex-shrink-0 items-center justify-between px-24 "},l.a.createElement(u,null)))))}}}]);