"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowdbService = void 0;
const common_1 = require("@nestjs/common");
const lowdb = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
let LowdbService = class LowdbService {
    constructor(collectionName) {
        this.initDatabase(collectionName);
        this.quantitySum = 0;
    }
    async initDatabase(collectionName) {
        const adapter = new FileAsync(`${collectionName}.json`);
        this.db = await lowdb(adapter);
        const listUsers = await this.db.get(collectionName).value();
        if (!listUsers) {
            await this.db.set(collectionName, []).write();
        }
    }
    async setData(collectionName, obj) {
        await this.db.set(collectionName, obj).write();
        return true;
    }
    async addOne(collectionName, obj) {
        const listData = await this.db.get(collectionName).value();
        listData.push(obj);
        await this.db.set(collectionName, listData).write();
        return obj;
    }
    async delByOption(collectionName, option) {
        const listData = await this.db.get(collectionName).value();
        let affectedNum = 0;
        const copyListData = [];
        listData.forEach(data => {
            if (data) {
                let isDataShouldKeep = false;
                for (const key in option) {
                    if (key && data[key] !== option[key]) {
                        isDataShouldKeep = true;
                    }
                }
                if (isDataShouldKeep) {
                    copyListData.push(data);
                }
                else {
                    affectedNum++;
                }
            }
        });
        await this.db.set(collectionName, copyListData).write();
        return { affectedNum: affectedNum };
    }
    async update(collectionName, selectOption, newValue) {
        let listData = await this.db.get(collectionName).value(), affectedNum = 0;
        listData = listData.map(data => {
            if (data) {
                for (const key in selectOption) {
                    if (key && data[key] === selectOption[key]) {
                        affectedNum++;
                        data = Object.assign(data, newValue);
                    }
                }
            }
            return data;
        });
        await this.db.set(collectionName, listData).write();
        return { affectedNum: affectedNum };
    }
    async getAll(collectionName) {
        const listData = await this.db.get(collectionName).value();
        return listData;
    }
    async getByOption(collectionName, option) {
        const listData = await this.db.get(collectionName).find(option).value();
        if (!listData)
            return [];
        return listData;
    }
    async getSpecifiedQuatity(collectionName, quantity) {
        const listDataArray = await this.db.get(collectionName).value();
        if (this.quantitySum + quantity > listDataArray.length) {
            this.quantitySum = 0;
        }
        const listData = listDataArray.slice(this.quantitySum, this.quantitySum + quantity);
        this.quantitySum += quantity;
        return listData;
    }
};
LowdbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], LowdbService);
exports.LowdbService = LowdbService;
//# sourceMappingURL=lowdb.service.js.map