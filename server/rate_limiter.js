function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class RateLimiter {
    constructor(calls, period) {
        this.calls = calls;
        this.period = period;
        this.callTimes = [];
    }

    async limit(asyncFunction) {
        while (this.callTimes.length >= this.calls) {
            const elapsedTime = Date.now() - this.callTimes[0];
            console.log('time pass ', elapsedTime, 'number of call in the window', this.callTimes.join(","));
            if (elapsedTime < this.period) {
                const sleepTime = this.period - elapsedTime;
                console.log(`Rate limit exceeded. Sleeping for ${sleepTime / 1000} seconds...`);
                await sleep(sleepTime);
            } else {
                this.callTimes.shift();
            }
        }
        this.callTimes.push(Date.now());
        return asyncFunction();
    }
}
module.exports = {
    RateLimiter
};
