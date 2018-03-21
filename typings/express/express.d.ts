// Express 
// github.com/borisyankov/>
// github.com/DefinitelyTyped/DefinitelyTyped
/// <reference path="../serve-static/serve-static.d.ts" />
/// <reference path="../express-serve-static-core/express-serve-static-core.d.ts" />

declare module "express" {
    import * as serveStatic from "serve-static";
    import * as core from "express-serve-static-core";

   
    function e(): core.Express;

    namespace e {

        
        var static: typeof serveStatic;

        export function Router(options?: any): core.Router;

        interface Application extends core.Application { }
        interface CookieOptions extends core.CookieOptions { }
        interface Errback extends core.Errback { }
        interface ErrorRequestHandler extends core.ErrorRequestHandler { }
        interface Express extends core.Express { }
        interface Handler extends core.Handler { }
        interface IRoute extends core.IRoute { }
        interface IRouter<T> extends core.IRouter<T> { }
        interface IRouterMatcher<T> extends core.IRouterMatcher<T> { }
        interface MediaType extends core.MediaType { }
        interface NextFunction extends core.NextFunction { }
        interface Request extends core.Request { }
        interface RequestHandler extends core.RequestHandler { }
        interface RequestParamHandler extends core.RequestParamHandler { }
        export interface Response extends core.Response { }
        interface Router extends core.Router { }
        interface Send extends core.Send { }
    }

    export = e;
}
