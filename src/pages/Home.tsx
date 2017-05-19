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

class GraphQLVariable {

    constructor(parameter: string, argument: any) {
        this.parameter = parameter;
        this.argument = argument;
    }

    parameter: string;
    argument: any;

}

class GraphQLObject {

    constructor(name: string, fields?: Array<string | GraphQLObject>, variables?: Array<GraphQLVariable>) {
        this.name = name;
        this.fields = (fields) ? fields : [];
        this.variables = (variables) ? variables : [];
    }

    protected name: string;
    protected fields: Array<string | GraphQLObject>;
    protected variables: Array<GraphQLVariable>;

    setFields(fields: Array<string | GraphQLObject>) {
        this.fields = fields;
    }

    addField(field: string | GraphQLObject) {
        this.fields.push(field);
    }

    setVariables(variables: Array<GraphQLVariable>) {
        this.variables = variables;
    }

    addVariable(variable: GraphQLVariable) {
        this.variables.push(variable);
    }

    toString() {

        let baseString = this.name;

        if (this.variables.length > 0) {
            baseString += '(';
            this.variables.forEach(function (variable, index) {
                if (index > 0) baseString += ', ';
                baseString += variable.parameter + ': ';
                if ((typeof variable.argument) == 'string') {
                    baseString += '"' + variable.argument + '"';
                } else if ((typeof variable.argument) == 'number') {
                    baseString += variable.argument;
                }
            });
            baseString += ')';
        }

        if (this.fields.length > 0) {
            baseString += ' {';
            this.fields.forEach(function (field) {
                baseString += ' ';
                if (field instanceof GraphQLObject) {
                    baseString += field.toString();
                } else {
                    baseString += field;
                }
            });
            baseString += ' }';
        }

        return baseString;

    }

}

class GraphQLQuery {

    constructor(objects: Array<GraphQLObject>) {
        this.objects = objects;
    }

    protected objects: Array<GraphQLObject>;

    toString() {

        let baseString = '{ ';
        this.objects.forEach(function (object, index) {
            if (index > 0) baseString += ', ';
            baseString += object.toString();
        });
        baseString += ' }'

        return baseString;

    }

}

function logQuery() {

    let length = new GraphQLVariable('length', 3);
    let role = new GraphQLVariable('role', 'superUser');

    let article = new GraphQLObject('article');
    article.setFields(['category', 'dateCreated', 'path']);

    let importantAlerts = new GraphQLObject('importantAlerts');
    importantAlerts.setVariables([length, role]);
    importantAlerts.setFields(['title', 'dateCreated']);

    let newAndUpdated = new GraphQLObject('newAndUpdated');
    newAndUpdated.setVariables([length, role]);
    newAndUpdated.setFields(['title', 'category', 'dateUpdated', 'description', 'path']);

    let favorites = new GraphQLObject('favorites');
    favorites.setVariables([length]);
    favorites.setFields(['title', article]);

    let reading = new GraphQLObject('reading');
    reading.setVariables([length]);
    reading.setFields(['creator', 'title', article]);

    let history = new GraphQLObject('history');
    history.setVariables([length]);
    history.setFields(['title', 'category', 'dateCreated', 'path']);

    let messageArchives = new GraphQLObject('messageArchives');
    messageArchives.setVariables([length, role]);
    messageArchives.setFields(['title', 'category', 'dateCreated', 'path']);

    let trending = new GraphQLObject('trending');
    trending.setVariables([length, role]);
    trending.setFields(['title', 'category', 'dateCreated', 'path']);

    let query = new GraphQLQuery([importantAlerts, newAndUpdated, favorites, reading, history, messageArchives, trending]);
    console.log(query.toString());

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
        logQuery();
        return (
            <div>
                <Nav navItems={this.navItems} />
                    {this.renderBody()}
            </div>
        )
    }
}

export default Home;

