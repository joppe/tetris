import { Definition } from './Definition';
import { Dictionary } from '../common/Dictionary';
import { Factory } from '../common/Factory';

/**
 * The DI container
 */

export class Container {
    // tslint:disable-next-line no-any
    private readonly _registry: Dictionary<Definition<any>> = {};

    public register<T>(identifier: string, factory: Factory<T>, requiredDependencies?: string[]): void {
        this._registry[identifier] = new Definition<T>(identifier, factory, requiredDependencies);
    }

    public resolve<T>(identifier: string): T {
        const definition: Definition<T> = this.get(identifier);

        definition.requiredDependencies.forEach((requiredDependency: string): void => {
            if (!definition.isDependencyDefined(requiredDependency)) {
                definition.setDependency(requiredDependency, this.resolve(requiredDependency));
            }
        });

        return definition.invoke();
    }

    public has(identifier: string): boolean {
        return this._registry[identifier] !== undefined;
    }

    public get<T>(identifier: string): Definition<T> {
        if (!this.has(identifier)) {
            throw new Error(`Container.resolve, unknown identifier: "${identifier}"`);
        }

        return this._registry[identifier];
    }
}
