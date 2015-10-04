import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import ContentItem from './contentItem';
import PaginationLink from './paginationLink';
import NoData from './nodata';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            expanded: true
        }
    }

    handleHeaderClick() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    handleLinkClick(className) {
        let currentIndex = this.state.index;

        if (className.indexOf('next') !== -1) {
            this.setState({
                index: currentIndex + 1
            });
        } else if (className.indexOf('prev') !== -1) {
            this.setState({
                index: currentIndex - 1
            });
        }
    }

    renderContent() {
        if (this.state.expanded) {
            let data = this.props.data;

            if (data.content && data.content.length > 0) {
                const index = this.state.index;
                const item = data.content[index];
                const prevTitle = index > 0 ? data.content[index - 1].title : '';
                const nextTitle = index < data.content.length - 1 ? data.content[index + 1].title : '';

                return (
                    <div className="item-content">
                        <ContentItem item={item} />

                        <PaginationLink onLinkClick={this.handleLinkClick.bind(this)} prevTitle={prevTitle} nextTitle={nextTitle} />
                    </div>
                );
            }

            return null;
        }

        return null;
    }

    render() {
        let data = this.props.data;

        // Render error message if data is invalid
        if (!data || !data.content || data.content.length === 0) return <NoData />;

        const headerClass = classnames(
            'triangle',
            {
                'down': this.state.expanded,
                'up': !this.state.expanded
            }
         );

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="main-container col-xs-12 col-md-8">
                        <header className="item-header" onClick={this.handleHeaderClick.bind(this)}>
                            <h5>
                                <img src="../../images/icon-doc.jpg" alt="" />
                                <strong>{data.title}</strong>
                            </h5>
                            <span className={headerClass}></span>
                        </header>

                        {this.renderContent()}
                    </div>
                </div>


            </div>
        );
    }
}

Content.propTypes = {
    data: PropTypes.object.isRequired
};

Content.defaultProps = {
    data: {}
};

export default Content;
