"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../../library/knex_content/index"));
var index_2 = __importDefault(require("../../library/encrypt/index"));
var async_lock_1 = __importDefault(require("async-lock"));
var knex_sql = index_1.default.getKnex();
exports.default = {
    "post/signup": function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
        var lock, _a, username, password;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lock = new async_lock_1.default();
                    _a = ctx.request.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, lock.acquire("user_sign_up_" + username, function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var user_list;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, knex_sql("users").where("id", username)];
                                        case 1:
                                            user_list = _a.sent();
                                            if (!(user_list && user_list.length)) return [3 /*break*/, 2];
                                            throw new Error("用户名已存在");
                                        case 2: return [4 /*yield*/, knex_sql("users").insert({
                                                name: username,
                                                password: password
                                            })];
                                        case 3: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            });
                        }, {
                            timeout: 5000
                        })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    }); },
    "post/signin": function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, user_list, is_can_signin, password_in_data_base;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = ctx.request.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, knex_sql("users").where({
                            "name": username,
                        })];
                case 1:
                    user_list = _b.sent();
                    is_can_signin = false;
                    if (!user_list.length) {
                        is_can_signin = false;
                    }
                    else {
                        password_in_data_base = index_2.default.decrypt(user_list[0].password);
                        password = index_2.default.decrypt(password);
                        if (password_in_data_base === password) {
                            is_can_signin = true;
                        }
                        else {
                            is_can_signin = false;
                        }
                    }
                    ;
                    if (is_can_signin) {
                        return [2 /*return*/, user_list[0]];
                    }
                    else {
                        throw new Error("请检查用户名或密码");
                    }
                    ;
                    return [2 /*return*/];
            }
        });
    }); }
};
