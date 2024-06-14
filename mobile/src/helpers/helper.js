export function formattedDate(createdAt) {
    return new Date(createdAt).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function formatTime(timeString) {
    const date = new Date(timeString)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}
