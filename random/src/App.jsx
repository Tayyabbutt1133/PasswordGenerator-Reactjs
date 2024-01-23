import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  // setting hooks
  const [length, setLength] = useState(8);
  const [numberAllowed, SetnumberAllowed] = useState(false);
  const [charAllowed, Setcharallowed] = useState(false);
  const [password, SetPassword] = useState("");

   // setting useRef hook 
  const passRef = useRef(null);

  // method to generate password
  const passwordGenerate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // Condition to check allowation
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    // generating random index
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char); // it takes a given string give it to random.floor function and take random item in return and save/append it back to pass
    }
    SetPassword(pass);
  }, [length, numberAllowed, charAllowed,SetPassword]); // calling all performing dependecies

  const CopypasswordtoClipboard = useCallback(() => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0, 20) // it can be use to restrict the selected dat
    window.navigator.clipboard.writeText(password)
  },[password])


  // rendering methods 
  useEffect(() => {
    passwordGenerate();
  }, [length, numberAllowed, charAllowed, passwordGenerate]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-700">
        <h1 className="text-center mb-4 text-2xl font-bold">
          Password Generator
        </h1>

        <div className="flex-shadow rounded-lg overflow-hidden mb-4 text-center text-black">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
          />

          <button onClick={CopypasswordtoClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 mt-2">
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                SetnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                Setcharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
