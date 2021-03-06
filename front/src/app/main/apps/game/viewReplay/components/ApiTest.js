import React, { useState, useEffect } from "react";
import ApiFuncs from '@api/ApiFuncs'
import axios from 'axios';

const apiFuncs = new ApiFuncs();
const ApiTest = () => {
    const [userList, setData] = useState([]);
    const postData = async () => {
        try{
            const data_parm = {
                'version': 'v1',
                'data': {
                    "username": "api_test02",
                    "email": "api_test02@api.com",
                }
            }
            await apiFuncs.api_user_create(data_parm);
        } catch(e) {
            console.log(e);
        };
    }
    useEffect(() => {
        console.log('rendering')
        const fetchData = async () => {
            try{
                const response = await apiFuncs.api_user_list({'version': 'v1'});
                // console.log(`>>>>>>>>>>${response.results}`);
                setData(response.results);
                if(response.next !== null){
                    axios.get(response.next)
                    .then((res)=>{
                        console.log(res)
                    }).catch((error)=>{console.log(error)});
                }
                // console.log(userList)
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return(
        <div>
            {userList.map(res => (
                <h1 key={res.email}>{res.username}</h1>
            ))}
            <button onClick={postData}>post button</button>
        </div>
    )
}

export default ApiTest;