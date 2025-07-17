// @/types/global.d.ts

enum Role {
    USER = "USER",
    EMPLOYEE = "EMPLOYEE",
    ADMIN = "ADMIN",
}

interface User {
    id: string;
    username?: string | null;
    email: string;
    password: string;
    secretCode?: number | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    security?: Security | null;
    profile?: Profile | null;
    account?: Account | null;
    loginHistory?: LoginHistory[];
    browserInfo?: BrowserInfo[];
    geographicLocation?: GeographicLocation[];
}

interface Security {
    id: string;
    userId: string;
    visitorId: string;
    ips: string[];
    createdAt: Date;
    updatedAt: Date;
    user?: User | null;
}

interface Profile {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    user?: User | null;
}

interface Account {
    id: string;
    userId: string;
    guidelines: boolean;
    terms: boolean;
    isActive: boolean;
    isVerified: boolean;
    isBanned: boolean;
    bannedReason?: string | null;
    accessToken?: string | null;
    createdAt: Date;
    updatedAt: Date;
    user?: User | null;
}

interface LoginHistory {
    id: string;
    userId: string;
    browserInfo: string;
    createdAt: Date;
    updatedAt: Date;
    user?: User | null;
}

interface BrowserData {
    browser?: string;
    version?: string;
    os?: string;
    [key: string]: unknown;
}

interface BrowserInfo {
    id: string;
    userId: string;
    data: BrowserData;
    createdAt: Date;
    updatedAt: Date;
    user?: User | null;
}

interface GeographicLocation {
    id: string;
    userId: string;
    ip: string;
    network: string;
    version: string;
    city: string;
    region: string;
    regionCode: string;
    country: string;
    countryName: string;
    countryCode: string;
    countryCodeIso3: string;
    countryCapital: string;
    countryTld: string;
    continentCode: string;
    inEu: boolean;
    postalNumber?: string | null;
    latitude: number;
    longitude: number;
    timezone: string;
    utcOffset: string;
    countryCallingCode: string;
    currency: string;
    currencyName: string;
    languages: string;
    countryArea: string;
    countryPopulation: number;
    asn: string;
    org: string;
    createdAt: Date;
    updatedAt: Date;
    user?: User | null;
}

interface JWTDecode {
    userId: string;
    iat: Date;
    exp: Date;
}