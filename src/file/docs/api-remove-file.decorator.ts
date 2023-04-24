import { applyDecorators } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { IdDto } from 'src/common/dto/id.dto';

export const ApiRemoveFile = () =>
  applyDecorators(
    ApiResponseData(IdDto),
    ApiOperation({ summary: 'Delete uploaded file' }),
  );
