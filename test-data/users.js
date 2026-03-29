// Credentials loaded from .env — copy .env.example to .env and fill in your values
export const users = {
    chromium: { email: process.env.CHROMIUM_EMAIL, password: process.env.CHROMIUM_PASSWORD },
    firefox:  { email: process.env.FIREFOX_EMAIL,  password: process.env.FIREFOX_PASSWORD },
    webkit:   { email: process.env.WEBKIT_EMAIL,   password: process.env.WEBKIT_PASSWORD },
};
