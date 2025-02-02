import { ProxyResult } from './types';
import { HttpsProxyAgent } from 'https-proxy-agent';
import axios from 'axios';

const DEFAULT_TIMEOUT = 5000;
const DEFAULT_CONCURRENT = 5;

export async function checkProxies(
    proxies: string[],
    options: { timeout?: number; concurrent?: number } = {},
    onProgress?: (result: ProxyResult) => void
  ): Promise<ProxyResult[]> {
    const { timeout = DEFAULT_TIMEOUT, concurrent = DEFAULT_CONCURRENT } = options;
    const results: ProxyResult[] = [];
    
    for (let i = 0; i < proxies.length; i += concurrent) {
      const batch = proxies.slice(i, i + concurrent);
      const promises = batch.map(proxy => 
        checkSingleProxy(proxy, timeout).then(result => {
          onProgress?.(result);
          return result;
        })
      );
      const batchResults = await Promise.all(promises);
      results.push(...batchResults);
    }
    
    return results;
  }

async function checkSingleProxy(proxy: string, timeout: number): Promise<ProxyResult> {
  const result: ProxyResult = { proxy, status: 'Timeout' };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const start = Date.now();
    const proxyUrl = proxy.match(/\b(socks|http)\b/g) ? proxy : `http://${proxy}`;
    const proxyAgent = new HttpsProxyAgent(proxyUrl);
    const response = await axios.get('https://hostslick.com', {
      signal: controller.signal,
      httpsAgent: proxyAgent,
    });
    
    clearTimeout(timeoutId);
    
    if (response.data) {
      result.status = 'OK';
      result.latency = Date.now() - start;
    } else {
      result.status = 'Error';
    }
  } catch (error) {
    result.status = error instanceof AbortSignal ? 'Timeout' : 'Error';
  }

  return result;
}