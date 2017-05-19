import * as React from 'react';
import { IIconGridSectionProps } from './../IconGridSection/IconGridSection';
import * as styles from './IconGridNav.css';

interface IIconGridNavProps {
    title: string,
    iconGridSections: Array<IIconGridSectionProps>,
    backgroundColor: string
}

interface IIconGridNavState {
}

class IconGridNav extends React.Component<IIconGridNavProps, IIconGridNavState> {

    constructor(props: IIconGridNavProps) {
        super(props);
    }

    renderIconGridNav(iconGridSections: Array<IIconGridSectionProps>) {

        function scrollTo(element, to, duration) {
            if (duration <= 0) return;
            var difference = to - element.scrollTop;
            var perTick = difference / duration * 10;

            setTimeout(function () {
                element.scrollTop = element.scrollTop + perTick;
                if (element.scrollTop === to) return;
                scrollTo(element, to, duration - 10);
            }, 10);
        }

        function scrollToElement(id: string) {
            let element = document.getElementById(id);
            scrollTo(document.body, element.offsetTop, 200);
        }

        return iconGridSections.map(function (iconGridSection, index) {
            return <a onClick={() => scrollToElement(iconGridSection.id)} key={index}>{iconGridSection.title}</a>
        });

    }

    render() {
        return (
            <div className={styles.iconGridNav} style={{ backgroundColor: this.props.backgroundColor }} >
                <div className={styles.contentWrapper} >
                    <h1>{this.props.title}</h1>
                    <div className={styles.links} >
                        {this.renderIconGridNav(this.props.iconGridSections)}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
    }

}

export default IconGridNav;