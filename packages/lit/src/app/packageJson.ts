import { ScFile, ScNodeType } from '@source-craft/types';
import camelCase from 'lodash-es/camelCase';
import kebabCase from 'lodash-es/kebabCase';
import upperFirst from 'lodash-es/upperFirst';
import snakeCase from 'lodash-es/snakeCase';

export const packageJson = (): ScFile => ({
  type: ScNodeType.File,
  content: `{
  "name": "ui",
  "description": "Webcomponent lit-element following open-wc recommendations",
  "license": "MIT",
  "author": "lit-element",
  "version": "0.0.0",
  "scripts": {
    "lint": "eslint --ext .ts,.html . --ignore-path .gitignore && prettier \\"**/*.ts\\" --check --ignore-path .gitignore",
    "format": "eslint --ext .ts,.html . --fix --ignore-path .gitignore && prettier \\"**/*.ts\\" --write --ignore-path .gitignore",
    "build": "rimraf dist && tsc && rollup -c rollup.config.js",
    "build:watch": "run-singleton \\"tsc --watch --preserveWatchOutput\\"",
    "start": "tsc && concurrently -r \\"npm run build:watch\\" \\"wds\\"",
    "package": "npm run build && cd dist && bestzip ../dist.zip *"
  },
  "dependencies": {
    "@holochain/client": "^0.3.2",
    "@lit-labs/context": "^0.1.1",
    "@material/mwc-circular-progress": "^0.25.3",
    "@webcomponents/scoped-custom-element-registry": "0.0.5",
    "lit": "^2.0.2"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.15.0",
    "@open-wc/building-rollup": "^1.10.0",
    "@open-wc/eslint-config": "^4.3.0",
    "@rollup/plugin-babel": "^5.3.0",
    "@rollup/plugin-commonjs": "18.0.0",
    "@rollup/plugin-node-resolve": "^13.0.4",
    "@rollup/plugin-replace": "^3.0.0",
    "@typescript-eslint/eslint-plugin": "^4.29.2",
    "@typescript-eslint/parser": "^4.29.2",
    "@web/dev-server": "0.1.21",
    "@web/dev-server-rollup": "^0.3.10",
    "@web/rollup-plugin-html": "^1.9.1",
    "@web/rollup-plugin-import-meta-assets": "^1.0.7",
    "babel-plugin-template-html-minifier": "^4.1.0",
    "bestzip": "^2.2.0",
    "concurrently": "^6.2.1",
    "deepmerge": "^4.2.2",
    "eslint": "^7.32.0",
    "eslint-config-prettier": "^8.3.0",
    "husky": "^4.3.8",
    "lint-staged": "^10.5.4",
    "prettier": "^2.3.2",
    "rimraf": "^3.0.2",
    "rollup": "^2.56.2",
    "rollup-plugin-terser": "^7.0.2",
    "rollup-plugin-workbox": "^6.2.0",
    "run-singleton-cli": "^0.0.5",
    "tslib": "^2.3.1",
    "typescript": "^4.5.5"
  },
  "eslintConfig": {
    "parser": "@typescript-eslint/parser",
    "extends": [
      "@open-wc",
      "prettier"
    ],
    "plugins": [
      "@typescript-eslint"
    ],
    "rules": {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error"
      ],
      "import/no-unresolved": "off",
      "import/extensions": [
        "error",
        "always",
        {
          "ignorePackages": true
        }
      ]
    }
  },
  "prettier": {
    "singleQuote": true,
    "arrowParens": "avoid"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
`
});
    