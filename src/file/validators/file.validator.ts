import { FileValidator } from '@nestjs/common';

interface ValidationOptions {
  maxSize: number;
  mimetypes: string[];
}

export class FilesValidator extends FileValidator {
  constructor(readonly validationOptions: ValidationOptions) {
    super(validationOptions);
  }

  public isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    if (!this.validationOptions) return true;

    const isValiableSize = file.size <= this.validationOptions.maxSize;
    const isValiableType = this.validationOptions.mimetypes.includes(
      file.mimetype,
    );
    return isValiableSize && isValiableType;
  }

  public buildErrorMessage(file: any): string {
    return 'Invalid file';
  }
}
