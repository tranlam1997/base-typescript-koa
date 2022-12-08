import { Service } from "typedi";
import { Result } from "../seedworks/utils/result";

@Service() // This decorator is required to register the service in the IoC container
export default class SampleService {
    
    public async sampleMethod() {
        return Result.Response<Record<string, any>>({}, 200, "Hello World");
    }
} 