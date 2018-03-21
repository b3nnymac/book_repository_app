// Express Serve startic
// <https://github.com/borisyankov/>
// github.com/DefinitelyTyped/DefinitelyTyped
// This extracts the core definitions from express to prevent a circular dependency between express and serve-static
/// <reference path="../node/node.d.ts" />

declare namespace Express {

    export interface Request { }
    export interface Response { }
    export interface Application { }
}

declare module "express-serve-static-core" {
    import * as http from "http";

    interface IRoute {
        path: string;
        stack: any;
        all(...handler: RequestHandler[]): IRoute;
        get(...handler: RequestHandler[]): IRoute;
        post(...handler: RequestHandler[]): IRoute;
        put(...handler: RequestHandler[]): IRoute;
        delete(...handler: RequestHandler[]): IRoute;
        patch(...handler: RequestHandler[]): IRoute;
        options(...handler: RequestHandler[]): IRoute;
        head(...handler: RequestHandler[]): IRoute;
    }

    interface IRouterMatcher<T> {
        (name: string | RegExp, ...handlers: RequestHandler[]): T;
    }

    interface IRouter<T> extends RequestHandler {
        /**
            * Map the given param placeholder `name`(s) to the given callback(s).            *
            * @param name
            * @param fn
            */
        param(name: string, handler: RequestParamHandler): T;
        param(name: string, matcher: RegExp): T;
        param(name: string, mapper: (param: any) => any): T;
        // Alternatively, you can pass only a callback, in which case you have the opportunity to alter the app.param() API
        param(callback: (name: string, matcher: RegExp) => RequestParamHandler): T;

        /**
            * Special-cased "all" method, applying the given route `path`,
            * middleware, and callback to _every_ HTTP method.
            *
            * @param path
            * @param fn
            */
        all: IRouterMatcher<T>;
        get: IRouterMatcher<T>;
        post: IRouterMatcher<T>;
        put: IRouterMatcher<T>;
        delete: IRouterMatcher<T>;
        patch: IRouterMatcher<T>;
        options: IRouterMatcher<T>;
        head: IRouterMatcher<T>;

        route(path: string): IRoute;

        use(...handler: RequestHandler[]): T;
        use(handler: ErrorRequestHandler | RequestHandler): T;
        use(path: string, ...handler: RequestHandler[]): T;
        use(path: string, handler: ErrorRequestHandler | RequestHandler): T;
        use(path: string[], ...handler: RequestHandler[]): T;
        use(path: string[], handler: ErrorRequestHandler): T;
        use(path: RegExp, ...handler: RequestHandler[]): T;
        use(path: RegExp, handler: ErrorRequestHandler): T;
        use(path: string, router: Router): T;
    }


    export interface Router extends IRouter<Router> { }

    interface CookieOptions {
        maxAge?: number;
        signed?: boolean;
        expires?: Date;
        httpOnly?: boolean;
        path?: string;
        domain?: string;
        secure?: boolean;
    }

    interface Errback { (err: Error): void; }

    interface Request extends http.ServerRequest, Express.Request {

        /**
            * Return request header.
            *
            * The `Referrer` header field is special-cased,
            * both `Referrer` and `Referer` are interchangeable.
            * @param name
            */
        get(name: string): string;

        header(name: string): string;

        headers: { [key: string]: string; };

        /**
            * Check if the given types is acceptable, returning
            * the best match when true, otherwise undefined
            */
        accepts(type: string): string;

        accepts(type: string[]): string;

        /**
            * Returns the first accepted charset of the specified character sets,
            * based on the request’s Accept-Charset HTTP header field.
            * If none of the specified charsets is accepted, returns false.
           
            * @param charset
            */
        acceptsCharsets(charset?: string | string[]): string[];

        /**
            * Returns the first accepted encoding of the specified encodings,
            * based on the request’s Accept-Encoding HTTP header field.
            * If none of the specified encodings is accepted, returns false.

            * @param encoding
            */
        acceptsEncodings(encoding?: string | string[]): string[];

        /**
            * Returns the first accepted language of the specified languages,
            * based on the request’s Accept-Language HTTP header field.
            * If none of the specified languages is accepted, returns false
            * @param lang
            */
        acceptsLanguages(lang?: string | string[]): string[];

        /**
            * Parse Range header field,
            * capping to the given `size`.
            *
            * @param size
            */
        range(size: number): any[];

        /**
            * Return an array of Accepted media types
            * ordered from highest quality to lowest.
            */
        accepted: MediaType[];

        /**
            * Return the value of param `name` when present or `defaultValue`.
            *
            *  - Checks route placeholders, checks body params, checks query string params
            
            * @param name
            * @param defaultValue
            */
        param(name: string, defaultValue?: any): string;

