'use client';

import React from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import styles from './Topbar.module.css';

interface TopbarProps {
    title?: string;
}

export default function Topbar({ title = 'Dashboard' }: TopbarProps) {
    return (
        <header className={styles.topbar}>
            <div className={styles.left}>
                <h1 className={styles.title}>{title}</h1>
            </div>

            <div className={styles.center}>
                <div className={styles.searchContainer}>
                    <svg
                        className={styles.searchIcon}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search contacts, agents, calls..."
                    />
                    <kbd className={styles.shortcut}>⌘K</kbd>
                </div>
            </div>

            <div className={styles.right}>
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notifications */}
                <button className={styles.iconBtn} title="Notifications">
                    <span className={styles.notificationDot} />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                </button>

                {/* Quick Actions */}
                <button className={styles.primaryBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" x2="12" y1="5" y2="19" />
                        <line x1="5" x2="19" y1="12" y2="12" />
                    </svg>
                    New Agent
                </button>
            </div>
        </header>
    );
}
