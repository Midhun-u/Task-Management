export function debounce<Type extends (event: any) => void>(
    fn: Type,
    delay: number,
) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (event: any) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(event);
        }, delay);
    };
}