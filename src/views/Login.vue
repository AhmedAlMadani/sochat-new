<template>
    <h1>Login</h1>
    <p><input type="text" placeholder="Emain" v-model="email"/></p>
    <p><input type="text" placeholder="Password" v-model="password"/></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="login">Login</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const errorMessage = ref();
const router = useRouter();

const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data)=> {
        console.log("Successfully signed in");
        console.log(auth.currentUser);
        router.push('/')
    })
    .catch((error) => {
        console.log(error.code);
        switch(error.code){
            case "auth/invalid-email":
                errorMessage.value = "Invalid email";
                break;
            case "auth/user-not-found":
                errorMessage.value = "No account with this email has been found";
                break;
            case "auth/invalid-password":
                errorMessage.value = "Incorrect password";
                break;
            default: 
                errorMessage.value = "Email or password was incorrect";
                break;
        }
    });
};

</script>

<style>

</style>