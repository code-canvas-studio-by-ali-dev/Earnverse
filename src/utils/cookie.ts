import Cookies from 'js-cookie';

class CookieBank {
    private name?: string;

    constructor(name?: string) {
        this.name = name;
    }
    getAllCookies(): { [key: string]: string } {
        return Cookies.get();
    }
    getCookie(): string | undefined {
        return Cookies.get(this.name!);
    }
    setCookie(value: string, options?: Cookies.CookieAttributes): void {
        Cookies.set(this.name!, value, options);
    }
    removeCookie(): void {
        Cookies.remove(this.name!);
    }
}

export default CookieBank;