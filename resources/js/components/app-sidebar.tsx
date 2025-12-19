import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookPlus,
    ClipboardList,
    CreditCard,
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
import { NavMain } from './nav-main';

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
            main: ['Dashboard', 'Klinik', 'Tambah Layanan'],
            footer: ['Tambah User', 'Pengaturan'],
        },
        resepsionis: {
            main: ['Dashboard', 'Pasien', 'Antrian', 'Klinik', 'Pembayaran'],
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

    const groupedNav: { title: string; items: NavItem[] }[] = [
        {
            title: 'Umum',
            items: mainNavItems.filter((i) => ['Dashboard'].includes(i.title)),
        },
        {
            title: 'Manajemen Pasien',
            items: mainNavItems.filter((i) =>
                ['Pasien', 'Antrian', 'Catatan Layanan Pasien'].includes(
                    i.title,
                ),
            ),
        },
        {
            title: 'Manajemen Klinik',
            items: mainNavItems.filter((i) =>
                ['Klinik', 'Tambah Layanan'].includes(i.title),
            ),
        },
        {
            title: 'Apotek',
            items: mainNavItems.filter((i) =>
                ['Daftar Obat', 'Resep Masuk', 'Penyerahan Obat'].includes(
                    i.title,
                ),
            ),
        },
        {
            title: 'Pembayaran',
            items: mainNavItems.filter((i) => ['Pembayaran'].includes(i.title)),
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
                {groupedNav.map(
                    (group) =>
                        group.items.length > 0 && (
                            <SidebarGroup key={group.title}>
                                <SidebarGroupLabel>
                                    {group.title}
                                </SidebarGroupLabel>
                                <NavMain items={group.items} />
                            </SidebarGroup>
                        ),
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
