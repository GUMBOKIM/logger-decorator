import logger from "./logger";

export function LogClass(target: Function): void {
    logger.info(`\uD83D\uDCD6 Class: ${target.name}`);
}


export function LogMethod(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
): void {
    const originalMethod = descriptor.value!;

    descriptor.value = function (...args: any[]) {
        logger.info(`\u25B6\uFE0F Method: ${String(propertyKey)}`);
        logger.info(`\uD83D\uDCDD Parameters:`, args);

        const result = originalMethod.apply(this, args);

        logger.info(`\uD83D\uDD04 Return:`, result);
        return result;
    };
}

export function LogAsyncMethod(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>
): void {
    const originalMethod = descriptor.value!;

    descriptor.value = async function (...args: any[]) {
        logger.info(`\u25B6\uFE0F Method: ${String(propertyKey)}`);
        logger.info(`\uD83D\uDCDD Parameters:`, args);

        const result = await originalMethod.apply(this, args);

        logger.info(`\uD83D\uDD04 Return:`, result);
        return result;
    };
}