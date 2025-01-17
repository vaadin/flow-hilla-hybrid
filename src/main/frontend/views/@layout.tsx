import {
    AppLayout,
    Avatar,
    Button,
    DrawerToggle,
    Icon,
    SideNav,
    SideNavItem
} from "@vaadin/react-components";
import '@vaadin/icons';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../auth";
import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { effect, Signal, signal } from "@vaadin/hilla-react-signals";

const vaadin = window.Vaadin as {
    documentTitleSignal: Signal<string>;
};
vaadin.documentTitleSignal = signal("");
//@ts-ignore
effect(() =>  document.title = vaadin.documentTitleSignal.value);

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    vaadin.documentTitleSignal.value = useViewConfig()?.title ?? '';


    const { state, logout } = useAuth();

    // @ts-ignore
    const userName : string = state.user?.name;

    async function doLogout() {
        const isServerSideRoute = window.location.pathname === '/flow';
        await logout();
        if (isServerSideRoute) {
            // Workaround for https://github.com/vaadin/hilla/issues/2235
            window.location.reload();
        }
    }

    return (
        <AppLayout primarySection="drawer">
            <div slot="drawer" className="flex flex-col justify-between h-full p-m">
                <header className="flex flex-col gap-m">
                    <h1 className="text-l m-0">Hybrid Example With Stateful Auth</h1>
                    <SideNav
                        onNavigate={({ path }) => navigate(path!)}
                        location={location}>
                        {
                            createMenuItems().map(({ to, icon, title }) => (
                                <SideNavItem path={to} key={to}>
                                    {icon && <Icon icon={icon} slot="prefix"/>}
                                    {title}
                                </SideNavItem>
                            ))
                        }
                    </SideNav>
                </header>
                <footer className="flex flex-col gap-s">
                    {state.user ? (
                        <>
                            <div className="flex items-center gap-s">
                                <Avatar theme="xsmall" name={userName} />
                                {userName}
                            </div>
                            <Button onClick={async () => doLogout()}>Sign out</Button>
                        </>
                    ) : (
                        <a href="/login">
                          <Button className="w-full">Sign in</Button>
                        </a>
                    )}
                </footer>
            </div>

            <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
            <h2 slot="navbar" className="text-l m-0">
                {vaadin.documentTitleSignal}
            </h2>

            <Suspense fallback={<Placeholder />}>
                <Outlet />
            </Suspense>
        </AppLayout>
    );
}
