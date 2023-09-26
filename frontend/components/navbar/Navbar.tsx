'use client';

import React from 'react';
import styles from './styles.module.css';

export default function Navbar() {
	return (
		<div className={styles.container}>
			<div className={styles.navbar}>
				<div className={styles.logo}>
					<svg
						width='19'
						height='20'
						// fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className={styles.logoGlyph}
					>
						<path d='M7.06 16.66V20l11.332-.016V16.66H7.06ZM0 0v4.143l5.728 2.245L0 8.6v4.16l11.027-4.77V4.786'></path>
					</svg>
					<span>Learn</span>
				</div>
				<div className={styles.navigation}></div>
			</div>
		</div>
	);
}
