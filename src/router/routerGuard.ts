// 路由守卫
import type { Router } from "vue-router"
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入

export function initRouterGuard(router: Router) {
    initBeforeRouter(router)

    guardRouter(router);

    initAfterRouter(router)
}

function initBeforeRouter(router: Router) {
    router.beforeEach(async (_, __) => {
        NProgress.start();
    });
}

function guardRouter(router: Router){
    router.beforeEach(async (to, _) => {
        // 登陆认证
        const isLogin = Boolean(localStorage.getItem('token'));
        if (!isLogin && to.name !== 'Login') {
            return { name: 'Login' }
        }
    });
}


function initAfterRouter(router: Router) {
    router.afterEach(() => {
        NProgress.done();
    });
}

