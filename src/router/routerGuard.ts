// 路由守卫

import { useLoginStore } from "@/stores/global/loginStore"
import type { Router } from "vue-router"
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入

export function initRouterGuard(router: Router) {
    initBeforeRouter(router)
    initAfterRouter(router)
}

function initBeforeRouter(router: Router) {
    router.beforeEach(async (to, from) => {
        // Start progress bar
        NProgress.start();

        const loginStore = useLoginStore()
        if (!loginStore.isLoggedIn && to.name !== 'Login') {
            return { name: 'Login' }
        }
        return true;
    });
}

function initAfterRouter(router: Router) {
    router.afterEach(() => {
        NProgress.done();
    });
}

