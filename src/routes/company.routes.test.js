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
exports.__esModule = true;
var models_1 = require("../../models");
var app_1 = require("../app");
var supertest_1 = require("supertest");
var createToken_1 = require("../utils/createToken");
var fakeUser = {
    email: "authorized@test.com",
    _id: 1,
    role: "admin"
};
var authorizedToken = (0, createToken_1["default"])(fakeUser);
describe("test company routes", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1["default"].sequelize.sync({ force: true })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("company api can not be accessible for unauthenticated users", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).get("/api/companies")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(403);
                    expect(response.body).toMatchObject({
                        error: "A token is required for authentication"
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("company api cant not be accessible to unauthorized user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        email: "authorized@test.com",
                        _id: 1,
                        role: "anyrole"
                    };
                    token = (0, createToken_1["default"])(user);
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"])
                            .get("/api/companies")
                            .set("Accept", "application/json")
                            .set("x-access-token", token)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(403);
                    expect(response.body).toMatchObject({
                        error: "Not authorize to perform this operation"
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("successfully empty get companies data with authorized user.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"])
                        .get("/api/companies")
                        .set("Accept", "application/json")
                        .set("x-access-token", authorizedToken)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Compan can not be created with name", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"])
                        .post("/api/companies")
                        .set("Accept", "application/json")
                        .set("x-access-token", authorizedToken)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    expect(response.body).toMatchObject({
                        errors: [
                            {
                                msg: "Company name is required.",
                                param: "name",
                                location: "body"
                            },
                        ]
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("successfully get companies data with authorized user when there records", function () { return __awaiter(void 0, void 0, void 0, function () {
        var company, newCompany, employee, newEmployee, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    company = {
                        name: "fake name"
                    };
                    return [4 /*yield*/, models_1["default"].companies.create(company)];
                case 1:
                    newCompany = _a.sent();
                    employee = {
                        firstName: "fake first name",
                        lastName: "fake last name",
                        CompanyId: newCompany.id
                    };
                    return [4 /*yield*/, models_1["default"].employees.create(employee)];
                case 2:
                    newEmployee = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"])
                            .get("/api/companies")
                            .set("Accept", "application/json")
                            .set("x-access-token", authorizedToken)];
                case 3:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toHaveLength(1);
                    expect(response.body[0].id).toEqual(1);
                    expect(response.body[0].name).toEqual("fake name");
                    expect(response.body[0].Employees).toHaveLength(1);
                    expect(response.body[0].Employees[0].firstName).toEqual("fake first name");
                    expect(response.body[0].Employees[0].lastName).toEqual("fake last name");
                    return [2 /*return*/];
            }
        });
    }); });
});
