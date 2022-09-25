import { ChangeEvent, useCallback, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { ImageFiles } from '../../typings';
import product from '../../../../svg/3615746_checklist_clipboard_package_report_restriction_icon.svg';
import style from './uploadImages.module.scss';

interface Props {
    imageSrc?: Array<ImageFiles>;
    getImages: (files: Array<ImageFiles> | undefined) => void;
}

const UploadImages = ({ imageSrc, getImages }: Props) => {
    const [images, setImages] = useState<Array<ImageFiles>>([]);
    const [imgSrc, setImgSrc] = useState<Array<ImageFiles> | undefined>(imageSrc);

    const onChange = (imageList: ImageListType) => {
        if (imageList.length !== 0) {
            setImages(imageList as []);
        }
    };

    const onFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>, index: number): void => {
            const target = e.target as HTMLInputElement;

            if (target.files && target.files.length) {
                const file = target.files[0];
                const fr = new FileReader();
                fr.onload = (data) => {
                    if (data.target !== null && typeof data.target.result === 'string' && imgSrc !== undefined) {
                        const data_url = data.target.result;
                        const newState = stateUpdate({ imgSrc, data_url, file, index });
                        setImgSrc(newState);
                    }
                };
                fr.readAsDataURL(file);
            }
        },
        [imgSrc]
    );

    const removeImage = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number): void => {
            const newState = imgSrc?.filter((element) => !element.data_url.includes(imgSrc[index].data_url));
            setImgSrc(newState);
        },
        [imgSrc]
    );

    if (images.length > 0 && imgSrc !== undefined) {
        getImages([...imgSrc, ...images]);
    }

    if (images.length === 0) {
        getImages(imgSrc);
    }

    return (
        <>
            {imgSrc?.map((element, key) => (
                <div className={style.images} key={key}>
                    <img src={element.data_url === undefined ? product : element.data_url} alt="alt-text" width="100" />
                    <input className={style.imgUploaded} type="file" onChange={(e) => onFileChange(e, key)} accept=".jpg,.jpeg,.png,.gif" />
                    <button className={style.close} onClick={(e) => removeImage(e, key)} type="button">
                        ❌
                    </button>
                </div>
            ))}

            <div className={style.container}>
                <ImageUploading multiple value={images} onChange={onChange} maxNumber={10} dataURLKey="data_url" acceptType={['jpg', 'jpeg', 'png', 'gif']}>
                    {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (
                        <div className={style.upload_image}>
                            {imageList.map((image, index) => (
                                <div key={index} className={style.images}>
                                    <img className={style.image_show} src={image['data_url']} alt="alt-text" width="100" />
                                    <span className={style.update_image} onClick={() => onImageUpdate(index)}></span>
                                    <button className={style.close_btn} onClick={() => onImageRemove(index)}>❌</button>
                                </div>
                            ))}
                            <div className={style.clickDrop} style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                                <div className={style.addImage}>Click or Drop image here </div>
                            </div>
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
        </>
    );
};

interface UpdateState {
    imgSrc: Array<ImageFiles>;
    data_url: string;
    file: File;
    index: number;
}
function stateUpdate({ imgSrc, data_url, file, index }: UpdateState): Array<ImageFiles> {
    let copyState = imgSrc;
    const newItem = { file: file, data_url: data_url };
    copyState.splice(index, 1, newItem);
    return [...copyState];
}

export default UploadImages;
