function getImage64(file: File): Promise<string | ArrayBuffer | null> {
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
    throw new Error('Error wrong image format');
}

function getImage(image64: HTMLImageElement | string | Event) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        if (typeof image64 === 'string') {
            image.src = image64;
            image.onload = () => resolve(image);
            image.onerror = (error) => reject(error);
        } else {
            throw new Error('Not able to convert to perfect Base64');
        }
    });
}

export async function imageResize(imageFile: File, type: string) {
    let image64 = await getImage64(imageFile).then((data) => {
        return data;
    });
    if (typeof image64 === 'string') {
        return await getImage(image64).then((image: any) => {
            let maxWidth;
            let maxHeight;

            switch (type) {
                case 'Profile_image':
                    maxWidth = 290;
                    maxHeight = 228;
                    break;
                default:
                    console.log(`Couldn't find: ${type}.`);
            }
            if (maxWidth !== undefined && maxHeight !== undefined) {
                const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
                const width = (image.width * ratio + 0.5) | 0;
                const height = (image.height * ratio + 0.5) | 0;

                return { height: height, width: width };
            }
        });
    }
    throw new Error('Not able to convert Image');
}
