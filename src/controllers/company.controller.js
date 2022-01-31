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
exports.deleteCompany = exports.update = exports.findOne = exports.findAll = exports.create = void 0;
// Controller for Companies API
var express_validator_1 = require("express-validator");
var models_1 = require("../../models");
var Companies = models_1["default"].companies;
var Employees = models_1["default"].employees;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, company, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                company = {
                    name: req.body.name,
                    email: req.body.description,
                    phone: req.body.phone,
                    website: req.body.website
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Companies.create(company)];
            case 2:
                data = _a.sent();
                res.send(data);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).send({
                    message: err_1.message || "Error occurred"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var findAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Companies.findAll({ include: Employees })];
            case 1:
                data = _a.sent();
                res.send(data);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log("i am showing errors");
                console.log(err_2);
                res.status(500).send({
                    message: err_2.message || "Error occurred"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findAll = findAll;
var findOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Companies.findByPk(id, { include: Employees })];
            case 2:
                data = _a.sent();
                if (!data) {
                    res.send({
                        message: "No data found for give company id " + id
                    });
                }
                else {
                    res.send(data);
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(500).send({
                    message: err_3.message || "Error occurred"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.findOne = findOne;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, num, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Companies.update(req.body, {
                        where: { id: id }
                    })];
            case 2:
                num = _a.sent();
                if (num == 1) {
                    res.send({
                        message: "Company was updated successfully."
                    });
                }
                else {
                    res.send({
                        message: "Cannot update company with id=".concat(id, ".")
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(500).send({
                    message: "Error updating company with id=" + id
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var deleteCompany = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, transaction, num, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, models_1["default"].sequelize.transaction()];
            case 1:
                transaction = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, , 8]);
                return [4 /*yield*/, Employees.destroy({ where: { CompanyId: id } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, Companies.destroy({
                        where: { id: id }
                    })];
            case 4:
                num = _a.sent();
                if (num <= 0) {
                    throw "Can not delete company with id = " + id;
                }
                return [4 /*yield*/, transaction.commit()];
            case 5:
                _a.sent();
                res.send({ message: "Company with id = ".concat(id, " was deleted successfully!") });
                return [3 /*break*/, 8];
            case 6:
                err_5 = _a.sent();
                return [4 /*yield*/, transaction.rollback()];
            case 7:
                _a.sent();
                res.status(500).send({
                    message: "Could not delete company with id=" + id
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.deleteCompany = deleteCompany;
