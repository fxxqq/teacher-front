import axios from 'axios'
import config from './config'
import utils from "../utils/utils"
import errorCode from "./errorCode"
// axios(config);
class API {
    //获取已授权列表
    // get(url, param) {
    //     config.data.strSQL = param.param;
    //     return axios.get(url, {
    //         param: param
    //     }).then((res) => {
    //         if (res) {
    //             //成功回调
    //             resolve(res);
    //         }
    //     }).catch((error) => {
    //         reject(error);
    //     });
    // };
    getToken() {
        var token = utils.getTeacherInfoCookies().token;
        return token
    }


    get(param) {
        config.data.strSQL = param.param;
        // var header = {};
        var token = this.getToken();
        // return axios.post(param.api, {}, config);
        return axios({
            method: `get`,
            url: param.url,
            params: param.sendObj,
            headers: {
                'token': token,
            }
        })
    }

    put(param) {
        // config.data.strSQL = param.param;
        var token = this.getToken();
        return axios({
            method: `put`,
            url: param.url,
            data: param.sendObj,
            headers: {
                "token": token
            }
        });

    }

    // 发送 POST 请求
    post(param) {
        config.data.strSQL = param.param;
        return axios({
            method: `post`,
            url: param.url,
            data: param.sendObj,
            // headers: header
        });
    }
    reqSuccess(obj, msg) {

    }
    reqFail(obj, msg) {
        // obj.$pop({
        //     message: msg,
        // });
    }
}
export default new API;