import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { setNewBody } from '@store/features/response/responseSlice';
import { jsonTheme } from '@app/common/constants';
import { Typography } from '@mui/material';

function JsonTextarea({ changeBlur }: { changeBlur: (e) => void }) {
  const [error, setError] = React.useState<string | null>(null);
  const { body, variables } = useAppSelector(state => state.response);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(body);
  const onChange = React.useCallback(val => {
    setValue(val);
    dispatch(setNewBody(val));
    try {
      let test: string = val;
      Object.keys(variables).forEach(key => {
        test = test.replace(new RegExp(`{{${key}}}`, 'g'), `${variables[key]}`);
      });
      JSON.parse(test);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }, []);
  return (
    <>
      <CodeMirror
        value={value as string}
        height="140px"
        theme={jsonTheme}
        extensions={[json()]}
        onChange={onChange}
        onBlur={changeBlur}
      />
      {error && body && <Typography sx={{ color: 'red' }}>{error}</Typography>}
    </>
  );
}
export default JsonTextarea;
