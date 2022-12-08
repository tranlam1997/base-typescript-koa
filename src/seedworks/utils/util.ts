export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function convertTimeToMiliseconds(time: string) {
    const result = time.match(/(\d+)|([s|m|h|d])/g);
    if (result && result.length == 2) {
        const number = parseInt(result[0]);
        const unit = result[1];
        switch (unit) {
            case 's':
                return number * 1000;
            case 'm':
                return number * 60 * 1000;
            case 'h':
                return number * 60 * 60 * 1000;
            case 'd':
                return number * 24 * 60 * 60 * 1000;
            default:
                return 0;
            };
        }
        return 0;
    }

export function getKeyByObjectValue(map: any, searchValue: any) {
    for (let [key, value] of map.entries()) {
        if (value === searchValue)
            return key;
    }
}
