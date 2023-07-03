import myAxios from "../plugins/myAxios";
import {getCurrentUserState, setCurrentUserState} from "../states/user";
import { ref, onMounted } from "vue";

// 获取用户信息
export const getCurrentUser =async()=>{
  const res =await myAxios.get(url,"/user/current");
  if (res.code == 0){
    return res.data;
  } 
}