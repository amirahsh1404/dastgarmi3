import React from 'react';

type Props = {
  title: string;
  setTitle: (title: string) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveToServer: () => void;
};

const Header: React.FC<Props> = ({ title, setTitle, onExport, onImport, saveToServer }) => {
  return (
      <header className="header">
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Painting Title"
        />
        <button onClick={onExport}>Export</button>
        <label className="import-btn">
          Import
          <input type="file" accept=".json" onChange={onImport} hidden />
        </label>
          <button onClick={saveToServer}>ذخیره در حساب</button>

      </header>
  );
};

export default Header;