import React from 'react';

type Props = {
  title: string;
  setTitle: (title: string) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header: React.FC<Props> = ({ title, setTitle, onExport, onImport }) => {
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
      </header>
  );
};

export default Header;