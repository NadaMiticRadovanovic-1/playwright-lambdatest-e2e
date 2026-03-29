// Products confirmed in-stock with no required options on ecommerce-playground.lambdatest.io
export const PRODUCTS = {
    HP_LP3065:    "99",
    HP_LP3065_V2: "98",
    HP_LP3065_V3: "97",
    HP_LP3065_V4: "96",
    HP_LP3065_V5: "47",
    HTC_TOUCH_HD:    "100",
    HTC_TOUCH_HD_V2: "101",
    HTC_TOUCH_HD_V3: "102",
    HTC_TOUCH_HD_V4: "75",
    IPOD_TOUCH:    "86",
    IPOD_TOUCH_V2: "87",
    IPOD_SHUFFLE:    "84",
    IPOD_SHUFFLE_V2: "85",
    IPOD_NANO: "57",
};

export function getRandomProduct() {
    const ids = Object.values(PRODUCTS);
    return ids[Math.floor(Math.random() * ids.length)];
}
