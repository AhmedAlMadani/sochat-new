import { createRouter, createWebHashHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        
        { path: "/signup", component: () => import('../views/Signup.vue') },
        { path: "/login", component: () => import('../views/Login.vue') },
        { path: "/", component: () => import('../views/Feed.vue'),
            meta: {
                requiresAuth: true,
            },
        },
    ],
});
const getCurrentUser = () => {
    return new Promise((resolve, reject) =>{
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

router.beforeEach(async(to, from, next)=>{
    if(to.matched.some((record)=> record.meta.requiresAuth)){
        if(await getCurrentUser()){
            next();
        }else {
            alert("You do not have any access!");
            next("/login");
        }
    } else{
        next();
    }
});

export default router;