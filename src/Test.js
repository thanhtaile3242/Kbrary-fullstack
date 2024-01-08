import React from "react";
import AvatarEditor from "react-avatar-editor";
import ImageCrop from "./cropImage.js";

class MyEditor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userProfilePic: "",
            editor: null,
        };
    }

    setEditorRef = (editor) => {
        this.setState({
            editor,
        });
    };
    profileImageChange = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        const { type } = file;
        if (
            type.endsWith("jpeg") ||
            type.endsWith("png") ||
            type.endsWith("jpg")
        ) {
            this.setState({ selectedImage: file });
        }
    };

    onCrop = () => {
        const { editor } = this.state;
        if (editor != null) {
            const url = editor.getImageScaledToCanvas().toDataURL();
            this.setState({ userProfilePic: url });
        }
    };

    render() {
        return (
            <div className="App">
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={this.profileImageChange}
                />
                <br />
                <ImageCrop
                    imageSrc={this.state.selectedImage}
                    setEditorRef={this.setEditorRef}
                    onCrop={this.onCrop}
                />
                <img
                    src={this.state.userProfilePic}
                    alt=""
                    style={{ borderRadius: "50" }}
                />
            </div>
        );
    }
}
export default MyEditor;
