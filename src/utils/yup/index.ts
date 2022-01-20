import * as Yup from 'yup';

import yup from '~/constants/yup';

interface LabelProps {
  label?: string;
}

const translation = {
  string: {
    length: yup.yup_string_length,
    min: yup.yup_string_min,
    max: yup.yup_string_max,
    email: yup.yup_string_email,
    url: yup.yup_string_url,
    trim: yup.yup_string_trim,
    lowercase: yup.yup_string_lowercase,
    uppercase: yup.yup_string_uppercase,
  },
  mixed: {
    default: yup.yup_mixed_invalid_field,
    required: ({ label }: LabelProps) =>
      label
        ? `${label} ${yup.yup_mixed_required_label_field}`
        : yup.yup_mixed_required_field,
    oneOf: yup.yup_mixed_one_of,
    notOneOf: yup.yup_mixed_not_one_of,
  },
  number: {
    min: yup.yup_number_min,
    max: yup.yup_number_max,
    lessThan: yup.yup_number_lessThan,
    moreThan: yup.yup_number_moreThan,
    notEqual: yup.yup_number_notEqual,
    positive: yup.yup_number_positive,
    negative: yup.yup_number_negative,
    integer: yup.yup_number_integer,
  },
  date: {
    min: yup.yup_date_min,
    max: yup.yup_date_max,
  },
  array: {
    min: yup.yup_array_min,
    max: yup.yup_array_max,
  },
};

Yup.setLocale(translation);

export default Yup;
