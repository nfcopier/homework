let usePrevious = false, y2;

export function Gaussian(mean, stdDev) {
    if (usePrevious) {
        usePrevious = false;
        return mean + y2 * stdDev;
    }

    usePrevious = true;

    let x1 = 0,
        x2 = 0,
        y1,
        z  = 0;

    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        z = (x1 * x1) + (x2 * x2);
    } while (z >= 1);

    z = Math.sqrt((-2 * Math.log(z)) / z);
    y1 = x1 * z;
    y2 = x2 * z;

    return mean + y1 * stdDev;
}
