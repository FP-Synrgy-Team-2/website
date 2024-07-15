import React, { useState } from 'react';

function ApiCall() {
  const URL = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(URL + '/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <form className="flex flex-row" action="" onSubmit={submitForm}>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="block w-full rounded-md border border-gray-950 py-1.5 pl-7 pr-20"
          onChange={handleChangeUsername}
          placeholder="username"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="block w-full rounded-md border border-gray-950 py-1.5 pl-7 pr-20"
          onChange={handleChangePassword}
          placeholder="password"
        />
      </div>
      <div>
        <button
          type="submit"
          className="focus:shadow-outline-indigo inline-flex items-center rounded-md border border-transparent bg-gray-950 px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-gray-900 focus:border-indigo-700 focus:outline-none active:bg-indigo-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ApiCall;
