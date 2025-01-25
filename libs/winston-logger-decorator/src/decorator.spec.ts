import {describe} from "node:test";
import {LogAsyncMethod, LogMethod} from "./decorator";

class TestClass {
    @LogMethod
    testMethod(param1: string, param2: string) {
        return `${param1} ${param2}`;
    }

    @LogAsyncMethod
    async testAsyncMethod(param1: string, param2: string) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return `${param1} ${param2}`;
    }
}

describe("LogMethod", () => {

    it("should log method call", () => {
        const testClass = new TestClass();
        testClass.testMethod("Hello", "World");
    })

    it("should log async method call", async () => {
        const testClass = new TestClass();
        await testClass.testAsyncMethod("Hello", "World");
    })
})