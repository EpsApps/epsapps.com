import * as uuid from 'uuid';
import { IIconGridIconProps, IColorSet, IIconGridSectionProps } from './../components/IconGrid';
import * as SVGPathDescriptions from './SVGPathDescriptions';
import * as ColorSets from './ColorSets';

const BOX_SHADOW_LIGHT = '#';
const BOX_SHADOW_MEDIUM = '#';
const BOX_SHADOW_DARK = '#';

const BACKGROUND_COLOR_WHITE = 'white';
const BACKGROUND_COLOR_LIGHT_GREY = '#f4fbff'

//
//
// LANGUAGES

const TYPESCRIPT: IIconGridIconProps = {
    title: 'TypeScript',
    svgPathDesription: SVGPathDescriptions.TYPESCRIPT,
    colorSet: ColorSets.MICROSOFT_BLUE
}

const JAVASCRIPT: IIconGridIconProps = {
    title: 'JavaScript',
    svgPathDesription: SVGPathDescriptions.JAVASCRIPT,
    colorSet: ColorSets.JAVASCRIPT_GOLD
}

const SWIFT: IIconGridIconProps = {
    title: 'Swift',
    svgPathDesription: SVGPathDescriptions.SWIFT,
    colorSet: ColorSets.APPLE_RED
}

const C_SHARP: IIconGridIconProps = {
    title: 'C#',
    svgPathDesription: SVGPathDescriptions.VISUAL_STUDIO_CODE,
    colorSet: ColorSets.MICROSOFT_PURPLE
}

const OBJECTIVE_C: IIconGridIconProps = {
    title: 'Objective-C',
    svgPathDesription: SVGPathDescriptions.XCODE,
    colorSet: ColorSets.APPLE_BLUE
}

const JAVA: IIconGridIconProps = {
    title: 'Java',
    svgPathDesription: SVGPathDescriptions.JAVA,
    colorSet: ColorSets.JAVA_RED
}

const HTML: IIconGridIconProps = {
    title: 'HTML',
    svgPathDesription: SVGPathDescriptions.HTML,
    colorSet: ColorSets.HTML_ORANGE
}

const CSS: IIconGridIconProps = {
    title: 'CSS',
    svgPathDesription: SVGPathDescriptions.CSS,
    colorSet: ColorSets.CSS_BLUE
}

const SQL: IIconGridIconProps = {
    title: 'SQL',
    svgPathDesription: SVGPathDescriptions.SQL,
    colorSet: {
        light: '#e9ebf3',
        medium: '#5561a5',
        dark: '#2b3a8f',
        boxShadow: BOX_SHADOW_LIGHT
    }
}

//
//
// PLATFORMS

const WEB: IIconGridIconProps = {
    title: 'Web',
    svgPathDesription: SVGPathDescriptions.CLOUD,
    colorSet: ColorSets.WEB_PURPLE
}

const IOS: IIconGridIconProps = {
    title: 'iOS',
    svgPathDesription: SVGPathDescriptions.APPLE,
    colorSet: ColorSets.APPLE_RED
}

const OSX: IIconGridIconProps = {
    title: 'OS X',
    svgPathDesription: SVGPathDescriptions.OSX,
    colorSet: ColorSets.APPLE_BLUE
}

const ANDROID: IIconGridIconProps = {
    title: 'Android',
    svgPathDesription: SVGPathDescriptions.ANDROID,
    colorSet: ColorSets.ANDROID_TURQUOISE
}

const WINDOWS: IIconGridIconProps = {
    title: 'Windows',
    svgPathDesription: SVGPathDescriptions.WINDOWS,
    colorSet: ColorSets.MICROSOFT_BLUE
}

//
//
// MY PREFERRED ENVIRONMENT

const REACT: IIconGridIconProps = {
    title: 'React',
    svgPathDesription: SVGPathDescriptions.REACT,
    colorSet: ColorSets.REACT_BLUE
}

const REDUX: IIconGridIconProps = {
    title: 'Redux',
    svgPathDesription: SVGPathDescriptions.REDUX,
    colorSet: ColorSets.REDUX_PURPLE
}

const NODE: IIconGridIconProps = {
    title: 'Node',
    svgPathDesription: SVGPathDescriptions.NODE,
    colorSet: ColorSets.EXPRESS_TURQUOISE
}

const WEBPACK: IIconGridIconProps = {
    title: 'Webpack',
    svgPathDesription: SVGPathDescriptions.WEBACK,
    colorSet: ColorSets.CSS_BLUE
}

const AWS: IIconGridIconProps = {
    title: 'AWS',
    svgPathDesription: SVGPathDescriptions.AWS,
    colorSet: ColorSets.JAVASCRIPT_GOLD
}

