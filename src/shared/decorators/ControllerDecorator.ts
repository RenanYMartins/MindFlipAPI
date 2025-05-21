import 'reflect-metadata';
import { DecoratorMetadata } from '@shared/enums/DecoratorMetaEnum';

export function Controller(path: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(DecoratorMetadata.PREFIX, path, target);
    };
}

export function getControllerPath(target: object): string | undefined {
    return Reflect.getMetadata(DecoratorMetadata.PREFIX, target);
}
