import DefaultPage from "@/components/DefaultPage";
import { SetRoleEffect } from "@/utils/restrictFiles";
import { Fragment } from "react";

export default async function Page({
    params,
}: {
    params: Promise<{ role: string; page: string }>;
}) {
    const { role, page } = await params;

    return (
        <Fragment>
            <SetRoleEffect role={role} page={page} />
            <DefaultPage />
        </Fragment>
    );
}
