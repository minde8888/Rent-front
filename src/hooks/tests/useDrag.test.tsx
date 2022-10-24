import useDrag from '../useDrag.hook';

export default async function Component() {
    return <div></div>;
}

describe('useDrag', () => {
    xtest('should use Drag ', async () => {
        const { positionX, positionY } = useDrag(Component() as unknown as HTMLDivElement);
    });
});
