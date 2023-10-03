import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas, IconName} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

library.add(fab, fas);

export default function SocialsButton({node, inline, className, children, link, colour, brand, brand_colour}: {
    node: Element;
    inline: boolean | undefined;
    className: string | undefined;
    children: React.ReactNode & React.ReactNode[];
    link: string;
    colour: string;
    brand: IconName;
    brand_colour: string;
}) {
    return <a className={styles.socialButton} href={link}><button className={styles.socialButtonIn} style={{backgroundColor: colour}}><FontAwesomeIcon size='2x' color={brand_colour} icon={['fab', brand]} />{children}<FontAwesomeIcon size='2x' icon='arrow-right' /></button></a>
}