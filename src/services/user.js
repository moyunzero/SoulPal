import request from "../config/request.js";
import { setUserState } from "../states/user.js";
export const getCurrentUser = async () => {
    const res = await request.get("/user/current");
    if (res.data){
        setUserState(res.data);
        return res.data;
    }
    return null;
}