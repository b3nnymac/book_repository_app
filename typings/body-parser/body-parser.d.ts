// body-parser
// <https://github.com/santialbo/>
// <https://vilic.info>
// <https://github.com/dreampulse/>
// //github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../express/express.d.ts" />

declare module "body-parser" {
    import * as express from "express";
    function bodyParser(options?: {
        inflate?: boolean;
        limit?: any;
        verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
        strict?: boolean;
        receiver?: (key: string, value: any) => any;
        extended?: boolean;
    }): express.RequestHandler;

    namespace bodyParser {
        export function json(options?: {
            inflate?: boolean;
            limit?: any;
            type?: any;
            verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
            strict?: boolean;
            receiver?: (key: string, value: any) => any;
        }): express.RequestHandler;

        export function raw(options?: {
            inflate?: boolean;
            limit?: any;
            type?: any;
            verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
        }): express.RequestHandler;

        export function text(options?: {
            inflate?: boolean;
            limit?: any;
            type?: any;
            verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
            
            defaultCharset?: string;
        }): express.RequestHandler;

        export function urlencoded(options: {
            inflate?: boolean;
            limit?: any;
            type?: any;
            verify?: (req: express.Request, res: express.Response, buf: Buffer, encoding: string) => void;
            extended: boolean;
        }): express.RequestHandler;
    }

    export = bodyParser;
}
