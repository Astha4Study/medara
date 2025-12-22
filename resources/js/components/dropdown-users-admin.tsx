import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';

interface Props {
    id: number;
    name: string;
}

export default function DropdownUsersAdmin({ id, name }: Props) {
    const [openAlert, setOpenAlert] = useState(false);

    const handleDelete = () => {
        router.delete(`/admin/users/${id}`);
    };

    return (
        <>
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
                            href={`/admin/users/${id}`}
                            className="flex items-center gap-3 text-blue-600 hover:bg-blue-50"
                        >
                            <Eye className="h-4 w-4 text-blue-500" /> Lihat
                            Detail
                        </Link>
                    </DropdownMenuItem>

                    {/* Edit */}
                    <DropdownMenuItem asChild>
                        <Link
                            href={`/admin/users/${id}/edit`}
                            className="flex items-center gap-3 text-emerald-600 hover:bg-emerald-50"
                        >
                            <Edit className="h-4 w-4 text-emerald-500" /> Edit
                        </Link>
                    </DropdownMenuItem>

                    {/* Hapus */}
                    <DropdownMenuItem
                        onClick={() => setOpenAlert(true)}
                        className="flex cursor-pointer items-center gap-3 text-red-600 hover:bg-red-50"
                    >
                        <Trash className="h-4 w-4 text-red-500" /> Hapus
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin ingin menghapus user <b>{name}</b>
                            ? Tindakan ini tidak bisa dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Ya, Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
