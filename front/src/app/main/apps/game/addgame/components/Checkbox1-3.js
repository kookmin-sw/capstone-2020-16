import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(1.6)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
 
  const [flag,setFlag] = useState(0);
  const [value, setValue] = useState('None');

  const handleChange = (event) => {
    setValue(event.target.value);
  };



  return (

    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
        액션 종류 설정
        </Typography>
        <FormControl component="fieldset">
      <RadioGroup aria-label="select1" name="select1" value={value} onChange={handleChange}>
        <FormControlLabel value="option1-1" control={<Radio />} label="삭제" />
        <FormControlLabel value="option1-2" control={<Radio />} label="내 돌로 변경" />
      </RadioGroup>
    </FormControl>
      </CardContent>

      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
        액션 조건 설정
        </Typography>
        <FormControl component="fieldset">
      <RadioGroup aria-label="select2" name="select1" value={value} onChange={handleChange}>
        <FormControlLabel value="option2-1" control={<Radio />} label="인접할 때" onClick={()=>{setFlag(1);}} />
        <FormControlLabel value="option2-2" control={<Radio />} label="둘러쌀 때" onClick={()=>{setFlag(2);}}/>
        <FormControlLabel value="option2-3" control={<Radio />} label="상대방 자리에 내 돌을 착수했을 때" onClick={()=>{setFlag(3);}}/>
      </RadioGroup>
    </FormControl>
      </CardContent>
      <CardContent>
       <Typography className={classes.title} color="textPrimary" gutterBottom>
       액션 방향 설정
       </Typography>
      <div>
				{
						(() => {
						  if (flag === 1 || flag ===2 ) {
							return (

                <FormControl component="fieldset">
                <RadioGroup aria-label="select3" name="select3" value={value} onChange={handleChange}>
                  <FormControlLabel value="option3-1" control={<Radio />} label="양 옆"/>
                  <FormControlLabel value="option3-2" control={<Radio />} label="위 아래"/>
                  <FormControlLabel value="option3-3" control={<Radio />} label="x 방향"/>
                  <FormControlLabel value="option3-4" control={<Radio />} label="+ 방향"/>
                  <FormControlLabel value="option3-4" control={<Radio />} label="* 방향"/>
                </RadioGroup>
                </FormControl>
              );
							  }
              else if(flag === 3) { return '추가 설정 없음' }
              else { }
						})()
				}
        </div>
        </CardContent>


    </Card>
  );
}