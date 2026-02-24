import { processFile } from '../services/ProcessService';

export function Editor() {
    const onFileUpload = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (!file) {
            return;
        }

        processFile(file);
    }
    
    return <div class="editor">
        <input type="file" accept=".mp3,.wav,.flac" onChange={onFileUpload}/>
    </div>
}