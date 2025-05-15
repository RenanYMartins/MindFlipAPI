import 'reflect-metadata';

const CONTROLLER_META = Symbol('controller');

export function Controller(path: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(CONTROLLER_META, path, target);
    };
}

export function getControllerPath(target: object): string | undefined {
    return Reflect.getMetadata(CONTROLLER_META, target);
}
