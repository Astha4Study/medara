import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    BookPlus,
    ClipboardList,
    CreditCard,
    Folder,
    Hospital,
    LayoutGrid,
    Settings,
    Ticket,
    UserRoundPlus,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { props } = usePage<{ auth?: { roles?: string[] } }>();
    const roles = props.auth?.roles || [];
    const role = roles[0] || '';

    const prefix = (() => {
        switch (role) {
            case 'super_admin':
                return '/super-admin';
            case 'admin':
                return '/admin';
            case 'resepsionis':
                return '/resepsionis';
            case 'dokter':
                return '/dokter';
            case 'apoteker':
                return '/apoteker';
            default:
                return '';
        }
    })();

    let mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Pasien',
            href: `${prefix}/pasien`,
            icon: Users,
        },
        {
            title: 'Antrian',
            href: `${prefix}/antrian`,
            icon: Ticket,
        },
        {
            title: 'Klinik',
            href: `${prefix}/klinik`,
            icon: Hospital,
        },
        {
            title: 'Tambah Layanan',
            href: `${prefix}/layanan`,
            icon: BookPlus,
        },
        {
            title: 'Layanan Pasien',
            href: `${prefix}/catatan-layanan`,
            icon: ClipboardList,
        },
        {
            title: 'Pembayaran',
            href: `${prefix}/pembayaran`,
            icon: CreditCard,
        },
        {
            title: 'Kelola Admin',
            href: `${prefix}/kelola-admin`,
            icon: UserRoundPlus,
        },
    ];

    if (role === 'super_admin') {
        mainNavItems = mainNavItems.filter(
            (item) =>
                item.title !== 'Pasien' &&
                item.title !== 'Tambah User' &&
                item.title !== 'Antrian' &&
                item.title !== 'Tambah Layanan' &&
                item.title !== 'Pembayaran',
        );
    }

    if (role === 'admin') {
        mainNavItems = mainNavItems.filter(
            (item) =>
                item.title !== 'Pasien' &&
                item.title !== 'Kelola Admin' &&
                item.title !== 'Antrian' &&
                item.title !== 'Pembayaran',
        );
    }

    if (role === 'resepsionis' || role === 'dokter') {
        mainNavItems = mainNavItems.filter(
            (item) =>
                item.title !== 'Kelola Admin' &&
                item.title !== 'Tambah Layanan',
        );
    }

    if (role === 'dokter') {
        mainNavItems = mainNavItems.filter(
            (item) =>
                item.title !== 'Tambah User' &&
                item.title !== 'Kelola Admin' &&
                item.title !== 'Tambah Layanan' &&
                item.title !== 'Pembayaran',
        );
    }

    const footerNavRepoItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    let footerNavItems = [
        {
            title: 'Tambah User',
            href: `${prefix}/tambah-user`,
            icon: UserRoundPlus,
        },
        {
            title: 'Pengaturan',
            href: `${prefix}/pengaturan`,
            icon: Settings,
        },
    ];

    if (role === 'dokter') {
        footerNavItems = footerNavItems.filter(
            (item) =>
                item.title !== 'Tambah User' && item.title !== 'Pengaturan',
        );
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="mt-4">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
