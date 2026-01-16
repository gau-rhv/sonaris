'use client';

import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './AppShell.module.css';

interface AppShellProps {
    children: ReactNode;
    title?: string;
}

export default function AppShell({ children, title }: AppShellProps) {
    return (
        <div className={styles.appShell}>
            <Sidebar />
            <div className={styles.mainWrapper}>
                <Topbar title={title} />
                <main className={styles.main}>
                    <div className={styles.content}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
