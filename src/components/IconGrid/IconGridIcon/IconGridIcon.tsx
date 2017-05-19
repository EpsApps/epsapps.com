import * as React from 'react';
import * as styles from './IconGridIcon.css';

export type SVGPathDescription = string;
export type Color = string;

export interface IColorSet {
    light: Color,
    medium: Color,
    dark: Color,
    boxShadow: Color,
    parentBackground?: Color,
    altParentBackground?: Color
}

export interface IIconGridIconProps {
    title: string,
    svgPathDesription: SVGPathDescription,
    colorSet: IColorSet
}

interface IIconGridState {
    hover: boolean;
}

export class IconGridIcon extends React.Component<IIconGridIconProps, IIconGridState> {

    constructor(props: IIconGridIconProps) {
        super(props);
        this.state = {
            hover: false
        }
    }

    onMouseOver = () => {
        this.setState({ hover: true });
    }

    onMouseOut = () => {
        this.setState({ hover: false });
    }

    render() {

        let circleStroke = (this.state.hover) ? this.props.colorSet.dark : this.props.colorSet.parentBackground;
        let pathFill = (this.state.hover) ? 'white' : this.props.colorSet.dark;
        let h3Color = (this.state.hover) ? this.props.colorSet.dark : this.props.colorSet.dark;

        return (
            <div className={styles.iconGridIcon} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                <div className={styles.imageContainer}>
                    <svg style={{ backgroundColor: this.props.colorSet.parentBackground }} width="100%" height="100%" viewBox="150 150 700 700">
                        <circle cx="500" cy="500" r="250" strokeWidth="500" fill="none" style={{ stroke: circleStroke }} />
                        <path style={{ fill: pathFill }} d={this.props.svgPathDesription} />
                    </svg>
                </div>
                <h3 style={{ color: h3Color }}>
                    {this.props.title}
                </h3>
            </div>
        )
    }

    componentDidMount() {
    }

}

export default IconGridIcon;