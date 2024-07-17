import { useLocation } from 'react-router-dom';
import { SavedAccount } from '../../types/saved-accounts';
import { useEffect } from 'react';

function Saved() {
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
  }, []);

  return (
    <div>
      <h1>Saved</h1>
      {location.state ? (
        <>
          <p>{(location.state.account as SavedAccount).owner_name}</p>
          <p>{(location.state.account as SavedAccount).account_number}</p>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default Saved;
