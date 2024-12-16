/******************************************************************************
 * Copied from generated file to wrap in AuthProvider
 ******************************************************************************/

import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from 'Frontend/generated/routes';
import { AuthProvider } from './auth';

function App() {
    return <AuthProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </AuthProvider>;
}

const outlet = document.getElementById('outlet')!;
let root = (outlet as any)._root ?? createRoot(outlet);
(outlet as any)._root = root;
root.render(createElement(App));
