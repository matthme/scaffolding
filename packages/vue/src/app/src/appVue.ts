import { ScFile, ScNodeType } from '@source-craft/types';
import camelCase from 'lodash-es/camelCase';
import kebabCase from 'lodash-es/kebabCase';
import upperFirst from 'lodash-es/upperFirst';
import snakeCase from 'lodash-es/snakeCase';

export const appVue = ({happName}: {happName: string;}): ScFile => ({
  type: ScNodeType.File,
  content: `<template>
  <div>
    <div v-if="loading">
      <mwc-circular-progress indeterminate></mwc-circular-progress>
    </div>
    <div v-else></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { AppWebsocket, InstalledAppInfo } from '@holochain/client';
import '@material/mwc-circular-progress';

export default defineComponent({
  data(): { appWebsocket: AppWebsocket | undefined; loading: boolean; appInfo: InstalledAppInfo | undefined } {
    return {
      appWebsocket: undefined,
      loading: true,
      appInfo: undefined,
    };
  },
  async mounted() {
    this.appWebsocket = await AppWebsocket.connect(\`ws://localhost:\${import.meta.env.VITE_HC_PORT}\`);
    this.appInfo = await this.appWebsocket.appInfo({ installed_app_id: '${happName}' });

    this.loading = false;
  },
  provide() {
    return {
      appWebsocket: computed(() => this.appWebsocket),
      appInfo: computed(() => this.appInfo),
    };
  },
});
</script>`
});
    