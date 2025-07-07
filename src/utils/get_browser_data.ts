import { UAParser } from 'ua-parser-js';

export default function getBrowserData() {
    const parser = new UAParser();
    const result = parser.getResult();
    return { result }
}

