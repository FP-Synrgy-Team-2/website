import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Button, ModalSuccess } from '@/components';
import axios from 'axios';
import { getUserData } from '@/utils/getUserData';
interface pinValidationProps {
  account_number: string;
  pin: string;
}

const validatePin = async ({ account_number, pin }: pinValidationProps) => {
  try {
    const response = await axios.post(
      'https://tense-margy-jangkau-a8ec8afe.koyeb.app/api/bank-accounts/pin-validation',
      { account_number, pin },
      {
        headers: {
          Authorization: `Bearer ${getUserData().access_token}`,
        },
      }
    );
    return response.data.status;
  } catch (error) {
    console.error('Error validating PIN:', error);
    return false;
  }
};

interface PinInputProps {
  showPinInput: boolean;
  closePinInput: () => void;
  onPinValidated: () => void;
}

const PinInput: React.FC<PinInputProps> = ({
  showPinInput,
  closePinInput,
  onPinValidated,
}) => {
  const [user, setUser] = useState<{ account_number: string }>({
    account_number: '',
  });
  const [pin, setPin] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  // const navigate = useNavigate();
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

  useEffect(() => {
    inputRefs.current[0]?.focus();
    setUser(getUserData());
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === 'ArrowRight' && index < pin.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      setError(''); // Clear error when user starts typing
    }
    if (index < pin.length - 1 && value !== '') {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (pin.includes('') || pin.some((digit) => !/^[0-9]$/.test(digit))) {
      setError('PIN tidak valid');
      setTimeout(() => {
        setPin(Array(6).fill(''));
        setError('');
        inputRefs.current[0]?.focus();
      }, 3000);
      return;
    }

    const isValid = await validatePin({
      account_number: user?.account_number,
      pin: pin.join(''),
    });
    console.log(isValid);

    if (!isValid) {
      setError('PIN tidak valid');
      setTimeout(() => {
        setPin(Array(6).fill(''));
        setError('');
        inputRefs.current[0]?.focus();
      }, 3000);
    } else {
      setError('');
      console.log('PIN Submitted:', pin.join(''));
      setShowSuccessModal(true);
      onPinValidated();
    }
  };

  return (
    <>
      {showSuccessModal && (
        <ModalSuccess
          modalFor="Transaksi"
          redirectTo="../receipt"
          description={[
            'Yeay transaksi telah berhasil',
            'Silahkan tunggu beberapa saat untuk bukti transaksi',
          ]}
        />
      )}

      {showPinInput && !showSuccessModal && (
        <>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-4 text-center text-2xl font-semibold">
                Masukkan PIN
              </h2>
              <p className="mb-6 text-center text-grey">
                Pastikan pin sesuai dengan yang telah anda buat
              </p>
              <div className="mb-5 flex justify-center">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="password"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`mx-1 h-10 w-10 border-b-2 text-center focus:border-blue-500 focus:outline-none ${error ? 'border-danger text-danger' : 'border-gray'} `}
                  />
                ))}
              </div>
              {error && (
                <div className="mb-4 text-center text-danger">{error}</div>
              )}
              <div className="mt-5 flex justify-center gap-10">
                <Button
                  onClick={() => {
                    setPin(Array(6).fill(''));
                    closePinInput();
                  }}
                  color="neutral-01"
                  className="w-25 rounded-full border border-primary-dark-blue font-bold text-primary-dark-blue hover:bg-gray-300"
                >
                  Kembali
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary-dark-blue"
                  className="w-25 rounded-full font-bold text-white hover:bg-blue-600"
                >
                  Kirim →
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PinInput;
