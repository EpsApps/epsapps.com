import * as React from 'react';
import IconGrid from './../components/IconGrid';
import iconGridSections from './../data/iconGridSections'
import { Nav, INavItem } from './../components/Nav/Nav';
import ContactForm from './../components/ContactForm/ContactForm';

interface IHomeProps {
}

interface IHomeState {
    activeIndex: number
}

export class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    navItems: Array<INavItem> = [
        {
            title: 'Skillset',
            onClick: () => {
                this.setState({ activeIndex: 0 }) 
            }
        },
        {
            title: 'Github',
            onClick: function () {
                window.open('https://github.com/EpsApps')
            },
            linksExternally: true
        },
        {
            title: 'Contact',
            onClick: () => {
                this.setState({ activeIndex: 2 }) 
            }
        }
    ]

    renderBody() {
        switch(this.state.activeIndex) {
            case 0:
                return <IconGrid title='Skillset' iconGridSections={iconGridSections} backgroundColor='#210f6f' />;
            case 2:
                return <ContactForm />;
        }
    }

    render() {
        return (
            <div>
                <Nav navItems={this.navItems} />
                    {this.renderBody()}
            </div>
        )
    }
}

export default Home;

