import { UUID } from "crypto";

interface IBrowserData extends IData {
    name?: string | undefined;
    version?: string | undefined;
    major?: string | undefined;
    type?: string | undefined;
}

interface ICpuData extends IData {
    architecture?: string | undefined;
}

interface IDeviceData extends IData {
    model?: string | undefined;
    type?: string | undefined;
    vendor?: string | undefined;
}

interface IEngineData extends IData {
    name?: string | undefined;
    version?: string | undefined;
}

interface IOSData extends IData {
    name?: string | undefined;
    version?: string | undefined;
}

interface IUserAgentData {
    ua?: string | undefined;
}

global {
    interface IPLocationDetail {
        userId: UUID
        ip: string;
        network: string;
        version: string;
        city: string;
        region: string;
        region_code: string;
        country: string;
        country_name: string;
        country_code: string;
        country_code_iso3: string;
        country_capital: string;
        country_tld: string;
        continent_code: string;
        in_eu: boolean;
        postal: string | null;
        latitude: number;
        longitude: number;
        timezone: string;
        utc_offset: string;
        country_calling_code: string;
        currency: string;
        currency_name: string;
        languages: string;
        country_area: number;
        country_population: number;
        asn: string;
        org: string;
    }

    interface GetIPAdress {
        ip: string
    }

    interface IFullBrowserInfo {
        browser: IBrowserData;
        cpu: ICpuData;
        device: IDeviceData;
        engine: IEngineData;
        os: IOSData;
        ua: string;
    }
}

export { }