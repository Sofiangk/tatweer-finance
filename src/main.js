import { createApp } from 'vue';
import './assets/main.css';
import App from './App.vue';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
// Replace this with your actual public key from EmailJS (Account > API Keys)
emailjs.init('cb_CQGhR4NAY7Lopv');

createApp(App).mount('#app');
