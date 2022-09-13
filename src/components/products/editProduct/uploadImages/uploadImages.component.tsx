import { ChangeEvent, useCallback, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { ImageFiles } from '../../typings';
import product from '../../../../svg/3615746_checklist_clipboard_package_report_restriction_icon.svg';
import style from './uploadImages.module.scss';

interface Props {
    imageSrc?: Array<{ file?: File; data_url: string }>;
    getImages: (files: Array<{ file?: File; data_url: string }> | undefined) => void;
}

const UploadImages = ({ imageSrc, getImages }: Props) => {
    const [images, setImages] = useState<Array<ImageFiles>>([]);
    const [imgSrc, setImgSrc] = useState<Array<{ file?: File; data_url: string }> | undefined>(imageSrc);

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
            // getImages(imgSrc);
        },
        [imgSrc]
    );

    console.log(1111);

    const removeImage = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number): void => {
        const newState = imgSrc?.filter((element) => !element.data_url.includes(imgSrc[index].data_url));
        setImgSrc(newState);
    }, []);

    getImages(imgSrc);
    return (
        <>
            {imgSrc?.map((element, key) => (
                <div key={key}>
                    <img src={element.data_url === undefined ? product : element.data_url} alt="image" width="600" />
                    <input type="file" onChange={(e) => onFileChange(e, key)} />
                    <button className={style.close} onClick={(e) => removeImage(e, key)} type="button">
                        ❌
                    </button>
                </div>
            ))}

            <div className={style.container}>
                <ImageUploading multiple value={images} onChange={onChange} maxNumber={10} dataURLKey="data_url" acceptType={['jpg', 'gif', 'png', 'gif']}>
                    {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (
                        <div className={style.upload_image}>
                            {imageList.map((image, index) => (
                                <div key={index} className={style.image_item}>
                                    <img className={style.image_show} src={image['data_url']} alt="" width="600" />
                                    <div className={style.image_btn_wrapper}>
                                        <span onClick={() => onImageUpdate(index)}>add</span>
                                        <span onClick={() => onImageRemove(index)}>❌</span>
                                    </div>
                                </div>
                            ))}
                            <div className={style.clickDrop} style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                                <div>Click or Drop image here </div>
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
    imgSrc: Array<{ file?: File; data_url: string }>;
    data_url: string;
    file: File;
    index: number;
}
function stateUpdate({ imgSrc, data_url, file, index }: UpdateState): Array<{ file?: File; data_url: string }> {
    let copyState = imgSrc;
    const newItem = { file: file, data_url: data_url };
    copyState.splice(index, 1, newItem);
    return [...copyState];
}

export default UploadImages;
