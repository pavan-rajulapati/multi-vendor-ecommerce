import crypto from "crypto";

export function HashToken (token : string) {
    return crypto.createHash("sha256").update(token).digest("hex")
}