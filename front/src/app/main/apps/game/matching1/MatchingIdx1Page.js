import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect,useState }  from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector } from 'react-redux';
// import * as Actions from 'app/store/actions';
import axios from 'axios';
// import { Link } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
   header: {
      height: 500,
      background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      color: theme.palette.primary.contrastText
   },
   cardHeader: {
      backgroundColor: theme.palette.primary[800],
      color: theme.palette.getContrastText(theme.palette.primary[800])
   },
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
     },
     selectEmpty: {
      marginTop: theme.spacing(2),
     },

}));


export default function MatchingIdx1() {
   const classes = useStyles();
   var header = {
      'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
    }
   // var username = window.localStorage.getItem('username');
   const pk = window.localStorage.getItem('pk');
   var id = document.location.href.split("MatchingIdx1Page/");
   var id2 = id[1];
   var id3 = id2-1;

   var problemId = useSelector(({getProblemId}) => getProblemId.getId.results[id3]);
   
   if(!problemId){
      
      var problemIdId = window.localStorage.getItem('b_selectedId');
      var problemTitle = window.localStorage.getItem('b_selectedTitle');
   }
   else{
      var problemIdId = problemId.id;
      var problemTitle = problemId.title;
   }
  


   const [codelist, setCodelist] = useState([]);
   const [opposite, setOpposite] = useState({
      o_username: 'opposite',
      o_tier : 'loading...',
      o_language : 'loading...',
      
   });
   const [challenger, setChallenger] = useState({
      c_username: 'challenger',
      c_tier : 'loading...',
      c_language : 'loading...',
      
   });

   const [gameid, setGameid] = useState(0);
   const [isMatched, setIsMatched] = useState(false);
   
   const [c_result, setCresult] = useState('loading...');
   const [o_result, setOresult] = useState('loading...');

   const [gameStatus, setGameStatus] = useState('waiting...');

   // match request 
   // update challenger, opposite state using response data
   var goMatch = (userid, problemid, codeid) => {
      if (isMatched){
         return;
      }
      const config = {
         'method' : 'POST',
         'url': 'http://203.246.112.32:8000/api/v1/match/',
         'headers': {
            'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
          },
         'data': {
            'userid': userid,
            'problemid': problemid,
            'codeid': codeid
         } 
      }
      
      axios(config)
      .then(response => {

         var data = response.data;
         // console.log(data.error);
         if(data.error === undefined){
            getUserInfo(data.challenger, data.problem, "challenger",data.challenger_language);
            getUserInfo(data.opposite, data.problem, "opposite", data.opposite_language);
            
            setGameid(data.match_id);
            setIsMatched(true);
            setGameStatus('playing...');
         }
         else{
            setGameStatus(`${data.error}`);
         }

        
  
      })
      .catch(error => {
         // console.log(`match error : ${error.data}`);
         setGameStatus('matching error...!');
      })
   }

   var getUserTier = (userid,problemid, type, username, language) => {

      axios.get(`http://203.246.112.32:8000/api/v1/userInformationInProblem/?user=${userid}&problem=${problemid}`, {headers:header})
      .then(response => {
        
         if (type === "challenger"){
            
            setChallenger({
               ...challenger,
               ['c_username']: username,
               ['c_tier'] : response.data.results[0].tier,
               ['c_language']: language
               
            })
            
         }
         else{
            setOpposite({
               ...opposite,
               ['o_username']: username,
               ['o_tier']: response.data.results[0].tier,
               ['o_language']: language
               
            })
           
         }
      })
      .catch(error => {
         // console.log(error)
      })
   }

   // get user info
   // set username and tier 
   var getUserInfo = (userid, problemid, type, language) => {
      
      axios.get(`https://cors-anywhere.herokuapp.com/http://203.246.112.32:8000/api/v1/userfullInfo/${userid}`, {headers:header})
      .then(response => {
         
         getUserTier(userid,problemid,type,response.data.username, language);
      })
      .catch(error => {
         // console.log(error);
      })

      
   }

   var codepagaination = (next, codelist) => {
      axios.get(next , {headers:header})
      .then(response => {
         codelist = codelist.concat(response.data.results);

         if (response.data.next != null){
            codelist += codepagaination(response.data.next, codelist);
         }
         else{
            if (codelist.length === 0){
               var code = [{'id':0,'name':'you have not valid code to game'}];
               setCodelist(code);
            }
            else{
               // var code = [];
               // code.push(codelist[codelist.length-1]);
               // console.log(code);
               setCodelist(codelist);
            }
           
            return codelist;
         }
      })
   }

   // get code list
   // update codelist using setCodelist
   var getCodelists = (userid, problemid, codelist) =>
   {  
      axios.get(`http://203.246.112.32:8000/api/v1/code/?author=${userid}&problem=${problemid}&available_game=true`, {headers:header})
      .then(response => {
         codelist = codelist.concat(response.data.results);
         if ( response.data.next != null ){
            // console.log("deep in!!");
            codelist += codepagaination(response.data.next, codelist);
         }
         else{
            if (codelist.length === 0){
               var code = [{'id':0,'name':'you have not valid code to game'}];
               setCodelist(code);
            }
            else{
               // var code = [];
               // code.push(codelist[codelist.length-1]);
               // console.log(code);
               setCodelist(codelist);
            }
           
            return codelist;
         }
      })
      .catch(error => {
         // console.log("error : cannot read code list");
         // console.log(error);
      })
   }

   useEffect(() => {
      getCodelists(pk, problemIdId, []);
      // console.log(codelist);

      },[]);

   useEffect(() => {
      getUserInfo(pk, problemIdId, "challenger", "loading...");
   },[]);

   useEffect(()=>{
      // console.log("change challenger or oppoiste");
   },[challenger,opposite])

   useEffect(()=> {
    
      if (isMatched){
         var repeat = setInterval(() => {
            axios.get(`http://203.246.112.32:8000/api/v1/game/${gameid}/`, {headers:header})
            .then(response => {
               var result = response.data.result;
               // console.log(result);
               
               if (result !== "playing"){

                  var winner = response.data.winner;

                  if (winner === "challenger"){
                     setCresult('win');
                     setOresult('lose');
                  }
                  else{
                     setCresult('lose');
                     setOresult('win');
                  }

                  clearInterval(repeat);
                  setGameStatus('Finish!');
         
               }

            })
            .catch(error => {
               // console.log(`[error] get game Info : ${error}`);
               
            })
         },3000);
      }
     
   },[isMatched])
   
   const [state, setState] = React.useState({
      code: '',
      name: 'hai',
     });

   const inputLabel = React.useRef(null);
     const [labelWidth, setLabelWidth] = React.useState(0);
     React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

   const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

   return (
      <div>   
         <div className={clsx(classes.header, 'flex')}>
            <div className="p-24 w-full max-w-2xl mx-auto">
               <div className="text-center my-128 mx-24">
                  <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                     <Typography variant="h2" color="inherit" className="font-light">
                        Let's Go Battle!
                     </Typography>
                  </FuseAnimate>

                  <FuseAnimate duration={400} delay={600}>
                     <Typography
                        variant="subtitle1"
                        color="inherit"
                        className="opacity-75 mt-16 mx-auto max-w-512"
                     >
                        Start Random Matching if you click matching button!
                     </Typography>
                  </FuseAnimate>
               </div>
            </div>
         </div>

         <div className="-mt-192">
            <div className="w-full max-w-2xl mx-auto">
               <FuseAnimateGroup
                  enter={{
                     animation: 'transition.slideUpBigIn'
                  }}
                  className="flex items-center justify-center flex-wrap"
               >
                  <div className="w-full max-w-320 sm:w-1/3 p-12">
                     <Card square>
                        <div className={clsx(classes.cardHeader, 'px-24 py-16')}>
                           <Typography variant="subtitle1" color="inherit">
                             {challenger.c_username}
                           </Typography>
                        </div>

                        <CardContent className="p-32">
                           <div className="flex justify-center">
                              <div className="flex items-end">
                                 <Typography className="text-72 mx-4 font-light leading-none">
                                 <div><img src="assets/images/profile/2.jpg" alt="user profile"/></div>
                                 </Typography>
                              </div>
                           </div>

                           <Divider className="my-32" />

                           <div className="flex flex-col">
                              <Typography variant="subtitle1" className="">
                                 <span className="font-bold mx-4">Tier</span>
                                 {challenger.c_tier}
                              </Typography>
                              <Typography variant="subtitle1" className="">
                                 <span className="font-bold mx-4">Language</span>
                                 {challenger.c_language}
                              </Typography>
                              <Typography variant="subtitle1" className="">
                                 <span className="font-bold mx-4">result</span>
                                 {c_result}
                              </Typography>
 
                           </div>
                        </CardContent>
                        <div className="flex justify-center pb-32">
                          
                        </div>
                     </Card>
                  </div>

                  <div className="w-full max-w-320 sm:w-1/3 p-12">
                     <Card className="relative" raised>
                        <div className="p-32 text-center">
                           <Typography className="text-32">  {problemTitle} </Typography>
                           <Typography color="textSecondary" className="text-16 font-medium">
                              Battle game
                           </Typography>
                        </div>

                        <CardContent className="text-center p-0">
                           <div className={clsx(classes.price, 'flex items-end justify-center py-16 px-32')}>
                              <div className="flex justify-center">
                                 <Typography
                                    color="inherit"
                                    className="text-32 mx-4 font-light leading-none"
                                 >
                                    <div><img src={`assets/images/games/${problemIdId}.jpg`} alt="user profile"/></div>
                                 </Typography>
                              </div>
                           </div>

                           <div className="flex flex-col p-32">
                              <Typography className="text-20"> {gameStatus} </Typography>
                              <Typography color="textSecondary" className="mb-16">
                              
                              </Typography>
                              <div> 　 </div>
                              <Typography className="text-20"> Select Your Code </Typography>
                              <FormControl variant="outlined" className={classes.formControl}>
                                 <InputLabel ref={inputLabel} htmlFor="outlined-code-native-simple">
                                    {/* Code */}
                                   </InputLabel>
                                 <Select
                                    native
                                    value={state.code}
                                    onChange={handleChange('code')}
                                    labelWidth={labelWidth}
                                    inputProps={{
                                       name: 'code',
                                       id: 'outlined-code-native-simple',
                                    }}
                                 >
                                    <option value=" "> Select Code </option>
                                    {codelist.map(course => { return(

                                    <option value={course.id}>{course.name}</option>
                                    
                                    ); })}                              
                                 </Select>
                              </FormControl>
                                                           
                           </div>
                        </CardContent>

                        <div className="flex flex-col items-center justify-center pb-32 px-32" >
                        {/* <Link className="font-medium" 										
												to={`/apps/game/Replay`}> */}
                           <Button variant="contained" color="primary" className="w-full"
                           onClick={function(){
                              goMatch(pk, problemIdId, state.code)
                             }}	
                           >
                              Matching
                           </Button>
                           {/* </Link> */}
                        </div>
                     </Card>
                  </div>

                  <div className="w-full max-w-320 sm:w-1/3 p-12">
                     <Card square>
                        <div className={clsx(classes.cardHeader, 'px-24 py-16')}>
                           <Typography variant="subtitle1" color="inherit">
                              {opposite.o_username}
                           </Typography>
                        </div>

                        <CardContent className="p-32">
                           <div className="flex justify-center">
                            
                              <div className="flex items-end">
                                 <Typography className="text-72 mx-4 font-light leading-none">
                                 <div><img src="assets/images/profile/2.jpg" alt="user profile"/></div>
                                 </Typography>
                               
                              </div>
                           </div>

                           <Divider className="my-32" />

                           <div className="flex flex-col">
                              <Typography variant="subtitle1" className="">
                                 <span className="font-bold mx-4">Tier</span>
                                 {opposite.o_tier}
                              </Typography>
                              <Typography variant="subtitle1" className="">
                                 <span className="font-bold mx-4">Language</span>
                                 {opposite.o_language}
                              </Typography>
                              <Typography variant="subtitle1" className="">
                                 <span className="font-bold mx-4">result</span>
                                 {o_result}
                              </Typography>
                           </div>
                        </CardContent>

                        <div className="flex justify-center pb-32">
                          
                        </div>
                     </Card>
                  </div>
               </FuseAnimateGroup>

             
            </div>
         </div>
      </div>
   );
}