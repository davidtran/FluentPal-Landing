'use client';

import { AppLogo } from '@/components/AppLogo';
import axios from 'axios';
import { useState } from 'react';

export default function Page() {
  const [number, setNumber] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteData() {
    if (!number) return;
    setIsLoading(true);
    await axios.post('/api/delete-data', {
      number,
    });
    setSent(true);
    setIsLoading(false);
  }

  return (
    <div className="m-auto pt-[40px] max-w-[1024px] min-h-[100vh] flex flex-col gap-5 px-5 md:px-0">
      <AppLogo />
      <div className="font-title font-bold text-[30px]">Data deletion</div>

      <div>
        Please enter your account number to request data deletion. You can find
        your account number in Settings page of FluentPal.
      </div>

      {!sent && (
        <div className="font-body flex flex-col gap-1">
          <input
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            disabled={isLoading}
            className="border w-[400px] p-[5px] rounded-[8px] h-[40px]"
            placeholder="Your account number"
          />
          <button
            type="submit"
            value="Request"
            onClick={deleteData}
            disabled={isLoading}
            className="bg-black text-white w-[120px] h-[40px] mt-[5px] rounded-[8px]"
          >
            {isLoading ? 'Please wait' : 'Request'}
          </button>
        </div>
      )}

      {sent && <div>Data request is sent</div>}
    </div>
  );
}
