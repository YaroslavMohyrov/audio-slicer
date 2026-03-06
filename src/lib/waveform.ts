export function getWaveformData(buffer: AudioBuffer, size: number) {
    const channelData = buffer.getChannelData(0);
    const totalSamples = channelData.length;

    const result: { min: number; max: number }[] = [];

    for (let i = 0; i < size; i++) {
        let min = 1; 
        let max = -1;

        const start = Math.floor(i * totalSamples / size);
        const end = Math.max(
            start + 1, 
            Math.floor((i + 1) * totalSamples / size),
        );
        
        for (let j = start; j < end; j++) {
            const sample = channelData[j];

            if (sample < min) min = sample;
            if (sample > max) max = sample;
        }
        
        result.push({ min, max });
    }

    return result;
}
