"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const logger_module_1 = require("./common/logging/logger.module");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const auth_module_1 = require("./auth/auth.module");
const mail_module_1 = require("./mail/mail.module");
const countries_module_1 = require("./countries/countries.module");
const districts_module_1 = require("./districts/districts.module");
const regions_module_1 = require("./regions/regions.module");
const address_module_1 = require("./address/address.module");
const companies_module_1 = require("./companies/companies.module");
const building_module_1 = require("./building/building.module");
const employees_module_1 = require("./employees/employees.module");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const routes_module_1 = require("./routes/routes.module");
const orders_module_1 = require("./orders/orders.module");
const payments_module_1 = require("./payments/payments.module");
const products_module_1 = require("./products/products.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const isDev = config.get('NODE_ENV') === 'development';
                    return {
                        type: 'postgres',
                        host: config.get('DB_HOST'),
                        port: config.get('DB_PORT'),
                        username: config.get('DB_USERNAME'),
                        password: config.get('DB_PASSWORD'),
                        database: config.get('DB_DATABASE'),
                        autoLoadEntities: true,
                        synchronize: isDev,
                        logging: isDev,
                    };
                },
            }),
            logger_module_1.LoggerModule,
            mail_module_1.MailModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            auth_module_1.AuthModule,
            countries_module_1.CountriesModule,
            districts_module_1.DistrictsModule,
            regions_module_1.RegionsModule,
            address_module_1.AddressModule,
            companies_module_1.CompaniesModule,
            building_module_1.BuildingModule,
            employees_module_1.EmployeesModule,
            vehicles_module_1.VehiclesModule,
            routes_module_1.RoutesModule,
            orders_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            products_module_1.ProductsModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map