import React, { Component } from 'react';
import FullscreenImage, { IMAGE_TYPE } from '../components/FullscreenImage';
import CreditsComponent from '../components/Credits';
import placeholderImage from '../images/placeholder.jpeg';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import * as Actions from '../utils/actions';

class Background extends Component {
    static defaultProps = {
        photoUrl: placeholderImage,
        timeout: 3000,
    };

    state = {
        showCredits: false,
        creditType: null,
    };

    handlePhotoLoad = ({ type }) => {
        this.setState({
            showCredits: true,
            creditType: type,
        });
    };

    componentDidMount() {
        // lazy initialize the state object
        setTimeout(() => Actions.refresh(false), 0);
    }

    render() {
        const {
            photoUrl,
            photoMeta,
            timeout,
            previousPhotoUrl,
            placeholderPhotoUrl = placeholderImage,
            placeholderPhotoMeta
        } = this.props;

        const {
            showCredits,
            creditType
        } = this.state;

        const credits = showCredits &&
            <CreditsComponent
                meta={creditType === IMAGE_TYPE.main ?
                    photoMeta : placeholderPhotoMeta} />;

        return (
            <FullscreenImage
                src={photoUrl}
                placeholder={placeholderPhotoUrl}
                previousPhotoUrl={previousPhotoUrl}
                onPhotoLoad={this.handlePhotoLoad}
                timeout={timeout}
                credits={credits} />
        );
    }
}

export default ConnectedStoreHOC(Background);
