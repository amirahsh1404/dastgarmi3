import React, { useState } from 'react';
import './Login.css';

interface Props {
    onLogin: (userId: number, title: string, shapes: any[]) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const res = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.success) {
            onLogin(data.userId, data.title, JSON.parse(data.shapes));
        } else {
            setError(data.message || 'خطا در ورود');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>🎨 ورود به نقاشی</h2>
                <input
                    type="text"
                    placeholder="نام کاربری"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="رمز عبور"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>ورود / ثبت‌نام</button>
                {error && <div className="error-msg">{error}</div>}
            </div>
        </div>
    );
};

export default Login;
