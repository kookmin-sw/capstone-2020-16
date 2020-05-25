import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 400,
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


// sessionStorage.getItem("actionType1"),
// sessionStorage.getItem("actionCondition1"),
// sessionStorage.getItem("actionDirection1")

export default function SimpleCard() {
  const classes = useStyles();
  const classes2 = useStyles2();
  
  const [flag,setFlag] = useState(0);
  const [value, setValue] = useState(sessionStorage.getItem("actionType2"));
  const [value2, setValue2] = useState(sessionStorage.getItem("actionCondition2"));
  const [value3, setValue3] = useState(sessionStorage.getItem("actionDirection2"));

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };

  const handleChange3 = (event) => {
    setValue3(event.target.value);
  };



  return (

    <Card className={classes2.root}>
    <div className={classes.root}>
      <Grid container spacing={4}>
          <Grid item xs>
            <Paper className={classes.paper}>

              <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                  액션 종류 설정
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="select2-3" name="select2-3" value={value} onChange={handleChange}>
                    <FormControlLabel value="삭제" control={<Radio />} label="삭제" onClick={()=>{sessionStorage.setItem("actionType2", "삭제")}}/>
                    <FormControlLabel value="내 돌로 변경" control={<Radio />} label="내 돌로 변경" onClick={()=>{sessionStorage.setItem("actionType2", "내 돌로 변경")}}/>
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Paper>
          </Grid>
        
        <Grid item xs={4}>
          <Paper className={classes.paper}>
              <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                  액션 조건 설정
                </Typography>
                <FormControl component="fieldset">
                <RadioGroup aria-label="select2-4" name="select2-4" value2={value} onChange={handleChange2}>
                  <FormControlLabel value="인접할 때" control={<Radio />} label="인접할 때" onClick={()=>{setFlag(1);sessionStorage.setItem("actionCondition2", "인접할 때")}} />
                  <FormControlLabel value="둘러쌀 때" control={<Radio />} label="둘러쌀 때" onClick={()=>{setFlag(2);sessionStorage.setItem("actionCondition2", "둘러쌀 때")}}/>
                  <FormControlLabel value="상대방 자리에 내 돌을 착수했을 때" control={<Radio />} label="상대방 자리에 내 돌을 착수했을 때" onClick={()=>{setFlag(3);sessionStorage.setItem("actionCondition2", "상대방 자리에 내 돌을 착수했을 때")}}/>
                </RadioGroup>
                </FormControl>
              </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <CardContent>
              <Typography className={classes.title} color="textPrimary" gutterBottom>
              액션 방향 설정
              </Typography>
                <div>
                  {
                    (() => {
                      if (flag === 1 || flag === 2) {
                        return (
                          <FormControl component="fieldset">
                            <RadioGroup aria-label="select2-5" name="select2-5" value3={value} onChange={handleChange3}>
                              <FormControlLabel value="양 옆" control={<Radio />} label="양 옆" onClick={()=>{setFlag(1);sessionStorage.setItem("actionDirection2", "양 옆")}} />
                              <FormControlLabel value="위 아래" control={<Radio />} label="위 아래" onClick={()=>{setFlag(1);sessionStorage.setItem("actionDirection2", "위 아래")}}/>
                              <FormControlLabel value="X 방향" control={<Radio />} label="X 방향" onClick={()=>{setFlag(1);sessionStorage.setItem("actionDirection2", "X 방향")}}/>
                              <FormControlLabel value="+ 방향" control={<Radio />} label="+ 방향" onClick={()=>{setFlag(1);sessionStorage.setItem("actionDirection2", "+ 방향")}}/>
                              <FormControlLabel value="* 방향" control={<Radio />} label="* 방향" onClick={()=>{setFlag(1);sessionStorage.setItem("actionDirection2", "* 방향")}}/>
                            </RadioGroup>
                          </FormControl>
                        );
                      }
                      else if (flag === 3) { return '추가 설정 없음' }
                      else { }
                    })()
                  }
                </div>
        </CardContent>

          </Paper>
        </Grid>
      </Grid>
    </div>








    </Card>
  );
}