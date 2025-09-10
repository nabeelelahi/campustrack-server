import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UserModule } from 'src/user/user.module';
import { ArticleModule } from 'src/article/article.module';
import { CommunityModule } from 'src/community/community.module';
import { DocGuideModule } from 'src/doc-guide/doc-guide.module';

@Module({
  imports: [UserModule, ArticleModule, CommunityModule, DocGuideModule],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
