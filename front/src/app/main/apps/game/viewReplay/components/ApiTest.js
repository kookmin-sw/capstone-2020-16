import React, { useState, useEffect } from "react";
import ApiFuncs from '@api/ApiFuncs'

const ApiTest = () => {
    const [userList, setData] = useState([]);
    useEffect(() => {
        console.log('rendering')
        const fetchData = async () => {
            try{
                const apiFuncs = new ApiFuncs();
                const response = await apiFuncs.api_userfullInfo_list({'version': 'v1'});
                console.log(`>>>>>>>>>>${response.results}`);
                setData(response.results);
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
        </div>
    )
}

export default ApiTest;