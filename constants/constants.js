const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/;
const userSubscription = ["starter", "pro", "business"];
const perPage = 8;

module.exports = {
  phoneRegexp,
  perPage,
  emailRegexp,
  userSubscription,
};
