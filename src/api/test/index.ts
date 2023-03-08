import type Koa from "koa";
export default {
    "post/fn": async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next) =>{
        console.log('fn');
        return {
            msg: 'ok; fn'
        }
    }
}