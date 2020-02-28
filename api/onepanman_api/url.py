from django.conf.urls import url, include
from django.urls import path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import routers, views

router = routers.AppRouter()
router.register('article', views.api.article.ArticleViewSet, 'article')
router.register('articlefull', views.api.article.ArticleCommentViewSet, 'articlefull')
router.register('code', views.api.code.CodeViewSet, 'code')
router.register('comment', views.api.comment.CommentViewSet, 'comment')
router.register('friend', views.api.friend.FriendViewSet, 'friend')
router.register('game', views.api.game.GameViewSet, 'game')
router.register('groupInfo', views.api.GroupInfoViewSet, 'groupInfo')
router.register('group', views.api.GroupViewSet, 'group')
router.register('groupfullInfo', views.api.group.GroupFullInfoViewSet, 'groupfullInfo')
router.register('language', views.api.LanguageViewSet, 'language')
router.register('notice', views.api.NoticeViewSet, 'notice')
router.register('ruleInfo', views.api.RuleInfoViewSet, 'ruleInfo')
router.register('testcase', views.api.TestcaseViewSet, 'testcase')
router.register('user', views.api.UserViewSet, 'user')
router.register('userInfo', views.api.UserInfoViewSet, 'userInfo')
router.register('userfullInfo', views.api.user.UserFullInfoViewSet, 'userfullInfo')
router.register('userInformationInProblem', views.api.UserInformationInProblemViewSet, 'userInformationInProblem')
router.register('problem', views.api.problem.ProblemViewSet, 'problem')
router.register('userInfo', views.api.userInfo.UserInfoViewSet, 'userInfo')
router.register('problemRule', views.api.problem_ruleInfo.ProblemRuleInfoViewSet, 'problemRule')

api_info = openapi.Info(
    title='ONEPANMAN API 문서',
    default_version='v1',
    description='ONEPANMAN API 문서화',
    contact=openapi.Contact(email='tyms0503@kookmin.ac.kr'),
    license=openapi.License(name="MIT License"),
)
schema_view = get_schema_view(
    api_info,
    public=False,
    permission_classes=(permissions.DjangoModelPermissionsOrAnonReadOnly,),
)

urlpatterns = [
    url('', include(router.urls)),
    path('match/', views.api.Match.as_view(), name='match'),
    # JWT 로그인   (난 안써봤다!!!)
    url('token/authorize/?$', obtain_jwt_token),    # 토큰 획득
    url('token/verify/?$', verify_jwt_token),       # 토큰 확인
    url('token/refresh/', refresh_jwt_token),       # 토큰 갱신
    # 온라인 API 문서화
    url('docs/swagger(?P<format>.json|.yaml)$', schema_view.without_ui(cache_timeout=None), name='schema-json'),
    url('docs/n /?$', schema_view.with_ui('swagger', cache_timeout=None), name='schema-swagger-ui'),
    url('docs/?$', schema_view.with_ui('redoc', cache_timeout=None), name='schema-redoc'),
]
