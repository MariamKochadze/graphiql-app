import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { setNewBody } from '@store/features/response/responseSlice';
import { githubLight } from '@uiw/codemirror-theme-github';
import { Typography } from '@mui/material';

function JsonTextarea() {
  const [error, setError] = React.useState<string | null>(null);
  const { body } = useAppSelector(state => state.response);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(body);
  const onChange = React.useCallback(val => {
    setValue(val);
    dispatch(setNewBody(val));
    try {
      JSON.parse(val);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }, []);
  return (
    <>
      <CodeMirror
        value={value as string}
        height="150px"
        theme={githubLight}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      {error && body && <Typography sx={{ color: 'red' }}>{error}</Typography>}
    </>
  );
}
export default JsonTextarea;
