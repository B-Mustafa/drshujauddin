export default function getFormattedDate(datestring: string): string {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(datestring))
    }