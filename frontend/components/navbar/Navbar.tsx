'use client';

import React from 'react';
import {useState} from 'react'
import styles from './styles.module.css';

function MoreButton({setExpanded}: {setExpanded: Function}) {
	return <div onClick={() => {setExpanded((state: boolean) => !state)}} className={styles.moreButton}>
		<div className={styles.moreButtonLine}></div>
		<div className={styles.moreButtonLine}></div>
		<div className={styles.moreButtonLine}></div>
	</div>
}

export default function Navbar() {
	const [isExpanded, setExpanded] = useState(false);
	return (
		<header className={styles.navbar}>
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
				<MoreButton setExpanded={setExpanded}/>
				<div className={isExpanded ? (styles.navigation, styles.expandedNavigation) : styles.navigation}>
					<a href="/">Home</a>
					<a href="/discover">Discover</a>
					<a href="/contribute">Contribute</a>
					<a href="/opendev">Open Dev</a>
					<a href="/about">About</a>
				</div>
		</header>
	);
}
