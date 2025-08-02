# تمرین دستگرمی 3

در این پروژه نسخه‌ی پیشرفته‌تری از نقاشی با اشکال هندسی (دایره، مربع، مثلث) در محیط React + TypeScript ساخته شده که علاوه بر قابلیت‌های قبلی (اضافه/حذف اشکال، Export/Import فایل JSON، شمارش اشکال)، حالا امکان ورود با نام کاربری و رمز عبور و همچنین ذخیره‌سازی نقاشی‌ها در دیتابیس سرور نیز فراهم شده است.

کاربر با وارد کردن اطلاعات خود وارد سیستم می‌شود (یا اگر کاربر جدید است، ثبت‌نام می‌شود) و نقاشی قبلی خود را مشاهده می‌کند. با ذخیره‌ی نقاشی، تمام اطلاعات در دیتابیس سمت سرور نگهداری می‌شوند.


در این پروژه یک تخته نقاشی ساده به سه شکل پایه دایره، مربع و مثلث ساختیم. با انتخاب هر شکل و سپس یک بار کلیک بر روی برد نقاشی شکل مورد نظر در آنجا قرار می‌گیرد. در صورتی که بخواهیم شکلی را پاک کنیم ابتدا شکل پاک کن را در سمت راست انتخاب کرده و سپس با دوبار کلیک بر روی یکی از اشکال مربع، دایره یا مثلث آن‌ها را پاک می‌کنیم.

همچنین امکان ذخیره برد نقاشی شده به صورت یک فایل JSON نیز وجود دارد. این کار با استفاده از دکمه export صورت می‌گیرد. برای مشاهده نقاشی‌های پیشین هم می‌توان از دکمه ایمپورت استفاده کرد و با انتخاب یکی از فایل‌های ذخیره شده آن را در برد بازیابی کرد.

جهت مشاهده توضیحات بیشتر درمورد ساختار اولیه پروژه و توضیحات فرانت پروژه به لینک ریپوی تمرین قبل مراجعه فرمایید.

## نحوه اجرا
```
git clone https://github.com/amirahsh1404/dastgarmi2.git
cd react-shape-painter
npm install
npm run dev
```

```
cd src/server
node index.js
```

## عملکرد صفحه Login
فرم ساده ورود شامل نام کاربری و رمز عبور

درخواست POST به آدرس /api/login

اگر کاربر از قبل وجود داشته باشد و رمز درست باشد → نقاشی قبلی بارگذاری می‌شود.

اگر کاربر جدید باشد ثبت‌نام می‌شود و یک برد خالی نقاشی دریافت می‌کند.

پس از ورود موفق، کامپوننت اصلی App.tsx اطلاعات کاربر (userId، title، shapes) را دریافت کرده و وضعیت را تنظیم می‌کند.

دیزاین این صفحه نیز در Login.css قرار دارد.

```
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

```

## سمت سرور - Express + SQLite

استفاده از Express.js به‌عنوان REST API

استفاده از SQLite برای ذخیره اطلاعات کاربران و نقاشی‌ها


POST /api/login: برای ورود یا ثبت‌نام

POST /api/save: ذخیره نقاشی کاربر

ساختار دیتابیس:

users: نگهداری نام کاربری و رمز

paintings: هر کاربر فقط یک نقاشی دارد

## تعامل Frontend با Backend
کاربر فرم ورود را پر می‌کند.

درخواست POST به /api/login ارسال می شود.

اگر موفق بود، اطلاعات کاربر و نقاشی در پاسخ باز می‌گردد.


پس از نقاشی، کاربر روی ذخیره در حساب کلیک می کند.

اطلاعات با POST به /api/save ارسال می‌شود.

روی سرور، اگر userId وجود داشت، نقاشی بروزرسانی می‌شود.

## تصویری از عملکرد در صفحه ورود
  <img src="screenshot.png" alt="دستگرمی">

  ## تصویری از عملکرد در صفحه نقاشی
  <img src="screenshot.png" alt="دستگرمی">



