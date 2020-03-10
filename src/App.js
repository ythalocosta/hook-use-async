import React, { useState, useEffect, useCallback } from 'react';

function App() {

    const {execute, pending, value, error} = useAsync(fetchData, false);

    return (
    <div className="App">
        <h1>Hooks</h1>
        {value && <div>{value}</div>}
        {error && <div>{error}</div>}
        <button onClick={execute} disabled={pending}>
            {!pending ? 'Click me' : 'Loading...'}
        </button>
    </div>
  );
}

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          const rnd = Math.random() * 10;
          rnd <= 5
            ? resolve('Submitted successfully 🙌')
            : reject('Oh no there was an error 😞');
        }, 2000);
      });
}

const useAsync = (asyncFunction, immediate = true) => {
    const [pending, setPending] = useState(false);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
      setPending(true);
      setValue(null);
      setError(null);
      return asyncFunction()
        .then(response => setValue(response))
        .catch(error => setError(error))
        .finally(() => setPending(false));
    }, [asyncFunction]);

    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
      if (immediate) {
        execute();
      }
    }, [execute, immediate]);

    return { execute, pending, value, error };
  };

export default App;
