import { decodeArrayBuffer } from "@lib/decode";
import { getWaveformData } from "@lib/waveform";

export async function decode(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await decodeArrayBuffer(arrayBuffer);
    return audioBuffer;
}

export function generateWaveForm(buffer: AudioBuffer, size: number) {
    return getWaveformData(buffer, size);
}