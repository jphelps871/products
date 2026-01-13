import * as Validator from "validatorjs";
import { Filter } from "profanity-check";

export default function validation(data, rules, customRules) {
  let validation = new Validator(data, rules);

  // loop through fields with custom rules
  for (const field in customRules) {
    if (!Object.hasOwn(customRules, field)) continue;

    const rulesStr = customRules[field]; // e.g. "profanity|other"
    const rulesArr = rulesStr.split("|");

    for (const rule of rulesArr) {
      const value = data[field];

      if (!value) continue;

      // Profanity (Stop swear words)
      if (rule === "profanity") {
        const filter = new Filter();
        if (filter.isProfane(value)) {
          console.log("working");
          validation.errors.add(field, "Please refrain from bad words");
        }
      }
    }
  }

  const customValidationFails = Object.keys(validation.errors.all()).length > 0;

  if (validation.fails() || customValidationFails) {
    throw validation.errors;
  }

  return data;
}
