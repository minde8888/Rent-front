import React from 'react';
import ImageUploading from 'react-images-uploading';
import style from './uploadImage.module.scss'

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

const UploadImage = ({ getImage, image }: any) => {

    const [images, setImages] = React.useState([]);

    const onChange = (imageList: any) => {
        if (imageList.length !== 0) {
            getImage(imageList[0]);
        }
        setImages(imageList);
    };

    return (
        <div className={style.imageBottom}>
            <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
                {({ imageList, onImageUpload, isDragging, dragProps }) => (
                    // write your building UI
                    <div className={style.clickDrop}>
                        <div className={style.uploadImage} style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                            Click or Drop here
                        </div>
                        {imageList.map((image, index) => (
                            <div key={index} className={style.imageItem}>
                                <img src={image['data_url']} alt="" width="180" />
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
            {image && <div className={style.imageError}>{image}</div>}
        </div>
    );
};

export default UploadImage;
