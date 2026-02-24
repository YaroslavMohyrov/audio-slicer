import { decodeArrayBuffer } from "@lib/decode";

export async function processFile(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await decodeArrayBuffer(arrayBuffer);
    console.log('Sample rate: ', audioBuffer.sampleRate);
    console.log('Duration: ', audioBuffer.duration);
    console.log('Length: ', audioBuffer.length);
    console.log('Number of channels: ', audioBuffer.numberOfChannels);

    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
        console.log(`Channel ${i} data:`);
        console.log(audioBuffer.getChannelData(i));
    }
}