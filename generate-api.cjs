const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');

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
            console.log("Jisus christ " + path.join(contractsDir, entry.name, 'api.yml'))
            return fs.existsSync(
                path.join(contractsDir, entry.name, 'api.yml')
            )
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

    const generator = path.resolve(
        'node_modules/.bin/openapi-generator-cli.cmd'
    );

    if (!fs.existsSync(generator)) {
        throw new Error(
            `OpenAPI Generator no encontrado en ${generator}`
        );
    }

    console.log(`Using generator: ${generator}`);

    execFileSync(
        'cmd.exe',
        [
            '/c',
            generator,
            'generate',
            '-i', input,
            '-g', 'typescript-axios',
            '-o', output,
            '--additional-properties=supportsES6=true,dateLibrary=javascript'
        ],
        {
            stdio: 'inherit',
            cwd: __dirname
        }
    );
}

console.log('\nAll APIs generated successfully.');