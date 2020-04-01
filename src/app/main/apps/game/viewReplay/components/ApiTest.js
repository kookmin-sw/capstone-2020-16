import React, { useState, useEffect } from "react";
// import ApiFuncs from "@api/ApiFuncs"
import * as Actions from 'app/store/actions'
import { useDispatch, useSelector } from 'react-redux'

const ApiTest = () => {
    const dispatch = useDispatch();
    const counts = useSelector(({apiTest}) => apiTest.api.count);
    const hehe = function() {
        dispatch(Actions.getUser())
    }
    useEffect(() => {
        console.log('rendering')
        // hehe()
        hehe();
    })
    return(
        <div>
            {/* asdg
            {console.log(test2)} */}
            {/* {dispatch(Actions.getUser())} */}
            {/* {console.log(counts)} */}
            <h1>{counts}</h1>
            <button onClick={hehe}>button</button>
        </div>
    )
}

export default ApiTest;