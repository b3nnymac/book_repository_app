// cookie-parser
// <https://github.com/santialbo/>
// //github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../express/express.d.ts" />

declare module "cookie-parser" {
    import express = require('express');
    function e(secret?: string, options?: any): express.RequestHandler;
    namespace e{}
    export = e;
}