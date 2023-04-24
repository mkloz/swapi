import { ApiProperty } from '@nestjs/swagger';

export const ApiRelProp = (entity) =>
  ApiProperty({
    type: [entity],
    required: false,
    description: 'Resource array',
  });
