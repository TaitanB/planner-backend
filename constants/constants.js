const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;
const emailRegexp = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
const userSubscription = ["starter", "pro", "business"];
const perPage = 8;

module.exports = {
  phoneRegexp,
  perPage,
  emailRegexp,
  userSubscription,
};
