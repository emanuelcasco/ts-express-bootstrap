import fs from 'fs';
import repl from 'repl';

import * as services from './services';

const pjson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const replServer = repl.start({ prompt: `${pjson.name}> ` });

replServer.context.services = services.default;
