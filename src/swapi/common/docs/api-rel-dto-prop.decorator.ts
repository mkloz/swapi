import { ApiProperty } from '@nestjs/swagger';

export const ApiRelDtoProp = () =>
  ApiProperty({
    type: [Number],
    required: false,
    example: [1, 2, 3],
    description: 'Resource id array',
  });