const NPM: IIconGridIconProps = {
    title: 'NPM',
    svgPathDesription: SVGPathDescriptions.NPM,
    colorSet: ColorSets.JAVA_RED
}

const GITHUB: IIconGridIconProps = {
    title: 'Github',
    svgPathDesription: SVGPathDescriptions.GITHUB,
    colorSet: ColorSets.WEB_PURPLE
}

const EXPRESS: IIconGridIconProps = {
    title: 'Express',
    svgPathDesription: SVGPathDescriptions.EXPRESS,
    colorSet: ColorSets.EXPRESS_TURQUOISE
}

const ELASTICSEARCH: IIconGridIconProps = {
    title: 'Elasticsearch',
    svgPathDesription: SVGPathDescriptions.ELASTICSEARCH,
    colorSet: ColorSets.ELASTICSEARCH_MAGENTA
}

const POSTGRESQL: IIconGridIconProps = {
    title: 'PostgreSQL',
    svgPathDesription: SVGPathDescriptions.POSTGRESQL,
    colorSet: ColorSets.SQL_BLUE
}

const DOCKER: IIconGridIconProps = {
    title: 'Docker',
    svgPathDesription: SVGPathDescriptions.DOCKER,
    colorSet: ColorSets.CSS_BLUE
}

const ELECTRON: IIconGridIconProps = {
    title: 'Electron',
    svgPathDesription: SVGPathDescriptions.ELECTRON,
    colorSet: ColorSets.REACT_BLUE
}

const VISUAL_STUDIO_CODE: IIconGridIconProps = {
    title: 'Visual Studio Code',
    svgPathDesription: SVGPathDescriptions.VISUAL_STUDIO_CODE,
    colorSet: ColorSets.MICROSOFT_BLUE
}

//
//
// IDEs

const XCODE: IIconGridIconProps = {
    title: 'Xcode',
    svgPathDesription: SVGPathDescriptions.XCODE,
    colorSet: ColorSets.APPLE_BLUE
}

const ANDROID_STUDIO: IIconGridIconProps = {
    title: 'Android Studio',
    svgPathDesription: SVGPathDescriptions.ANDROID,
    colorSet: ColorSets.ANDROID_TURQUOISE
}

const VISUAL_STUDIO: IIconGridIconProps = {
    title: 'Visual Studio',
    svgPathDesription: SVGPathDescriptions.VISUAL_STUDIO_CODE,
    colorSet: ColorSets.MICROSOFT_PURPLE
}

const ECLIPSE: IIconGridIconProps = {
    title: 'Eclipse',
    svgPathDesription: SVGPathDescriptions.ECLIPSE,
    colorSet: ColorSets.WEB_PURPLE
}

//
//
// Export

const LANGUAGES: IIconGridSectionProps = {
    icons: [TYPESCRIPT, JAVASCRIPT, SWIFT, C_SHARP, OBJECTIVE_C, JAVA, HTML, CSS, SQL],
    title: 'Languages',
    backgroundColor: BACKGROUND_COLOR_WHITE,
    altBackgroundColor: BACKGROUND_COLOR_LIGHT_GREY,
    id: uuid.v4()
}

const PLATFORMS: IIconGridSectionProps = {
    icons: [WEB, IOS, OSX, ANDROID, WINDOWS],
    title: 'Platforms',
    backgroundColor: BACKGROUND_COLOR_LIGHT_GREY,
    altBackgroundColor: BACKGROUND_COLOR_WHITE,
    id: uuid.v4()
}

const MY_FAVORITE_TECH: IIconGridSectionProps = {
    icons: [TYPESCRIPT, REACT, REDUX, NODE, WEBPACK, AWS, NPM, GITHUB, VISUAL_STUDIO_CODE, EXPRESS, ELASTICSEARCH, POSTGRESQL, DOCKER, ELECTRON],
    title: 'Favorite Tech',
    backgroundColor: BACKGROUND_COLOR_WHITE,
    altBackgroundColor: BACKGROUND_COLOR_LIGHT_GREY,
    id: uuid.v4()
}

const IDES: IIconGridSectionProps = {
    icons: [VISUAL_STUDIO_CODE, XCODE, ANDROID_STUDIO, VISUAL_STUDIO, ECLIPSE],
    title: 'IDEs',
    backgroundColor: BACKGROUND_COLOR_LIGHT_GREY,
    altBackgroundColor: BACKGROUND_COLOR_WHITE,
    id: uuid.v4()
}

const iconGridSections = [LANGUAGES, PLATFORMS, MY_FAVORITE_TECH, IDES];
export default iconGridSections;