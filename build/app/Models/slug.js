"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slug_1 = __importDefault(require("@slynova/slug"));
class Slug {
    static async make(modelInstance, fieldValue) {
        const slug = slug_1.default(fieldValue);
        const alreadyExists = await modelInstance
            .query()
            .select('*')
            .whereRaw(`?? REGEXP ?`, ['slug', `^${slug}(-[0-9]*)?$`])
            .orderBy('created_at', 'desc')
            .first();
        if (!alreadyExists) {
            return slug;
        }
        const lastNum = Number(alreadyExists['slug'].replace(`${slug}-`, ''));
        return !lastNum || Number.isNaN(lastNum) ? `${slug}-1` : `${slug}-${lastNum + 1}`;
    }
}
exports.default = Slug;
//# sourceMappingURL=slug.js.map