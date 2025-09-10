import { Injectable } from '@nestjs/common';
import { ArticleService } from 'src/article/article.service';
import { CommunityService } from 'src/community/community.service';
import { DocGuideService } from 'src/doc-guide/doc-guide.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DashboardService {
  constructor(
    protected _userService: UserService,
    protected _docGuideService: DocGuideService,
    protected _articleService: ArticleService,
    protected _communityService: CommunityService,
  ) {}

  async dashboard() {
    return {
      users: await this._userService._model.countDocuments({
        deleted_at: null,
      }),
      articles: await this._articleService._model.countDocuments({
        deleted_at: null,
      }),
      communities: await this._communityService._model.countDocuments({
        deleted_at: null,
      }),
      documents: await this._docGuideService._model.countDocuments({
        deleted_at: null,
      }),
    };
  }
}
