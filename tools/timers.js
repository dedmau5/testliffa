function _timeout(timeout, type, error) {
    return setTimeout(
        function () {
            error.message = `${type} timeout after ${timeout/1000} s`;
            throw error;
        },
        timeout
    );
}

export function loadTimeout (timeout, error) {
    return _timeout(timeout || browser.options.tc.timeouts.page_load, "Loading", error);
}

export function scriptTimeout (timeout, error) {
    return _timeout(timeout || browser.options.tc.timeouts.script, "Script", error);
}

export function implicitTimeout (timeout, error) {
    return _timeout(timeout || browser.options.tc.timeouts.implicit, "Implicit", error);
}

/**
 * Returns a function that keeps track of elapsed time.
 * Calling the function will return the time, in milliseconds, since its creation.
 *
 * @returns {function()}
 */
export function elapsedTimeTimer() {
    const startTime = new Date().getTime();

    return () => {
        return new Date().getTime() - startTime;
    };
}