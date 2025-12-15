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
    HandCoins,
    Hospital,
    LayoutGrid,
    Pill,
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

    const allMainNavItems: NavItem[] = [
        { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
        { title: 'Pasien', href: `${prefix}/pasien`, icon: Users },
        { title: 'Antrian', href: `${prefix}/antrian`, icon: Ticket },
        { title: 'Klinik', href: `${prefix}/klinik`, icon: Hospital },
        { title: 'Daftar Obat', href: `${prefix}/daftar-obat`, icon: Pill },
        { title: 'Tambah Layanan', href: `${prefix}/layanan`, icon: BookPlus },
        {
            title: 'Catatan Layanan Pasien',
            href: `${prefix}/catatan-layanan`,
            icon: ClipboardList,
        },
        { title: 'Pembayaran', href: `${prefix}/pembayaran`, icon: CreditCard },
        {
            title: 'Resep Masuk',
            href: `${prefix}/resep-masuk`,
            icon: ClipboardList,
        },
        {
            title: 'Penyerahan Obat',
            href: `${prefix}/penyerahan-obat`,
            icon: HandCoins,
        },
    ];

    const allFooterNavItems: NavItem[] = [
        {
            title: 'Kelola Admin',
            href: `${prefix}/kelola-admin`,
            icon: UserRoundPlus,
        },
        {
            title: 'Tambah User',
            href: `${prefix}/tambah-user`,
            icon: UserRoundPlus,
        },
        { title: 'Pengaturan', href: `${prefix}/pengaturan`, icon: Settings },
    ];

    const rolePermissions: Record<
        string,
        { main: string[]; footer: string[] }
    > = {
        super_admin: {
            main: ['Dashboard', 'Klinik'],
            footer: ['Kelola Admin'],
        },
        admin: {
            main: ['Dashboard', 'Klinik', 'Catatan Layanan Pasien'],
            footer: ['Tambah User', 'Pengaturan'],
        },
        resepsionis: {
            main: [
                'Dashboard',
                'Pasien',
                'Antrian',
                'Klinik',
                'Pembayaran',
            ],
            footer: [],
        },
        dokter: {
            main: [
                'Dashboard',
                'Pasien',
                'Antrian',
                'Klinik',
                'Catatan Layanan Pasien',
            ],
            footer: [],
        },
        apoteker: {
            main: [
                'Dashboard',
                'Klinik',
                'Daftar Obat',
                'Resep Masuk',
                'Penyerahan Obat',
            ],
            footer: [],
        },
    };

    const permissions = rolePermissions[role] ?? {
        main: allMainNavItems.map((i) => i.title),
        footer: allFooterNavItems.map((i) => i.title),
    };

    const mainNavItems = allMainNavItems.filter((item) =>
        permissions.main.includes(item.title),
    );

    const footerNavItems = allFooterNavItems.filter((item) =>
        permissions.footer.includes(item.title),
    );

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
                <NavFooter items={footerNavRepoItems} className="mt-2" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
