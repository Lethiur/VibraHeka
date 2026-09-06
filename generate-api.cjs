const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');
const isWindows = process.platform === 'win32';

const contractsDir = path.resolve(
    __dirname,
    './openapi/Modules'
);

const outputDir = path.resolve(
    __dirname,
    './src/Generated/api'
);

const modules = fs
    .readdirSync(contractsDir, {withFileTypes: true})
    .filter(entry => entry.isDirectory())
    .filter(entry => {
            return fs.existsSync(path.join(contractsDir, entry.name, 'api.yml'));
        }
    );

console.log(`Found ${modules.length} API modules`);

for (const module of modules) {
    const moduleName = module.name;

    const input = path.join(
        contractsDir,
        moduleName,
        'api.yml'
    );

    const output = path.join(
        outputDir,
        moduleName.toLowerCase()
    );

    console.log(`\nGenerating ${moduleName}...`);

    fs.rmSync(output, {
        recursive: true,
        force: true
    });

    const generator = path.join(
        __dirname,
        'node_modules',
        '.bin',
        isWindows ? 'openapi-generator-cli.cmd' : 'openapi-generator-cli'
    );

    if (!fs.existsSync(generator)) {
        throw new Error(
            `OpenAPI Generator no encontrado en ${generator}`
        );
    }

    console.log(`Using generator: ${generator}`);

    const generatorArgs = [
        'generate',
        '-i', input,
        '-g', 'typescript-axios',
        '-o', output,
        '--additional-properties=supportsES6=true,dateLibrary=javascript'
    ];

    execFileSync(
        isWindows ? 'cmd.exe' : generator,
        isWindows ? ['/c', generator, ...generatorArgs] : generatorArgs,
        {
            stdio: 'inherit',
            cwd: __dirname
        }
    );
}

console.log('\nAll APIs generated successfully.');