import { createPinia } from 'pinia';
import type { App } from 'vue';
import type { PiniaPluginContext } from 'pinia';
import { jsonClone } from '@/utils/commonTool';
import { StoreId } from '../enums/storeEnums';

/**
 * The plugin reset the state of the store which is written by setup syntax
 *
 * @param context
 */
function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = Object.values(StoreId) as string[];

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store;

    const defaultStore = jsonClone($state);

    context.store.$reset = () => {
      context.store.$patch(defaultStore);
    };
  }
}


export function setupStore(app: App) {
    const pinia = createPinia();
    pinia.use(resetSetupStore);
    app.use(pinia);
}

