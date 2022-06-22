import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { ProfileImage } from '../../../../models/user.model';
import { ImageData } from '../../typings';
import style from '../uploadImages/uploadProductImages.module.scss';

interface Images {
    getImages: (ImageData: [ImageData]) => void;
}
export interface ImageError {
    imageFile: string;
}
interface ImagesFiles extends File {}

const UploadProductImages = ({ getImages }: Images) => {
    const [images, setImages] = React.useState([]);

    const maxNumber = 20;

    const onChange = (imageList: ImageListType): void => {
        if (imageList.length !== 0) {
            setImages(imageList as []);
            getImages(imageList.reverse() as [ImageData]);
        }
    };

    return (
        <div className={style.image}>
            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url" acceptType={['jpg', 'gif', 'png', 'gif']} maxFileSize={1100000}>
                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (
                    // write your building UI
                    <div className={style.upload_image}>
                        <div className={style.clickDrop} style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                            Click or Drop here
                        </div>
                        <div className={style.removeImages} onClick={onImageRemoveAll}>
                            Remove all images
                        </div>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <div onClick={() => onImageUpdate(index)}>Update</div>
                                    <div onClick={() => onImageRemove(index)}>Remove</div>
                                </div>
                            </div>
                        ))}
                        {errors && (
                            <div>
                                {errors.maxNumber && <span>Number of selected images exceed max 20</span>}
                                {errors.acceptType && <div className={'style.profileError'}>Your selected file type is not allow</div>}
                                {errors.maxFileSize && <div className={'style.profileError'}>File size too large, max file size is 1 Mb</div>}
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default UploadProductImages;
