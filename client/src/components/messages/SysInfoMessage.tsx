import React, { useMemo } from 'react';
import type { Message } from '../../lib/utils';
import './SysInfoMessage.css';

interface SysInfoMessageProps {
  message: Message;
}

interface InfoItem {
  label: string;
  value: string | number;
}

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  postal: string;
  latitude: number;
  longitude: number;
  currency: string;
  timezone: string;
  org: string;
  asn: string;
  vpnProxy?: string;
}

// Move functions outside component to prevent recreation on every render
const getBrowserInfo = (): string => {
  const userAgent = navigator.userAgent;

  const browsers = [
    { name: 'Chrome', regex: /Chrome\/(\d+)/ },
    { name: 'Firefox', regex: /Firefox\/(\d+)/ },
    { name: 'Safari', regex: /Version\/(\d+).*Safari/ },
    { name: 'Edge', regex: /Edg\/(\d+)/ },
    { name: 'Opera', regex: /OPR\/(\d+)/ },
  ];

  for (const browser of browsers) {
    const match = userAgent.match(browser.regex);
    if (match) {
      return `${browser.name} ${match[1]}`;
    }
  }
  return 'Unknown Browser';
};

const getPlatformInfo = (): string => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  if (platform.includes('Mac')) return 'MacIntel';
  if (platform.includes('Win')) return 'Windows';
  if (platform.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    return 'iOS';
  }

  return platform || 'Unknown';
};

const getMemoryInfo = (): string => {
  // @ts-expect-error - memory is not in standard Navigator interface
  const memory = navigator.deviceMemory;
  if (memory) {
    return `${memory} GB`;
  }

  // Fallback: try to estimate based on hardware concurrency
  const cores = navigator.hardwareConcurrency || 0;
  if (cores >= 8) return '8+ GB (estimated)';
  if (cores >= 4) return '4-8 GB (estimated)';
  return 'Unknown';
};

const getCPUArch = (): string => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('x86_64') || userAgent.includes('x64')) return 'x64';
  if (userAgent.includes('x86') || userAgent.includes('i386')) return 'x86';
  if (userAgent.includes('arm64') || userAgent.includes('aarch64')) {
    return 'ARM64';
  }
  if (userAgent.includes('arm')) return 'ARM';

  // Try to detect from platform
  const platform = navigator.platform;
  if (platform.includes('MacIntel')) return 'x64';
  if (platform.includes('Mac')) return 'ARM64';

  return 'Unknown';
};

const getUptime = (): string => {
  // Calculate uptime from page load time
  const now = Date.now();
  const loadTime = performance.timing?.navigationStart || now;
  const uptimeMs = now - loadTime;

  const hours = Math.floor(uptimeMs / (1000 * 60 * 60));
  const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((uptimeMs % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

const getSystemInfo = (): InfoItem[] => {
  return [
    { label: 'Browser', value: getBrowserInfo() },
    { label: 'Platform', value: getPlatformInfo() },
    { label: 'CPU Cores', value: navigator.hardwareConcurrency || 0 },
    { label: 'Memory', value: getMemoryInfo() },
    { label: 'CPU Arch', value: getCPUArch() },
    { label: 'Network', value: navigator.onLine ? '4g (Online)' : 'Offline' },
    { label: 'Language', value: navigator.language },
    {
      label: 'Timezone',
      value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    { label: 'Screen', value: `${screen.width}x${screen.height}` },
    { label: 'Uptime', value: getUptime() },
  ];
};

// Move these functions outside component as well
const getIpInfo = (ipData: IpInfo): InfoItem[] => {
  if (!ipData) return [];

  return [
    { label: 'IP Address', value: ipData.ip || 'N/A' },
    { label: 'City', value: ipData.city || 'N/A' },
    { label: 'Region', value: ipData.region || 'N/A' },
    { label: 'Country', value: ipData.country || 'N/A' },
    { label: 'Postal Code', value: ipData.postal || 'N/A' },
    {
      label: 'Latitude/Long.',
      value: `${ipData.latitude || 'N/A'}, ${ipData.longitude || 'N/A'}`,
    },
    { label: 'Currency', value: ipData.currency || 'N/A' },
    { label: 'Time Zone (IP)', value: ipData.timezone || 'N/A' },
    { label: 'Org', value: ipData.org || 'N/A' },
    { label: 'ASN', value: ipData.asn || 'N/A' },
    { label: 'VPN/Proxy', value: ipData.vpnProxy || 'N/A' },
  ];
};

const formatInfoSection = (
  title: string,
  items: InfoItem[],
  maxLabelLength: number
): string => {
  const separator = '-'.repeat(50);

  const header = `${title}\n${separator}`;
  const rows = items.map(item => {
    const padding = ' '.repeat(maxLabelLength - item.label.length + 1);
    return `${item.label}${padding}: ${item.value}`;
  });

  return [header, ...rows].join('\n');
};

const SysInfoMessage: React.FC<SysInfoMessageProps> = ({ message }) => {
  // Memoize the entire formatted output to prevent recalculation on every render
  const formattedOutput = useMemo(() => {
    const systemInfo = getSystemInfo();
    const ipInfo = message.componentData as IpInfo;
    const ipInfoItems = getIpInfo(ipInfo);

    // Calculate maximum label length across ALL items for consistent alignment
    const allItems = [...systemInfo, ...ipInfoItems];
    const maxLabelLength = Math.max(...allItems.map(item => item.label.length));

    let output = formatInfoSection(
      'SYSTEM INFORMATION',
      systemInfo,
      maxLabelLength
    );

    if (ipInfoItems.length > 0) {
      output +=
        '\n\n' +
        formatInfoSection('IP INFORMATION', ipInfoItems, maxLabelLength);
    }

    return output;
  }, [message.componentData]); // Only recalculate if IP data changes

  return (
    <div className="sysinfo-message">
      <pre className="sysinfo-content">{formattedOutput}</pre>
    </div>
  );
};

export default SysInfoMessage;
