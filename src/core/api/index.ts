import path from "path";
import fs from 'fs';
import Router from "koa-router";
import type Koa from 'koa';

const apiPathList: string[] = [];
const apiFilePath = path.resolve(__dirname, "../../api");
console.log(apiFilePath)
const router = new Router();
router.prefix("/api");

const prepareApiFile = async (filePath: string) => {
    
    let files = fs.readdirSync(filePath);
    
    for(let i = 0; i < files.length; i++){
        const singleFilePath = path.resolve(__dirname, path.join(filePath, files[i]));
        const stats = fs.statSync(singleFilePath);
        const isFile = stats.isFile();
        const isDir = stats.isDirectory();
        if(isFile && apiPathList.indexOf(singleFilePath) === -1){
            let apiObj = await import(singleFilePath);
            if(apiObj.default && Object.keys(apiObj.default)){
                Object.keys(apiObj.default).forEach((apiMethodName)=>{
                    let method = apiMethodName.split("/")[0];
                    let apiName = apiMethodName.split("/")[1];
                    // TODO 设置 headers
                    if(method == 'get'){
                        console.log(`start route get: /api/${apiName}`);
                        router.get(`/${apiName}`, async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>) => {
                            console.log(ctx.request.body);                            
                            try {
                                ctx.response.status = 200;
                                ctx.response.body = await apiObj.default[apiMethodName](ctx) || '';
                            } catch (error) {
                                ctx.response.status = 404;
                                ctx.response.body = JSON.stringify(error)
                            }
                        });
                    } else if(method = 'post'){
                        console.log(`start route post: /api/${apiName}`);
                        router.post(`/${apiName}`, async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>) => {
                            console.log(ctx.request.body);
                            try {
                                ctx.response.status = 200;
                                ctx.response.body = await apiObj.default[apiMethodName](ctx) || '';
                            } catch (error) {
                                ctx.response.status = 404;
                                ctx.response.body = JSON.stringify(error);
                            }
                        });
                    }
                })
            }
        } else if(isDir){
            await prepareApiFile(singleFilePath);
        };
    };
    return;
};

const initAPI = async () => {
    await prepareApiFile(apiFilePath);
    return router
}

export default initAPI
