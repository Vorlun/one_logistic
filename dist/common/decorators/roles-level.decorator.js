"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleLevel = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = "roleLevel";
const RoleLevel = (level) => (0, common_1.SetMetadata)(exports.ROLES_KEY, level);
exports.RoleLevel = RoleLevel;
//# sourceMappingURL=roles-level.decorator.js.map