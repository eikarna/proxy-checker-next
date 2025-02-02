'use client';
import { useState, useCallback } from 'react';
import { ProxyResult } from '@/lib/types';
import { SunIcon, MoonIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

export default function ProxyChecker() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<ProxyResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [timeout, setTimeout] = useState(5000);
  const [concurrent, setConcurrent] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  }, [isDarkMode]);

  const exportResults = (format: 'csv' | 'txt') => {
    if (results.length === 0) return;
  
    // Filter only working proxies and remove duplicates
    const workingProxies = results
      .filter(result => result.status === 'OK')
      .map(result => result.proxy)
      .filter((proxy, index, self) => self.indexOf(proxy) === index);
  
    if (workingProxies.length === 0) {
      alert('No working proxies to export');
      return;
    }
  
    // Create file content based on format
    let content = '';
    if (format === 'csv') {
      // CSV with full details
      const headers = ['Proxy', 'Status', 'Latency(ms)'];
      const rows = results
        .filter(result => result.status === 'OK')
        .map(result => [result.proxy, result.status, result.latency || '–']);
  
      content += headers.join(',') + '\r\n';
      rows.forEach(row => {
        content += row.join(',') + '\r\n';
      });
    } else {
      // TXT with only IP:Port
      content = workingProxies.join('\r\n');
    }
  
    // Create file blob
    const blob = new Blob([content], {
      type: format === 'csv' ? 'text/csv' : 'text/plain'
    });
  
    // Trigger download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proxy-results.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const checkProxies = async () => {
    setIsChecking(true);
    setResults([]);
    try {
      const response = await fetch('/api/checkProxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proxies: input.split('\n').filter(p => p.trim()),
          timeout,
          concurrent
        }),
      });
  
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');
  
      const decoder = new TextDecoder();
      let buffer = '';
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';
  
        for (const event of events) {
          const data = event.replace('data: ', '');
          try {
            const result: ProxyResult = JSON.parse(data);
            setResults(prev => [...prev, result]);
          } catch (error) {
            console.error('Error parsing event:', error);
          }
        }
      }
    } catch (error) {
      console.error('Check failed:', error);
      alert('Proxy check failed');
    }
    setIsChecking(false);
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Proxy Checker
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
          <div className="mb-6">
            <label className="block mb-3 font-medium text-gray-700 dark:text-gray-300">
              Proxies (IP:PORT per line)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`w-full h-48 p-3 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              placeholder="127.0.0.1:8080\n192.168.1.1:3128"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Timeout (ms)</label>
              <input
                type="number"
                value={timeout}
                onChange={(e) => setTimeout(Number(e.target.value))}
                className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                  ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Concurrent Checks</label>
              <input
                type="number"
                value={concurrent}
                onChange={(e) => setConcurrent(Number(e.target.value))}
                className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                  ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}
                min="1"
                max="20"
              />
            </div>
          </div>

          <button
            onClick={checkProxies}
            disabled={isChecking}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center
              ${isChecking ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              text-white dark:text-gray-100`}
          >
            {isChecking ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Checking...
              </>
            ) : (
              'Start Checking'
            )}
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300">
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Results ({results.filter(r => r.status === 'OK').length}/{results.length} Working)
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Proxy</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {results.map((result) => (
                    <tr key={result.proxy} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className={`px-6 py-4 font-mono text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {result.proxy}
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center space-x-2">
                          {result.status === 'OK' ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : result.status === 'Timeout' ? (
                            <ClockIcon className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            result.status === 'OK' ? 'text-green-700 dark:text-green-400' :
                            result.status === 'Timeout' ? 'text-yellow-700 dark:text-yellow-400' :
                            'text-red-700 dark:text-red-400'
                          }`}>
                            {result.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`text-sm ${
                          result.latency ? 
                            (result.latency < 500 ? 'text-green-600 dark:text-green-400' : 
                             result.latency < 1000 ? 'text-yellow-600 dark:text-yellow-400' : 
                             'text-red-600 dark:text-red-400') : 
                            'text-gray-500 dark:text-gray-400'
                        }`}>
                          {result.latency ? `${result.latency}ms` : '–'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
    Results ({results.filter(r => r.status === 'OK').length}/{results.length} Working)
  </h2>
  <div className="space-x-3">
    <button
      onClick={() => exportResults('csv')}
      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
    >
      Download CSV
    </button>
    <button
      onClick={() => exportResults('txt')}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Download TXT
    </button>
  </div>
</div>
      </div>
    </div>
  );
}