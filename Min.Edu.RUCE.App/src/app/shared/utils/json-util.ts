export class JSONUtil {
    static parseToJson<T>(objectEncoded: string): T {
        return <T> JSON.parse(objectEncoded);
    }

    static parseFromJson<T>(objectDecoded: T): string {
        return JSON.stringify(objectDecoded);
    }

    static isEmpty(object: {}): boolean {
        return JSON.stringify(object) === '{}';
    }
}