import clsx from 'clsx';

type HighlightProps = {
    label: string;
    value?: string | null;
    className?: string;
    multiline?: boolean; 
};

export function Highlight({
    label,
    value,
    className,
    multiline = false,
}: HighlightProps) {
    const isActive = Boolean(value && value.trim() !== '' && value !== '-');

    return (
        <div className={clsx(className)}>
            <label
                className={clsx(
                    'mb-1 block text-sm font-semibold',
                    isActive ? 'text-emerald-700' : 'text-gray-500',
                )}
            >
                {label}
            </label>

            <div
                className={clsx(
                    'rounded-lg border px-4 py-2.5 text-sm font-medium whitespace-pre-wrap',
                    multiline && 'min-h-16',
                    isActive
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-gray-200 bg-gray-50 text-gray-500',
                )}
            >
                {value && value.trim() !== '' ? value : '-'}
            </div>
        </div>
    );
}
