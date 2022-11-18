export function truncateText(account) {
    if (account) {
        let text = account.toString()
        if (text.length >= 8) {
            let truncatedText =  text.substring(0, 4) + '...' + text.slice(-4);
            return truncatedText;
        } else {
            return text;
        }
    } else {
        return;
    }

}