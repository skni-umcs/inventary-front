import React, {useEffect, useState} from "react";
import {Box, IconButton, TextField} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import {toast} from "react-toastify";

interface TagInputProp {
    tags?: string[],
    onChange: (tags: string[]) => void,
    textField: string
}

const TagInput = (prop: TagInputProp) => {

    const [tags, setTags] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        prop.tags ?
            setTags(prop.tags)
        :
            setTags([]);
    }, [prop.tags]);

    const parseTagInput = (val: string) => {
        if(val.slice(-1) == ',') {
            let tag = val.substring(0,val.length-1);
            if(tags.includes(tag)) {
                toast.warning('Ten tag jest już dodany!');
                return;
            } else if(tag === '') {
                toast.warning('Tag nie może być pusty!');
                return;
            } else if(tags.length === 10) {
                toast.warning('Możesz dodać maksymalnie 10 tagów!');
                return;
            } else if(tag.length > 255) {
                toast.warning('Tag może mieć maksymalnie 255 znaków!');
                return;
            }
            setTags(tags.concat(tag))
            setInput('');
        } else {
            setInput(val);
        }
    }

    const removeTag = (tag: string) => setTags(tags.filter(e => e !== tag));

    return (
        <div style={{display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyItems: 'center',
            marginTop: '2%',
            placeItems: 'flex-start',
            margin: '2%'
        }}>
            <Box style={{display: 'flex', maxWidth: '100%', maxHeight: '90%', flexWrap: 'wrap', alignItems: 'flex-start', justifyItems: 'flex-start'}}>
                {tags.map((tag) => {
                    return (
                        <Box key={tag} style={{display: 'flex', height: '30px', flexDirection: 'row', backgroundColor: '#f1f1f1', padding: '1px', borderRadius: '5px', alignItems: 'center', justifyItems: 'center', margin: '2px'}}>
                            <span>{tag}</span>
                            <IconButton style={{width: '12px', height: '12px'}} onClick={e => removeTag(tag)}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                    );
                })}
            </Box>
            <TextField
                className={prop.textField}
                label={'Słowa kluczowe'}
                variant={'standard'}
                type={'text'}
                value={input}
                style={{width: '100%'}}
                onChange={e => parseTagInput(e.target.value)}/>
        </div>
    )
}

export default TagInput;