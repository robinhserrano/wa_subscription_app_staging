import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import PrimeVue from 'primevue/config';
import Noir from './presets/Noir';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

// Import FontAwesome core and icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCoffee, faFilterCircleDollar, faUser } from '@fortawesome/free-solid-svg-icons';// Import the icons you need

// Add the icons to the library
library.add(faFilterCircleDollar, faUser); // Add your icons here

const appName = import.meta.env.VITE_APP_NAME || 'WA Filter Sub - Ops';

createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
	setup({ el, App, props, plugin }) {
		return (
			createApp({ render: () => h(App, props) })
				.use(plugin)
				.use(ZiggyVue)
				.use(PrimeVue, {
					theme: {
						preset: Noir,
						options: {
							prefix: 'p',
							darkModeSelector: '.p-dark',
							cssLayer: false
						}
					}
				})
				.use(ToastService)
				.component('Toast', Toast).component('FontAwesomeIcon', FontAwesomeIcon)
				// .component('DataTable', DataTable)  // Register DataTable globally
				// .component('Column', Column)
				.mount(el)
		);
	},
	progress: {
		color: '#4B5563'
	}
});
