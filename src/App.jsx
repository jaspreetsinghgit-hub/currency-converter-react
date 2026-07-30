import { useEffect, useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("cad");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);

    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  useEffect(() => {
    convert();
  }, [amount, from, to, convert]);

  const BackgroundImage =
    "https://images.pexels.com/photos/11070637/pexels-photo-11070637.jpeg?_gl=1*1quzndg*_ga*OTQ3ODMyMTQ0LjE3ODIxMjE3Nzg.*_ga_8JE65Q40S6*czE3ODIxMjE3NzckbzEkZzEkdDE3ODIxMjE4MzEkajYkbDAkaDA.";

  const resetIcon =
    "https://img.icons8.com/?size=100&id=BUtO0i9u8bcs&format=png&color=FA5252";

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${BackgroundImage}')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-950 rounded-lg p-5 bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
                currencyOption={options}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount.toFixed(6)}
                onCurrencyChange={(currency) => setTo(currency)}
                currencyOption={options}
                selectCurrency={to}
                amountDisable
              />
            </div>

            <div className="flex items-center justify-around">
              <button
                type="submit"
                className="w-77 cursor-pointer bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
              <img
                className="cursor-pointer w-9 bg-white rounded-xl"
                src={resetIcon}
                alt="resetIcon"
                onClick={() => {
                  setAmount(1);
                  setFrom("usd");
                  setTo("inr");
                }}
              />
              {/* <button
                className="cursor-pointer bg-red-500 rounded-xl p-2"
                onClick={() => {
                  setAmount(1);
                  setFrom("usd");
                  setTo("inr");
                }}
              >
                Reset
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
