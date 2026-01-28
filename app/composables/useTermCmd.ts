export function useTermCmd() {
    const lines = ref<string[]>([]);
    const input = ref<string>('');
    const inputRef = ref<HTMLInputElement | null>(null);

    const commands = {
        'echo': (args: string[]) => {
            return args.join(' ');
        },
        'clear': () => {
            lines.value = [];
            input.value = '';
        },
        'help': () => {
            return 'Available commands: echo, clear, help';
        },
        'exit': () => {
            return '??? why would you do that on a website?';
        },
        'version': () => {
            return 'LU:260128 / (c) 2026 MiO9';
        },
        'wallpaper': (args: string[]) => {
            const mainStore = useMainStore();
            mainStore.wallpaper = args[0] || '';
            return `wallpaper set to: ${mainStore.wallpaper}`;
        },
        'wp': (args: string[]) => {
            return commands.wallpaper(args);
        },
        '': ()=>''
    }

    function handleInput() {
        const [command, ...args] = input.value.split(' ');
        // check if command is valid
        if (command && !commands[command as keyof typeof commands]) {
            lines.value.push(`command not found: ${command}`);
            input.value = '';
            return;
        }
        const result = commands[command as keyof typeof commands](args);
        lines.value.push(`${result}`);
        input.value = '';
    }

    const preLoadedMessages = [
        '🐱 mau! mau! mau!',
        'momoi is cyber, momoi is dev',
    ]
    function getPreLoadedMessages() {
        return preLoadedMessages[Math.floor(Math.random() * preLoadedMessages.length)];
    }

    return {
        lines,
        input,
        handleInput,
        getPreLoadedMessages
    }
}