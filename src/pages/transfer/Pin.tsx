import React, { useState } from 'react';

const PinInput: React.FC = () => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string>('');

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      setError(''); // Clear error when user starts typing
    }
  };

  const handleSubmit = () => {
    if (pin.includes('') || pin.some((digit) => !/^[0-9]$/.test(digit))) {
      setError('PIN tidak valid');
    } else {
      setError('');
      console.log('PIN Submitted:', pin.join(''));
      // Add your submission logic here
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Masukkan PIN
        </h2>
        <p className="mb-6 text-center">
          Pastikan pin sesuai dengan yang telah anda buat
        </p>
        <div className="mb-5 flex justify-center">
          {pin.map((digit, index) => (
            <input
              key={index}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="mx-1 h-10 w-10 border-b-2 border-gray-300 text-center focus:border-blue-500 focus:outline-none"
            />
          ))}
        </div>
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}
        <div className="mt-5 flex justify-between">
          <button
            onClick={() => setPin(Array(6).fill(''))}
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            Kembali
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Kirim →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinInput;
