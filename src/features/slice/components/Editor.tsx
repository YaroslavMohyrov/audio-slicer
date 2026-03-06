import './Editor.css';
import { onMount } from 'solid-js';
import { decode, generateWaveForm } from '../services/ProcessService';

export function Editor() {
    let canvas: HTMLCanvasElement | undefined;
    let ctx: CanvasRenderingContext2D | null | undefined;

    onMount(() => {
        ctx = canvas && canvas.getContext('2d');
    })

    const onFileUpload = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (!file || !canvas) {
            return;
        }

        const buffer = await decode(file);
        const waveformData = generateWaveForm(buffer, canvas.width);
        draw(waveformData);
    }

    const draw = (data: { min: number; max: number }[]) => {
        if (!canvas || !ctx) {
            return;
        }

        const amplitude = canvas.height / 2;

        clear();
        
        ctx.save();
        ctx.translate(0, amplitude);

        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {
            const y = data[i].min * amplitude;
            const height = (data[i].max - data[i].min) * amplitude;
            ctx.rect(i, y, 1, height);
        }

        ctx.fill();
        ctx.fillRect(0, 0, canvas.width, 1);
        ctx.restore();
    }

    const clear = () => {
        if (!canvas || !ctx) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    return <div class="editor">
        <div class="editor-upload">
            <input type="file" accept=".mp3,.wav,.flac" onChange={onFileUpload}/>
        </div>
        
        <div class="editor-canvas">
            <canvas width="3000" height="200" ref={canvas}>
                Your browser does not support audio waveform visualization.
            </canvas>
        </div>

        <button type="button" onClick={clear}>Clear</button>
    </div>
}