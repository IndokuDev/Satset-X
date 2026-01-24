declare module "satset-react/server" {
  export type SatsetRequestCookie = {
    name: string;
    value: string;
  };

  export type SatsetRequestCookies = {
    get(name: string): SatsetRequestCookie | undefined;
    getAll(): SatsetRequestCookie[];
    has(name: string): boolean;
    set(name: string, value: string, opts?: { path?: string; maxAge?: number }): void;
  };

  export function cookies(): SatsetRequestCookies;
}

