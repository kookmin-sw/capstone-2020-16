import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const rows = [
	createData('첫번 째 돌',
		sessionStorage.getItem("startType1"),
		sessionStorage.getItem("distance1"),
        sessionStorage.getItem("customDistanceX1"),
        sessionStorage.getItem("customDistanceY1"),
		sessionStorage.getItem("actionType1"),
		sessionStorage.getItem("actionCondition1"),
		sessionStorage.getItem("actionDirection1")
		),
	createData('두번 째 돌', 				
		sessionStorage.getItem("startType2"),
		sessionStorage.getItem("distance2"),
        sessionStorage.getItem("customDistanceX2"),
        sessionStorage.getItem("customDistanceY2"),
		sessionStorage.getItem("actionType2"),
		sessionStorage.getItem("actionCondition2"),
		sessionStorage.getItem("actionDirection2")
	),
	createData('세번 째 돌', 		
		sessionStorage.getItem("startType3"),
		sessionStorage.getItem("distance3"),
        sessionStorage.getItem("customDistanceX3"),
        sessionStorage.getItem("customDistanceY3"),
		sessionStorage.getItem("actionType3"),
		sessionStorage.getItem("actionCondition3"),
		sessionStorage.getItem("actionDirection3")
	),
	createData('네번 째 돌', 		
		sessionStorage.getItem("startType4"),
		sessionStorage.getItem("distance4"),
        sessionStorage.getItem("customDistanceX4"),
        sessionStorage.getItem("customDistanceY4"),
		sessionStorage.getItem("actionType4"),
		sessionStorage.getItem("actionCondition4"),
		sessionStorage.getItem("actionDirection4")
	),
];

function createData( piece, startType, distance,customDistanceX, customDistanceY, actionType, actionCondition, actionDirection) {
    return { piece, startType, distance, customDistanceX, customDistanceY, actionType, actionCondition, actionDirection };
}



const useStyles2 = makeStyles({
    table: {
      minWidth: 650,
    },
  });




export default function AutoGrid() {
  const classes = useStyles2();

  return (
        <div>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
                <caption>현재 설정한 돌의 정보를 볼 수 있습니다.</caption>
                <TableHead>
                    <TableRow>
                        <TableCell>돌</TableCell>
                        <TableCell align="center">착수 방식</TableCell>
                        <TableCell align="center">거리 설정</TableCell>
                        <TableCell align="center">커스텀 X 거리 설정</TableCell>
                        <TableCell align="center">커스텀 Y 거리 설정</TableCell>
                        <TableCell align="center">액션 종류 설정</TableCell>
                        <TableCell align="center">액션 조건 설정</TableCell>
                        <TableCell align="center">액션 방향 설정</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.piece}>
                            <TableCell component="th" scope="row">
                                {row.piece}
                            </TableCell>
                            <TableCell align="center">{row.startType}</TableCell>
                            <TableCell align="center">{row.distance}</TableCell>
                            <TableCell align="center">{row.customDistanceX}</TableCell>
                            <TableCell align="center">{row.customDistanceY}</TableCell>
                            <TableCell align="center">{row.actionType}</TableCell>
                            <TableCell align="center">{row.actionCondition}</TableCell>
                            <TableCell align="center">{row.actionDirection}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Divider />
        </div>
  );
}

