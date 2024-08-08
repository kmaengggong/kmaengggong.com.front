import '@/app/styles/globals.scss';
import '@/app/styles/layout.scss';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export const metadata = {
    title: "kmaengggong.dev",
    description: "GGWP",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <div className="main">
                    <Sidebar />
                    <main className="content">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}