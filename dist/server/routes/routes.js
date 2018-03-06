"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = require("koa-router");
var router = new koa_router_1.default();
var request_1 = require("request");
function getAuthServiceUrl() {
    return new Promise(function (resolve, reject) {
        resolve('https://irepela-todo-auth.herokuapp.com');
        /*    consul().agent.service.list((err, result) => {
              if (err) {
                reject(err);
              } else {
                let authService = '';
                if (result['authService']) {
                  authService = 'http://' + result['authService']['Address'] + ':' + result['authService']['Port'];
                }
                resolve(authService);
              }
            });*/
    });
}
router.post('/register', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var authServiceUrl, registerRoute, user, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAuthServiceUrl()];
            case 1:
                authServiceUrl = _a.sent();
                registerRoute = authServiceUrl + '/register';
                user = ctx.request.body;
                return [4 /*yield*/, request_1.default({
                        url: registerRoute,
                        method: 'POST',
                        json: true,
                        body: user
                    })];
            case 2:
                response = _a.sent();
                ctx.body = response;
                return [2 /*return*/];
        }
    });
}); });
router.post('/authenticate', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var authServiceUrl, loginRoute, user, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Trying to authenticate');
                return [4 /*yield*/, getAuthServiceUrl()];
            case 1:
                authServiceUrl = _a.sent();
                loginRoute = authServiceUrl + '/authenticate';
                user = ctx.request.body;
                console.log('Send POST to auth');
                return [4 /*yield*/, request_1.default({
                        url: loginRoute,
                        method: 'POST',
                        json: true,
                        body: user
                    })];
            case 2:
                response = _a.sent();
                ctx.body = response;
                return [2 /*return*/];
        }
    });
}); });
router.post('/addTodo', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var authServiceUrl, addTodoRoute, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAuthServiceUrl()];
            case 1:
                authServiceUrl = _a.sent();
                addTodoRoute = authServiceUrl + '/addTodo';
                return [4 /*yield*/, request_1.default({
                        url: addTodoRoute,
                        method: 'POST',
                        json: true,
                        body: ctx.request.body
                    })];
            case 2:
                response = _a.sent();
                ctx.body = response;
                return [2 /*return*/];
        }
    });
}); });
router.post('/deleteTodo', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var authServiceUrl, deleteTodoRoute, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAuthServiceUrl()];
            case 1:
                authServiceUrl = _a.sent();
                deleteTodoRoute = authServiceUrl + '/deleteTodo';
                return [4 /*yield*/, request_1.default({
                        url: deleteTodoRoute,
                        method: 'POST',
                        json: true,
                        body: ctx.request.body
                    })];
            case 2:
                response = _a.sent();
                ctx.body = response;
                return [2 /*return*/];
        }
    });
}); });
router.post('/toggleTodo', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var authServiceUrl, toggleTodoRoute, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAuthServiceUrl()];
            case 1:
                authServiceUrl = _a.sent();
                toggleTodoRoute = authServiceUrl + '/toggleTodo';
                return [4 /*yield*/, request_1.default({
                        url: toggleTodoRoute,
                        method: 'POST',
                        json: true,
                        body: ctx.request.body
                    })];
            case 2:
                response = _a.sent();
                ctx.body = response;
                return [2 /*return*/];
        }
    });
}); });
router.get('/getTodos/:username', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var authServiceUrl, getTodosRoute, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAuthServiceUrl()];
            case 1:
                authServiceUrl = _a.sent();
                getTodosRoute = authServiceUrl + '/getTodos/' + ctx.params.username;
                return [4 /*yield*/, request_1.default({
                        url: getTodosRoute,
                        method: 'GET',
                        json: true
                    })];
            case 2:
                response = _a.sent();
                ctx.body = response;
                return [2 /*return*/];
        }
    });
}); });
function routes() {
    return router.routes();
}
exports.routes = routes;
//# sourceMappingURL=routes.js.map