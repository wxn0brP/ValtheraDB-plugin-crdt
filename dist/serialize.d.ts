export interface CrdtRegexMarker {
    $vcrdtRegex: {
        source: string;
        flags: string;
    };
}
export declare function encodeCrdt<T>(value: T): T;
export declare function decodeCrdt<T>(value: T): T;
