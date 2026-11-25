function isPlainObject(value) {
    if (typeof value !== "object" || value === null || Array.isArray(value))
        return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
function isRegexMarker(value) {
    if (!isPlainObject(value) || Object.keys(value).length !== 1)
        return false;
    if (!Object.hasOwn(value, "$vcrdtRegex"))
        return false;
    const marker = value.$vcrdtRegex;
    return (isPlainObject(marker) &&
        typeof marker.source === "string" &&
        typeof marker.flags === "string");
}
export function encodeCrdt(value) {
    if (value instanceof RegExp) {
        return {
            $vcrdtRegex: {
                source: value.source,
                flags: value.flags,
            },
        };
    }
    if (Array.isArray(value))
        return value.map(item => encodeCrdt(item));
    if (isPlainObject(value)) {
        const result = {};
        for (const [key, child] of Object.entries(value))
            result[key] = encodeCrdt(child);
        return result;
    }
    return value;
}
export function decodeCrdt(value) {
    if (isRegexMarker(value))
        return new RegExp(value.$vcrdtRegex.source, value.$vcrdtRegex.flags);
    if (Array.isArray(value))
        return value.map(item => decodeCrdt(item));
    if (isPlainObject(value)) {
        const result = {};
        for (const [key, child] of Object.entries(value))
            result[key] = decodeCrdt(child);
        return result;
    }
    return value;
}
