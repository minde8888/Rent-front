import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { ProfileImage } from '../../../models/user.model';
import style from './uploadImage.module.scss';

interface Image {
    getImage: (file: File) => void;
    imageSrc?: ProfileImage;
}
export interface ImageError {
    imageFile: string;
}

const UploadProfileImage = ({ getImage, imageSrc }: Image) => {
    const [images, setImages] = React.useState([]);

    const onChange = (imageList: ImageListType) => {
        if (imageList.length !== 0) {
            getImage(imageList[0].file as File);
        }
        setImages(imageList as never[]);
    };
    return (
        <div className={style.imageBottom}>
            <ImageUploading value={images} onChange={onChange} dataURLKey="data_url" acceptType={['jpg', 'gif', 'png', 'gif']} maxFileSize={1100000}>
                {({ imageList, onImageUpload, isDragging, dragProps, errors }) => (
                    <div className={style.clickDrop}>
                        {imageSrc?.$values !== undefined && imageSrc?.$values.length > 0 ? <img src={imageSrc?.$values.toString().replaceAll(',', '')} alt="imageName" /> : null}
                        <div className={style.uploadImage} style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                            Click or Drop here
                        </div>
                        {imageList.map((image, index) => (
                            <div key={index} className={style.imageItem}>
                                <img src={image['data_url']} alt="" width="180" />
                            </div>
                        ))}
                        {errors && (
                            <div>
                                {errors.acceptType && <div className={style.profileError}>Your selected file type is not allow</div>}
                                {errors.maxFileSize && <div className={style.profileError}>File size too large, max file size is 1 Mb</div>}
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default UploadProfileImage;
