<template>
  <div class="column" style="flex: 1">
    <AppDefinitionBuilder @scaffold-app="generateFileChanges($event)"></AppDefinitionBuilder>
  </div>

  <mwc-dialog ref="dialog" heading="Preview" scrimClickAction="" escapeKeyAction="">
    <div class="column">
      <span
        >This will <b>create a new folder {{ happName }}</b> in the directory where you executed the CLI with the
        following structure.</span
      >

      <div class="row" style="margin-top: 16px">
        <div class="flex-scrollable-parent" style="flex: 1; height: 600px">
          <div class="flex-scrollable-container">
            <div class="flex-scrollable-y">
              <ui5-tree>
                <DirectoryTree v-if="this.happDir" :directory="this.happDir"> </DirectoryTree>
              </ui5-tree>
            </div>
          </div>
        </div>
      </div>
    </div>

    <mwc-button slot="secondaryAction" dialogAction="close" label="Cancel"></mwc-button>
    <mwc-button slot="primaryAction" dialogAction="close" @click="scaffoldApp()" label="Create"></mwc-button>
  </mwc-dialog>

  <mwc-dialog
    ref="helpdialog"
    :heading="settingUp ? 'Next Steps' : 'App Scaffolded!'"
    scrimClickAction=""
    escapeKeyAction=""
  >
    <div v-if="!settingUp" class="column">
      <h3>Manual Setup</h3>
      <span
        >If you haven't yet, <b><a href="https://nixos.org/download.html">install nix-shell</a>.</b></span
      >
      <span>Run this to get started:</span>
      <pre><code class="language-bash" style="word-break: break-all;">cd {{ currentDir }}/{{ happName }}
nix-env -iA cachix -f https://cachix.org/api/v1/install
cachix use holochain-ci
nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/nixos-21.11.tar.gz -p niv --run "niv init && niv drop nixpkgs && niv drop niv && niv add -b main holochain/holonix"
nix-shell
npm install</code></pre>
      <span>After completing the manual setup, proceed to "Next Steps" to see relevant documentation.</span>
      <span style="margin-top: 16px">OR</span>
      <h3>Automatic Setup</h3>
      <span>You can automatically setup your app by selecting "AUTOMATIC SETUP".</span>
    </div>
    <div v-else class="column">
      <span>Here are some useful resources to begin the development of your hApp.</span>
      <ul>
        <li>
          <a href="https://developer.holochain.org/concepts/">Core Concepts</a>
        </li>
        <li>
          <a href="https://docs.rs/hdk">HDK Documentation</a>
        </li>
        <li>
          <a href="https://forum.holochain.org/">Holochain Forum</a>
        </li>
        <li>
          <a href="https://github.com/holochain/happ-build-tutorial/">hApp Build Tutorial</a>
        </li>
        <li>
          <a href="https://holochain-gym.github.io/developers/basic/zome-functions/">Holochain Gym Tutorial</a>
        </li>
      </ul>

      <span style="margin-top: 16px"
        >You can safely close this window now, and wait for the automatic setup to complete in the terminal
        window.</span
      >
    </div>
    <mwc-button slot="secondaryAction" @click="settingUp = true" label="Next Steps" v-if="!settingUp"></mwc-button>
    <mwc-button
      slot="primaryAction"
      v-if="!settingUp"
      @click="setup()"
      label="Automatic Setup"
      :disabled="settingUp"
    ></mwc-button>
  </mwc-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket } from '../socket';
import { ClientEventType } from '@holochain-scaffolding/events';
import { generateVueApp } from '@holochain-scaffolding/vue';
import { generateLitApp } from '@holochain-scaffolding/lit';
import { generateSvelteApp } from '@holochain-scaffolding/svelte';
import { webHapp } from '@holochain-scaffolding/generators';
import { HappDefinition } from '@holochain-scaffolding/definitions';
import AppDefinitionBuilder from './AppDefinitionBuilder.vue';
import DirectoryTree from './DirectoryTree.vue';
import type { Dialog } from '@material/mwc-dialog';
import { ScDirectory } from '@source-craft/types';

export default defineComponent({
  name: 'Scaffold',
  components: {
    AppDefinitionBuilder,
    DirectoryTree,
  },
  data(): {
    settingUp: boolean;
    currentDir: string | undefined;
    happDir: ScDirectory | undefined;
    happName: string | undefined;
    selectedPreviewFileContents: string | undefined;
  } {
    return {
      settingUp: false,
      currentDir: undefined,
      happDir: undefined,
      happName: undefined,
      selectedPreviewFileContents: undefined,
    };
  },
  async mounted() {
    socket.emit(ClientEventType.ReadDir, (dir: { dirPath: string }) => (this.currentDir = dir.dirPath));
  },
  methods: {
    setup() {
      this.settingUp = true;
      socket.emit(ClientEventType.AutomaticSetup, this.happName);
    },
    close() {
      socket.emit(ClientEventType.Exit);
    },
    scaffoldApp(): void {
      socket.emit(ClientEventType.WriteDirectory, {
        happ: this.happDir,
        happName: this.happName,
      });
      (this.$refs.helpdialog as Dialog).show();
    },
    async generateFileChanges({ happ, uiTemplate }: { happ: HappDefinition; uiTemplate: string }) {
      if (uiTemplate === 'vue') {
        this.happDir = webHapp(happ, generateVueApp(happ));
      } else if (uiTemplate === 'lit') {
        this.happDir = webHapp(happ, generateLitApp(happ));
        } else if (uiTemplate === 'svelte') {
        this.happDir = webHapp(happ, generateSvelteApp(happ));
        }

      this.happName = happ.name;
      (this.$refs.dialog as Dialog).show();
    },
  },
});
</script>
<style scoped>
.text-input {
  width: 424px;
  margin: 16px;
}
</style>
