import path from "path";
import fs from 'fs';
import Router from "koa-router";

const apiPathList: string[] = [];
const apiFilePath = path.resolve(__dirname,'/src/api');
const router = new Router();
router.prefix("/api");

const prepareApiFile = async (filePath: string) => {
    console.log(filePath);
    
    let files = fs.readdirSync(filePath);
    console.log(files);
    
    for(let i = 0; i < files.length; i++){
        const singleFilePath = path.resolve(__dirname, path.join(filePath, files[i]));
        const stats = fs.statSync(singleFilePath);
        const isFile = stats.isFile();
        const isDir = stats.isDirectory();
        if(isFile && apiPathList.indexOf(singleFilePath) === -1){
            let apiObj = await import(singleFilePath);
            if(apiObj.default && Object.keys(apiObj.default)){
                console.log(apiObj);
                
                Object.keys(apiObj.default).forEach((apiMethodName)=>{
                    let method = apiMethodName.split("/")[0];
                    let apiName = apiMethodName.split("/")[1];
                    if(method == 'get'){
                        console.log(`start route get: /api/${apiName}`);
                        router.get(`/${apiName}`, async (ctx) => {
                            await apiObj.default[apiMethodName](ctx);
                        });
                    } else if(method = 'post'){
                        console.log(`start route post: /api/${apiName}`);
                        router.post(`/${apiName}`, async (ctx) => {
                            await apiObj.default[apiMethodName](ctx);
                        });
                    }
                })
            }
        } else if(isDir){
            prepareApiFile(singleFilePath);
        };
    };
    return;
};

const initAPI = async () => {
    await prepareApiFile(apiFilePath);
    return router
}

export default initAPI