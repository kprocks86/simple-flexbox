import React from 'react';
import PropTypes from 'prop-types';

export class Layout extends React.Component {

    static propTypes = {
        style: PropTypes.object,

        column: PropTypes.bool,
        rowReverse: PropTypes.bool,
        columnReverse: PropTypes.bool,

        justifyContent: PropTypes.oneOf(['start', 'flex-start', 'center', 'end', 'flex-end', 'spaced', 'space-between', 'around', 'space-around']),

        alignItems: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),

        alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),

        alignContent: PropTypes.oneOf(['start', 'flex-start', 'center', 'end', 'flex-end', 'spaced', 'space-between', 'around', 'space-around']),

        wrap: PropTypes.bool,
        wrapReverse: PropTypes.bool,

        flexGrow: PropTypes.number,

        flexBasis: PropTypes.string,

        children: PropTypes.node.isRequired
    };

    getMainAxisAlign = (value) => {
        switch (value) {
            case 'start': return 'flex-start';
            case 'center': return 'center';
            case 'end': return 'flex-end';
            case 'space-between':
            case 'spaced': return 'space-between';
            case 'space-around':
            case 'around': return 'space-around';
            default: return 'flex-start';
        }
    }

    getCrossAxisAlign = (value) => {
        switch (value) {
            case 'start': return 'flex-start';
            case 'center': return 'center';
            case 'end': return 'flex-end';
            case 'stretch': return 'stretch';
            case 'baseline': return 'baseline';
            default: return 'stretch';
        }
    }

    render() {

        const {
            style,
            column = false,
            rowReverse = false,
            columnReverse = false,

            // Main Axis
            justifyContent,

            // Cross Axis
            alignItems,
            alignSelf,
            alignContent,

            // Wrap
            wrap = false,
            wrapReverse = false,

            flexGrow,
            flexBasis,

            ...ownProps
        } = this.props;

        let direction = { flexDirection: 'row' }; // default row
        if (column) {
            direction = { flexDirection: 'column' };
        }
        
        if (rowReverse) {
            direction = { flexDirection: 'row-reverse' };
        }
        else if (columnReverse) {
            direction = { flexDirection: 'column-reverse' };
        }

        let flexWrap = { flexWrap: 'noWrap' };
        if (wrap) {
            flexWrap = { flexWrap: 'wrap' };
        }
        else if (wrapReverse) {
            flexWrap = { flexWrap: 'wrap-reverse' };
        }

        const justifyContentStyle = justifyContent && { justifyContent: this.getMainAxisAlign(justifyContent) } || {};

        const alignItemsStyle = alignItems && { alignItems: this.getCrossAxisAlign(alignItems) } || {};

        const alignSelfStyle = alignSelf && { alignSelf: this.getCrossAxisAlign(alignSelf) } || {};

        const alignContentStyle = alignContent && { alignContent: this.getMainAxisAlign(alignContent) } || {};

        const flexGrowStyle = flexGrow && { flexGrow: flexGrow } || {};

        const flexBasisStyle = flexBasis && { flexBasis } || {};
        
        const layoutStyles = {
            display: 'flex',
            ...direction,
            ...justifyContentStyle,
            ...alignItemsStyle,
            ...alignSelfStyle,
            ...alignContentStyle,
            ...flexWrap,
            ...flexGrowStyle,
            ...flexBasisStyle,
            ...style
        };

        return (<div style={layoutStyles} {...ownProps}>
            {this.props.children}
        </div>);
    }
}

export class Row extends React.Component {

    static propTypes = {
        reverse: PropTypes.bool,
        vertical: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
        horizontal: PropTypes.oneOf(['start', 'center', 'end', 'spaced', 'space-between', 'around', 'space-around']),

        justifyContent: PropTypes.oneOf(['start', 'flex-start', 'center', 'end', 'flex-end', 'spaced', 'space-between', 'around', 'space-around']),
        alignItems: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
        alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
        alignContent: PropTypes.oneOf(['start', 'flex-start', 'center', 'end', 'flex-end', 'spaced', 'space-between', 'around', 'space-around']),

        flex: PropTypes.number,
        flexBasis: PropTypes.string,
        children: PropTypes.node.isRequired
    };

    render() {
        const { reverse = false, flex, vertical, horizontal, justifyContent, alignItems, alignSelf, alignContent, flexBasis, ...ownProps } = this.props;

        const rowReverse = reverse;

        return (
            <Layout rowReverse={rowReverse} flexGrow={flex}
                alignItems={vertical || alignItems}
                justifyContent={horizontal || justifyContent}
                alignSelf={alignSelf}
                alignContent={alignContent}
                flexBasis={flexBasis}
                {...ownProps}>
                {this.props.children}
            </Layout>
        );
    }

}

export class Column extends React.Component {

    static propTypes = {
        reverse: PropTypes.bool,
        horizontal: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
        vertical: PropTypes.oneOf(['start', 'center', 'end', 'spaced', 'space-between', 'around', 'space-around']),

        justifyContent: PropTypes.oneOf(['start', 'flex-start', 'center', 'end', 'flex-end', 'spaced', 'space-between', 'around', 'space-around']),
        alignItems: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
        alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
        alignContent: PropTypes.oneOf(['start', 'flex-start', 'center', 'end', 'flex-end', 'spaced', 'space-between', 'around', 'space-around']),

        flex: PropTypes.number,
        flexBasis: PropTypes.string,
        children: PropTypes.node.isRequired
    };

    render() {
        const { reverse = false, flex, vertical, horizontal, justifyContent, alignItems, alignSelf, alignContent, flexBasis, ...ownProps } = this.props;

        const columnReverse = reverse;

        return (
            <Layout column columnReverse={columnReverse} flexGrow={flex}
                alignItems={horizontal || alignItems}
                justifyContent={vertical || justifyContent}
                alignSelf={alignSelf}
                alignContent={alignContent}
                flexBasis={flexBasis}
                {...ownProps}>
                {this.props.children}
            </Layout>
        );
    }
}
