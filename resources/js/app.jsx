import './bootstrap';
import '../css/app.css';
import '../css/slider-fixes.css';
import '../scss/styles.scss';
import '../css/animate.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import TransitionLayout from './Components/TransitionLayout';
import NavigationEvents from './Components/NavigationEvents';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <NavigationEvents />
                <TransitionLayout pageKey={props.key}>
                    <App {...props} />
                </TransitionLayout>
            </>
        );
    },
    progress: false,
});
