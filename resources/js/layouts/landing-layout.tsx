import Navbar from '@/components/navbar';

type Props = {
    children: React.ReactNode;
};

export default function LandingLayout({ children }: Props) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            {children}
        </div>
    );
}
