import * as custom_config from "../../custom_config.json";
import dayjs from 'dayjs';

type IpRequestCountHash = {
    [ip: string]: {
        count: number,
        timeStamp: number
    }
}

const ipRequestCountHash: IpRequestCountHash = {};

export const handleIP = (ip: string): boolean => {
        let now = Date.now()
        if(ipRequestCountHash[ip]){
            if(ipRequestCountHash[ip].count > custom_config.http.mostRequestTimeInOneSecound){
                ipRequestCountHash[ip].count += 1;
            } else if(now - ipRequestCountHash[ip].timeStamp > 1000){
                ipRequestCountHash[ip] = {
                    count: 1,
                    timeStamp: now
                }
            } else {
                ipRequestCountHash[ip].count += 1;
            }
        } else {
            ipRequestCountHash[ip] = {
                count: 1,
                timeStamp: now
            }
        };

        if(ipRequestCountHash[ip].count > custom_config.http.mostRequestTimeInOneSecound){
            console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}: reveive request from ip: ${ip}, overRate: ${ipRequestCountHash[ip].count}, limit: ${custom_config.http.mostRequestTimeInOneSecound}`);
            return false;
        } else {
            console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}: reveive request from ip: ${ip}, count: ${ipRequestCountHash[ip].count}`);
            return true;
        }
    }