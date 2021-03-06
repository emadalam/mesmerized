import React, { Component } from 'react';
import Draggable from 'react-draggable';
import EditIcon from 'react-icons/lib/fa/info';
import MdDeleteForever from 'react-icons/lib/md/delete-forever';
import MdCheck from 'react-icons/lib/md/check';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Button from 'react-toolbox/lib/button/Button';
import './style.css';

const THEMES = [
    'default', 'yellow', 'orange', 'red', 'green',
    'blue', 'purple', 'lightpurple', 'metallic', 'offwhite'
];

const getThemeSelectionBoxes = ({ onThemeSelect, selectedTheme }) => THEMES.map(theme => (
    <div
        key={theme}
        className={`sticky-note__theme__selector_box sticky-note__theme_${theme}__preview`}
        onClick={() => onThemeSelect(theme)} >
        {selectedTheme === theme &&
            <MdCheck className="sticky-note__theme__selector_box_icon" />}
    </div>
));

class StickyNote extends Component {
    static defaultProps = {
        theme: 'default',
    };

    state = {
        flipped: false,
    };

    toggleFlipped = (flipped = true) => {
        this.setState({ flipped });
    }

    render() {
        const {
            note,
            defaultDragPosition,
            applyAnimation,
            onNoteChange,
            onDeleteClick,
            onDragStop,
            onThemeChange
        } = this.props;

        const { theme } = this.props;
        const { flipped } = this.state;

        return (
            <Draggable
                handle=".sticky-note__front"
                cancel=".sticky-note__textarea"
                onStop={onDragStop}
                defaultPosition={defaultDragPosition} >
                <div>
                    <div className={`sticky-note__container ${flipped ? 'hover' : ''} sticky-note__theme_default sticky-note__theme_${theme} ${applyAnimation ? 'animated rubberBand' : ''}`}>
                        <div className="sticky-note__body">
                            <div className="sticky-note__front">
                                <div className="sticky-note__front__content">
                                    <textarea
                                        className="sticky-note__textarea"
                                        value={note}
                                        onChange={onNoteChange} />
                                    <EditIcon
                                        className="sticky-note__editIcon"
                                        onClick={() => this.toggleFlipped(true)} />
                                </div>
                            </div>
                            <div className="sticky-note__back">
                                <div className="sticky-note__back__content">
                                    <IconButton inverse
                                        className="sticky-note__deleteIcon"
                                        icon={<MdDeleteForever />}
                                        onClick={onDeleteClick} />
                                    <div className="sticky-note__theme__selector">
                                        {
                                            getThemeSelectionBoxes({
                                                onThemeSelect: onThemeChange,
                                                selectedTheme: theme
                                            })
                                        }
                                    </div>
                                    <div className="sticky-note__back__footer">
                                        <Button raised
                                            label="Done"
                                            onClick={() => this.toggleFlipped(false)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

export default StickyNote;
