import { Steps } from "@/components/layouts/Steps";
import { Fragment } from "react";

export default async function Page(
    { params }: Readonly<{
        params: {
            step: "step-one" | "step-two"
        }
    }>
) {

    const { step } = await params

    return (
        <Fragment>
            <Steps type={step} />
        </Fragment>
    )
}