import * as React from 'react';
import { IconGridIcon, IIconGridIconProps, IColorSet } from './../IconGridIcon/IconGridIcon';
import * as styles from './IconGridSection.css';

export interface IIconGridSectionProps {
    icons: Array<IIconGridIconProps>,
    title: string,
    backgroundColor: string,
    altBackgroundColor: string,
    id: string
}

interface IIconGridSectionState {
}

export class IconGridSection extends React.Component<IIconGridSectionProps, IIconGridSectionState> {

    constructor(props: IIconGridSectionProps) {
        super(props);
    }

    renderIcons(icons: Array<IIconGridIconProps>, backgroundColor: string, altBackgroundColor: string) {
        return icons.map(function (icon, index) {
            let colorSet: IColorSet = { light: icon.colorSet.light, medium: icon.colorSet.medium, dark: icon.colorSet.dark, boxShadow: icon.colorSet.boxShadow, parentBackground: backgroundColor, altParentBackground: altBackgroundColor }
            return <IconGridIcon key={index} title={icon.title} colorSet={colorSet} svgPathDesription={icon.svgPathDesription} />
        });
    }

    render() {
        return (
            <div id={this.props.id} className={styles.iconGridSection} style={{backgroundColor: this.props.backgroundColor}}>
                <div className={styles.contentWrapper}>
                    <h2>
                        {this.props.title}
                    </h2>
                    <div className={styles.icons}>
                        {this.renderIcons(this.props.icons, this.props.backgroundColor, this.props.altBackgroundColor)}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
    }

}

export default IconGridSection;