interface IResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}