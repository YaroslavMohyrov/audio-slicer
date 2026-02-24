import { getAudioContext } from "./audioContext";

export function decodeArrayBuffer(buffer: ArrayBuffer): Promise<AudioBuffer> {
    const ctx = getAudioContext();
    return ctx.decodeAudioData(buffer);
}