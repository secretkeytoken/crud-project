'use client';
import MarkdownEditor from '@uiw/react-markdown-editor';
import React from 'react';
import { useState } from 'react';
type Props = {
  onChange: (text: string) => void;
};

const MarkDownEditor: React.FC<Props> = ({ onChange }) => {
  const [markdownVal, setMarkdownVal] = useState('');
  return (
    <div className="mark-down w-full" data-color-mode="dark">
      <label className="text-sm font-bold text-gray-500 tracking-wide">
        Describle
      </label>
      <MarkdownEditor
        className="mt-3.5"
        value={markdownVal}
        onChange={(value) => {
          setMarkdownVal(value);
          onChange(value);
        }}
      />
    </div>
  );
};

export default React.memo(MarkDownEditor);
