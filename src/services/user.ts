import request from "../config/request";
import {setUserState} from "../states/user";
export const getCurrentUser = async () => {
    const res = await request.get("/user/current");
    if (res.data){
        setUserState(res.data);
        return res.data;
    }
    return null;
}

