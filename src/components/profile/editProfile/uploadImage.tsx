import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import style from './uploadImage.module.scss';

interface Image {
    getImage: (file: File) => void;
    errors?: string;
}

const UploadImage = ({ getImage, errors }: Image) => {
    const [images, setImages] = React.useState([]);

    const onChange = (imageList: ImageListType) => {
        if (imageList.length !== 0) {
            getImage(imageList[0].file as File);
        }
        setImages(imageList as never[]);
    };
    return (
        <div className={style.imageBottom}>
            <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
                {({ imageList, onImageUpload, isDragging, dragProps }) => (
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
            {errors && <div className={style.imageError}>{errors}</div>}
        </div>
    );
};

export default UploadImage;
