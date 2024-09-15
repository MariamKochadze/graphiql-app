import { jsonTheme } from '@app/common/constants';
import { Prettier } from '@components/icons/Prettier';
import { Typography } from '@mui/material';
import { setNewBody } from '@store/features/response/responseSlice';
import { langs } from '@uiw/codemirror-extensions-langs';
import { materialLightInit } from '@uiw/codemirror-theme-material';
import CodeMirror from '@uiw/react-codemirror';
import { convertToPrettier } from '@utils/prettier/prettier';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';

function JsonTextarea({ changeBlur }: { changeBlur: (e) => void }) {
  const [error, setError] = React.useState<string | null>(null);
  const { body, variables, clientType } = useAppSelector(state => state.response);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(body);

  const onChange = React.useCallback(val => {
    // add your own validation if clientType === qraphql
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

  const onPrettierClickHandler = () => {
    setValue(prevValue => convertToPrettier(prevValue));
  };

  const options = {
    settings: {
      fontFamily: 'FiraCode',
      lineHighlight: '#FAFAFA',
      background: '#FAFAFA',
      gutterBackground: '#FAFAFA',
    },
  };

  return (
    <>
      {clientType === 'graphql' && (
        <div className="flex flex-items gap-4 my-3">
          <button onClick={onPrettierClickHandler}>
            <Prettier />
          </button>
        </div>
      )}

      <CodeMirror
        value={value as string}
        height="140px"
        theme={clientType === 'graphql' ? materialLightInit(options) : jsonTheme}
        extensions={[langs.json()]}
        onChange={onChange}
        onBlur={changeBlur}
      />
      {error && body && <Typography sx={{ color: 'red' }}>{error}</Typography>}
    </>
  );
}
export default JsonTextarea;
