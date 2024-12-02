interface PageviewData {
  hostname?: string; // Hostname of server
  language?: string; // Browser language
  referrer?: string; // Page referrer
  screen?: string; // Screen dimensions (eg. 1920x1080)
  title?: string; // Page title
  url?: string; // Page url
  website?: string; // Website ID (required)
}

interface CustomEventPayload {
  [key: string]: unknown;
}

export interface IUmamiPlugin {
  /** Sends a pageview event with auto-collected pageview data */
  track(): void;
  /** Sends a pageview event with custom pageview data */
  track(data: PageviewData): void;
  /** Sends a pageview event with a mix of auto-collected and custom pageview data */
  track(fn: (data: PageviewData) => PageviewData): void;
  /** Sends a custom event */
  track(eventName: string): void;
  /** Sends a custom event with a payload */
  track(eventName: string, value: string | CustomEventPayload): void;
  /** Sends identity data for the current session */
  identify(data: CustomEventPayload): void;
}

export function UmamiPlugin() {
  return 'umami' in globalThis
    ? (globalThis as unknown as { umami: IUmamiPlugin }).umami
    : undefined;
}
