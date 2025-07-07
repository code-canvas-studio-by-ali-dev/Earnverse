
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import prisma from '@/lib/db';
import { z } from 'zod';
import { UUID } from 'crypto';

export async function POST(_req: NextRequest, { params }: { params: { id: UUID, visitorId: string, username: string, ip: string,  } }) {
    try {
        const { id } = await params;

        // Validate user ID format
        const userIdSchema = z.string().uuid({ message: 'Invalid UUID format' });
        const user_id = userIdSchema.parse(id);

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const account = await prisma.account.findFirst({ where: { userId: user.id } });
        if (!account?.userVerified) {
            return NextResponse.json({ error: 'User not verified.' }, { status: 400 });
        }

        const ip_location_detail = await prisma.userIpLocationDetail.findFirst({where: {userId: id}})
        if(ip_location_detail){
            return NextResponse.json({ error: 'Data already exist' }, { status: 400 });
        }

        const IPadress = await axios.get<GetIPAdress>(process.env.IP_ADDRESS!)
        if(!IPadress){
            throw new Error('Failed to fetch IP address');
        }
        const ip = IPadress.data.ip

        // Use server-side IP lookup (no Cloudflare issues)
        const ipApiResponse = await axios.get<IPLocationDetail>(`${process.env.IP_LOCATION_DETAIL}/${ip}/${process.env.FORMATE}`);
        const data = ipApiResponse.data;

        if (!data) {
            throw new Error('Failed to fetch IP details');
        }

        // Save IP location detail
        const ipLocation = await prisma.userIpLocationDetail.create({
            data: {
                ip: data.ip,
                network: data.network,
                version: data.version,
                city: data.city,
                region: data.region,
                regionCode: data.region_code,
                country: data.country,
                countryName: data.country_name,
                countryCodeISO3: data.country_code_iso3,
                countryCapital: data.country_capital,
                countryTld: data.country_tld,
                continentCode: data.continent_code,
                inEu: data.in_eu,
                postal: data.postal,
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone,
                utcOffset: data.utc_offset,
                countryCallingCode: data.country_calling_code,
                currency: data.currency,
                currencyName: data.currency_name,
                languages: data.languages,
                countryArea: data.country_area,
                countryPopulation: data.country_population,
                userSecurityId: "",
                asn: data.asn,
                org: data.org,
            },
        });

        return NextResponse.json({ success: true, ipLocation: ipLocation }, { status: 201 });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: err.flatten() }, { status: 422 });
        }

        console.error('Profile error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
