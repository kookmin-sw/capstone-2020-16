import django_filters
from rest_framework import viewsets

from onepanman_api.models import Code
from onepanman_api.serializers.code import CodeSerializer
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView


from onepanman_api.permissions import CodePermission

from onepanman_api.models import UserInformationInProblem
from onepanman_api.util.create_uiip import create_instance

from onepanman_api.pagination import CodePagination


class CodeViewSet(viewsets.ModelViewSet):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('author', 'problem', 'available_game')

    permission_classes = [CodePermission]
    pagination_class = CodePagination

    def create(self, request, *args, **kwargs):
        data = super().create(request, *args, **kwargs)
        data = data.data

        # 여기서 celery 코드 추가!
        # tasks.test_code.delay()

        return Response(data)

    def update(self, request, *args, **kwargs):
        data = super().update(request, *args, **kwargs)
        data = data.data

        available = data["available_game"]

        # 게임 가능한 코드이면
        if available:
            user = data["author"]
            problem = data["problem"]

            queryset = UserInformationInProblem.objects.all().filter(user=user, problem=problem)

            # userInformationInProblem 객체가 존재하는지 확인하고 생성한다.
            if len(queryset) < 1:
                create_instance(user, problem, data["id"])

        return Response(data)



class MyCodeView(APIView):

    permission_classes = [CodePermission]
    pagination_class = CodePagination

    def get(self, request, version):

        problem = request.query_params.get('problem')

        if problem is None :
            queryset = Code.objects.all().filter(author=request.user.pk)
        else:
            queryset = Code.objects.all().filter(author=request.user.pk, problem=problem)
        serializer = CodeSerializer(queryset, many=True)

        return Response(serializer.data)
