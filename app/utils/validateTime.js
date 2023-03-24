"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateTime(datetime) {
    const REGEX = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/;
    if (!REGEX.test(datetime)) {
        return false;
    }
    return true;
}
exports.default = validateTime;
//# sourceMappingURL=validateTime.js.map