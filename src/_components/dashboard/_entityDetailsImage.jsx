import { getOneMediaFile } from '@/_helpers/categoryApiHelper';
import React from 'react'

const EntityDetailsImage = ({ entity }) => {
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        getOneMediaFile(entity?.media?.id, setImageSrc);
    }, [entity?.media?.id]);

    return (
        <>
            <th className="text-start w-[40%] lg:w-[20%]">Image</th>
            <td className="text-start w-[45%] lg:w-[30%]">
                {imageSrc.length > 0 && (
                    <Image
                        className="h-14 w-14 md:h-16 md:w-16"
                        src={imageSrc}
                        alt={entity?.media?.imageName}
                        width={60}
                        height={60}
                    />
                )}
            </td>
        </>
    )
}

export default EntityDetailsImage