import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { ImageFiles } from '../../typings';
import style from '../uploadImages/uploadProductImages.module.scss';
import close from '../../../../svg/3830967_close_closed_cross_delete_remove_icon.svg';
import upload from '../../../../svg/1904676_arrow_backup_cloud_hosting_storage_icon.svg';
import temp_image from '../../../../svg/2955250_cloud_cloud upload_upload_computing_data_icon.svg';

interface ImagesProps {
    getImages: (ImageData: Array<ImageFiles>) => void;
}
export interface ImageError {
    imageFile: string;
}

const UploadProductImages = ({ getImages }: ImagesProps) => {
    const [images, setImages] = React.useState([]);

    const onChange = (imageList: ImageListType): void => {
        if (imageList.length !== 0) {
            setImages(imageList as []);
            getImages(imageList as [ImageFiles]);
        }
    };

    return (
        <div className={style.image}>
            <ImageUploading multiple value={images} onChange={onChange} maxNumber={10} dataURLKey="data_url" acceptType={['jpg', 'gif', 'png', 'gif']}>
                {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (
                    <div className={style.upload_image}>
                        <div className={style.clickDrop} style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                            <div>Click or Drop image here </div>
                            <img className={style.image_show} src={temp_image} alt="" width="100" />
                        </div>
                        {imageList.map((image, index) => (
                            <div key={index} className={style.image_item}>
                                <img className={style.image_show} src={image['data_url']} alt="" width="100" />
                                <div className={style.image_btn_wrapper}>
                                    <span onClick={() => onImageUpdate(index)}>
                                        <img src={upload} />
                                    </span>
                                    <span onClick={() => onImageRemove(index)}>
                                        <img src={close} />
                                    </span>
                                </div>
                            </div>
                        ))}
                        {errors && (
                            <div>
                                {errors.maxNumber && <span>Number of selected images exceed max 20</span>}
                                {errors.acceptType && <div className={'style.profileError'}>Your selected file type is not allow</div>}
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default UploadProductImages;