        /**
            * Check if the incoming request contains the "Content-Type"
            * header field, and it contains the give mime `type`.
            *
            * @param type
            */
        is(type: string): boolean;

        /**
            * Return the protocol string "http" or "https"
            * when requested with TLS. 
            */
        protocol: string;

        secure: boolean;

        /**
            * Return the remote address, or when
            * "trust proxy" is `true` return
            * the upstream addr.
            */
        ip: string;

        /**
            * When "trust proxy" is `true`, parse
            * the "X-Forwarded-For" ip address list.
            */
        ips: string[];

        /**
            * Return subdomains as an array.
            *
            */
        subdomains: string[];

       
        path: string;

        /**
            * Parse the "Host" header field hostname.
            */
        hostname: string;

        
        host: string;

        /**
            * Check if the request is fresh, 
            * Last-Modified and/or the ETag
            * still match.
            */
        fresh: boolean;

        /**
            * Check if the request is stale,
            * Last-Modified and/ or the ETag for the
            * resource has changed.
            */
        stale: boolean;

        /**
            * Check if the request was an _XMLHttpRequest_.
            */
        xhr: boolean;

        //body: { username: string; password: string; remember: boolean; title: string; };
        body: any;

        //cookies: { string; remember: boolean; };
        cookies: any;

        method: string;

        params: any;

        user: any;

        authenticatedUser: any;

        /**
            * Clear cookie `name`.
            *
            * @param name
            * @param options
            */
        clearCookie(name: string, options?: any): Response;

        query: any;

        route: any;

        signedCookies: any;

        originalUrl: string;

        url: string;

        baseUrl: string;

        app: Application;
    }

    interface MediaType {
        value: string;
        quality: number;
        type: string;
        subtype: string;
    }

    interface Send {
        (status: number, body?: any): Response;
        (body: any): Response;
    }

    interface Response extends http.ServerResponse, Express.Response {
        /**
            * Set status `code`.
            *
            * @param code
            */
        status(code: number): Response;

        /**
            * Set the response HTTP status code to statusCode and send its string representation as the response body.
            *
            * @param code
            */
        sendStatus(code: number): Response;

        /**
            * Set Link header field with the given `links`.
            *
            * @param links
            */
        links(links: any): Response;

        /**
            * Send a response.
            *
            */
        send: Send;

        /**
            * Send JSON response.
            *
            */
        json: Send;

        /**
            * Send JSON response with JSONP callback support.
            *
            */
        jsonp: Send;

        /**
            * Transfer the file at the given path.
            *
            * Automatically sets the _Content-Type_ response header field.
            * The callback `fn(err)` is invoked when the transfer is complete
            * or when an error occurs. 
            *
            * @api public
            */
        sendFile(path: string): void;
        sendFile(path: string, options: any): void;
        sendFile(path: string, fn: Errback): void;
        sendFile(path: string, options: any, fn: Errback): void;

        /**
            *  Use sendFile instead.
            */
        sendfile(path: string): void;
        /**
            *  Use sendFile instead.
            */
        sendfile(path: string, options: any): void;
        /**
            *  Use sendFile instead.
            */
        sendfile(path: string, fn: Errback): void;
        /**
            *  Use sendFile instead.
            */
        sendfile(path: string, options: any, fn: Errback): void;

        /**
            * Transfer the file at the given `path` as an attachment.
            *
            */
        download(path: string): void;
        download(path: string, filename: string): void;
        download(path: string, fn: Errback): void;
        download(path: string, filename: string, fn: Errback): void;

        /**
            * Set _Content-Type_ response header with `type` through `mime.lookup()`
            * when it does not contain "/", or set the Content-Type to `type` otherwise.
            * @param type
            */
        contentType(type: string): Response;

        /**
            * Set _Content-Type_ response header with `type` through `mime.lookup()`
            * when it does not contain "/", or set the Content-Type to `type` otherwise.
            * @param type
            */
        type(type: string): Response;

        /**
            * Respond to the Acceptable formats using an `obj`
            * of mime-type callbacks.
            * @param obj
            */
        format(obj: any): Response;

        /**
            * Set _Content-Disposition_ header to _attachment_ with optional `filename`.
            *
            * @param filename
            */
        attachment(filename?: string): Response;

        /**
            * Set header `field` to `val`, or pass
            * an object of header fields.
            */
        set(field: any): Response;
        set(field: string, value?: string): Response;

        header(field: any): Response;
        header(field: string, value?: string): Response;

        // Property indicating if HTTP headers has been sent for the response.
        headersSent: boolean;

        /**
            * Get value for header `field`.
            *
            * @param field
            */
        get(field: string): string;

