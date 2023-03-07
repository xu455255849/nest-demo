export interface IFIle {
  fieldname: string;
  originalname: string; // 文件名称
  encoding: string; //
  mimetype: string;
  buffer: Buffer;
  size: number; // byte
}
