export interface ProxyResult {
  proxy: string;
  status: "OK" | "Error" | "Timeout";
  latency?: number;
}

export interface CheckRequest {
  proxies: string[];
  timeout?: number;
  concurrent?: number;
}
