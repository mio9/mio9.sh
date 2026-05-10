export type TerminalLineType = 'output' | 'error' | 'prompt' | 'info' | 'title' | 'subheading' | 'muted' | 'spacer' | 'image';

export type TerminalImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface TerminalLine {
    text: string;
    type?: TerminalLineType;
    /** Plain text rendered before an in-terminal link (`to`), e.g. `ls -l` columns. */
    prefix?: string;
    /** When set, `text` is rendered as an in-terminal link (e.g. note filenames). */
    to?: string;
    /** Plain text shown after the link on the same line (e.g. " — Title"). */
    suffix?: string;
    /** Image src (required when type is 'image') */
    src?: string;
    /** Image width in pixels (default: 128). Height uses this for square when height omitted. */
    width?: number;
    /** Image height in pixels (default: same as width for square) */
    height?: number;
    /** Border radius (default: 'lg') */
    rounded?: TerminalImageRounded;
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
