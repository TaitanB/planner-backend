const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ']{2,26}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
const phoneRegex = /^\+380\d{9}$/;
const birthdayRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
const cityRegex =
  /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ'\s]+(?:,\s*[A-Za-zА-Яа-яЁёІіЇїЄєҐґ'\s]+)*$/;
const userSubscription = ["starter", "pro", "business"];
const perPage = 8;

module.exports = {
  nameRegex,
  emailRegex,
  passwordRegex,
  phoneRegex,
  birthdayRegex,
  cityRegex,
  perPage,
  userSubscription,
};
