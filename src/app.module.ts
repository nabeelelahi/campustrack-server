import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FileService } from './file/file.service';
import { UserController } from './user/user.controller';
import { AuthMiddleWare } from './auth/auth.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response/response.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { dbUrl } from 'database/config';
import { jwtConstants } from 'config/constants';
import { ConfigModule } from '@nestjs/config';
import { FileController } from './file/file.controller';
import { UserContext } from './user/user.context';
import { ClassModule } from './class/class.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';
import { MenuItemController } from './menu-item/menu-item.controller';
import { ClassController } from './class/class.controller';
import { AttendanceModule } from './attendance/attendance.module';
import { AttendanceController } from './attendance/attendance.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10d' },
    }),
    MongooseModule.forRoot(dbUrl),
    UserModule,
    ClassModule,
    MenuItemModule,
    OrderModule,
    AttendanceModule,
  ],
  controllers: [AppController, FileController],
  providers: [
    AppService,
    FileService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    UserContext,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .exclude(
        { path: 'api/user', method: RequestMethod.POST },
        { path: 'api/user/verify-code', method: RequestMethod.POST },
        { path: 'api/user/resend-code', method: RequestMethod.POST },
        { path: 'api/user/forgot-password', method: RequestMethod.POST },
        { path: 'api/user/reset-password', method: RequestMethod.POST },
        { path: 'api/user/login', method: RequestMethod.POST },
        { path: 'api/category', method: RequestMethod.GET },
        { path: 'api/category/:id', method: RequestMethod.GET },
        { path: 'api/sub-category', method: RequestMethod.GET },
        { path: 'api/sub-category/:id', method: RequestMethod.GET },
        { path: 'api/file/upload', method: RequestMethod.POST },
      )
      .forRoutes(
        UserController,
        OrderController,
        FileController,
        ClassController,
        MenuItemController,
        AttendanceController
      );
  }
}
