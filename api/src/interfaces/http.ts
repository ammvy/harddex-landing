export interface HttpRequest<TBody = any, TParams = any, TQuery = any> {
  body: TBody;
  params: TParams;
  query: TQuery;
  headers: Record<string, string | string[] | undefined>;
  file?: {
    buffer: Buffer;
    mimetype: string;
    filename: string;
  };
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
}

export type ControllerMethod = (req: HttpRequest) => Promise<HttpResponse>;
