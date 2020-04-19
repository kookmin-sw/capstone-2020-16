(this.webpackJsonponepanman=this.webpackJsonponepanman||[]).push([[86],{1561:function(e,a,t){"use strict";t.d(a,"c",(function(){return r})),t.d(a,"a",(function(){return l})),t.d(a,"h",(function(){return o})),t.d(a,"f",(function(){return i})),t.d(a,"b",(function(){return m})),t.d(a,"d",(function(){return d})),t.d(a,"e",(function(){return f})),t.d(a,"g",(function(){return p})),t.d(a,"i",(function(){return b}));var n=t(57),c=t.n(n),r="[ACADEMY APP] GET COURSES",l="[ACADEMY APP] GET CATEGORIES";function o(){var e=c.a.get("/api/academy-app/courses");return function(a){return e.then((function(e){return a({type:r,payload:e.data})}))}}function i(){var e=c.a.get("/api/academy-app/categories");return function(a){return e.then((function(e){return a({type:l,payload:e.data})}))}}var s=t(11),u=t(45),m="[ACADEMY APP] GET COURSE",d="[ACADEMY APP] SAVE COURSE",f="[ACADEMY APP] UPDATE COURSE";function p(e){var a=c.a.get("/api/academy-app/course",{params:e});return function(e){return a.then((function(a){return e({type:m,payload:a.data})}))}}function b(e){return function(a,t){var n=t().academyApp.course.id;c.a.post("/api/academy-app/course/update",Object(s.a)({id:n},e)).then((function(e){return a(Object(u.J)({message:"Course Updated"})),a({type:f,payload:e.data})}))}}},1597:function(e,a,t){"use strict";var n=t(1),c=t(5),r=t(0),l=t.n(r),o=(t(2),t(3)),i=t(10),s=l.a.forwardRef((function(e,a){var t=e.disableSpacing,r=void 0!==t&&t,i=e.classes,s=e.className,u=Object(c.a)(e,["disableSpacing","classes","className"]);return l.a.createElement("div",Object(n.a)({className:Object(o.a)(i.root,s,!r&&i.spacing),ref:a},u))}));a.a=Object(i.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(s)},1647:function(e,a,t){"use strict";var n=t(1),c=t(5),r=t(0),l=t.n(r),o=(t(2),t(3)),i=t(10),s=["video","audio","picture","iframe","img"],u=l.a.forwardRef((function(e,a){var t=e.children,r=e.classes,i=e.className,u=e.component,m=void 0===u?"div":u,d=e.image,f=e.src,p=e.style,b=Object(c.a)(e,["children","classes","className","component","image","src","style"]),y=-1!==s.indexOf(m),g=!y&&d?Object(n.a)({backgroundImage:'url("'.concat(d,'")')},p):p;return l.a.createElement(m,Object(n.a)({className:Object(o.a)(r.root,i,y&&r.media,-1!=="picture img".indexOf(m)&&r.img),ref:a,style:g,src:y?d||f:void 0},b),t)}));a.a=Object(i.a)({root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"},img:{objectFit:"cover"}},{name:"MuiCardMedia"})(u)},1890:function(e,a,t){"use strict";var n=t(63),c=t(11),r=t(1561),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case r.b:case r.d:return Object(c.a)({},a.payload);case r.e:return Object(c.a)({},e,{},a.payload);default:return e}},o={data:null,categories:[]},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case r.c:return Object(c.a)({},e,{data:a.payload});case r.a:return Object(c.a)({},e,{categories:a.payload});default:return e}},s=Object(n.d)({courses:i,course:l});a.a=s},4158:function(e,a,t){"use strict";t.r(a);var n=t(20),c=t(133),r=t(198),l=t(9),o=t(1344),i=t(1368),s=t(1597),u=t(1363),m=t(704),d=t(709),f=t(1339),p=t(1309),b=t(710),y=t(1319),g=t(51),h=t(1348),E=t(226),v=t(271),x=t(3),j=t(0),O=t.n(j),w=t(7),N=t(30),A=t(1561),C=t(1890),k=t(1647),S=Object(y.a)((function(e){return{header:{background:"linear-gradient(to right, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),color:e.palette.getContrastText(e.palette.primary.main)},headerIcon:{position:"absolute",top:-64,left:0,opacity:.04,fontSize:512,width:512,height:512,pointerEvents:"none"}}}));a.default=Object(v.a)("academyApp",C.a)((function(e){console.log("asdasdasdasd");var a=Object(w.b)(),t=Object(w.c)((function(e){return e.academyApp.courses.data})),y=Object(w.c)((function(e){return e.academyApp.courses.categories})),v=S(e),C=Object(g.a)(),P=Object(j.useState)(null),R=Object(n.a)(P,2),M=R[0],T=R[1],U=Object(j.useState)(""),I=Object(n.a)(U,2),D=I[0],Y=I[1],G=Object(j.useState)("all"),L=Object(n.a)(G,2),J=L[0],z=L[1];return Object(j.useEffect)((function(){a(A.f()),a(A.h())}),[a]),Object(j.useEffect)((function(){t&&T(0===D.length&&"all"===J?t:l.a.filter(t,(function(e){return("all"===J||e.category===J)&&e.title.toLowerCase().includes(D.toLowerCase())})))}),[t,D,J]),O.a.createElement("div",{className:"flex flex-col flex-auto flex-shrink-0 w-full"},O.a.createElement("div",{className:Object(x.a)(v.header,"relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288")},O.a.createElement(c.a,{animation:"transition.slideUpIn",duration:400,delay:100},O.a.createElement(E.a,{color:"inherit",className:"text-24 sm:text-40 font-light"},"Replay")),O.a.createElement(c.a,{duration:400,delay:600},O.a.createElement(E.a,{variant:"subtitle1",color:"inherit",className:"mt-8 sm:mt-16 mx-auto max-w-512"},O.a.createElement("span",{className:"opacity-75"},"Welcome to Replay. You can choose and see your Battle.")))),O.a.createElement("div",{className:"flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24"},O.a.createElement("div",{className:"flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24"},O.a.createElement(h.a,{label:"Search for a course",placeholder:"Enter a keyword...",className:"flex w-full sm:w-320 mb-16 sm:mb-0 mx-16",value:D,inputProps:{"aria-label":"Search"},onChange:function(e){Y(e.target.value)},variant:"outlined",InputLabelProps:{shrink:!0}}),O.a.createElement(m.a,{className:"flex w-full sm:w-320 mx-16",variant:"outlined"},O.a.createElement(d.a,{htmlFor:"category-label-placeholder"}," Category "),O.a.createElement(b.a,{value:J,onChange:function(e){z(e.target.value)},input:O.a.createElement(p.a,{labelWidth:9*"category".length,name:"category",id:"category-label-placeholder"})},O.a.createElement(f.a,{value:"all"},O.a.createElement("em",null," All ")),y.map((function(e){return O.a.createElement(f.a,{value:e.value,key:e.id},e.label)}))))),Object(j.useMemo)((function(){return M&&(M.length>0?O.a.createElement(r.a,{enter:{animation:"transition.slideUpBigIn"},className:"flex flex-wrap py-24"},M.map((function(e){var a=y.find((function(a){return a.value===e.category}));return O.a.createElement("div",{className:"w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16",key:e.id},O.a.createElement(i.a,{elevation:1,className:"flex flex-col h-256"},O.a.createElement("div",{className:"flex flex-shrink-0 items-center justify-between px-24 h-64",style:{background:a.color,color:C.palette.getContrastText(a.color)}},O.a.createElement(E.a,{className:"font-medium truncate",color:"inherit"},a.label)),O.a.createElement(k.a,{className:"flex items-center justify-center"},O.a.createElement("img",{src:e.thumbnail,width:"200",alt:"thumbnail"})),O.a.createElement(u.a,null),O.a.createElement(s.a,{className:"justify-center"},O.a.createElement(o.a,{to:"/apps/game/singlemode/courses/".concat(e.id,"/").concat(e.slug),component:N.a,className:"justify-start px-32",color:"secondary"},"START"))))}))):O.a.createElement("div",{className:"flex flex-1 items-center justify-center"},O.a.createElement(E.a,{color:"textSecondary",className:"text-24 my-24"},"No courses found!")))}),[y,M,C.palette])))}))}}]);