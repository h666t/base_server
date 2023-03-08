import type Koa from "koa";
export default {
    "get/fn2": async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>,  next: Koa.Next) =>{
        console.log('fn2');
        return {msg: 'ok;i am fn2'}
    }
}