import Grid from "@mui/material/Grid2";
import Tag from "../tag/Tag";
import {TagListModel} from "./TagListModel";

const TagList = (
    {model}: { model: TagListModel }
) => {
    return (
        <Grid
            container
            spacing={1}
            sx={{ flexWrap: 'wrap', justifyContent: 'flex-end', ml: 'auto' }}
        >
            {model.tagStrings.map(tag => (
                <Grid key={tag}>
                    <Tag text={tag} />
                </Grid>
            ))}
        </Grid>
    )
}

export default TagList;