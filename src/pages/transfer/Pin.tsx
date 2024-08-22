import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ButtonPrimary, ButtonSecondary, ModalBase } from '@/components';
import useAuth from '@/hooks/useAuth';
import { getAccountId } from '@/utils/getUserData';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/General/Loading';
import { cn } from '@/utils';

interface pinValidationProps {
  accountNumber: string;
  pin: string;
}

interface PinInputProps {
  showPinInput: boolean;
  closePinInput: () => void;
  onPinValidated: () => void;
  data: {
    balance: number;
    fromAccount: string;
    fromName: string;
    toAccount: string;
    toName: string;
    amount: number;
    note?: string;
    saved: boolean;
  };
  style?: string;
}

const PinInput: React.FC<PinInputProps> = ({
  showPinInput,
  closePinInput,
  onPinValidated,
  data,
  style,
}) => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
  const { api: axios, token } = useAuth();

  const validatePin = async ({ accountNumber, pin }: pinValidationProps) => {
    try {
      const response = await axios.post(
        'api/bank-accounts/pin-validation',
        { account_number: accountNumber, pin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.status;
    } catch (error) {
      console.error('Error validating PIN:', error);
      return false;
    }
  };

  useEffect(() => {
    const validate = async () => {
      setIsLoading(true);
      try {
        if (token) {
          await getAccountId(axios, data.fromAccount, token);
          await getAccountId(axios, data.toAccount, token);
        }
      } catch (err) {
        console.error(err);
        setTimeout(() => {
          navigate('/transfer', { replace: true });
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    validate();
    inputRefs.current[0]?.focus();
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
      accountNumber: data.fromAccount,
      pin: pin.join(''),
    });

    if (!isValid) {
      setError('PIN tidak valid');
      setTimeout(() => {
        setPin(Array(6).fill(''));
        setError('');
        inputRefs.current[0]?.focus();
      }, 3000);
    } else {
      setError('');
      setShowSuccessModal(true);
      onPinValidated();
    }
  };

  // if (isLoading) return <Loading size="5vw" bgSize="100vh" />;
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80">
          <Loading size="5vw" bgSize="100vh" />
        </div>
      )}
      {showSuccessModal && (
        <ModalBase
          mainText={<Loading size="2rem" bgSize="50px" />}
          text={['Transaksi anda sedang diproses']}
        />
      )}
      {!isLoading && showPinInput && !showSuccessModal && (
        <>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className={cn(
              style,
              'fixed inset-0 flex items-center justify-center sm:mx-4'
            )}
          >
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
              <h2
                className="mb-4 text-center text-2xl font-semibold"
                tabIndex={0}
              >
                Masukkan PIN
              </h2>
              <p className="mb-6 text-center text-grey" tabIndex={0}>
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
                <div className="mb-4 text-center text-danger" tabIndex={0}>
                  {error}
                </div>
              )}
              <div className="mt-5 flex justify-center gap-10">
                <ButtonSecondary
                  onClick={() => {
                    setPin(Array(6).fill(''));
                    closePinInput();
                  }}
                  color="neutral-01"
                  className="w-25 rounded-full border border-primary-dark-blue font-bold text-primary-dark-blue hover:bg-gray-300"
                >
                  Kembali
                </ButtonSecondary>
                <ButtonPrimary
                  onClick={handleSubmit}
                  color="primary-dark-blue"
                  className="w-25 rounded-full font-bold text-white hover:bg-blue-600"
                >
                  Kirim <span aria-hidden={true}>→</span>
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PinInput;
