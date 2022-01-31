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
var _this = this;
var db = require('../../models');
var app = require('../app');
var supertest = require("supertest");
var createToken = require('../utils/createToken');
describe('test dashboard - welcom', function () {
    beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.sequelize.sync({ force: true })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('welcom api can not be accessible for unauthenticated users', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app).get("/api/welcome")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(403);
                    expect(response.body).toMatchObject({
                        "error": "A token is required for authentication"
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('Welcome api is not available for expire or invalid token', function () { return __awaiter(_this, void 0, void 0, function () {
        var faketoke, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    faketoke = "fake token";
                    return [4 /*yield*/, supertest(app)
                            .get("/api/welcome")
                            .set('Accept', 'application/json')
                            .set('x-access-token', faketoke)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    expect(response.body).toMatchObject({ "error": "Invalid Token" });
                    return [2 /*return*/];
            }
        });
    }); });
    it('successfully access welcome api with authenticated user.', function () { return __awaiter(_this, void 0, void 0, function () {
        var user, token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        email: "authorized@test.com",
                        _id: 1,
                        role: "anyrole"
                    };
                    token = createToken(user);
                    return [4 /*yield*/, supertest(app)
                            .get("/api/welcome")
                            .set('Accept', 'application/json')
                            .set('x-access-token', token)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body.message).toBe("Welcome");
                    return [2 /*return*/];
            }
        });
    }); });
});
