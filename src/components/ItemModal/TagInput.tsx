import {Box, IconButton, TextField} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';

interface TagInputProp {
    textField: string;
    tags: string[];
    setTags: (tags: string[]) => void;
}

const TagInput = (prop: TagInputProp) => {

    const [input, setInput] = useState<string>('');

    useEffect(() => {
        prop.tags ?
            prop.setTags(prop.tags)
            :
            prop.setTags([]);
    }, [prop.tags]);

    const checkTag = (tag: string): boolean => {
        if (prop.tags.includes(tag)) {
            toast.warning('Ten tag jest już dodany!');
            return false;
        } else if (tag === '') {
            toast.warning('Tag nie może być pusty!');
            return false;
        } else if (prop.tags.length === 20) {
            toast.warning('Możesz dodać maksymalnie 20 tagów!');
            return false;
        } else if (tag.length > 255) {
            toast.warning('Tag może mieć maksymalnie 255 znaków!');
            return false;
        }
        return true;
    };

    const parseTagInput = (val: string) => {
        if (val.slice(-1) === ',') {
            const tag = val.substring(0, val.length - 1);
            if (!checkTag(tag)) { return; }
            prop.setTags(prop.tags.concat(tag));
            setInput('');
        } else {
            setInput(val);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            const tag = input;
            if (!checkTag(tag)) { return; }
            prop.setTags(prop.tags.concat(tag));
            setInput('');
        }
    };

    const removeTag = (tag: string) => prop.setTags(prop.tags.filter(e => e !== tag));

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyItems: 'center',
            marginTop: '2%',
            placeItems: 'flex-start',
            margin: '2%',
        }}>
            <Box style={{
                display: 'flex',
                maxWidth: '100%',
                maxHeight: '90%',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyItems: 'flex-start',
            }}>
                {prop.tags.map((tag) => {
                    return (
                        <Box key={tag} style={{
                            display: 'flex',
                            height: '30px',
                            flexDirection: 'row',
                            backgroundColor: '#f1f1f1',
                            padding: '1px',
                            borderRadius: '5px',
                            alignItems: 'center',
                            justifyItems: 'center',
                            margin: '2px',
                        }}>
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
                onChange={e => parseTagInput(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}/>
        </div>
    );
};

export default TagInput;