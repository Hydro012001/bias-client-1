import { Loan } from "loanjs";
export function calculateAge(birthdate) {
  const currentDate = new Date();

  const birthdateDate = new Date(birthdate);

  const timeDifference = currentDate - birthdateDate;

  const ageInMilliseconds = timeDifference;

  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
  const ageInYears = ageInMilliseconds / millisecondsInYear;

  const age = Math.floor(ageInYears);

  return age;
}

export function calculateBirthdate(birthdate) {
  const bdate = new Date(birthdate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = `${bdate.toLocaleDateString(undefined, options)}`;

  return formattedDate;
}

export function calcualteLoan(amt, installNum, interestRate, loanType) {
  const loan = new Loan(amt, installNum, interestRate, loanType);
  return loan;
}
