import { ScFile, ScNodeType } from '@source-craft/types';
import camelCase from 'lodash-es/camelCase';
import kebabCase from 'lodash-es/kebabCase';
import upperFirst from 'lodash-es/upperFirst';
import snakeCase from 'lodash-es/snakeCase';

export const packageJson = (): ScFile => ({
  type: ScNodeType.File,
  content: `{
  "name": "ui",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "prepare": "npm run build",
    "start": "concurrently \\"npm run build:watch\\" \\"wds --config web-dev-server.config.mjs\\"",
    "build": "rollup -c",
    "build:watch": "run-singleton \\"rollup -c -w\\"",
    "package": "npm run build && cd public && bestzip ../dist.zip *"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^17.0.0",
    "@rollup/plugin-node-resolve": "^11.0.0",
    "@rollup/plugin-replace": "^3.0.0",
    "@rollup/plugin-typescript": "^8.0.0",
    "@web/dev-server": "0.1.21",
    "@web/dev-server-rollup": "^0.3.10",
    "@tsconfig/svelte": "^2.0.0",
    "bestzip": "^2.2.0",
    "concurrently": "^6.2.2",
    "rollup": "^2.3.4",
    "rollup-plugin-css-only": "^3.1.0",
    "rollup-plugin-livereload": "^2.0.0",
    "rollup-plugin-svelte": "^7.0.0",
    "rollup-plugin-terser": "^7.0.0",
    "run-singleton-cli": "^0.0.5",
    "svelte": "^3.0.0",
    "svelte-preprocess": "^4.10.4"
  },
  "dependencies": {
    "@holochain/client": "^0.3.2",
    "@material/mwc-circular-progress": "^0.25.3",    
    "@webcomponents/scoped-custom-element-registry": "0.0.4"
  }
}
`
});
    