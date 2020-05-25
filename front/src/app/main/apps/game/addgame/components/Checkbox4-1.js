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

  const [flag,setFlag] = useState("0");
  const [flag2,setFlag2] = useState("0");
  const [value, setValue] = useState(sessionStorage.getItem("startType4"));
  const [value2, setValue2] = useState(sessionStorage.getItem("distance4"));
  const [X, setX] = useState(sessionStorage.getItem("customDistanceX4"));
  const [Y, setY] = useState(sessionStorage.getItem("customDistanceY4"));

  const handleChangeX = (event) => {
    setX(event.target.value);
    sessionStorage.setItem("customDistanceX4", event.target.value);
  };

  const handleChangeY = (event) => {
    setY(event.target.value);
    sessionStorage.setItem("customDistanceY4", event.target.value);
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
      <RadioGroup aria-label="select4-1" name="select4-1" value={value} onChange={handleChange}>
        <FormControlLabel value="이동" control={<Radio />} label="이동" onClick={()=>{setFlag(1);sessionStorage.setItem("startType4", "이동")}}/>
        <FormControlLabel value="추가" control={<Radio />} label="추가" onClick={()=>{setFlag(2);sessionStorage.setItem("startType4", "추가")}}/>
        <FormControlLabel value="둘 다" control={<Radio />} label="둘 다" onClick={()=>{setFlag(3);sessionStorage.setItem("startType4", "둘 다")}}/>
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
						  if (flag === 1 || flag ===3) {
							return (

                <FormControl component="fieldset">
                <RadioGroup aria-label="select4-2" name="select4-2" value2={value} onChange={handleChange2}>
                  <FormControlLabel value="4방향" control={<Radio />} label="4방향" onClick={()=>{setFlag2(1);sessionStorage.setItem("distance4", "4방향")}}/>
                  <FormControlLabel value="8방향" control={<Radio />} label="8방향(대각 포함)" onClick={()=>{setFlag2(2);;sessionStorage.setItem("distance4", "8방향")}}/>
                  <FormControlLabel value="커스텀" control={<Radio />} label="커스텀" onClick={()=>{setFlag2(3);sessionStorage.setItem("distance4", "커스텀")}}/>
                  <FormControlLabel value="어디에나" control={<Radio />} label="어디에나" onClick={()=>{setFlag2(4);sessionStorage.setItem("distance4", "어디에나")}}/>
                </RadioGroup>
                </FormControl>
              );
                }
              else if(flag === 2){ return '추가 설정 없음' }
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
          커스텀 거리 설정
          </Typography>
      <div>
				{
						(() => {
						  if ((flag === 1 || flag ===3) && flag2 === 3) {
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
              else if(flag === 2){ return '추가 설정 없음' }
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