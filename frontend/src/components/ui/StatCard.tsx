import React, { ReactNode } from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
    title: string;
    value: string | number;
    change?: {
        value: string;
        positive?: boolean;
    };
    icon?: ReactNode;
    trend?: ReactNode;
}

export default function StatCard({ title, value, change, icon, trend }: StatCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                {icon && <span className={styles.icon}>{icon}</span>}
            </div>
            <div className={styles.valueRow}>
                <span className={styles.value}>{value}</span>
                {change && (
                    <span className={`${styles.change} ${change.positive ? styles.positive : styles.negative}`}>
                        {change.positive ? '↑' : '↓'} {change.value}
                    </span>
                )}
            </div>
            {trend && <div className={styles.trend}>{trend}</div>}
        </div>
    );
}
