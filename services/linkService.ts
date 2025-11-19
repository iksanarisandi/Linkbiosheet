import { LinkItem } from '../types';

// The endpoint provided by the user
const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxT8_CpbDrWkyPi6uxX6sdQVKnOGFV443zTHzYulO5rcpbrLl9apk3x0c00VJr87FFPmw/exec';

/**
 * Helper to ensure URLs are absolute.
 * If a URL lacks a protocol (http/https/mailto), it prepends https://.
 */
const normalizeUrl = (input: string): string => {
  const url = input.trim();
  if (!url) return '';

  // Check for common protocols. If found, return as is.
  // Case insensitive check for http://, https://, mailto:, tel:, sms:
  if (/^(https?:\/\/|mailto:|tel:|sms:)/i.test(url)) {
    return url;
  }

  // If no protocol is found, assume it's a web link and prepend https://
  return `https://${url}`;
};

export const fetchLinks = async (): Promise<LinkItem[]> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const json = await response.json();

    let rawData: any[] = [];

    if (Array.isArray(json)) {
      rawData = json;
    } else if (json.data && Array.isArray(json.data)) {
      rawData = json.data;
    } else {
      console.warn("Unexpected JSON structure:", json);
      return [];
    }

    const links: LinkItem[] = rawData
      .map((row, index) => {
        let label = '';
        let urlRaw = '';

        // Handle Array format: ["Button Name", "lynk.id/..."]
        if (Array.isArray(row)) {
          label = String(row[0] || '');
          urlRaw = String(row[1] || '');
        } 
        // Handle Object format fallback: { name: "...", url: "..." }
        else if (typeof row === 'object' && row !== null) {
           const values = Object.values(row);
           if (values.length >= 2) {
             label = String(values[0]);
             urlRaw = String(values[1]);
           }
        }

        // Basic validation
        if (!label && !urlRaw) return null;

        return {
          id: `link-${index}`,
          label: label || 'Untitled Link',
          url: normalizeUrl(urlRaw), // Apply strict normalization
        };
      })
      .filter((item): item is LinkItem => item !== null);

    return links;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw error;
  }
};