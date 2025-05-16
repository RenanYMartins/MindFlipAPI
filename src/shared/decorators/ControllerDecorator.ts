import { DecoratorMeta } from '@shared/enums/DecoratorMetaEnum';
import 'reflect-metadata';

export function Controller(path: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(DecoratorMeta.PREFIX, path, target);
    };
}

export function getControllerPath(target: object): string | undefined {
    return Reflect.getMetadata(DecoratorMeta.PREFIX, target);
}
