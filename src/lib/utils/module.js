import path from 'path';

const NODE_MODULES = 'node_modules';

export const appendNodeModulesPathToModule = (mod, directory) => {
    const modulesPath = path.join(directory, NODE_MODULES);

    mod.paths.push(modulesPath);
};

export const removeNodeModulesPathFromModule = directory => {
    const modulesPath = path.join(directory, NODE_MODULES);

    module.paths = module.paths.filter(p => p !== modulesPath);
};
