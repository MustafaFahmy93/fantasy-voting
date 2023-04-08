import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Typography
} from "@material-tailwind/react";

const PopoverInfo = ({ btnName, info }) => {
    return (
        <Popover>
            <PopoverHandler>
                <Typography
                    as="li"
                    variant="small"
                    color="white"
                    className="p-1 font-normal"
                >
                    <p className="cursor-pointer flex items-center text-white">
                        {btnName}
                    </p>
                </Typography>
            </PopoverHandler>
            <PopoverContent>
                {info}
            </PopoverContent>
        </Popover>
    )
}

export default PopoverInfo