import { ChangeEvent, useState } from 'react';
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { ImageData } from '../../typings';
import style from './uploadImages.module.scss'

interface Props {
    imageSrc?: string[];
    getImages: (ImageData: [ImageData]) => void;
}

interface stateProps {
    image: string[];
    file?: File;
}

const UploadImages = ({ imageSrc, getImages }: Props) => {

    const [images, setImages] = useState<Array<ImageData>>([]);
    const [imgSrc, setImgSrc] = useState<stateProps>({
        image: imageSrc !== undefined ? imageSrc : [],
        file: undefined
    })

    const onChange = (imageList: ImageListType) => {
        if (imageList.length !== 0) {
            setImages(imageList as []);
        }
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
        const target = e.target as HTMLInputElement;

        if (target.files && target.files.length) {
            const file = target.files[0];
            const fr = new FileReader();
            fr.onload = (data) => {
                if (data.target !== null && typeof data.target.result === "string") {
                    let newState = stateUpdate(imgSrc.image, data.target.result, index)
                    setImgSrc({
                        image: newState,
                        file: file
                    })
                }
            }
            fr.readAsDataURL(file);
        }
    }

    const removeImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number): void => {
        const newState = imgSrc.image.filter(element => !imgSrc.image[index].includes(element));
        setImgSrc({ image: newState })
    }
    console.log(imgSrc);
    console.log(images);


    // if (imgSrc.file !== undefined) {
    //     getImages({ ...images.files, ...imgSrc.file });
    // } else {

    // } getImages(images.files);


    return (
        <>
            {imgSrc.image.map((element, key) => (
                <div key={key}>
                    <img src={element} alt="image" width="600" />
                    <input type="file" onChange={e => onFileChange(e, key)} />
                    <button className={style.close} onClick={e => removeImage(e, key)} type="button">❌</button>
                </div>

            ))}

            <div className={style.container} >
                <ImageUploading multiple value={images} onChange={onChange} maxNumber={10} dataURLKey="data_url" acceptType={['jpg', 'gif', 'png', 'gif']} >
                    {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (

                        <div className={style.upload_image}>

                            {imageList.map((image, index) => (
                                <div key={index} className={style.image_item}>
                                    <img className={style.image_show} src={image['data_url']} alt="" width="600" />
                                    <div className={style.image_btn_wrapper}>
                                        <span onClick={() => onImageUpdate(index)}>
                                            add
                                        </span>
                                        <span onClick={() => onImageRemove(index)}>
                                            ❌
                                        </span>
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
    )
}

function stateUpdate(array: string[], newItem: string, index: number): string[] {
    return array.map((item, i) => i === index ? newItem : item);
}

export default UploadImages;