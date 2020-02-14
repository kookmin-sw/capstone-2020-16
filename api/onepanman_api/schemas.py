import coreapi
import coreschema
from rest_framework.schemas import AutoSchema


class VersionedAutoSchema(AutoSchema):
    def __init__(self, manual_fields=[]):
        manual_fields.append(
            coreapi.Field(
                "version",
                required=True,
                location="path",
                schema=coreschema.String(description="버전 [`v1`]"),
            ),
        )
        super(VersionedAutoSchema, self).__init__(manual_fields)
