import * as React from 'react';
import * as styles from './Nav.css';
import * as SVGPathDescriptions from './../../data/SVGPathDescriptions' 

export interface INavItem {
    title: string,
    onClick: Function,
    linksExternally?: boolean
}

interface INavProps {
    navItems: Array<INavItem>
}

interface INavState {
    activeIndex: number
}

export class Nav extends React.Component<INavProps, INavState> {

    constructor(props: INavProps) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    renderNavItems() {
        let onNavItemClick = (navItem: INavItem, index: number) => {
            if (!navItem.linksExternally) this.setState({activeIndex: index});
            navItem.onClick();
        }
        let activeIndex = this.state.activeIndex;
        return this.props.navItems.map(function (navItem, index) {
            let state = (index === activeIndex) ? 'active' : '' ;
            return <a className={styles[state]} key={index} onClick={() => onNavItemClick(navItem, index)}>{navItem.title}</a>
        });
    }

    render() {
        return (
            <div className={styles.nav}>
                <div className={styles.contentWrapper}>
                    <svg width="100%" height="100%" viewBox="0 0 1000 1000">
                        <path d={SVGPathDescriptions.EPS_APPS_SQUARE} />
                    </svg>
                    <div className={styles.links}>
                        {this.renderNavItems()}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
    }

}

export default Nav;