        /**
            * Clear cookie `name`.
            *
            * @param name
            * @param options
            */
        clearCookie(name: string, options?: any): Response;

        /**
            * Set cookie `name` to `val`, with the given `options`.
            *
            */
        cookie(name: string, val: string, options: CookieOptions): Response;
        cookie(name: string, val: any, options: CookieOptions): Response;
        cookie(name: string, val: any): Response;

        /**
            * @param url
            */
        location(url: string): Response;

        /**
            * Redirect to the given `url` with optional response `status`
            * defaulting to 302.
            *
            */
        redirect(url: string): void;
        redirect(status: number, url: string): void;
        redirect(url: string, status: number): void;

        /**
            * Render `view` with the given `options` and optional callback `fn`.
            * When a callback function is given a response will _not_ be made
            * automatically, otherwise a response of _200_ and _text/html_ is given.
            *
            */
        render(view: string, options?: Object, callback?: (err: Error, html: string) => void): void;
        render(view: string, callback?: (err: Error, html: string) => void): void;

        locals: any;

        charset: string;
    }

    interface NextFunction {
        (err?: any): void;
    }

    interface ErrorRequestHandler {
        (err: any, req: Request, res: Response, next: NextFunction): any;
    }


    interface Handler extends RequestHandler { }

    interface RequestParamHandler {
        (req: Request, res: Response, next: NextFunction, param: any): any;
    }

    interface Application extends IRouter<Application>, Express.Application {
        /**
            * Initialize the server.
            *
            *   - setup default configuration
            *   - setup default middleware
            *   - setup route reflection methods
            */
        init(): void;

        /**
            * Initialize application configuration.
            */
        defaultConfiguration(): void;

        /**
            * Register the given template engine callback `fn`
            * as `ext`.
            */
        engine(ext: string, fn: Function): Application;

        /**
            *
            * @param setting
            * @param val
            */
        set(setting: string, val: any): Application;
        get: {
            (name: string): any; // Getter
            (name: string | RegExp, ...handlers: RequestHandler[]): Application;
        };

        /**
            * Return the app's absolute pathname
            * based on the parent(s) that have
            * mounted it.
            */
        path(): string;

        /**
            * Check if `setting` is enabled (truthy).
            *
            
            */
        enabled(setting: string): boolean;

        /**
        
            * @param setting
            */
        disabled(setting: string): boolean;

        /**
            * Enable `setting`.
            *
            * @param setting
            */
        enable(setting: string): Application;

        /**
            * Disable `setting`.
            *
            * @param setting
            */
        disable(setting: string): Application;

        /**
            * Configure callback for zero or more envs,
            * when no `env` is specified that callback will
            * be invoked for all environments. Any combination
            * can be used multiple times, in any order desired.
            *
            * @param env
            * @param fn
            */
        configure(fn: Function): Application;
        configure(env0: string, fn: Function): Application;
        configure(env0: string, env1: string, fn: Function): Application;
        configure(env0: string, env1: string, env2: string, fn: Function): Application;
        configure(env0: string, env1: string, env2: string, env3: string, fn: Function): Application;
        configure(env0: string, env1: string, env2: string, env3: string, env4: string, fn: Function): Application;

        /**
            * Render the given view `name` name with `options`
            * and a callback accepting an error and the
            * rendered template string.
            *
            * @param name
            * @param options or fn
            * @param fn
            */
        render(name: string, options?: Object, callback?: (err: Error, html: string) => void): void;
        render(name: string, callback: (err: Error, html: string) => void): void;


        /**
            * Listen for connections.
            *
            */
        listen(port: number, hostname: string, backlog: number, callback?: Function): http.Server;
        listen(port: number, hostname: string, callback?: Function): http.Server;
        listen(port: number, callback?: Function): http.Server;
        listen(path: string, callback?: Function): http.Server;
        listen(handle: any, listeningListener?: Function): http.Server;

        route(path: string): IRoute;

        router: string;

        settings: any;

        resource: any;

        map: any;

        locals: any;

        /**
            * The app.routes object houses all of the routes defined mapped by the
            * associated HTTP verb. This object may be used for introspection
            * capabilities, for example Express uses this internally not only for
            * routing but to provide default OPTIONS behaviour unless app.options()
            * is used. Your application or framework may also remove routes by
            * simply by removing them from this object.
            */
        routes: any;
    }

    interface Express extends Application {
        /**
            * Framework version.
            */
        version: string;

        /**
            * Expose mime.
            */
        mime: string;

        (): Application;

        /**
        * Create an express application.
        */
        createApplication(): Application;

        createServer(): Application;

        application: any;

        request: Request;

        response: Response;
    }

    interface RequestHandler {
        (req: Request, res: Response, next: NextFunction): any;
    }
}
