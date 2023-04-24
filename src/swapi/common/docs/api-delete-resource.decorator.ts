import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { IdDto } from 'src/common/dto/id.dto';

export const ApiDeleteResource = () =>
  applyDecorators(
    ApiResponseData(IdDto),
    ApiOperation({ summary: 'Delete resource by id' }),
    ApiOkResponse(),
  );
