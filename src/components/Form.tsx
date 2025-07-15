import { Fragment } from "react";
import { LoginForm } from "./layouts/LoginForm";
import { SignupForm } from "./layouts/SignupForm";

type AuthFormProps = {
    type: "login" | "signup";
};

export default function Form({ type }: AuthFormProps) {
    return (
        <Fragment>
            {type === "login" ? <LoginForm /> : <SignupForm />}
        </Fragment>
    );
}
