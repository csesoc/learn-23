import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

library.add(fab, fas);

export default function SiteButton({node, inline, className, children, link, colour = "hsl(210 98.8% 94.0%)"}: {
    node: Element;
    inline: boolean | undefined;
    className: string | undefined;
    children: React.ReactNode & React.ReactNode[];
    link: string;
    colour: string;
}) {
    return <a className={styles.siteButton} href={link}><button className={styles.siteButtonIn} style={{backgroundColor: colour}}>{children}<FontAwesomeIcon size='2x' icon='arrow-right' /></button></a>
}