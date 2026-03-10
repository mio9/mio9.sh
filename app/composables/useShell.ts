export type TerminalLineType = 'output' | 'error' | 'prompt' | 'info' | 'title' | 'subheading' | 'muted' | 'spacer';

export interface TerminalLine {
    text: string;
    type?: TerminalLineType;
}

export function useShell() {
    const lines = ref<TerminalLine[]>([]);
    const input = ref('');

    const commands: Record<string, (args: string[]) => string> = {
        echo: (args) => args.join(' '),
        clear: () => {
            lines.value = [];
            input.value = '';
            return '';
        },
        help: () => 'Available commands: echo, clear, help',
        exit: () => '??? why would you do that on a website?',
        version: () => 'LU:260128 / (c) 2026 MiO9',
        wallpaper: (args) => {
            const mainStore = useMainStore();
            mainStore.wallpaper = args[0] || '';
            return `wallpaper set to: ${mainStore.wallpaper}`;
        },
        wp: (args) => commands?.wallpaper?.(args) || '',
        '': () => '',
    };

    function addLine(text: string, type: TerminalLineType = 'output') {
        lines.value.push({ text, type });
    }

    function handleInput() {
        const [command, ...args] = input.value.split(' ');
        if (command && !(command in commands)) {
            addLine(`command not found: ${command}`, 'error');
            input.value = '';
            return;
        }
        const result = commands[command as keyof typeof commands]?.(args) ?? '';
        if (result) {
            addLine(result, 'output');
        }
        input.value = '';
    }

    const preLoadedMessages = [
        '🐱 mau! mau! mau!',
        'momoi is cyber, momoi is dev',
    ];

    function getPreLoadedMessage() {
        return preLoadedMessages[Math.floor(Math.random() * preLoadedMessages.length)];
    }

    return {
        lines,
        input,
        handleInput,
        addLine,
        getPreLoadedMessage,
    };
}
