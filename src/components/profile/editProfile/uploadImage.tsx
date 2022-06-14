import React, { forwardRef } from 'react';
import ImageUploading from 'react-images-uploading';

interface Image {
    data_url: string;
    file: File;
}

interface File {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
}

const UploadImage = ({ getImage }: any) => {
    const [images, setImages] = React.useState([]);

    const onChange = (imageList: any) => {
        if (imageList.length !== 0) {
            getImage(imageList[0]);
        }
        setImages(imageList);
    };

    return (
        <div className="App">
            <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
                {({ imageList, onImageUpload, isDragging, dragProps }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <div style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                            Click or Drop here
                        </div>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="180" />
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default UploadImage;
