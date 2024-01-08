import React from "react";
import AvatarEditor from "react-avatar-editor";

const ImageCrop = ({ imageSrc, onCrop, setEditorRef }) => {
    return (
        <div>
            <AvatarEditor
                ref={setEditorRef}
                width={250}
                border={0}
                height={250}
                borderRadius={50}
                image={imageSrc}
            />

            <button onClick={onCrop}>Crop it</button>
        </div>
    );
};

export default ImageCrop;
