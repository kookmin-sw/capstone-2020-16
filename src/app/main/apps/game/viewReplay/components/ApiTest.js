import React from "react";
import ApiFuncs from "@api/ApiFuncs"

const ApiTest = () => {
    return (
        <div>
            asd
            {console.log(ApiFuncs.prototype.api_user_list())}
        </div>
    )
}

export default ApiTest;