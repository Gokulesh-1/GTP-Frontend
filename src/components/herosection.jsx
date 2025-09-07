import React, { useEffect, useState } from 'react';
import logo from '../images/gtp logo 5.jpeg';

const HeroSection = () => {
  const [price, setPrice] = useState('loading...');
  const [timestamp, setTimestamp] = useState('loading...');
  const [grams, setGrams] = useState(10);
  const [amount, setAmount] = useState('');
  const [pricePerGram, setPricePerGram] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("x-access-token", "goldapi-jkbxsmf6o07ec-io");
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        setPrice('loading...');
        setTimestamp('loading...');
        const response = await fetch("https://www.goldapi.io/api/XAU/INR", requestOptions)
        const data = await response.json();
        console.log(data);
        if (!isMounted) return;
        const perGram = data.price_gram_24k;
        const epochTime = data.timestamp;
        const date = new Date(epochTime * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        setPricePerGram(data.price_gram_24k);
        setPrice(`₹${perGram.toFixed(2)}/gm`);
        setTimestamp(`Updated at ${date.toLocaleDateString()} ${hours}:${date.getMinutes().toString().padStart(2, '0')}`);
      } catch (error) {
        if (!isMounted) return;
        setPrice('Error');
        setTimestamp('Error');
        setPricePerGram(0);
        console.error('Error fetching gold price:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1800000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (pricePerGram && grams) {
      setAmount(`₹${Math.round(grams * pricePerGram)}`);
    } else {
      setAmount('');
    }
  }, [grams, pricePerGram]);

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setAmount(`₹${value}`);
    if (pricePerGram) {
      setGrams(value ? Math.round((parseInt(value, 10) / pricePerGram) * 100) / 100 : '');
    }
  };

  const handleGramsChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    setGrams(value);
    if (pricePerGram) {
      setAmount(`₹${Math.round(value * pricePerGram)}`);
    }
  };

  return (
    <section className="bg-[#C16B6B] min-h-[80vh] flex flex-col lg:flex-row items-center justify-between px-10 py-16">
      <div className="text-white max-w-xl ml-40">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          India's Golden Era Goes Digital - Invest Smart & Shine Bright In Future.
        </h1>
        <p className="mb-8 text-lg">
          We at GTP -- Gold Tokenizing Platform want to make your Gold journey Simple, Secure, Transparent, and Digital. Own and trade digital gold instantly through blockchain-powered digital tokens—accessible to anyone, anywhere and at anytime.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mt-10 lg:mt-0 mr-40">
        <div className="flex border-b border-[#C16B6B] mb-4">
          <div className="flex-1 text-center font-bold text-[#A44F4F] border-b-2 border-[#A44F4F]">GOLD</div>
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <img src={logo} alt="Logo" className='h-14'/>
            <span className="font-semibold text-[#A44F4F]">BUYING PRICE</span>
            <span className="bg-[#FFD700] text-[#A44F4F] text-xs font-medium px-2 py-1 rounded">24K • 999.0</span>
          </div>
          <div className="text-xl font-bold text-[#A44F4F]">{price}</div>
          <div className="text-sm text-green-500">{timestamp}</div>
          <div className="text-xs text-red-500">● LIVE RATE</div>
        </div>

        <div className="flex flex-col gap-4 mb-6 bg-gray-50 p-4 rounded">
          <div>
            <label className="text-sm text-[#A44F4F]">Grams</label>
            <input
              type="number"
              min="0"
              value={grams}
              onChange={handleGramsChange}
              className="w-full border-b-2 border-[#A44F4F] focus:outline-none text-lg text-[#A44F4F] bg-transparent"
            />
          </div>
          <div>
            <label className="text-sm text-[#A44F4F]">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full border-b-2 border-[#A44F4F] focus:outline-none text-lg text-[#A44F4F] bg-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSection;