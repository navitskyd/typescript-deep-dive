import { makeProperty } from '../functions';

export function sealed(p: string) {
    return function(constructor: Function): void {
        console.log(`Sealing the constructor ${p}`);

        // Object.seal(constructor);
        // Object.seal(constructor.prototype);

        // Object.freeze(constructor);
        // Object.freeze(constructor.prototype);
    };
}

export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
    const newConstructor: Function = function() {
        console.log('Creating new instance');
        console.log(constructor.name);

        this.age = 30;
    };
    // newConstructor.prototype = Object.create(constructor.prototype); // recreate prototype
    Object.setPrototypeOf(newConstructor.prototype, constructor.prototype); // link prototype of new constructor with protottype of class

    newConstructor.prototype.printLibrarian = function() {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };

    return newConstructor as TFunction;
}

export function writeable(isWritable: boolean) {
    return function(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        console.log('Decorator writable w/ param value ' + isWritable);
        console.log(target);
        console.log(methodName);
        descriptor.writable = isWritable;

        return descriptor;
    };
}

export function timeout(ms: number = 0) {
    return function(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;
        const originalMethod2 = target[methodName];

        descriptor.value = function(...args: any[]) {
            // this=> obj
            if (window.confirm('Are yu sure?')) {
                setTimeout(() => {
                    originalMethod.apply(this, args);
                }, ms);
            }
        };

        return descriptor;
    };
}

export function logParam(target: any, methodName: string, index: number): void {
    const key = `${methodName}_decor_params_indexes`;
    if (Array.isArray(target[key])) {
        target[key].push(index);
    } else {
        target[key] = [index];
    }
}

export function logMethod(target: Function | object, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: Parameters<typeof originalMethod>): ReturnType<typeof originalMethod> {
        const key = `${methodName}_decor_params_indexes`;
        const indexes = target[key];
        if (Array.isArray(target[key])) {
            args.forEach((arg, index) => {
                if (indexes.includes(index)) {
                    console.log(`Method ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        }
        return originalMethod.apply(this, args);
    };

    return descriptor;
}

export function format(pref: string = 'Mr./Mrs.') {
    return function(target: any, propertyName: string) {
        makeProperty(target, propertyName, value => `${pref} ${value}`, value => value);
    };
}

export function positiveInteger(target: Function | object, propName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalSet = descriptor.set;

    descriptor.set = function(value: number) {
        if (value < 1 || !Number.isInteger(value)) {
            throw new Error('invalid value');
        }
        if (originalSet) {
            originalSet.call(this, value);
        }
    };
    return descriptor;
}
