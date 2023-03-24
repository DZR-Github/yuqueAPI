"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datetime = () => {
    let date = new Date(), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(), Hours = date.getHours(), Minutes = date.getMinutes(), Seconds = date.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    let s_createtime = year + "-" + month + "-" + day + " " + Hours + ":" + Minutes + ":" + Seconds;
    return s_createtime;
};
exports.default = datetime;
//# sourceMappingURL=datatime.js.map