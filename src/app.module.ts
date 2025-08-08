import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { LoggerModule } from './common/logging/logger.module';

// Feature modules
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { CountriesModule } from './countries/countries.module';
import { DistrictsModule } from './districts/districts.module';
import { RegionsModule } from './regions/regions.module';
import { AddressModule } from './address/address.module';
import { CompaniesModule } from './companies/companies.module';
import { BuildingModule } from './building/building.module';
import { EmployeesModule } from './employees/employees.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { RoutesModule } from './routes/routes.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDev = config.get<string>('NODE_ENV') === 'development';
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: isDev,
          // dropSchema: true,
          logging: isDev,
        };
      },
    }),

    LoggerModule,
    MailModule,
    UsersModule,
    RolesModule,
    AuthModule,
    CountriesModule,
    DistrictsModule,
    RegionsModule,
    AddressModule,
    CompaniesModule,
    BuildingModule,
    EmployeesModule,
    VehiclesModule,
    RoutesModule,
    OrdersModule,
    PaymentsModule,
    ProductsModule
  ],
})
export class AppModule {}
