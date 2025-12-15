import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';

interface Props {
    id: number;
    name: string;
    onDelete: () => void;
}

export default function DropdownAdminSuperAdmin({ id, name, onDelete }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-44 border border-gray-200 bg-white shadow-lg"
            >
                {/* Lihat Detail */}
                <DropdownMenuItem asChild>
                    <Link
                        href={`/super-admin/kelola-admin/${id}`}
                        className="flex items-center gap-3 text-blue-600 hover:bg-blue-50"
                    >
                        <Eye className="h-4 w-4 text-blue-500" />
                        Lihat Detail
                    </Link>
                </DropdownMenuItem>

                {/* Edit */}
                <DropdownMenuItem asChild>
                    <Link
                        href={`/super-admin/kelola-admin/${id}/edit`}
                        className="flex items-center gap-3 text-emerald-600 hover:bg-emerald-50"
                    >
                        <Edit className="h-4 w-4 text-emerald-500" />
                        Edit
                    </Link>
                </DropdownMenuItem>

                {/* Hapus */}
                <DropdownMenuItem
                    onClick={onDelete}
                    className="flex items-center gap-3 text-red-600 hover:bg-red-50"
                >
                    <Trash className="h-4 w-4 text-red-500" />
                    Hapus
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
