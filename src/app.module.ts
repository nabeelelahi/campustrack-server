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
import { DocGuideModule } from './doc-guide/doc-guide.module';
import { CommunityModule } from './community/community.module';
import { ArticleModule } from './article/article.module';
import { PassportModule } from './passport/passport.module';
import { QuestionAnswerModule } from './question-answer/question-answer.module';
import { ArticleController } from './article/article.controller';
import { CommunityController } from './community/community.controller';
import { DocGuideController } from './doc-guide/doc-guide.controller';
import { QuestionAnswerController } from './question-answer/question-answer.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardModule } from './dashboard/dashboard.module';
import { ServiceModule } from './service/service.module';
import { PassportController } from './passport/passport.controller';
import { PassportMarkerModule } from './passport-marker/passport-marker.module';
import { PassportMarkerController } from './passport-marker/passport-marker.controller';
import { NotificationModule } from './notification/notification.module';
import { NotificationController } from './notification/notification.controller';
import { ClassModule } from './class/class.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';

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
    DocGuideModule,
    CommunityModule,
    ArticleModule,
    PassportModule,
    QuestionAnswerModule,
    DashboardModule,
    ServiceModule,
    PassportMarkerModule,
    NotificationModule,
    ClassModule,
    MenuItemModule,
    OrderModule,
  ],
  controllers: [AppController, FileController, DashboardController],
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
        ArticleController,
        CommunityController,
        DocGuideController,
        QuestionAnswerController,
        PassportController,
        PassportMarkerController,
        NotificationController
      );
  }
}
