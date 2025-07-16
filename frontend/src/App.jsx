import axios from 'axios';
import { useState } from 'react';

function App() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    console.log('✅ 입력한 코드:', code); // 👈 여기 추가

    try {
      const res = await axios.post('http://localhost:3000/api/verify', { code });
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.response?.data || err.message });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>코드 검증</h1>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="8자리 코드"
      />
      <button onClick={handleCheck}>검증</button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default App;
