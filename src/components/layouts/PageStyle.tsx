import { Fragment } from 'react';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { PiClockCountdown } from "react-icons/pi";

const PageStyle = (
    { page }: Readonly<{
        page: string
    }>
) => {
    return (
        <Fragment>
            {page === "dashboard" && (
                <div className="flex flex-row gap-6 h-[550px] rounded-2xl">
                    <div className="flex flex-1 flex-col gap-6 bg-base-100 rounded-2xl p-16">
                        <h1 className='text-2xl font-bold'>Dashboard</h1>
                        <div className='flex justify-center items-center gap-12 [&>*]:rounded-xl [&>*]:bg-base-300 [&>*]:p-10 [&>*]:space-y-10 [&>*]:flex-1'>
                            <div>
                                <div className='space-y-5'>
                                    <h5 className='text-sm'>Credits</h5>
                                    <h1 className='text-5xl'>0.00</h1>
                                </div>
                                <button className="btn btn-sm btn-primary w-full">Exchange</button>
                            </div>
                            <div>
                                <div className='space-y-5'>
                                    <h5 className='text-sm' >Balance</h5>
                                    <h1 className='text-5xl'>Rs 0.00 /- </h1>
                                </div>
                                <button className="btn btn-sm btn-primary w-full">Withdraw</button>
                            </div>
                        </div>
                        <div className='w-full h-full'>
                            <AdPlaceholder />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 bg-base-100 w-[360px] rounded-2xl h-full p-4">
                        <div className='grow'>
                            <AdPlaceholder />
                        </div>
                        <div className='grow'>
                            <AdPlaceholder />
                        </div>
                    </div>
                </div>
            )}
            {page === "droplets" && (
                <div className='flex justify-center items-center gap-12 h-[450px] w-full'>
                    <div className='flex-1 bg-base-100 h-full p-8 rounded-2xl'>
                        <AdPlaceholder />
                    </div>
                    <div className='flex flex-col gap-12 bg-base-100 w-[400px] h-full p-8 rounded-2xl flex-none'>
                        <div className='space-y-5'>
                            <h1 className='text-3xl'>Get Free Credits</h1>
                            <p>Claim your coins and withdraw every 10 minutes.</p>
                        </div>
                        <div className='size-full'>
                            <AdPlaceholder />
                        </div>
                        <button className="btn btn-sm btn-warning w-full">Cliam your reward</button>
                    </div>
                    <div className='flex-1 bg-base-100 h-full p-8 rounded-2xl'>
                        <AdPlaceholder />
                    </div>
                </div>
            )}
            {page === "surf_ads" && (
                <div className="flex flex-row gap-6 h-[450px] rounded-2xl">
                    <div className='flex flex-1 flex-col gap-12 bg-base-100 size-full p-8 rounded-2xl'>
                        <div className='flex justify-between items-center'>
                            <div className='flex-1 space-y-5'>
                                <h1 className='text-3xl'>Get Free Credits</h1>
                                <p className='flex items-center gap-2'><PiClockCountdown size={25} /><span>15 second</span></p>
                            </div>
                            <div className='flex-none w-40 h-full space-y-3'>
                                <button className="btn btn-sm btn-outline btn-warning w-full">Watch Ad</button>
                                <button className="btn btn-sm btn-accent w-full">Short Ads</button>
                                <button className="btn btn-sm btn-warning w-full">Long Ads</button>
                            </div>
                        </div>
                        <div className='size-full'>
                            <AdPlaceholder />
                        </div>
                        <button className="btn btn-sm btn-warning w-full">Watch Ad</button>
                    </div>
                    <div className="flex-none bg-base-100 w-[400px] h-full rounded-2xl p-10">
                        <div className='size-full'>
                            <AdPlaceholder />
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default PageStyle;