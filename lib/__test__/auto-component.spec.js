const babel = require('@babel/core');
const _ = require('lodash');
const plugin = require('../index');
const makeStore = require('./__mocks__/store.mock');

jest.mock('vue-template-label-loader/lib/store', () => require('./__mocks__/store.mock'));

const example = `
import { Button } from 'element-ui';

export default {
  name: 'About',
  components: {
    [Button.name]: Button,
  },
};
`;


it('自动导入', () => {
  makeStore.set('path/to/HelloWord.vue', [
    "style",
    "template",
    "div",
    "a-form",
    "a-form-item",
    "a-input",
    "a-select",
    "a-select-option",
    "a-button",
    "el-select",
    "el-option",
    "el-input-number",
    "a-config-provider",
    "a-icon",
    "a-space",
    "a-page-header",
    "a-descriptions",
    "a-descriptions-item",
    "a",
    "br",
    "a-tag",
    "a-input-number",
    "a-row",
    "a-statistic",
    "a-form-model",
    "a-form-model-item",
    "a-date-picker",
    "a-switch",
    "a-checkbox-group",
    "a-checkbox",
    "a-radio-group",
    "a-radio",
    "script",
  ]);

  const { code } = babel.transform(example, {
    filename: 'path/to/HelloWord.vue',
    sourceType: 'module',
    plugins: [[plugin, {
      lib(tag) {
        // 如果某个标签需要自动导入，请返回导入路径, 不需要则返回null
        if (tag.startsWith('el-')) {
          return `element-ui/lib/${tag.replace('el-', '')}`;
        }
        if (tag.startsWith('a-')) {
          return `ant-design-vue/lib/${tag.replace('a-', '')}`;
        }
      },
      style(tag) {
        // 如果某个标签需要自动样式文件，请返回导入路径，无则返回null
        if (tag.startsWith('el-')) {
          const label = tag.replace('el-', '');
          return `element-ui/lib/theme-chalk/${label}.css`;
        }
        if (tag.startsWith('a-')) {
          const tagName = tag.replace('a-', '');
          return `ant-design-vue/lib/${tagName}/style`;
        }
        return null;
      },
    }]],
  });
  const resetCode = code.replace(/".*babel-plugin-vue-import-by-tag/g, '"babel-plugin-vue-import-by-tag');
  expect(resetCode).toMatchSnapshot();
});