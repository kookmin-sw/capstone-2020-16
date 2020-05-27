import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

const useStyles2 = makeStyles({
  root: {
    minWidth: 400,
    minHeight: 350,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(1.6)',
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const classes2 = useStyles2();

 
  const [value, setValue] = useState(sessionStorage.getItem("startType2"));
  const [value2, setValue2] = useState(sessionStorage.getItem("distance2"));
  const [X, setX] = useState(sessionStorage.getItem("customDistanceX2"));
  const [Y, setY] = useState(sessionStorage.getItem("customDistanceY2"));
  const [min, setMin] = useState(sessionStorage.getItem("customDistanceMin2"));
  const [max, setMax] = useState(sessionStorage.getItem("customDistanceMax2"));

  const handleChangeX = (event) => {
    setX(event.target.value);
    sessionStorage.setItem("customDistanceX2", event.target.value);
    // console.log(event.target.value);
    // console.log(sessionStorage.getItem("customDistanceX1", event.target.value));
  };

  const handleChangeY = (event) => {
    setY(event.target.value);
    sessionStorage.setItem("customDistanceY2", event.target.value);
  };

  const handleChangeMin = (event) => {
    setX(event.target.value);
    sessionStorage.setItem("customDistanceMin2", event.target.value);
    // console.log(event.target.value);
    // console.log(sessionStorage.getItem("customDistanceX1", event.target.value));
  };

  const handleChangeMax = (event) => {
    setX(event.target.value);
    sessionStorage.setItem("customDistanceMax2", event.target.value);
    // console.log(event.target.value);
    // console.log(sessionStorage.getItem("customDistanceX1", event.target.value));
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };






  return (


  <Card className={classes2.root}>
   <CardContent>
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs>
          <Paper className={classes.paper}>
          <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
        착수 방식 설정
        </Typography>
        <FormControl component="fieldset">
      <RadioGroup aria-label="select2-1" name="select2-1" value={value} onChange={handleChange}>
        <FormControlLabel value="이동" control={<Radio />} label="이동" onClick={()=>{sessionStorage.setItem("startType2", "이동")}}/>
        <FormControlLabel value="추가" control={<Radio />} label="추가" onClick={()=>{sessionStorage.setItem("startType2", "추가");}}/>
        <FormControlLabel value="둘 다" control={<Radio />} label="둘 다" onClick={()=>{sessionStorage.setItem("startType2", "둘 다")}}/>
      </RadioGroup>
        </FormControl>
      </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            
          <CardContent>
       <Typography className={classes.title} color="textPrimary" gutterBottom>
       거리 설정
       </Typography>
      <div>
				{
						(() => {
						  if ( sessionStorage.getItem("startType2") === "이동" || sessionStorage.getItem("startType2") === "둘 다" ) {
							return (

                <FormControl component="fieldset">
                <RadioGroup aria-label="select2-2" name="select2-2" value={value2} onChange={handleChange2}>
                <FormControlLabel value="+방향" control={<Radio />} label="+방향" onClick={()=>{sessionStorage.setItem("distance2", "+방향")}}/>
                  <FormControlLabel value="X방향" control={<Radio />} label="X방향" onClick={()=>{sessionStorage.setItem("distance2", "X방향")}}/>
                  <FormControlLabel value="8방향" control={<Radio />} label="8방향(대각 포함)" onClick={()=>{sessionStorage.setItem("distance2", "8방향")}}/>
                  <FormControlLabel value="커스텀" control={<Radio />} label="커스텀" onClick={()=>{sessionStorage.setItem("distance2", "커스텀")}}/>
                  <FormControlLabel disalbed="어디에나" disabled control={<Radio />} label="어디에나" onClick={()=>{sessionStorage.setItem("distance2", "어디에나")}}/>
                </RadioGroup>
                </FormControl>
              );
                }
              else if(sessionStorage.getItem("startType2") === "추가"){ return '추가 설정 없음' }
              else{  }
						})()
				}
        </div>
        </CardContent>  
        </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
          <CardContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
          거리 설정
          </Typography>
      <div>
				{
						(() => {
						  if ((sessionStorage.getItem("startType2") === "이동" || sessionStorage.getItem("startType2") === "둘 다") && sessionStorage.getItem("distance2") === "커스텀") {
							return (
              <div>
                <TextField
                id="outlined-multiline-flexible"
                label="X 거리"
                multiline
                rowsMax={4}
                value={X}
                onChange={handleChangeX}
                variant="outlined"
              />
              <div>　</div>
              <TextField
              id="outlined-multiline-flexible"
              label="Y거리"
              multiline
              rowsMax={4}
              value={Y}
              onChange={handleChangeY}
              variant="outlined"
            />
            </div>
              );
            }
            else if ((sessionStorage.getItem("startType2") === "이동" || sessionStorage.getItem("startType2") === "둘 다") && (sessionStorage.getItem("distance2") === "+방향"||sessionStorage.getItem("distance2") === "X방향" || sessionStorage.getItem("distance2") === "8방향")) {
							return (
              <div>
                <TextField
                id="outlined-multiline-flexible"
                label="최소 거리"
                multiline
                rowsMax={4}
                value={min}
                onChange={handleChangeMin}
                variant="outlined"
              />
              <div>　</div>
              <TextField
              id="outlined-multiline-flexible"
              label="최대 거리"
              multiline
              rowsMax={4}
              value={max}
              onChange={handleChangeMax}
              variant="outlined"
            />
            </div>
              );
            }
              else if(sessionStorage.getItem("startType2") === "추가"){ return '추가 설정 없음' }
              else{ }
						})()
				}
        </div>
        </CardContent>

          </Paper>
        </Grid>
      </Grid>
    </div>
    <Divider/>
    </CardContent>
  </Card>
    
  );
}