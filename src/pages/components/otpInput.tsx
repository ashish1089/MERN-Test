import React, {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

interface OtpInputProps {
  length?: number;
  onChange?: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 8, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (onChange) {
      onChange(newOtp.join(""));
    }

    if (e.target.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mt-3 flex justify-between align-middle">
      {otp.map((digit, index) => (
        <input
          className="h-[48px] w-[46px] rounded-md border border-[#c1c1c1] text-center"
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(ref: HTMLInputElement | null) => {
            if (ref) {
              inputRefs.current[index] = ref;
            }
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
