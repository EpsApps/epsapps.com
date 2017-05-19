import * as React from 'react';
import { IconGridSection, IIconGridSectionProps } from './../IconGridSection/IconGridSection';
import IconGridNav from './../IconGridNav/IconGridNav';
import * as styles from './IconGrid.css';

interface IIconGridProps {
    title: string,
    iconGridSections: Array<IIconGridSectionProps>,
    backgroundColor: string
}

interface IIconGridState {
}

class IconGrid extends React.Component<IIconGridProps, IIconGridState> {

    constructor(props: IIconGridProps) {
        super(props);
    }

    renderIconGridSections(iconGridSections: Array<IIconGridSectionProps>) {
        return iconGridSections.map(function (iconGridSection, index) {
            return <IconGridSection id={iconGridSection.id} key={index} icons={iconGridSection.icons} title={iconGridSection.title}
                backgroundColor={iconGridSection.backgroundColor} altBackgroundColor={iconGridSection.altBackgroundColor} />
        });
    }

    render() {
        return (
            <div className={styles.iconGrid}>
                <IconGridNav backgroundColor={this.props.backgroundColor} title={this.props.title} iconGridSections={this.props.iconGridSections} />
                {this.renderIconGridSections(this.props.iconGridSections)}
            </div>
        )
    }

    componentDidMount() {
    }

}

export default IconGrid;