<template>
    <h1>Create An Account</h1>
    <p><input type="text" placeholder="First Name" v-model="firstname"/></p>
    <p><input type="text" placeholder="Last Name" v-model="lastname"/></p>
    <p><input type="text" placeholder="Emain" v-model="email"/></p>
    <p><input type="text" placeholder="Password" v-model="password"/></p>
    <p><button @click="signup">Submit</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router";
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const signup = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value, firstname.value, lastname.value)
    .then((data)=> {
        console.log("Registration successful");
        router.push('/')
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message);
    });
};

</script>

<style>

</style>